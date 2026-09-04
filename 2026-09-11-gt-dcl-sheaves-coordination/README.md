# Sheaves for Coordination Problems in Distributed Autonomous Systems

**Decision and Control Laboratory seminar, Georgia Institute of Technology**
**Friday 11 September 2026** · hosted by Matthew Hale

Announced on the [DCL seminars page](https://dcl.gatech.edu/seminars/). That listing
carries speaker, title and date only — no time, room or abstract — so the time and
location below are still to be filled in, and the abstract here is a draft written
from the deck rather than the one submitted to the organizers. Replace it with the
submitted text if one exists.

| | |
| --- | --- |
| Speaker | James Fairbanks, Mechanical & Aerospace Engineering, University of Florida |
| Host | Matthew Hale |
| Date | 11 September 2026 |
| Time | *to be confirmed* |
| Location | *to be confirmed* |
| Slides | [`index.html`](index.html) — 39 slides, roughly 35 minutes |

## Abstract *(draft)*

Multi-agent coordination is usually posed on a graph, which quietly assumes that
neighbouring agents share a state space and can compare measurements directly. Real
fleets do not: a quadcopter, a surface vessel and a submarine share a mission but not
a coordinate system, and often observe only a projection of one another. This talk
replaces the graph with a cellular sheaf, which records not just who talks to whom but
what they are able to compare, and shows what that buys.

Coordination then becomes the search for a global section, computed as the harmonic
extension of a sheaf Laplacian rather than produced by a purpose-built controller.
Choosing an edge potential chooses the coordination behaviour — consensus, formation,
displacement, distance — from one construction. A decentralized feedback law built
from local sheaf disagreement converges semi-globally exponentially, the question of
which agents can track which targets turns out to be cohomological, and the diffusion
that solves the problem keeps converging when agents run on their own clocks with
delays of up to two hundred steps.

The same compositional machinery generates the simulators underneath: a graphical
language for physical theories that compiles to solvers verified against standard
benchmarks, and a nested specification language in which a four-level fleet is written
down rather than hard-coded. Throughout, structure is written as data and the analysis
is a functor out of it. Results are demonstrated on thirteen agents tracking four
submerged targets, and on hardware at the Georgia Tech Robotarium.

## Relationship to the other deck in this repository

This is a 39-slide cut for a control audience, built from the same body of work as
`2026-fall-compositional-methods/`. Part Three, on sheaves and coordination, is the
centre of gravity here; the Decapodes and optimization material is compressed into an
opening that establishes the method rather than argued at length.

## Presenting

Open `index.html` in a browser, or serve this directory. Arrow keys navigate,
<kbd>Esc</kbd> shows the overview, <kbd>S</kbd> opens speaker view. The deck is
self-contained — reveal.js, KaTeX and the fonts are vendored — and every asset not
referenced by these 39 slides has been pruned, so nothing here depends on the network
except two citation footers, which link out to the CellularSheaves.jl documentation.
