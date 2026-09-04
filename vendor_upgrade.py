#!/usr/bin/env python3
"""Move decks from one vendored version to another.

Vendored libraries live under version-stamped directories — vendor/reveal-5.1.0,
vendor/katex-0.16.11 — and every deck names the version it loads. To take a new
version:

    1. Drop the new build in beside the old one, e.g. vendor/reveal-5.2.0/.
    2. ./vendor_upgrade.py reveal-5.1.0 reveal-5.2.0     # move every deck
    3. ./link_check.py                                    # nothing broke
    4. Look at the decks, since a new version may shift the rendering.
    5. Once no deck references the old directory, delete it.

Move one deck at a time with --deck to try a version before committing to it:

    ./vendor_upgrade.py reveal-5.1.0 reveal-5.2.0 --deck 2026-fall-compositional-methods

    ./vendor_upgrade.py --list        # what is vendored, and who uses it

Nothing is downloaded — placing the new build is a deliberate, manual step.
"""

from __future__ import annotations

import argparse
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
POOLED = ('assets', 'vendor', '_ds')


def decks() -> list[str]:
    return sorted(d for d in os.listdir(ROOT)
                  if os.path.isdir(os.path.join(ROOT, d)) and not d.startswith('.')
                  and d not in POOLED
                  and os.path.exists(os.path.join(ROOT, d, 'index.html')))


def vendored() -> list[str]:
    out = sorted(d for d in os.listdir(os.path.join(ROOT, 'vendor'))
                 if os.path.isdir(os.path.join(ROOT, 'vendor', d)))
    out += sorted('_ds/' + d for d in os.listdir(os.path.join(ROOT, '_ds'))
                  if os.path.isdir(os.path.join(ROOT, '_ds', d)))
    return out


def needle(version: str) -> str:
    """The path fragment a deck uses to name this version."""
    return f'../{version}/' if version.startswith('_ds/') else f'../vendor/{version}/'


def size_of(version: str) -> float:
    base = os.path.join(ROOT, version if version.startswith('_ds/') else 'vendor/' + version)
    return sum(os.path.getsize(os.path.join(r, f))
               for r, _, fs in os.walk(base) for f in fs) / 1e6


def users(version: str) -> list[str]:
    frag = needle(version)
    out = []
    for d in decks():
        with open(os.path.join(ROOT, d, 'index.html'), encoding='utf-8') as fh:
            if frag in fh.read():
                out.append(d)
    return out


def do_list() -> int:
    print(f'{"version":44s} {"MB":>6s}  used by')
    for v in vendored():
        who = users(v)
        note = ', '.join(who) if who else 'nothing — safe to delete'
        print(f'  {v:42s} {size_of(v):6.2f}  {note}')
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('old', nargs='?', help='version directory to move off, e.g. reveal-5.1.0')
    ap.add_argument('new', nargs='?', help='version directory to move to, e.g. reveal-5.2.0')
    ap.add_argument('--deck', action='append', help='limit to this deck (repeatable)')
    ap.add_argument('--list', action='store_true', help='show vendored versions and their users')
    ap.add_argument('--dry-run', action='store_true', help='report without writing')
    args = ap.parse_args()

    if args.list or not args.old:
        return do_list()
    if not args.new:
        ap.error('give both a version to move off and a version to move to')

    known = vendored()
    if args.new not in known:
        print(f'error: vendor/{args.new} does not exist — place the new build first', file=sys.stderr)
        print(f'       vendored now: {", ".join(known)}', file=sys.stderr)
        return 2
    if args.old not in known:
        print(f'warning: {args.old} is not present; rewriting references to it anyway',
              file=sys.stderr)

    targets = args.deck or decks()
    unknown = [d for d in targets if d not in decks()]
    if unknown:
        print(f'error: no such deck: {", ".join(unknown)}', file=sys.stderr)
        return 2

    frm, to = needle(args.old), needle(args.new)
    touched = 0
    for d in targets:
        p = os.path.join(ROOT, d, 'index.html')
        text = open(p, encoding='utf-8').read()
        n = text.count(frm)
        if not n:
            print(f'  {d}: already off {args.old}')
            continue
        if not args.dry_run:
            open(p, 'w', encoding='utf-8').write(text.replace(frm, to))
        print(f'  {d}: {n} path(s) {args.old} -> {args.new}'
              + ('  (dry run)' if args.dry_run else ''))
        touched += 1

    if not touched:
        print('nothing to do')
        return 0
    left = users(args.old)
    print(f'\n{touched} deck(s) updated.')
    print(f'{args.old} is now used by: ' + (', '.join(left) if left else
          f'nothing — delete vendor/{args.old} to reclaim {size_of(args.old):.2f} MB'
          if os.path.exists(os.path.join(ROOT, 'vendor', args.old)) else 'nothing'))
    print('Next: ./link_check.py, then look at the decks — a new version may shift rendering.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
