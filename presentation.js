/**
 * ACTINVER – Presentation Engine
 * Navegación, animaciones y control de slides
 */

// ── Estado global ──
const state = {
  current: 0,
  total:   0,
  slides:  [],
  isAnimating: false
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  state.slides = document.querySelectorAll('.slide');
  state.total  = state.slides.length;

  buildTOC();
  updateNav();
  activateSlide(0, 'none');
  bindKeyboard();
  bindSwipe();
  initSlideCharts(0);
});

// ── Construir puntos de navegación lateral ──
function buildTOC() {
  const panel = document.getElementById('toc-panel');
  if (!panel) return;
  state.slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'toc-dot' + (i === 0 ? ' active' : '');
    dot.title = state.slides[i].dataset.title || `Slide ${i+1}`;
    dot.addEventListener('click', () => goTo(i));
    panel.appendChild(dot);
  });
}

// ── Activar slide ──
function activateSlide(index, direction = 'next') {
  if (index < 0 || index >= state.total) return;

  // Quitar estado previo
  state.slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    if (i === state.current && i !== index) s.classList.add('prev');
  });

  // Activar nuevo slide
  state.slides[index].classList.add('active');
  state.slides[index].classList.remove('prev');

  // Animar elementos internos
  const animEls = state.slides[index].querySelectorAll('[class*="anim-"]');
  animEls.forEach(el => {
    const cls = [...el.classList].filter(c => c.startsWith('anim-'));
    cls.forEach(c => { el.classList.remove(c); });
    void el.offsetWidth; // reflow
    cls.forEach(c => el.classList.add(c));
  });

  // Actualizar TOC
  document.querySelectorAll('.toc-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  state.current = index;
  updateNav();

  // Inicializar charts de esta slide
  setTimeout(() => initSlideCharts(index), 150);

  // Animar contadores
  setTimeout(() => animateCountersInSlide(index), 300);
}

// ── Navegación ──
function goNext() {
  if (state.current < state.total - 1) {
    goTo(state.current + 1);
  }
}

function goPrev() {
  if (state.current > 0) {
    goTo(state.current - 1);
  }
}

function goTo(index) {
  if (state.isAnimating || index === state.current) return;
  state.isAnimating = true;
  activateSlide(index);
  setTimeout(() => { state.isAnimating = false; }, 550);
}

// ── Actualizar barra de progreso y contador ──
function updateNav() {
  const counter = document.getElementById('slide-counter');
  const bar     = document.getElementById('progress-bar');
  if (counter) counter.textContent = `${state.current + 1} / ${state.total}`;
  if (bar) bar.style.width = ((state.current + 1) / state.total * 100) + '%';
}

// ── Teclado ──
function bindKeyboard() {
  document.addEventListener('keydown', e => {
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault(); goNext(); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault(); goPrev(); break;
      case 'Home':
        e.preventDefault(); goTo(0); break;
      case 'End':
        e.preventDefault(); goTo(state.total - 1); break;
      case 'f':
      case 'F':
        toggleFullscreen(); break;
    }
  });
}

// ── Swipe (touch) ──
function bindSwipe() {
  let startX = 0;
  document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? goNext() : goPrev();
  }, { passive: true });
}

// ── Fullscreen ──
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// ── Animar contadores numéricos ──
function animateCountersInSlide(index) {
  const slide = state.slides[index];
  if (!slide) return;
  slide.querySelectorAll('[data-count]').forEach(el => {
    const target   = parseFloat(el.dataset.count);
    const prefix   = el.dataset.prefix  || '';
    const suffix   = el.dataset.suffix  || '';
    const decimals = parseInt(el.dataset.decimals || '0');
    animateCounter(el, target, 1200, prefix, suffix, decimals);
  });
}
