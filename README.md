# Talks

Slide decks, as I want them to appear to the world. Each directory is one talk.

This is a living resource, not an archive. A deck can be improved after it has
been given — fix a wrong citation, redraw a figure, take a newer reveal.js — and
the version here is the one that counts. Decks are not preserved as they looked
on the day, and an upgrade that shifts the rendering slightly is fine.

Talks stay listed. Improve them, don't delete them.

| Talk | Venue | Deck |
| --- | --- | --- |
| Compositional Methods of Engineering Analysis | UF MAE Department Seminar, Fall 2026 | [`2026-fall-compositional-methods/`](2026-fall-compositional-methods/) |
| Sheaves for Coordination Problems in Distributed Autonomous Systems | Georgia Tech DCL Seminar, 11 September 2026 | [`2026-09-11-gt-dcl-sheaves-coordination/`](2026-09-11-gt-dcl-sheaves-coordination/) |

## Layout

Rendering dependencies and slide assets are vendored here rather than loaded
from a CDN, so a deck presents with no network connection and does not break
when an upstream version is withdrawn. They are pooled at the repository root
and shared by every deck, which reaches them as `../assets/…`:

```
assets/                     figures, photos, video, brand marks
vendor/reveal-5.1.0/        version-stamped, one directory per version
vendor/katex-0.16.11/
vendor/fira-sans-2026-09/   a Google Fonts snapshot, dated rather than versioned
_ds/…-7193341c-…/           design system, keyed by its own id
2026-fall-compositional-methods/index.html
2026-09-11-gt-dcl-sheaves-coordination/index.html
```

A deck directory holds only its `index.html`, plus a `README.md` where a talk
has details worth recording. Because the assets live a level up, a deck
directory is not portable on its own — serve or publish the repository root.

## Upgrading a vendored library

Versions sit side by side, so a new one can be tried on a single deck before
everything moves. Nothing is downloaded automatically; placing the new build is
a deliberate step.

```sh
#  1. drop the new build in beside the old one, as vendor/reveal-5.2.0/
./vendor_upgrade.py --list                        # who uses what today
./vendor_upgrade.py reveal-5.1.0 reveal-5.2.0 --deck 2026-fall-compositional-methods
./link_check.py                                   # nothing broke
#  2. look at that deck, then roll the rest forward
./vendor_upgrade.py reveal-5.1.0 reveal-5.2.0
rm -rf vendor/reveal-5.1.0                        # once nothing references it
```

Retire an old version only after `--list` shows nothing using it.

## Checking the decks

`link_check.py` reads every page, follows the stylesheets it loads, and verifies
that every reference resolves and every asset is intact — a file that exists but
is truncated or of the wrong type is reported too, since it fails to display just
the same. External links are requested; hosts that refuse `HEAD` are retried with
`GET`. Standard library only, no install.

```sh
./link_check.py               # everything
./link_check.py --offline     # local files only, no network
./link_check.py --versions    # which deck uses which vendored version
./link_check.py --orphans     # files nothing references
./link_check.py --quiet       # only problems; exits non-zero if any
```

## Adding a deck

1. Create a dated directory holding the deck's `index.html`.
2. Add any asset it needs to the pooled `assets/`, and point the deck at the
   pool: `../assets/…`, `../vendor/<name>-<version>/…`, `../_ds/…`.
3. Add a row to the table above and a card to `index.html` at the root.
4. Run `./link_check.py`.

## Viewing a deck

Serve the repository root — not a single deck directory, since the assets are
pooled a level up:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/2026-fall-compositional-methods/`.

Decks are [reveal.js](https://revealjs.com): arrow keys navigate, `Esc` shows
the slide overview, and `S` opens the speaker view.

## Note on `.nojekyll`

The `.nojekyll` file at the root is required. The design system lives in `_ds/`,
and GitHub Pages' Jekyll pipeline strips underscore-prefixed paths unless Jekyll
is disabled. Without it, decks render unstyled.

The trade-off is that Jekyll never renders this README into a landing page, so
`index.html` at the repository root is hand-written.
