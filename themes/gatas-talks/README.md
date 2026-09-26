# gatas-talks

The GATAS lab slide theme: a [Hugo](https://gohugo.io) module layered on
[reveal-hugo](https://github.com/joshed-io/reveal-hugo), drawn from the
Fairbanks research-talk design system the lab's decks use.

It provides

- the 1536 × 864 canvas and reveal.js settings the decks are designed for;
- the design system (`_ds/…`), reveal.js 5.1.0 (from reveal-hugo), KaTeX
  0.16.11 and a Fira Sans snapshot, all served locally — no CDN;
- the lab brand marks, at `/assets/brand/` (UF banner, GATAS lockup and mark);
- `talk.css`, the components the decks share: headings, highlight and outlined
  regions, bullet lists, theorem and math blocks, corner citations, slide
  numbers, and the thrust chips, cards, plan and timeline pieces first drawn
  for the COE kickoff;
- the talk layout: a talk is a section whose front matter lists slides by name
  from a library in `content/slides/`, so talks share slides instead of copying
  them;
- an index page listing the talks, and redirects (`aliases`) that keep a
  `#/slide` fragment.

`talk.ts` (KaTeX typesetting of `data-tex` elements, and playing a slide's
videos only while it is showing) is compiled by Hugo's built-in esbuild; no Node.

## Using it

A site needs Hugo 0.146 or newer and Go (to fetch the module). In `hugo.toml`:

```toml
baseURL = "/"
relativeURLs = true              # decks work from file:// and under any subpath

[outputs]
home = ["html"]
section = ["reveal"]

[security]
allowContent = ["! ^text/org$"]  # slides are .html content files

[markup.goldmark.renderer]
unsafe = true

[params.author]
name = "Your Name"

[[module.imports]]
path = "github.com/jpfairbanks/Talks/themes/gatas-talks"
```

and `hugo mod init github.com/you/your-talks` once. Then:

```
content/
  slides/
    _index.md          # [build] render = "never", list = "never"
                       # [cascade.build] render = "never", list = "local"
    my-first-slide.html
  2026-10-01-some-venue/
    _index.md          # title, date, meta, slides = ["my-first-slide", …]
```

To remix slides from James's library as well, import the `Talks` repository
itself and mount only its slides and pooled assets. Your own
`content/slides/` wins over a library slide of the same name.

```toml
[[module.imports]]
path = "github.com/jpfairbanks/Talks"
ignoreConfig = true
ignoreImports = true
[[module.imports.mounts]]
source = "content/slides"
target = "content/slides"
[[module.imports.mounts]]
source = "assets"
target = "static/assets"
```

## A slide

```html
+++
title = "Coordination Sheaves"          # overview and speaker view
heading = "Coordination Sheaves"        # the slide heading (HTML); omit for none
heading_size = 59                       # px, when not the default 53
cite = "[4] T. Hanks et al. <i>CDC,</i> 2025"   # corner citation (HTML)
notes = '''
Speaker notes (HTML).
'''
+++
<div style="position:absolute;left:48px;top:112px;width:1440px">…</div>
```

Also `dark = true` (navy ground), `part = true` (a part divider; `<!--part-->`
in the body becomes `PART ONE`, `PART TWO`, … counted per talk),
`number = false`, and `attrs = { data-transition = "fade" }` for the section.
The body is positioned on the 1536 × 864 canvas. Refer to assets from the site
root, `/assets/…`.

## A talk

```toml
+++
title = "Sheaves for Coordination Problems in Distributed Autonomous Systems"
date = 2026-09-11
meta = ["Decision and Control Laboratory Seminar", "Georgia Tech", "11 September 2026"]
aliases = ["/old-address/"]             # redirects, keeping #/slide
citations = false                       # hide every slide's corner citation
listed = false                          # leave it off the index page
style = ".ds-cite { font-size: 20px; }" # CSS for this talk only
slides = [
  "title--dcl",
  "curriculum-vitae",
  { slide = "references", heading = "Sources" },   # override for this talk
]
+++
```

Slide numbers are the position in `slides`, so a shared slide is numbered
correctly in each talk. A name that is not in the library fails the build.

## Developing

In the `Talks` repository the theme is used from `themes/gatas-talks/` directly
(`replacements` in its `hugo.toml`). To work on it from another site, point the
module at a local checkout:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/jpfairbanks/Talks/themes/gatas-talks -> /path/to/Talks/themes/gatas-talks" hugo server
```
