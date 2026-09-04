/* @ds-bundle: {"format":4,"namespace":"FairbanksResearchTalkDesignSystem_719334","components":[{"name":"BulletList","sourcePath":"components/content/BulletList.jsx"},{"name":"Caption","sourcePath":"components/content/Caption.jsx"},{"name":"LeadStatement","sourcePath":"components/content/Caption.jsx"},{"name":"Credit","sourcePath":"components/content/Credit.jsx"},{"name":"Marker","sourcePath":"components/content/Credit.jsx"},{"name":"FigurePlate","sourcePath":"components/content/FigurePlate.jsx"},{"name":"FlowArrow","sourcePath":"components/content/FlowArrow.jsx"},{"name":"HighlightRegion","sourcePath":"components/content/HighlightRegion.jsx"},{"name":"OutlinedRegion","sourcePath":"components/content/OutlinedRegion.jsx"},{"name":"PhotoWall","sourcePath":"components/content/PhotoWall.jsx"},{"name":"StepBox","sourcePath":"components/content/StepBox.jsx"},{"name":"TitleBanner","sourcePath":"components/frame/TitleBanner.jsx"},{"name":"TitleBlock","sourcePath":"components/frame/TitleBanner.jsx"},{"name":"SlideFrame","sourcePath":"components/frame/SlideFrame.jsx"},{"name":"SlideTitle","sourcePath":"components/frame/SlideFrame.jsx"},{"name":"SlideNumber","sourcePath":"components/frame/SlideFrame.jsx"},{"name":"MathBlock","sourcePath":"components/math/MathBlock.jsx"},{"name":"Math","sourcePath":"components/math/MathBlock.jsx"},{"name":"TheoremBlock","sourcePath":"components/math/TheoremBlock.jsx"},{"name":"AlgorithmBlock","sourcePath":"components/math/TheoremBlock.jsx"},{"name":"AlgorithmSlide","sourcePath":"slides/AlgorithmSlide.jsx"},{"name":"DefinitionSlide","sourcePath":"slides/DefinitionSlide.jsx"},{"name":"DiffusionSlide","sourcePath":"slides/DiffusionSlide.jsx"},{"name":"FrameworkSlide","sourcePath":"slides/FrameworkSlide.jsx"},{"name":"HierarchySlide","sourcePath":"slides/HierarchySlide.jsx"},{"name":"OutlineSlide","sourcePath":"slides/OutlineSlide.jsx"},{"name":"PhotoWallSlide","sourcePath":"slides/PhotoWallSlide.jsx"},{"name":"PipelineSlide","sourcePath":"slides/PipelineSlide.jsx"},{"name":"QuadFigureSlide","sourcePath":"slides/QuadFigureSlide.jsx"},{"name":"ScenarioSlide","sourcePath":"slides/ScenarioSlide.jsx"},{"name":"TheoremSlide","sourcePath":"slides/TheoremSlide.jsx"},{"name":"TitleSlide","sourcePath":"slides/TitleSlide.jsx"}],"sourceHashes":{"components/content/BulletList.jsx":"422f75fd6f5b","components/content/Caption.jsx":"fe3c9b42e1c2","components/content/Credit.jsx":"54df11fb9a83","components/content/FigurePlate.jsx":"a145fe2a39a4","components/content/FlowArrow.jsx":"c748b559045f","components/content/HighlightRegion.jsx":"5b2b4d83fb0c","components/content/OutlinedRegion.jsx":"7685bd9c23a8","components/content/PhotoWall.jsx":"071bb84a14a0","components/content/StepBox.jsx":"aa90be534340","components/frame/SlideFrame.jsx":"a20902bfbe66","components/frame/TitleBanner.jsx":"c119a8b92c4b","components/math/MathBlock.jsx":"6545c460ac0d","components/math/TheoremBlock.jsx":"9e7cce6ea7fb","slides/AlgorithmSlide.jsx":"f4b893286b8b","slides/DefinitionSlide.jsx":"5b2ee93bc4bd","slides/DiffusionSlide.jsx":"92398a741d78","slides/FrameworkSlide.jsx":"8246c1f1b08f","slides/HierarchySlide.jsx":"1e1981c613f8","slides/OutlineSlide.jsx":"abd29697b1e0","slides/PhotoWallSlide.jsx":"d8cf7f5762a6","slides/PipelineSlide.jsx":"7753afb17066","slides/QuadFigureSlide.jsx":"9c81603a2768","slides/ScenarioSlide.jsx":"003fcde63bc2","slides/TheoremSlide.jsx":"9d1eabe00a2b","slides/TitleSlide.jsx":"70330f587077"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FairbanksResearchTalkDesignSystem_719334 = window.FairbanksResearchTalkDesignSystem_719334 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/BulletList.jsx
try { (() => {
const MARKS = ['\u25CF', '\u25CB', '\u25A0', '\u25CF'];
const SIZES = ['var(--size-body)', 'var(--size-body-sub)', 'var(--size-body-sub)', 'var(--size-body-sub)'];

/* The deck's bulleted body. Items are strings, or { text, level } to nest.
   Marks follow the master: filled disc, hollow disc, filled square. */
function BulletList({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-core)',
      color: 'var(--text-body)',
      textWrap: 'pretty',
      ...style
    }
  }, items.map((it, i) => {
    const isNode = React.isValidElement(it);
    const text = typeof it === 'string' || isNode ? it : it.text;
    const level = typeof it === 'string' || isNode ? 0 : it.level || 0;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 'var(--space-4)',
        marginLeft: level * 48,
        flexShrink: 0,
        alignItems: 'flex-start',
        fontSize: SIZES[Math.min(level, 3)],
        lineHeight: 'var(--leading-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flex: 'none',
        fontSize: '0.62em',
        position: 'relative',
        top: '0.25em'
      }
    }, MARKS[Math.min(level, 3)]), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, text));
  }));
}
Object.assign(__ds_scope, { BulletList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/BulletList.jsx", error: String((e && e.message) || e) }); }

// components/content/Caption.jsx
try { (() => {
/* The one-line takeaway that runs along the bottom of a content slide. */
function Caption({
  children,
  align = 'left',
  tone = 'quiet',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--gutter-x)',
      right: 'var(--gutter-x)',
      bottom: 'var(--caption-bottom)',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: tone === 'quiet' ? 'var(--text-body-quiet)' : 'var(--text-body)',
      textAlign: align,
      textWrap: 'pretty',
      ...style
    }
  }, children);
}

/* A large question or claim set beside the figures, used to frame the slide. */
function LeadStatement({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)',
      textWrap: 'pretty',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Caption, LeadStatement });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Caption.jsx", error: String((e && e.message) || e) }); }

// components/content/Credit.jsx
try { (() => {
/* Attribution for a borrowed figure. Sits directly under the figure it credits,
   at body-adjacent size, in the same navy as everything else. */
function Credit({
  children,
  align = 'left',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-body-sub)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)',
      textAlign: align,
      ...style
    }
  }, children);
}

/* A numbered or lettered marker placed over a figure to key it to the prose. */
function Marker({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 30,
      height: 32,
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-label)',
      color: 'var(--text-title)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Credit, Marker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Credit.jsx", error: String((e && e.message) || e) }); }

// components/content/FigurePlate.jsx
try { (() => {
/* A figure with an optional caption. Captions above the figure use the deck's
   Arial caption face; the panel letter (A, B, E ...) is part of the source
   artwork, so pass it only when you need to label a hand-composed figure. */
function FigurePlate({
  src,
  alt = '',
  caption,
  captionPlacement = 'top',
  panel,
  fit = 'contain',
  style,
  imgStyle
}) {
  const cap = caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-caption)',
      fontSize: 'var(--size-figure-label)',
      color: 'var(--text-title)',
      lineHeight: 'var(--leading-body)',
      textWrap: 'pretty'
    }
  }, caption) : null;
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      position: 'relative',
      minHeight: 0,
      ...style
    }
  }, captionPlacement === 'top' ? cap : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      minHeight: 0
    }
  }, panel ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 'var(--space-2)',
      top: 0,
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-figure-label)',
      color: 'var(--text-title)'
    }
  }, panel) : null, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block',
      ...imgStyle
    }
  })), captionPlacement === 'bottom' ? cap : null);
}
Object.assign(__ds_scope, { FigurePlate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FigurePlate.jsx", error: String((e && e.message) || e) }); }

// components/content/FlowArrow.jsx
try { (() => {
/* The block arrow that carries a pipeline from one stage to the next. */
function FlowArrow({
  label,
  tint = 'green',
  direction = 'right',
  style
}) {
  const fill = {
    orange: 'var(--tint-orange)',
    green: 'var(--tint-green)',
    blue: 'var(--tint-blue)'
  }[tint] || tint;
  const clip = direction === 'right' ? 'polygon(0 25%, 60% 25%, 60% 0, 100% 50%, 60% 100%, 60% 75%, 0 75%)' : 'polygon(100% 25%, 40% 25%, 40% 0, 0 50%, 40% 100%, 40% 75%, 100% 75%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: fill,
      clipPath: clip
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-label)',
      color: 'var(--text-title)'
    }
  }, label));
}
Object.assign(__ds_scope, { FlowArrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FlowArrow.jsx", error: String((e && e.message) || e) }); }

// components/content/HighlightRegion.jsx
try { (() => {
const TINTS = {
  orange: 'var(--tint-orange)',
  green: 'var(--tint-green)',
  blue: 'var(--tint-blue)',
  tan: 'var(--tint-tan)'
};

/* A tinted rounded rectangle drawn behind or around part of a diagram, with an
   optional bottom-anchored centred label. accent @ 28% alpha, no stroke. */
function HighlightRegion({
  tint = 'blue',
  label,
  labelSize,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      boxSizing: 'border-box',
      height: '100%',
      background: TINTS[tint] || tint,
      borderRadius: 'var(--radius-region)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 'var(--space-4)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      minWidth: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, children), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      fontFamily: 'var(--font-core)',
      fontSize: labelSize || 'var(--size-label)',
      color: 'var(--text-title)',
      textAlign: 'center',
      lineHeight: 'var(--leading-tight)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { HighlightRegion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/HighlightRegion.jsx", error: String((e && e.message) || e) }); }

// components/content/OutlinedRegion.jsx
try { (() => {
const STROKES = {
  blue: 'var(--clr-accent6)',
  orange: 'var(--clr-accent1)',
  green: 'var(--clr-accent4)',
  tan: 'var(--clr-accent2)'
};

/* A rounded rectangle drawn AROUND part of a figure: 7px accent stroke, no
   fill, label centred along the top inside the frame. Use this to name a
   region of an existing figure; use HighlightRegion to tint one. */
function OutlinedRegion({
  stroke = 'blue',
  label,
  labelSize,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      boxSizing: 'border-box',
      height: '100%',
      border: `var(--stroke-figure-w) solid ${STROKES[stroke] || stroke}`,
      borderRadius: 'var(--radius-region)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: 'var(--space-3)',
      overflow: 'hidden',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      maxWidth: '100%',
      fontFamily: 'var(--font-core)',
      fontSize: labelSize || 'var(--size-label)',
      color: 'var(--text-title)',
      textAlign: 'center',
      lineHeight: 'var(--leading-tight)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      minWidth: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, children));
}
Object.assign(__ds_scope, { OutlinedRegion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/OutlinedRegion.jsx", error: String((e && e.message) || e) }); }

// components/content/PhotoWall.jsx
try { (() => {
/* The closing slide's collage of collaborator photographs: a dense grid with
   no gaps, no rounding and no shadow, filling the area below the title. */
function PhotoWall({
  photos = [],
  columns = 3,
  gap = 'var(--space-1)',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridAutoRows: 'minmax(0, 1fr)',
      gap,
      width: '100%',
      height: '100%',
      ...style
    }
  }, photos.map((p, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: typeof p === 'string' ? p : p.src,
    alt: typeof p === 'string' ? '' : p.alt || '',
    style: {
      width: '100%',
      height: '100%',
      minHeight: 0,
      minWidth: 0,
      objectFit: 'cover',
      display: 'block',
      gridColumn: p.span ? `span ${p.span}` : undefined,
      gridRow: p.rowSpan ? `span ${p.rowSpan}` : undefined
    }
  })));
}
Object.assign(__ds_scope, { PhotoWall });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PhotoWall.jsx", error: String((e && e.message) || e) }); }

// components/content/StepBox.jsx
try { (() => {
const FILLS = {
  orange: 'var(--tint-orange)',
  green: 'var(--tint-green)',
  blue: 'var(--tint-blue)',
  tan: 'var(--tint-tan)'
};

/* A numbered stage in a pipeline diagram: monospace label over a tinted
   rounded panel holding the artwork for that stage. */
function StepBox({
  index,
  label,
  tint = 'blue',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      minHeight: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--size-step)',
      color: 'var(--text-title)',
      lineHeight: 'var(--leading-tight)'
    }
  }, index != null ? index + ') ' : '', label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'hidden',
      background: FILLS[tint] || tint,
      borderRadius: 'var(--radius-region)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
      boxSizing: 'border-box'
    }
  }, children));
}
Object.assign(__ds_scope, { StepBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StepBox.jsx", error: String((e && e.message) || e) }); }

// components/frame/TitleBanner.jsx
try { (() => {
/* The UF banner strip that runs full-bleed across the top of the title slide. */
function TitleBanner({
  src = 'assets/brand/uf-banner.jpg',
  height = 'var(--banner-h)',
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "University of Florida",
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height,
      objectFit: 'cover',
      objectPosition: 'left center',
      display: 'block',
      ...style
    }
  });
}

/* Title, date and author list, set in navy on the white ground directly under
   the banner. The source marks these runs schemeClr="bg2", which the master's
   clrMap sends to dk2 — navy, not cream. */
function TitleBlock({
  headline,
  lines = [],
  authors = [],
  mark,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-8)',
      top: 'calc(var(--banner-h) + 1px)',
      right: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-core)',
      color: 'var(--text-title)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-title-slide)',
      lineHeight: 'var(--leading-tight)'
    }
  }, headline), lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 'calc(var(--size-body) + 12px)',
      lineHeight: 'var(--leading-body)'
    }
  }, l)), authors.length || mark ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-7)'
    }
  }, authors.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, authors.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 'calc(var(--size-body) + 12px)',
      lineHeight: 'var(--leading-body)'
    }
  }, a))) : null, mark) : null);
}
Object.assign(__ds_scope, { TitleBanner, TitleBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/frame/TitleBanner.jsx", error: String((e && e.message) || e) }); }

// components/frame/SlideFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The deck's ground: a white 1536x864 canvas with the title placeholder pinned
   to the top-left and the slide number at the bottom-right. */
function SlideFrame({
  children,
  title,
  titleSize,
  number,
  banner,
  style,
  ...rest
}) {
  const wrap = {
    position: 'relative',
    width: 'var(--slide-w)',
    height: 'var(--slide-h)',
    background: 'var(--surface-slide)',
    color: 'var(--text-body)',
    fontFamily: 'var(--font-core)',
    overflow: 'hidden',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: wrap
  }, rest), banner, title ? /*#__PURE__*/React.createElement(SlideTitle, {
    size: titleSize
  }, title) : null, children, number != null ? /*#__PURE__*/React.createElement(SlideNumber, null, number) : null);
}
function SlideTitle({
  children,
  size,
  align = 'left',
  style
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      position: 'absolute',
      left: 'var(--gutter-x)',
      top: 'var(--title-top)',
      width: 'calc(100% - var(--gutter-x) * 2)',
      height: 'var(--title-h)',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--weight-regular)',
      fontSize: size || 'var(--size-title)',
      lineHeight: 'var(--leading-tight)',
      color: 'var(--text-title)',
      textShadow: 'var(--shadow-title)',
      textWrap: 'pretty',
      ...style
    }
  }, children);
}
function SlideNumber({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 'var(--gutter-x)',
      bottom: 'var(--space-3)',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-meta)',
      color: 'var(--text-meta)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TitleBanner: __ds_scope.TitleBanner, TitleBlock: __ds_scope.TitleBlock, SlideFrame, SlideTitle, SlideNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/frame/SlideFrame.jsx", error: String((e && e.message) || e) }); }

// components/math/MathBlock.jsx
try { (() => {
/* Live LaTeX. The source decks paste equations, definitions and pseudocode in as
   images because PowerPoint cannot typeset them; in HTML we render from the
   paper's own source instead, so it stays selectable, searchable and editable.
   Requires KaTeX on the page:
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
     <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
   Without it the raw TeX shows, which is a legible fallback. */
function MathBlock({
  tex,
  display = true,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.katex) return;
    try {
      window.katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        output: 'html'
      });
    } catch (e) {
      ref.current.textContent = tex;
    }
  }, [tex, display]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      fontSize: display ? 'var(--size-math)' : 'inherit',
      color: 'var(--text-body)',
      textAlign: display ? 'center' : 'inherit',
      ...style
    }
  }, tex);
}

/* Inline math inside a sentence. */
function Math({
  tex,
  style
}) {
  return /*#__PURE__*/React.createElement(MathBlock, {
    tex: tex,
    display: false,
    style: {
      display: 'inline',
      textAlign: 'inherit',
      ...style
    }
  });
}
Object.assign(__ds_scope, { MathBlock, Math });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/MathBlock.jsx", error: String((e && e.message) || e) }); }

// components/math/TheoremBlock.jsx
try { (() => {
/* A numbered LaTeX environment: Definition, Theorem, Lemma, Proposition,
   Corollary, Assumption. Head is bold roman, the number keeps the paper's own
   numbering, an optional name goes in parentheses, and the body is italic for
   theorem-like environments and roman for definitions — amsthm's convention,
   which is what the source plates show. */
function TheoremBlock({
  kind = 'Definition',
  number,
  name,
  children,
  italic,
  style
}) {
  const isTheoremLike = !['Definition', 'Example', 'Remark', 'Assumption'].includes(kind);
  const em = italic == null ? isTheoremLike : italic;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)',
      fontStyle: em ? 'italic' : 'normal',
      textWrap: 'pretty',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'normal',
      fontWeight: 'var(--weight-bold)'
    }
  }, kind, number != null ? ' ' + number : ''), name ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'normal',
      fontWeight: 'var(--weight-bold)'
    }
  }, " (", name, ")") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'normal',
      fontWeight: 'var(--weight-bold)'
    }
  }, "."), ' ', children);
}

/* algorithm2e-style pseudocode: ruled head, ruled body, bold keywords, and a
   vertical bar per nesting level. Lines are { text, level, kw } or plain
   strings; tex renders that line as math instead. */
function AlgorithmBlock({
  number,
  title,
  inputs = [],
  output,
  lines = [],
  style
}) {
  const rule = {
    borderTop: '2px solid var(--text-body)'
  };
  const Line = ({
    item,
    i
  }) => {
    const text = typeof item === 'string' ? item : item.text;
    const level = typeof item === 'string' ? 0 : item.level || 0;
    const tex = typeof item === 'string' ? null : item.tex;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'baseline'
      }
    }, Array.from({
      length: level
    }).map((_, k) => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        flex: 'none',
        width: 20,
        alignSelf: 'stretch',
        borderLeft: '1px solid var(--text-body)'
      }
    })), tex ? /*#__PURE__*/React.createElement(__ds_scope.Math, {
      tex: tex
    }) : /*#__PURE__*/React.createElement("span", null, text));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--size-body-sub)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)',
      ...rule,
      borderBottom: '2px solid var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-bold)',
      padding: 'var(--space-2) 0'
    }
  }, "Algorithm", number != null ? ' ' + number : '', ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-regular)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rule,
      paddingTop: 'var(--space-2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }
  }, inputs.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: 'in' + i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-bold)'
    }
  }, "Input:"), ' ', /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: t
  }))), output ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-bold)'
    }
  }, "Output:"), ' ', /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: output
  })) : null, lines.map((item, i) => /*#__PURE__*/React.createElement(Line, {
    key: i,
    item: item,
    i: i
  }))));
}
Object.assign(__ds_scope, { TheoremBlock, AlgorithmBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/TheoremBlock.jsx", error: String((e && e.message) || e) }); }

// slides/AlgorithmSlide.jsx
try { (() => {
/* ACC deck slide 17, with Algorithm 1 regenerated from its algorithm2e source
   rather than pasted in as an image. */
function AlgorithmSlide({
  number = 17
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "ADMM for Homological Programs",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.AlgorithmBlock, {
    number: 1,
    title: "Distributed Solve",
    style: {
      position: 'absolute',
      left: 32,
      top: 110,
      width: 816,
      fontSize: '21px'
    },
    inputs: ['\\text{Sheaf } \\mathcal F, \\text{ objective functions } f_i, \\text{ potential functions } U_e, \\text{ and initial state } (\\mathbf z^0, \\mathbf y^0)', '\\text{Step size } \\rho, \\text{ diffusivity } \\alpha, \\text{ tolerances } \\epsilon_1, \\epsilon_2, \\text{ and } K \\in \\mathbb N'],
    output: '\\mathbf z^*, \\mathbf y^*',
    lines: [{
      tex: '\\mathbf z \\leftarrow \\mathbf z^0;'
    }, {
      tex: '\\mathbf y \\leftarrow \\mathbf y^0;'
    }, {
      tex: '\\textbf{while } j \\leqslant K \\textbf{ do}'
    }, {
      tex: '\\textbf{for } i \\leftarrow 1 \\textbf{ to } N \\textbf{ do}',
      level: 1
    }, {
      tex: 'x_i \\leftarrow \\arg\\min_{x_i} f_i(x_i) + (\\rho/2)\\lVert x_i - z_i + y_i \\rVert_2^2;',
      level: 2
    }, {
      tex: '\\mathbf x \\leftarrow \\mathrm{vec}(\\{x_i\\}_{i \\in [N]});',
      level: 1
    }, {
      tex: '\\mathbf z \\leftarrow \\mathrm{sheafDiffusion}(\\mathcal F, U, \\alpha, \\epsilon_2, \\mathbf x + \\mathbf y);',
      level: 1
    }, {
      tex: '\\textbf{if } \\mathbf x - \\mathbf z < \\epsilon_1 \\textbf{ then break};',
      level: 1
    }, {
      tex: '\\textbf{for } i \\leftarrow 1 \\textbf{ to } N \\textbf{ do } y_i \\leftarrow y_i + x_i - z_i;',
      level: 1
    }, {
      tex: '\\textbf{return } \\mathbf z, \\mathbf y'
    }]
  }), /*#__PURE__*/React.createElement(__ds_scope.BulletList, {
    style: {
      position: 'absolute',
      left: 856,
      top: 110,
      width: 644
    },
    items: ['Distributed algorithms for homological programs such as ADMM or Newton\u2019s method', 'Homological programs fit naturally into our framework.', 'Want to use sheaf (co)homology to say interesting things about the topologies of composite problems']
  }));
}
Object.assign(__ds_scope, { AlgorithmSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/AlgorithmSlide.jsx", error: String((e && e.message) || e) }); }

// slides/DefinitionSlide.jsx
try { (() => {
/* ACC deck slide 6. The source pastes Definition 1 in as a LaTeX screenshot;
   here it is typeset live from the paper's source, so the notation stays real
   text. Everything else follows the source: bullets left, two stroked regions
   naming parts of a keyed figure, credit for the borrowed artwork. */
/* Marker positions are percentages of the cropped 0-cochain panel, so they
   travel with the image instead of being pinned to slide coordinates. */
const NODES = [[1, 41, 18], [2, 70, 33], [3, 18, 59], [4, 50, 79], [5, 79, 83]];
function DefinitionSlide({
  assets = '../assets',
  number = 6
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Graphs are the constant 1D Cellular Sheaves",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.BulletList, {
    style: {
      position: 'absolute',
      left: 48,
      top: 110,
      width: 896
    },
    items: ['Each vertex has a scalar value', 'Each edge has a scalar value', /*#__PURE__*/React.createElement(React.Fragment, null, "Restriction maps are ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
      tex: "I_1 = [1]"
    })), /*#__PURE__*/React.createElement(React.Fragment, null, "Exterior derivative ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
      tex: "\\delta"
    }), " is the incidence matrix"), 'Global sections are constant vectors']
  }), /*#__PURE__*/React.createElement(__ds_scope.TheoremBlock, {
    kind: "Definition",
    number: 1,
    name: "Cellular Sheaf",
    style: {
      position: 'absolute',
      left: 48,
      top: 470,
      width: 880
    }
  }, "Given ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "G=(V,E)"
  }), ", a cellular sheaf ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathcal F"
  }), " valued in Euclidean spaces assigns a stalk ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathcal F(i)"
  }), " to every node ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "i \\in V"
  }), ", an edge stalk ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathcal F(ij)"
  }), " to every edge ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "ij \\in E"
  }), ", and a restriction map ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathcal F_{i \\trianglelefteq ij} : \\mathcal F(i) \\to \\mathcal F(ij)"
  }), "for every incident pair."), /*#__PURE__*/React.createElement(__ds_scope.OutlinedRegion, {
    stroke: "blue",
    label: "0-Cochains (0-Forms)",
    style: {
      position: 'absolute',
      left: 1000,
      top: 108,
      width: 500,
      height: 284
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      aspectRatio: '704 / 365'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/cochain-0forms.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block'
    }
  }), NODES.map(([n, x, y]) => /*#__PURE__*/React.createElement(__ds_scope.Marker, {
    key: n,
    style: {
      left: x + '%',
      top: y + '%',
      transform: 'translate(-50%,-50%)'
    }
  }, n)))), /*#__PURE__*/React.createElement(__ds_scope.OutlinedRegion, {
    stroke: "blue",
    label: "1-Cochains (1-Forms)",
    style: {
      position: 'absolute',
      left: 991,
      top: 471,
      width: 500,
      height: 312
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/cochain-1forms.png',
    alt: "",
    style: {
      height: '100%',
      objectFit: 'contain',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.Credit, {
    style: {
      position: 'absolute',
      left: 971,
      top: 797,
      width: 541
    }
  }, "Figure Credit: Keenan Crane Discrete Differential Geometry"));
}
Object.assign(__ds_scope, { DefinitionSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/DefinitionSlide.jsx", error: String((e && e.message) || e) }); }

// slides/DiffusionSlide.jsx
try { (() => {
/* Slide 2: two named mechanisms across the top, a simulation still on the
   right, one takeaway line along the bottom. */
function DiffusionSlide({
  assets = '../assets',
  number = 2
}) {
  const term = {
    fontFamily: 'var(--font-core)',
    fontSize: 'var(--size-body)',
    color: 'var(--text-body)'
  };
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Mathematical Modeling of Complex Systems",
    number: number
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 48,
      top: 110,
      display: 'flex',
      gap: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: term
  }, "Laplacian"), /*#__PURE__*/React.createElement("div", {
    style: term
  }, "Local Diffusion")), /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/network-diffusion.gif',
    style: {
      position: 'absolute',
      left: 850,
      top: 250,
      width: 534,
      height: 350
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/julia-lines-3.png',
    style: {
      position: 'absolute',
      left: 180,
      top: 250,
      width: 534,
      height: 350
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Caption, null, "Information diffuses across networks like heat in a material"));
}
Object.assign(__ds_scope, { DiffusionSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/DiffusionSlide.jsx", error: String((e && e.message) || e) }); }

// slides/FrameworkSlide.jsx
try { (() => {
/* Slide 3: a long title stepped down to 53px, a wide results figure on the
   left and the project mark bottom-right. */
function FrameworkSlide({
  assets = '../assets',
  number = 3
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "DECAPODES: A Framework for Directly Computable Physics",
    titleSize: "var(--size-title-long)",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/decapodes-multiphysics.png',
    style: {
      position: 'absolute',
      left: 74,
      top: 100,
      width: 819,
      height: 737
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: assets + '/brand/decapodes-mark.png',
    alt: "Decapodes",
    style: {
      position: 'absolute',
      left: 912,
      top: 175,
      width: 578,
      height: 578
    }
  }));
}
Object.assign(__ds_scope, { FrameworkSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/FrameworkSlide.jsx", error: String((e && e.message) || e) }); }

// slides/HierarchySlide.jsx
try { (() => {
/* Slide 5: the framing question on the right, specification-to-simulation
   band on the left built from tinted regions and one block arrow. */
function HierarchySlide({
  assets = '../assets',
  number = 5
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Hierarchy is a Fundamental Tool for Understanding",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.LeadStatement, {
    style: {
      position: 'absolute',
      left: 872,
      top: 120,
      width: 621
    }
  }, "Can we combine denotational semantics and network science to understand hierarchical structures in complex systems?"), /*#__PURE__*/React.createElement(__ds_scope.HighlightRegion, {
    tint: "blue",
    label: "Specification",
    style: {
      position: 'absolute',
      left: 40,
      top: 152,
      width: 780,
      height: 288
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/graph-hierarchy.png',
    alt: "",
    style: {
      height: '82%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.HighlightRegion, {
    tint: "orange",
    label: "Semantics",
    style: {
      position: 'absolute',
      left: 40,
      top: 470,
      width: 780,
      height: 320
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/cellular-sheaf.png',
    alt: "",
    style: {
      height: '80%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.FlowArrow, {
    label: "Simulation",
    tint: "green",
    style: {
      position: 'absolute',
      left: 852,
      top: 552,
      width: 254,
      height: 128
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/food-web-populations.png',
    style: {
      position: 'absolute',
      left: 1130,
      top: 465,
      width: 380,
      height: 303
    }
  }));
}
Object.assign(__ds_scope, { HierarchySlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/HierarchySlide.jsx", error: String((e && e.message) || e) }); }

// slides/OutlineSlide.jsx
try { (() => {
/* ACC deck slide 2: figure left, three-item outline right. */
function OutlineSlide({
  assets = '../assets',
  number = 2
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Outline",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/multidomain-autonomy.png',
    style: {
      position: 'absolute',
      left: 61,
      top: 132,
      width: 747,
      height: 600
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.BulletList, {
    style: {
      position: 'absolute',
      left: 808,
      top: 110,
      width: 676
    },
    items: ['Using cellular sheaves to encode communication pattern of a multi-agent system', 'Applying ADMM to derive a distributed MPC controller', 'Why apply categorical thinking?']
  }));
}
Object.assign(__ds_scope, { OutlineSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/OutlineSlide.jsx", error: String((e && e.message) || e) }); }

// slides/PhotoWallSlide.jsx
try { (() => {
/* Slide 7: the closing collage. Title, then photographs to the slide edges. */
function PhotoWallSlide({
  assets = '../assets',
  number = 7
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Adventures with Students and Collaborators!",
    number: number
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 7,
      top: 96,
      right: 7,
      bottom: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PhotoWall, {
    columns: 3,
    photos: [{
      src: assets + '/photos/collaborators-1.jpg'
    }, {
      src: assets + '/photos/collaborators-2.jpg'
    }, {
      src: assets + '/photos/collaborators-3.jpg'
    }, {
      src: assets + '/photos/collaborators-4.jpg'
    }, {
      src: assets + '/photos/collaborators-5.jpg'
    }, {
      src: assets + '/photos/collaborators-6.jpg'
    }]
  })));
}
Object.assign(__ds_scope, { PhotoWallSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/PhotoWallSlide.jsx", error: String((e && e.message) || e) }); }

// slides/PipelineSlide.jsx
try { (() => {
/* Slide 4: three numbered stages across the top, one wide result below. */
function PipelineSlide({
  assets = '../assets',
  number = 4
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Automated Model Exploration for Epidemics",
    number: number
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 48,
      top: 110,
      right: 48,
      height: 300,
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridTemplateRows: 'minmax(0, 1fr)',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StepBox, {
    index: 1,
    label: "System specification",
    tint: "green"
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/sir-2city-composition.png',
    alt: "",
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.StepBox, {
    index: 2,
    label: "Model semantics",
    tint: "blue"
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/graph-hierarchy.png',
    alt: "",
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.StepBox, {
    index: 3,
    label: "Simulation/solution",
    tint: "orange"
  }, /*#__PURE__*/React.createElement("img", {
    src: assets + '/figures/julia-lines-3.png',
    alt: "",
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    }
  }))), /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/food-web-populations.png',
    fit: "contain",
    style: {
      position: 'absolute',
      left: 160,
      top: 440,
      width: 1216,
      height: 400
    }
  }));
}
Object.assign(__ds_scope, { PipelineSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/PipelineSlide.jsx", error: String((e && e.message) || e) }); }

// slides/QuadFigureSlide.jsx
try { (() => {
/* Slide 6: four examples of one idea, each an Arial caption above its figure,
   laid out on a 2x2 grid with no frames or rules between them. */
function QuadFigureSlide({
  assets = '../assets',
  number = 6
}) {
  const items = [['The sheaf of continuous functions on a topological space', '/figures/grid-pde-heatmap.jpg'], ['The sheaf of 3-colorings on a graph', '/figures/graph-hierarchy.png'], ['A cellular sheaf of vector spaces over a graph', '/figures/cellular-sheaf.png'], ['The sheaf of solutions to a PDE', '/figures/decapodes-multiphysics.png']];
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "Sheaf theory studies local to global phenomena",
    number: number
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 33,
      top: 104,
      right: 33,
      bottom: 40,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      columnGap: 'var(--space-6)',
      rowGap: 'var(--space-5)'
    }
  }, items.map(([caption, src]) => /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    key: caption,
    caption: caption,
    src: assets + src
  }))));
}
Object.assign(__ds_scope, { QuadFigureSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/QuadFigureSlide.jsx", error: String((e && e.message) || e) }); }

// slides/ScenarioSlide.jsx
try { (() => {
/* ACC deck slides 20-23: one result plot bleeding off the left edge, the
   scenario written out as a labelled spec list on the right. Every scenario
   slide uses the same six labels in the same order. */
function ScenarioSlide({
  assets = '../assets',
  number = 20,
  title = 'Scenario 1: Consensus',
  spec = ['Application: UAVs deploying to fixed initial locations, with alignment', 'Scenario: agents should reach consensus in one coordinate and individual tracking goals in the other', 'Node objectives: tracking in y', 'Topology: fully connected', 'Restriction maps: projection onto x', 'Edge potentials: consensus']
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: title,
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/agent-trajectories-4up.png',
    style: {
      position: 'absolute',
      left: 0,
      top: 81,
      width: 768,
      height: 497
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.BulletList, {
    style: {
      position: 'absolute',
      left: 755,
      top: 110,
      width: 760
    },
    items: spec
  }));
}
Object.assign(__ds_scope, { ScenarioSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/ScenarioSlide.jsx", error: String((e && e.message) || e) }); }

// slides/TheoremSlide.jsx
try { (() => {
/* ACC deck slide 18: the convergence theorem across the top, consequences
   below left, result plot right. Theorem 3 is typeset from source. */
function TheoremSlide({
  assets = '../assets',
  number = 18
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    title: "ADMM for Homological Programs Converges!",
    number: number
  }, /*#__PURE__*/React.createElement(__ds_scope.TheoremBlock, {
    kind: "Theorem",
    number: 3,
    style: {
      position: 'absolute',
      left: 60,
      top: 116,
      width: 1417
    }
  }, "Suppose a homological program ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathsf P"
  }), " satisfies assumptions 1 and 2. Assume also that the Lagrangian of Eq. 8 has a saddle point. Then Algorithm 1 applied to ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathsf P"
  }), " has residual convergence ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathbf x^k - \\mathbf z^k \\to 0"
  }), ", objective convergence ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\textstyle\\sum_i f_i(x_i) + \\chi_{\\mathcal C}(\\mathbf z) \\to p^*"
  }), ", and dual variable convergence ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "\\mathbf y^k \\to \\mathbf y^*"
  }), " as ", /*#__PURE__*/React.createElement(__ds_scope.Math, {
    tex: "k \\to \\infty"
  }), "."), /*#__PURE__*/React.createElement(__ds_scope.BulletList, {
    style: {
      position: 'absolute',
      left: 52,
      top: 409,
      width: 880
    },
    items: ['Assumptions: Objectives and Potentials are convex and smooth enough', 'Next: Use it to solve autonomy problems']
  }), /*#__PURE__*/React.createElement(__ds_scope.FigurePlate, {
    src: assets + '/figures/agent-trajectories-4up.png',
    style: {
      position: 'absolute',
      left: 966,
      top: 386,
      width: 486,
      height: 362
    }
  }));
}
Object.assign(__ds_scope, { TheoremSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/TheoremSlide.jsx", error: String((e && e.message) || e) }); }

// slides/TitleSlide.jsx
try { (() => {
/* Slide 1 of both source decks: banner strip, then title, date and author list
   in navy on white, with the GATAS lockup beside the names. */
function TitleSlide({
  assets = '../assets'
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.SlideFrame, {
    banner: /*#__PURE__*/React.createElement(__ds_scope.TitleBanner, {
      src: assets + '/brand/uf-banner.jpg'
    })
  }, /*#__PURE__*/React.createElement(__ds_scope.TitleBlock, {
    headline: "James Fairbanks: Research Overview",
    lines: ['ASEMFL Annual Meeting', 'Orlando, FL', 'November 2025'],
    mark: /*#__PURE__*/React.createElement("img", {
      src: assets + '/brand/gatas-lockup.png',
      alt: "UF \xB7 GATAS Lab",
      style: {
        width: 560,
        display: 'block'
      }
    })
  }));
}
Object.assign(__ds_scope, { TitleSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/TitleSlide.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BulletList = __ds_scope.BulletList;

__ds_ns.Caption = __ds_scope.Caption;

__ds_ns.LeadStatement = __ds_scope.LeadStatement;

__ds_ns.Credit = __ds_scope.Credit;

__ds_ns.Marker = __ds_scope.Marker;

__ds_ns.FigurePlate = __ds_scope.FigurePlate;

__ds_ns.FlowArrow = __ds_scope.FlowArrow;

__ds_ns.HighlightRegion = __ds_scope.HighlightRegion;

__ds_ns.OutlinedRegion = __ds_scope.OutlinedRegion;

__ds_ns.PhotoWall = __ds_scope.PhotoWall;

__ds_ns.StepBox = __ds_scope.StepBox;

__ds_ns.TitleBanner = __ds_scope.TitleBanner;

__ds_ns.TitleBlock = __ds_scope.TitleBlock;

__ds_ns.SlideFrame = __ds_scope.SlideFrame;

__ds_ns.SlideTitle = __ds_scope.SlideTitle;

__ds_ns.SlideNumber = __ds_scope.SlideNumber;

__ds_ns.MathBlock = __ds_scope.MathBlock;

__ds_ns.Math = __ds_scope.Math;

__ds_ns.TheoremBlock = __ds_scope.TheoremBlock;

__ds_ns.AlgorithmBlock = __ds_scope.AlgorithmBlock;

__ds_ns.AlgorithmSlide = __ds_scope.AlgorithmSlide;

__ds_ns.DefinitionSlide = __ds_scope.DefinitionSlide;

__ds_ns.DiffusionSlide = __ds_scope.DiffusionSlide;

__ds_ns.FrameworkSlide = __ds_scope.FrameworkSlide;

__ds_ns.HierarchySlide = __ds_scope.HierarchySlide;

__ds_ns.OutlineSlide = __ds_scope.OutlineSlide;

__ds_ns.PhotoWallSlide = __ds_scope.PhotoWallSlide;

__ds_ns.PipelineSlide = __ds_scope.PipelineSlide;

__ds_ns.QuadFigureSlide = __ds_scope.QuadFigureSlide;

__ds_ns.ScenarioSlide = __ds_scope.ScenarioSlide;

__ds_ns.TheoremSlide = __ds_scope.TheoremSlide;

__ds_ns.TitleSlide = __ds_scope.TitleSlide;

})();
