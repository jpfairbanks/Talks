# Fairbanks Research Talk Design System

A design system reverse-engineered from two research talks by James Fairbanks (University of
Florida):

- **`uploads/fairbanks_ASEMFL_Rising_Star_short.pptx`** — 7 slides, "James Fairbanks: Research
  Overview", ASEMFL Annual Meeting, Orlando, FL, November 2025. A career-overview talk: one idea
  per slide, figures doing all the work, no bullets at all.
- **`uploads/ACC2026_homological_programs_reduced.pptx`** — 23 slides, "Multiagent Autonomy with
  Cellular Sheaves" (5/22/2025), with Tyler Hanks, Hans Riess and Matthew Hale (GT-ECE). A
  technical paper talk: outline, definitions, theorems, pseudocode, four result scenarios. This
  is where the bulleted body, the stroked figure regions and the scenario spec list come from.

Both carry the same document title, "Analytics Algorithms and Algebra Seeking Structure in Data
Science", the same 1536x864 canvas, and the same theme — `GTRI_16x9_2015_unmarked` with a
recoloured palette called **"go gators"**, i.e. a Georgia Tech Research Institute master reskinned
for UF. Where the two decks differ, both patterns are documented; where they agree, that is the
system.

## What this system is for

Academic research communication: conference talks, review-panel decks, funding-agency briefings,
lab posters and figure-heavy explainers. It is a **presentation system**, not a product UI system.
The source contains no application, website or codebase — so this project ships slide primitives
and sample slides, and deliberately ships **no UI kit**. If a UI ever exists for this work
(a Julia package docs site, a simulation front end), that is the moment to add one.

The speaker's lab is the **GATAS Lab** (Generalized Algebraic Techniques Advancing Science) at the
University of Florida, which "uses applied category theory to develop novel approaches to
scientific computing" and describes itself as domain-agnostic — dynamics, physics, biology, the
life sciences, industrial engineering. It works with Evan Patterson's group at the Topos Institute
on the **AlgebraicJulia** ecosystem. That framing explains the deck's structure: a general method
shown four times over unrelated domains, never a product pitch.

Subject matter throughout: applied category theory and computational science — sheaf theory,
denotational semantics, discrete exterior calculus, network diffusion, epidemic and multiphysics
simulation. Named artefacts in the deck: **DECAPODES** (a framework for directly computable
physics, DARPA-funded), and Julia-ecosystem tooling (JuliaMono, Plots.jl figures, an
AlgebraicJulia-style shrimp mark).

## Sources given

- The two `.pptx` files above. Everything here was read out of them: `ppt/theme/theme1.xml`
  (palette), `slideMaster1.xml` (including the `clrMap`) + `slideLayout*.xml` (placeholder
  geometry and type; 8 layouts in the first deck, 12 in the second), every `slides/slideN.xml`
  (real usage), `ppt/media/*` (assets), `presentation.xml` (canvas size, embedded fonts),
  `notesSlides/*` (voice). Raw XML for deck 1 is in `_extract/`, deck 2 in `_extract2/`.
- **https://gataslab.org/** — the GATAS Lab site (Generalized Algebraic Techniques Advancing
  Science, University of Florida), read for context. Quarto-built, UF-barred, links out to
  `github.com/AlgebraicJulia`, `algebraicjulia.org`, `blog.algebraicjulia.org` and the
  Topos Institute; sections are Members, Projects, Publications, Lab Meetings, ACT 2025, Blog,
  Sponsors. Its own masthead artwork (`_assets/gatas_bar_UF.png`) is a second UF bar in the same
  family as the deck's banner — **send it if you want it in `assets/brand/`**; binaries can't be
  pulled from the web here.
- **https://juliamono.netlify.app/** — JuliaMono's home, used to wire up the real mono face.
- No Figma file, no GitHub repository, no codebase was provided. Raw extracted XML is kept in
  `_extract/` for anyone who wants to check a value.

## Content fundamentals

**Register.** Declarative, technical, unhedged. Titles are complete claims, not labels:
"Sheaf theory studies local to global phenomena", "Hierarchy is a Fundamental Tool for
Understanding", "Information diffuses across networks like heat in a material". The reader is
told what is true, then shown the figure that supports it.

**Person.** Almost never "I". First person appears only as **we** in the notes
("We have developed a state-of-the-art software platform…"), and as the speaker's own name on the
title slide ("James Fairbanks: Research Overview"). The audience is never addressed as "you". The
one exception is the rhetorical **we**-question used to open a research direction:
"Can we combine denotational semantics and network science to understand hierarchical structures
in complex systems?"

**Casing.** Inconsistent by design of use, not by accident — and worth copying as-is:
slide titles use **Title Case** when they name a topic ("Automated Model Exploration for
Epidemics", "Mathematical Modeling of Complex Systems") and **sentence case** when they state a
mechanism ("Sheaf theory studies local to global phenomena"). Figure captions are sentence case
noun phrases: "A cellular sheaf of vector spaces over a graph". Pipeline steps are numbered
sentence-case fragments: "1) System specification", "2) Model semantics",
"3) Simulation/solution".

**Punctuation.** No terminal periods on titles, captions or takeaway lines. Exactly one
exclamation mark in the whole deck, on the closing human slide: "Adventures with Students and
Collaborators!" Slashes stand in for "or" in compound labels ("Simulation/solution").
Acronyms are set in caps and left unexpanded on the slide (DECAPODES, SIR, PDE, ASEMFL).

**Length.** Short, but the two decks sit at opposite ends. The overview deck runs 274 words over
seven slides and uses no bullets at all — the body placeholder holds a single line or a single
question. The paper talk bullets nearly every slide, but keeps to three to six items of one clause
each ("Topology: fully connected", "Node objectives: tracking in y"), with the figure still
carrying the density. Rule: bullets are for a technical audience walking through a construction;
an overview talk gets one sentence.

**Repetition as structure.** The paper talk's four scenario slides use the same six labels in the
same order — Application, Scenario, Node objectives, Topology, Restriction maps, Edge potentials —
so the audience reads only what changed. Reuse a spec list verbatim rather than rephrasing it per
slide.

**Attribution.** Borrowed figures are credited in place: "Figure Credit: Keenan Crane Discrete
Differential Geometry". Theorems and definitions keep their numbering from the paper
("Definition 1 (Cellular Sheaf)", "Theorem 3", "Algorithm 1: Distributed Solve").

**Emoji.** None. Not one, anywhere. Do not introduce them.

**Vibe.** A working scientist's talk: the mathematics is the star, the design gets out of the
way, and the last slide is about people.

## Visual foundations

**Canvas.** 1536 x 864 px (`sldSz` 14630400 x 8229600 EMU), 16:9. Left/right gutter 48px. The
title band is 96px tall and sits *slightly off the top edge* (`y = -8px`) — titles hug the top.

**Colour.** White ground on every slide but the first. Deep navy `#002A54` for all titles and
body copy. Cream `#FFEFCF` is defined in the theme as `lt2` but **never actually renders**: the master's
`clrMap` sends `bg2` to `dk2`, so runs marked `schemeClr="bg2"` — which is how both title slides
are authored — come out navy on white, not cream. Treat cream as an unused theme slot, not a
brand colour. Six theme
accents — orange `#E28F41`, tan `#BE9B69`, pale green `#CFDBCB`, green `#80BE63`, warm grey
`#B1B3B6`, blue `#6C9AC3` — appear almost exclusively as **28%-alpha tints** behind diagram
regions, never as solid brand blocks. Takeaway lines use accent6 darkened 50% (`#2C4B6A`). Slide
numbers are `#888B97`. Two background colours total: white and navy. Links: `#0020A5`, visited
`#FA4616` (UF blue and orange).

**Type.** Two faces, no third (a third token, `--font-math`, is the same XITS design serving
notation). **XITS** (a STIX fork, a Times-class math serif) sets titles, body,
captions and slide numbers — a serif deck, unusual and load-bearing, because the type has to sit
next to real mathematical notation without a seam. **JuliaMono** sets pipeline-step labels and
code. Arial appears once, as the caption face on the four-figure slide. Titles are **regular
weight, not bold** — the master says bold, every real slide overrides it. Leading is 100%
everywhere (`lnSpc spcPct 100000`); nothing is loosened.

**Backgrounds.** Flat white. One photographic element in the whole deck: the UF banner strip
across the top of the title slide (a blue-graded campus sky with a network-graph motif at the
right and the orange UF block at the left). No gradients, no textures, no patterns, no full-bleed
imagery except the closing photo wall.

**Imagery.** Two kinds. (1) Research figures: Julia Plots.jl line charts on white with grey
gridlines and the Plots.jl default series colours; Petri-net and graph diagrams with flat
circular nodes, rounded-square boxes and grey curved arrows; viridis/magma/jet simulation
heatmaps. Cool-to-warm, high-saturation, never filtered or recoloured. (2) Mathematics: numbered
definitions, theorems and `algorithm2e` pseudocode, black on white in Computer Modern. The source
decks paste these in as **images**, but only because PowerPoint cannot typeset LaTeX — in HTML
they are regenerated from the paper's own source with KaTeX, so the notation stays real, selectable
text at any scale. Never screenshot a formula that has source. (3) Photographs: unedited
snapshots of students and collaborators, warm and casual, cropped to fill and butted edge to
edge. No duotone, no grain, no b&w.

**Cards.** There are none. Nothing in this deck is a card: no container has a border plus a
shadow plus padding. Content sits directly on white. The closest thing to a container is the
tinted highlight region — a rounded rectangle, 28% accent fill, **no stroke at all**, radius
`adj=9184` (9.184% of the short side, ~32px at the sizes used). Overlapping regions read through
one another; that transparency *is* the diagramming language.

**Borders and strokes.** Diagram outlines are heavy: 7px (`a:ln w="63500"`) to 8px at slide
scale, solid, in near-black or navy. Thin hairlines appear only inside imported plot artwork. The
paper talk adds a second use of the same 7px weight: a rounded rectangle with an **accent stroke
and no fill**, label centred along its top, drawn around part of a figure to name it
("0-Cochains (0-Forms)", "Stalks and Restriction Maps", "Underlying Graph"). So there are two
region treatments — tint to group, stroke to name — and they never combine.

**Shadows.** Exactly one, and it is on type: the title drop shadow from `slideLayout1` —
38100 EMU blur, 19050 EMU distance, 45°, navy at 40% (`2px 2px 3px rgb(0 42 84 / .40)`). No box
shadows anywhere. No inner shadows.

**Transparency and blur.** Alpha is used for one purpose only: overlapping highlight regions at
28%. No blur, no frosted glass, no backdrop filters.

**Protection.** Light type appears once, over solid navy, not over the photograph — the deck
solves contrast with a **solid block**, not a scrim gradient. A `--scrim-navy` token exists for
the case where cream type must sit over the banner image, but the source never does this.

**Layout rules.** Fixed elements: title top-left, slide number bottom-right (`#888B97`, 21px), a
single takeaway line along the bottom at 64px from the edge. Everything else is absolutely
positioned per slide — the deck is composed, not templated. Common structures: figure-left /
text-right; three equal stages across the top with one wide result beneath; 2x2 captioned figure
grid; full-bleed photo grid.

**Animation.** None. No slide transitions, no builds, no entrance effects. Motion in the deck is
real: an embedded `.mp4` of a warm-bubble simulation
(`assets/figures/warm-bubble-simulation.mp4`) and an animated `.gif` of network diffusion.
If something moves, it is data. Hover and press states do not exist in a deck; when these
primitives are used in an interactive context, keep them to a 120ms opacity or tint shift
(`--dur-quick`, `--ease-standard`) rather than inventing lifts or scales.

## Iconography

There is **no icon system**. The deck contains zero UI icons, zero icon font, zero icon sprite,
no Lucide/Heroicons/Font Awesome, no unicode glyphs used decoratively and no emoji. Nothing has
been substituted from a CDN, because substituting would invent a language the source does not have.

What plays the role icons usually play:

- **Mathematical glyphs**, set in the core serif face and pulled straight from the notation:
  Ω, ★, ∂, Laplacian symbols. These arrive inside figures and equation art, not as a library.
- **Diagram vocabulary** as the real visual shorthand: filled circles for objects/states,
  rounded squares for transitions, curved grey arrows for morphisms, dashed lines for
  correspondences between levels of a hierarchy, translucent tinted rectangles for scope.
- **The GATAS lockup** (`assets/brand/gatas-lockup.png`): the UF wordmark in navy, a thin orange
  vertical rule, then the lab's name rendered as mathematics — a commutative square
  G → A → S with a doubled arrow labelled τ through the middle. Node fills are the theme accents
  at full strength (blue `#6C9AC3`, green `#80BE63`, orange `#E28F41`), arrows grey, labels in the
  core serif. This is the identity: the brand mark *is* a diagram. Use it whole, at the size the
  title slide uses (732x273), and never recolour or crop it.
- **The GATAS mark** (`assets/brand/gatas-mark.png`): the square on its own, transparent
  background, for use without the UF wordmark. A navy-ground variant
  (`gatas-mark-onnavy.png`) lightens the arrows and the τ to `#E2E7EC` so they hold on dark;
  the node letters stay dark because they sit on the accent discs. The thumbnail uses the navy
  variant.
- **One illustrated mark**: the Decapodes shrimp on a blue disc with Ω and ★d★ badges
  (`assets/brand/decapodes-mark.png`; the PowerPoint-exported `.svg` is kept alongside but does not decode in browsers). It is a project mark, used once,
  large, unframed.
- **The UF banner strip** carries the only institutional identity, as artwork
  (`assets/brand/uf-banner.jpg`).

The project thumbnail uses the standalone GATAS mark on navy. No mark has been drawn or reconstructed — the lockup and
the Decapodes mark were both supplied.

## Math

Any page using `components/math/` must load KaTeX before the bundle:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
```

Without it the raw TeX shows, which is a legible fallback rather than a broken slide. KaTeX's
Computer Modern is the same face as the source decks' pasted plates, so live math and any remaining
imported figure sit together without a visible seam. Keep the paper's numbering and macros; the
audience cross-references the paper.

## Fonts

The source embeds both faces as MicroType-Express-compressed `.fntdata` (EOT), which no browser
can use. Both are now the real thing.

| Source face | Used for | What loads | Where from |
| --- | --- | --- | --- |
| **XITS** (regular, bold, italic, bold-italic) | titles, body, captions, slide numbers | **the real XITS** | self-hosted, `assets/fonts/XITS-*.otf` |
| **XITS Math** (regular, bold) | notation set as live text (`--font-math`) | **the real XITS Math** | self-hosted, `assets/fonts/XITSMath-*.otf` |
| **JuliaMono** (4 weights) | pipeline labels, code | **the real JuliaMono** | self-hosted, `assets/fonts/JuliaMono-*.woff2` |

Nothing is loaded from a CDN and nothing is substituted. Both families are under the SIL Open
Font License 1.1; `assets/fonts/OFL.txt`, `FONTLOG.txt` (XITS) and `JuliaMono-LICENSE.txt` ship
alongside the binaries, as the license requires. STIX Two Text remains only as a last-resort
fallback in the `--font-core` stack. JuliaMono ships in the five faces this system uses
(regular, medium, bold, and regular/bold italic); the upstream Light, SemiBold, ExtraBold, Black
and Latin-subset files were left out.

## Components

Slide primitives, grouped by concern. Every one has a counterpart in the source deck.

**`components/frame/`** — the slide chrome
- **SlideFrame** — the 1536x864 white canvas with title and slide-number slots
- **SlideTitle** — top-left title, XITS regular, navy, 45° drop shadow
- **SlideNumber** — bottom-right `#888B97` numeral
- **TitleBanner** — full-bleed UF banner strip
- **TitleBlock** — navy headline, meeting / place / date lines, author list and lockup slot

**`components/math/`** — mathematics, typeset not screenshotted
- **MathBlock** / **Math** — display and inline LaTeX via KaTeX
- **TheoremBlock** — a numbered amsthm environment (Definition, Theorem, Lemma, Assumption …)
- **AlgorithmBlock** — `algorithm2e`-style pseudocode: ruled head and body, bold keywords, indent bars

**`components/content/`** — what goes on the slide
- **BulletList** — the bulleted body, `●` / `○` / `■` by level
- **HighlightRegion** — 28%-tinted rounded region with an optional bottom-centre label
- **OutlinedRegion** — 7px accent-stroked frame with a top-centre label, drawn around a figure
- **StepBox** — numbered pipeline stage: mono label above a tinted panel
- **FigurePlate** — a research figure with an optional Arial caption above it
- **Caption** — the one-line bottom-of-slide takeaway
- **LeadStatement** — the large framing question set beside the figures
- **FlowArrow** — labelled block arrow between stages
- **Credit** — the "Figure Credit: …" line under a borrowed figure
- **Marker** — a bare numeral placed over a figure, keying it to the prose
- **PhotoWall** — gapless collaborator photo grid

**Intentional additions.** The `components/math/` family has no counterpart in the decks, because
PowerPoint gave the author no way to typeset LaTeX — it replaces a workaround, not a design choice,
and reproduces exactly what the pasted plates show. `LeadStatement` and `FlowArrow` are named
abstractions of shapes the source draws by hand (a 32pt body placeholder used as a question; a `rightArrow` preset filled
with accent4). `PhotoWall` generalises one hand-placed group of six photographs. No Button,
Input, Tabs, Toast or other product primitive has been invented — the source defines none.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | the one stylesheet consumers link; `@import` list only |
| `tokens/fonts.css` | `@font-face` rules for XITS, XITS Math and JuliaMono |
| `tokens/colors.css` | theme palette, tints, Julia series colours, semantic aliases |
| `tokens/typography.css` | families and the slide-scale size ladder |
| `tokens/spacing.css` | canvas, gutters, step scale |
| `tokens/effects.css` | radii, strokes, the single title shadow, motion |
| `components/frame/` | SlideFrame, SlideTitle, SlideNumber, TitleBanner, TitleBlock (+ card) |
| `components/math/` | MathBlock, Math, TheoremBlock, AlgorithmBlock (+ card) |
| `components/content/` | HighlightRegion, StepBox, FigurePlate, Caption, LeadStatement, FlowArrow, PhotoWall (+ card) |
| `slides/` | twelve sample slides across both decks; `index.html` is the full deck |
| `slides/README.md` | slide-to-source mapping and which figures are stand-ins |
| `guidelines/` | specimen cards: Colors, Type, Spacing, Brand |
| `assets/brand/` | UF banner strip, GATAS lockup + standalone mark, Decapodes mark |
| `assets/figures/` | Julia plots, Petri/graph/sheaf diagrams, LaTeX definition/theorem/algorithm plates, simulation stills, diffusion GIF, warm-bubble `.mp4` |
| `assets/fonts/` | XITS, XITS Math and JuliaMono binaries, with their OFL licenses |
| `assets/photos/` | six collaborator photographs from the closing slide |
| `_extract/` | raw XML, media and text pulled out of deck 1 |
| `_extract2/` | the same for deck 2 |
| `templates/research-talk/` | the seven-slide deck as a reusable template consuming projects can start from |
| `SKILL.md` | Agent Skills wrapper so this folder works in Claude Code |

## Known gaps

- Several source graphics exist only as compressed EMF (the equation art on slide 2, the Petri-net pipeline art on slide 4, the hierarchy
  diagram on slide 5). EMF cannot be rasterised here, so sample slides substitute other figures
  from the same deck and say so in `slides/README.md`.
- The 2025 NCAA Men's Basketball championship poster from the title slide's top-right corner is
  in `assets/brand/final-four-2025.png` but is not used by any sample slide — it is a personal
  flourish, not brand furniture. Add it back if you want it.
- No product UI exists in either source, so there is no UI kit.
- The equation art still pasted as images in deck 1 (slide 2's Laplacian and diffusion formulas)
  has no recovered source, so those remain figures. Send the `.tex` and they become live math too.
- Deck 2's diagram art is even more EMF-heavy than deck 1's (28 of its 44 media items). The
  slides that were pure EMF — the sheaf dictionary (5), the Laplacian comparison series
  (7, 11, 13), the LTI construction (19) — are documented but not rebuilt. Exporting those
  graphics as PNG or SVG from PowerPoint would let all of them be added.
- Deck 2 also embeds Cambria Math, Tahoma and Wingdings alongside XITS. Cambria Math appears in
  OMML equations, Tahoma in one imported graphic, and Wingdings only for the "→" in the title
  "Autonomy → Sheaf Dictionary". None are part of the system; write arrows as real characters in
  `--font-math` instead.
