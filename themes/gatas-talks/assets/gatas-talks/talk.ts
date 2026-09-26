// Typeset every data-tex element with KaTeX, and play a slide's videos only
// while it is on screen. Built by Hugo's js.Build; katex and Reveal are the
// vendored globals loaded before it.

declare const katex: {
  render(tex: string, el: Element, opts: { displayMode: boolean; throwOnError: boolean; output: string }): void;
};
declare const Reveal: {
  on(event: 'slidechanged', cb: (e: { previousSlide?: Element; currentSlide?: Element }) => void): void;
};

function typeset(): void {
  document.querySelectorAll('.ds-math-block, .katex-inline').forEach((el) => {
    const tex = el.getAttribute('data-tex');
    if (!tex || typeof katex === 'undefined') return;
    try {
      katex.render(tex, el, {
        displayMode: !el.classList.contains('katex-inline'),
        throwOnError: false,
        output: 'html',
      });
    } catch (err) {
      console.error('KaTeX render error:', err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', typeset);
} else {
  typeset();
}

Reveal.on('slidechanged', ({ previousSlide, currentSlide }) => {
  previousSlide?.querySelectorAll('video').forEach((v) => v.pause());
  currentSlide?.querySelectorAll('video').forEach((v) => {
    v.currentTime = v.currentTime || 0;
    v.play().catch(() => {});
  });
});
