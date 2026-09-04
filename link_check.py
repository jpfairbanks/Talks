#!/usr/bin/env python3
"""Check every reference in every deck: links resolve, assets exist and decode.

The decks are reveal.js single pages, so one index.html holds every slide —
parsing it covers the whole talk. References are followed out of HTML into the
stylesheets it loads, so pooled fonts and anything pulled in by url() are
checked too.

    ./link_check.py                 # everything
    ./link_check.py --offline       # skip the network, check local files only
    ./link_check.py --versions      # which deck uses which vendored version
    ./link_check.py --orphans       # also list files nothing references
    ./link_check.py --quiet         # only report problems

Exits non-zero if anything is broken, so it can gate a commit or a workflow.
No third-party packages: standard library only.
"""

from __future__ import annotations

import argparse
import os
import posixpath
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_SCHEMES = ('data:', 'mailto:', 'javascript:', 'tel:', 'blob:')
POOLED = ('assets', 'vendor', '_ds')

# A file that exists but is truncated or of the wrong type still fails to
# display, so check that each one starts the way its extension promises.
SIGNATURES = {
    '.png':  lambda b: b.startswith(b'\x89PNG\r\n\x1a\n'),
    '.jpg':  lambda b: b.startswith(b'\xff\xd8\xff'),
    '.jpeg': lambda b: b.startswith(b'\xff\xd8\xff'),
    '.gif':  lambda b: b.startswith((b'GIF87a', b'GIF89a')),
    '.webp': lambda b: b.startswith(b'RIFF') and b[8:12] == b'WEBP',
    '.svg':  lambda b: b'<svg' in b[:2048].lower(),
    '.mp4':  lambda b: b[4:8] == b'ftyp',
    '.woff': lambda b: b.startswith(b'wOFF'),
    '.woff2': lambda b: b.startswith(b'wOF2'),
    '.otf':  lambda b: b.startswith((b'OTTO', b'\x00\x01\x00\x00', b'true')),
    '.ttf':  lambda b: b.startswith((b'\x00\x01\x00\x00', b'true', b'ttcf')),
    '.pdf':  lambda b: b.startswith(b'%PDF'),
}

URL_IN_CSS = re.compile(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)')
IMPORT_IN_CSS = re.compile(r'@import\s+(?:url\(\s*)?["\']([^"\']+)["\']')


class RefCollector(HTMLParser):
    """Pull every referencing attribute, plus url() out of inline CSS."""

    WANTED = {'src', 'href', 'poster', 'data-src', 'data-background-image',
              'data-background-video'}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, int]] = []
        self.stylesheets: list[tuple[str, int]] = []
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if tag == 'style':
            self._in_style = True
        for key, val in a.items():
            if not val:
                continue
            if key in self.WANTED:
                # A stylesheet is both a reference and a file to descend into.
                if tag == 'link' and key == 'href' and 'stylesheet' in (a.get('rel') or ''):
                    self.stylesheets.append((val, line))
                for part in (val.split(',') if key == 'data-background-video' else [val]):
                    self.refs.append((part.strip(), line))
            elif key == 'srcset':
                for cand in val.split(','):
                    if cand.strip():
                        self.refs.append((cand.strip().split()[0], line))
            elif key == 'style':
                self.refs += [(m, line) for m in URL_IN_CSS.findall(val)]

    def handle_endtag(self, tag):
        if tag == 'style':
            self._in_style = False

    def handle_data(self, data):
        if self._in_style:
            line = self.getpos()[0]
            self.refs += [(m, line) for m in URL_IN_CSS.findall(data)]


def read(path: str) -> str:
    with open(path, encoding='utf-8', errors='replace') as fh:
        return fh.read()


def resolve(ref: str, referrer: str) -> str | None:
    """Resolve a reference against the file that made it. None if it escapes."""
    base = posixpath.dirname(os.path.relpath(referrer, ROOT).replace(os.sep, '/'))
    target = posixpath.normpath(posixpath.join(base, ref.split('#')[0].split('?')[0]))
    return None if target.startswith('..') else target


def collect(quiet: bool) -> tuple[dict, set]:
    """Walk every page, following stylesheets. Returns problems and referenced files."""
    pages = [p for p in ('index.html',) if os.path.exists(os.path.join(ROOT, p))]
    pages += sorted(
        os.path.join(d, 'index.html') for d in os.listdir(ROOT)
        if os.path.isdir(os.path.join(ROOT, d)) and not d.startswith('.')
        and d not in POOLED and os.path.exists(os.path.join(ROOT, d, 'index.html')))

    missing: list[tuple[str, str, int, str]] = []
    corrupt: list[tuple[str, str]] = []
    external: dict[str, list[str]] = {}
    referenced: set[str] = set()
    seen_css: set[str] = set()

    def note(ref: str, referrer: str, line: int) -> None:
        if not ref or ref.startswith('#') or ref.lower().startswith(SKIP_SCHEMES):
            return
        if ref.startswith(('http://', 'https://', '//')):
            external.setdefault(ref if not ref.startswith('//') else 'https:' + ref,
                                []).append(os.path.relpath(referrer, ROOT))
            return
        target = resolve(ref, referrer)
        if target is None:
            missing.append((ref, os.path.relpath(referrer, ROOT), line, 'escapes the repository'))
            return
        full = os.path.join(ROOT, target)
        if not os.path.exists(full):
            missing.append((ref, os.path.relpath(referrer, ROOT), line, 'no such file'))
            return
        referenced.add(target)
        ext = os.path.splitext(target)[1].lower()
        if os.path.getsize(full) == 0:
            corrupt.append((target, 'empty file'))
        elif ext in SIGNATURES:
            with open(full, 'rb') as fh:
                head = fh.read(4096)
            if not SIGNATURES[ext](head):
                corrupt.append((target, f'does not start like a valid {ext[1:]}'))

    def walk_css(path: str) -> None:
        rel = os.path.relpath(path, ROOT)
        if rel in seen_css or not os.path.exists(path):
            return
        seen_css.add(rel)
        text = read(path)
        for ref in URL_IN_CSS.findall(text) + IMPORT_IN_CSS.findall(text):
            note(ref, path, 0)
            if ref.endswith('.css'):
                t = resolve(ref, path)
                if t:
                    walk_css(os.path.join(ROOT, t))

    for page in pages:
        full = os.path.join(ROOT, page)
        parser = RefCollector()
        parser.feed(read(full))
        for ref, line in parser.refs:
            note(ref, full, line)
        for ref, _ in parser.stylesheets:
            target = resolve(ref, full)
            if target:
                walk_css(os.path.join(ROOT, target))

    if not quiet:
        print(f'{len(pages)} page(s), {len(seen_css)} stylesheet(s) followed, '
              f'{len(referenced)} local file(s) referenced, '
              f'{len(external)} external URL(s)')
    return {'missing': missing, 'corrupt': corrupt, 'external': external,
            'pages': pages}, referenced


def check_url(url: str) -> tuple[str, int | str]:
    """HEAD, falling back to GET — plenty of hosts refuse HEAD or bare agents."""
    headers = {'User-Agent': 'Mozilla/5.0 (link_check.py)',
               'Accept': '*/*'}
    for method in ('HEAD', 'GET'):
        req = urllib.request.Request(url, method=method, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return url, resp.status
        except urllib.error.HTTPError as exc:
            if method == 'GET' or exc.code not in (403, 405, 501):
                return url, exc.code
        except Exception as exc:                     # DNS, TLS, timeout
            if method == 'GET':
                return url, type(exc).__name__
    return url, 'unreachable'


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--offline', action='store_true', help='skip external URLs')
    ap.add_argument('--versions', action='store_true',
                    help='report vendored versions in use, and which are retirable')
    ap.add_argument('--orphans', action='store_true',
                    help='also list pooled files nothing references')
    ap.add_argument('--quiet', action='store_true', help='only print problems')
    args = ap.parse_args()

    report, referenced = collect(args.quiet)
    failures = 0

    if report['missing']:
        failures += len(report['missing'])
        print(f'\nBROKEN REFERENCES ({len(report["missing"])})')
        for ref, referrer, line, why in report['missing']:
            where = f'{referrer}:{line}' if line else referrer
            print(f'  {where}\n      {ref}  — {why}')

    if report['corrupt']:
        failures += len(report['corrupt'])
        print(f'\nFILES THAT WILL NOT DISPLAY ({len(report["corrupt"])})')
        for target, why in report['corrupt']:
            print(f'  {target}  — {why}')

    if not args.offline and report['external']:
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = dict(pool.map(check_url, report['external']))
        bad = {u: s for u, s in results.items() if not (isinstance(s, int) and s < 400)}
        if not args.quiet:
            print(f'\nEXTERNAL LINKS ({len(results)})')
            for url, status in sorted(results.items()):
                mark = 'ok  ' if url not in bad else 'FAIL'
                print(f'  {mark} {status}  {url}')
                for referrer in sorted(set(report['external'][url])):
                    print(f'         from {referrer}')
        failures += len(bad)
        if bad and args.quiet:
            print(f'\nDEAD EXTERNAL LINKS ({len(bad)})')
            for url, status in sorted(bad.items()):
                print(f'  {status}  {url}')

    if args.versions:
        vendored = sorted(d for d in os.listdir(os.path.join(ROOT, 'vendor'))
                          if os.path.isdir(os.path.join(ROOT, 'vendor', d)))
        vendored += sorted('_ds/' + d for d in os.listdir(os.path.join(ROOT, '_ds'))
                           if os.path.isdir(os.path.join(ROOT, '_ds', d)))
        users: dict[str, list[str]] = {v: [] for v in vendored}
        for page in report['pages']:
            text = read(os.path.join(ROOT, page))
            for v in vendored:
                needle = ('vendor/' + v) if not v.startswith('_ds/') else v
                if needle + '/' in text:
                    users[v].append(os.path.dirname(page) or '(root)')
        print('\nVENDORED VERSIONS')
        for v, decks in users.items():
            size = sum(os.path.getsize(os.path.join(r, f))
                       for r, _, fs in os.walk(os.path.join(
                           ROOT, v if v.startswith('_ds/') else 'vendor/' + v))
                       for f in fs)
            if decks:
                print(f'  {v:42s} {size / 1e6:6.2f} MB  used by {len(decks)}: '
                      + ', '.join(decks))
            else:
                print(f'  {v:42s} {size / 1e6:6.2f} MB  RETIRABLE — no deck references it')

    if args.orphans:
        on_disk = {os.path.relpath(os.path.join(r, f), ROOT).replace(os.sep, '/')
                   for top in POOLED
                   for r, _, fs in os.walk(os.path.join(ROOT, top)) for f in fs}
        orphans = sorted(on_disk - referenced)
        size = sum(os.path.getsize(os.path.join(ROOT, p)) for p in orphans)
        print(f'\nUNREFERENCED FILES ({len(orphans)}, {size / 1e6:.1f} MB)')
        for p in orphans:
            print(f'  {os.path.getsize(os.path.join(ROOT, p)) / 1e6:6.2f} MB  {p}')
        print('  (not counted as failures — a file may be kept on purpose)')

    if failures:
        print(f'\nFAILED: {failures} problem(s)')
        return 1
    print('\nOK: every reference resolves and every asset is intact')
    return 0


if __name__ == '__main__':
    sys.exit(main())
