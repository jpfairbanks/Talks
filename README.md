# Talks

Slide decks, as I want them to appear to the world. Each talk is one directory
under `content/`.

This is a living resource, not an archive. A deck can be improved after it has
been given — fix a wrong citation, redraw a figure, take a newer reveal.js — and
the version here is the one that counts. Decks are not preserved as they looked
on the day, and an upgrade that shifts the rendering slightly is fine.

Talks stay listed. Improve them, don't delete them.

| Talk | Venue | Deck |
| --- | --- | --- |
| Sheaves for Coordination Problems in Distributed Autonomous Systems | CODAC Kickoff Meeting, 25 September 2026 | [`2026-09-25-codac-kickoff-sheaves/`](content/2026-09-25-codac-kickoff-sheaves/) |
| DIGICAMS for CODAC: Vision and Plan for the Year | AFOSR Center of Excellence kickoff, Arlington, VA, 24 September 2026 | [`2026-09-24-afosr-coe-kickoff/`](content/2026-09-24-afosr-coe-kickoff/) |
| Compositional Methods of Engineering Analysis | UF MAE Department Seminar, Fall 2026 | [`2026-fall-compositional-methods/`](content/2026-fall-compositional-methods/) |
| Sheaves for Coordination Problems in Distributed Autonomous Systems | Georgia Tech DCL Seminar, 11 September 2026 | [`2026-09-11-gt-dcl-sheaves-coordination/`](content/2026-09-11-gt-dcl-sheaves-coordination/) |

The published decks are at `https://jpfairbanks.github.io/Talks/<directory>/`.

## One library of slides, many talks

The site is built by [Hugo](https://gohugo.io) with
[reveal-hugo](https://github.com/joshed-io/reveal-hugo) and this lab's theme,
[`themes/gatas-talks/`](themes/gatas-talks/). Every slide is one file in
`content/slides/`, and a talk is a list of slide names:

```toml
# content/2026-09-11-gt-dcl-sheaves-coordination/_index.md
+++
title = "Sheaves for Coordination Problems in Distributed Autonomous Systems"
date = 2026-09-11
meta = ["Decision and Control Laboratory Seminar", "Georgia Tech", "11 September 2026"]
slides = [
  "title--dcl",
  "curriculum-vitae",
  "students-collaborators-and-family",
  # …
]
+++
```

A slide used by several talks exists once, so a fix lands in every talk that
uses it. The four decks here hold 146 slides between them; the library holds
103. Slide numbers, and the ordinal in a part divider's `PART TWO` kicker, are
counted per talk, so a shared slide is numbered correctly wherever it appears.

A slide is its HTML body under a little TOML front matter; the theme draws
everything around it — the section, the canvas, the heading, the slide number,
the corner citation, the speaker notes:

```html
+++
title = "Coordination Sheaves"
heading = "Coordination Sheaves"
cite = "[<span class=\"cite-ours\">4</span>] T. Hanks, … <i>IEEE Conference on Decision and Control,</i> 2025"
notes = '''
What to say while it is up.
'''
+++
<div style="position:absolute;left:48px;top:200px;width:560px">…</div>
```

The fields are listed at the top of
[`slide.html`](themes/gatas-talks/layouts/partials/gatas-talks/slide.html).
A talk can override any of them for one appearance of a slide, without forking
the file: `{ slide = "references", heading = "Sources" }` in its list. A talk
with `citations = false` shows its slides without their corner citations — the
MAE seminar predates them, and that is how it shares slides with the later
decks.

Where two talks really do show different versions of a slide, the library keeps
both, the second named for the talk it came from: `coordination-sheaves` and
`coordination-sheaves--mae`. Title slides and reference lists are per talk and
are always named that way.

## Layout

```
content/
  _index.md                         the index page
  slides/                           the slide library, one .html per slide
  2026-09-11-gt-dcl-sheaves-coordination/
    _index.md                       the talk: metadata and its list of slides
    README.md                       details worth recording (not published)
  …
assets/                             figures, photos, video, widgets, logos,
                                    published at /assets/ as before
themes/gatas-talks/                 the lab theme, a Hugo module of its own
_vendor/                            reveal-hugo, vendored by `hugo mod vendor`
tools/import_deck.jl                brings a standalone reveal.js deck into the library
link_check.py                       checks the built site
```

reveal.js, KaTeX, the Fira Sans snapshot, the design system (`_ds/…`) and the lab
brand marks live in the theme, which puts them at the same URLs the hand-written
decks used. Nothing is loaded from a CDN, so a deck presents with no network
connection and does not break when an upstream version is withdrawn.

## Building and viewing

Install [Hugo](https://gohugo.io/installation/) 0.146 or newer. Nothing else is
needed: reveal-hugo is vendored and the theme is in the repository, so the build
needs neither Go nor the network.

```sh
hugo server                  # live-reloading preview at http://localhost:1313/
hugo                         # build into public/
```

Every URL in the output is relative, so `public/` also works opened straight from
disk or copied anywhere. Decks are [reveal.js](https://revealjs.com): arrow keys
navigate, `Esc` shows the slide overview, and `S` opens the speaker view.

Pushes to `main` are built and published by
[`.github/workflows/pages.yml`](.github/workflows/pages.yml). GitHub Pages must be
set to deploy from **GitHub Actions** (Settings → Pages → Source), not from a
branch: the branch holds sources, not built pages.

## Checking the decks

`link_check.py` reads every built page, follows the stylesheets it loads, and
verifies that every reference resolves and every asset is intact — a file that
exists but is truncated or of the wrong type is reported too, since it fails to
display just the same. External links are requested; hosts that refuse `HEAD`
are retried with `GET`. Standard library only, no install. The Pages workflow
runs it offline on every build.

```sh
hugo && ./link_check.py       # everything
./link_check.py --offline     # local files only, no network
./link_check.py --versions    # which deck uses which vendored version
./link_check.py --orphans     # files nothing references
./link_check.py --quiet       # only problems; exits non-zero if any
```

## Adding a talk

1. Create `content/<date>-<venue>-<topic>/_index.md` with a `title`, a `date`,
   the `meta` strings its card on the index shows, and its `slides`.
2. Reuse library slides by name. For a new slide, add
   `content/slides/<name>.html`; put any asset it needs in the pooled `assets/`
   and refer to it from the site root, `/assets/figures/…` — the build makes it
   relative.
3. Add a row to the table above.
4. `hugo server` to look at it, then `hugo && ./link_check.py`.

A deck built outside this repository — by hand, or exported from the design
tool — comes in with `tools/import_deck.jl`, which splits it into library slides
(sharing any it already has) and writes the talk's slide list:

```sh
julia tools/import_deck.jl . mytalk=path/to/deck.html
```

Then rename `content/mytalk/` to its dated name and fill in the front matter.
Standard library only.

## Upgrading reveal.js or reveal-hugo

reveal.js comes with reveal-hugo, pinned in
[`themes/gatas-talks/go.mod`](themes/gatas-talks/go.mod). With Go installed:

```sh
cd themes/gatas-talks && hugo mod get -u github.com/joshed-io/reveal-hugo && cd -
hugo mod vendor              # refresh _vendor/
hugo server                  # look at the decks
```

KaTeX and Fira Sans are version-stamped directories under
`themes/gatas-talks/static/vendor/`, named in one place,
[`layouts/partials/layout/theme.html`](themes/gatas-talks/layouts/partials/layout/theme.html).
To upgrade one, drop the new build in beside the old, change the name there, and
check the decks before deleting the old directory.

## Using the theme elsewhere

Any repository can build talks with the lab theme, and remix this library's
slides, by importing them as Hugo modules; see
[`themes/gatas-talks/README.md`](themes/gatas-talks/README.md).
