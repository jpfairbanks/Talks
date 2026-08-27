# Talks

Snapshots of talk slide decks. Each directory is one talk, frozen as given.

Every deck is self-contained: its rendering dependencies (reveal.js, KaTeX,
fonts) are vendored alongside it, so a snapshot opens and presents correctly
with no network connection and does not rot when a CDN moves.

| Talk | Venue | Deck |
| --- | --- | --- |
| Compositional Methods of Engineering Analysis | UF MAE Department Seminar, Fall 2026 | [`2026-fall-compositional-methods/`](2026-fall-compositional-methods/) |

## Viewing a deck

Open the deck's `index.html` directly in a browser, or serve the directory:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/2026-fall-compositional-methods/`.

Decks are [reveal.js](https://revealjs.com): arrow keys navigate, `Esc` shows
the slide overview, and `S` opens the speaker view.

## Note on `.nojekyll`

The `.nojekyll` file at the repository root is required. Decks keep their
design-system tokens in a `_ds/` directory, and GitHub Pages' Jekyll pipeline
strips underscore-prefixed paths unless Jekyll is disabled. Without it, decks
render unstyled.

The trade-off is that Jekyll also never renders this README into a landing
page, so `index.html` at the repository root is hand-written. Add a row to it
as well as to the table above when you add a deck.
