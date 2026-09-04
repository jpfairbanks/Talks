# Talks

Snapshots of talk slide decks. Each directory is one talk, frozen as given.

Rendering dependencies (reveal.js, KaTeX, fonts) and slide assets are vendored
in this repository rather than loaded from a CDN, so a deck opens and presents
correctly with no network connection and does not rot when an upstream version
is withdrawn.

They are **pooled at the repository root** — `assets/`, `vendor/`, `_ds/` — and
shared by every deck, which references them as `../assets/…`. A deck directory
therefore holds only its `index.html` (and a `README.md` where a talk has one).
Before pooling, the two decks held 221 byte-identical files between them; the
only same-path file that differed was `index.html` itself.

| Talk | Venue | Deck |
| --- | --- | --- |
| Compositional Methods of Engineering Analysis | UF MAE Department Seminar, Fall 2026 | [`2026-fall-compositional-methods/`](2026-fall-compositional-methods/) |
| Sheaves for Coordination Problems in Distributed Autonomous Systems | Georgia Tech DCL Seminar, 11 September 2026 | [`2026-09-11-gt-dcl-sheaves-coordination/`](2026-09-11-gt-dcl-sheaves-coordination/) |

## Viewing a deck

Open the deck's `index.html` directly in a browser, or serve the repository
root — not a single deck directory, since the assets are pooled a level up:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/2026-fall-compositional-methods/`.

Decks are [reveal.js](https://revealjs.com): arrow keys navigate, `Esc` shows
the slide overview, and `S` opens the speaker view.

## Adding a deck

1. Create a dated directory and put the deck's `index.html` in it.
2. Copy any asset the deck needs that is not already pooled into the root
   `assets/`, `vendor/` or `_ds/`. **Never replace a pooled file in place.**
3. Point the deck at the pool: asset paths are `../assets/…`, `../vendor/…`,
   `../_ds/…`.
4. Add a row to the table above and a card to `index.html` at the root.

Existing decks are never edited or removed. A snapshot is the record of what an
audience actually saw.

### The one rule the pool depends on

Pooled files are append-only. Two decks now load the same `vendor/reveal/`, so
replacing it upgrades a talk that was already given, and a snapshot that changes
is not a snapshot. If a future deck needs a different version of something,
add it under a new name beside the old one rather than overwriting.

The cost of pooling is that a deck directory is no longer portable on its own —
copying one elsewhere leaves its assets behind. Serve or publish the repository
root, not a single deck.

## Note on `.nojekyll`

The `.nojekyll` file at the repository root is required. Decks keep their
design-system tokens in a `_ds/` directory, and GitHub Pages' Jekyll pipeline
strips underscore-prefixed paths unless Jekyll is disabled. Without it, decks
render unstyled.

It is required at the root, which is also where `_ds/` now lives.

The trade-off is that Jekyll never renders this README into a landing page, so
`index.html` at the repository root is hand-written.
