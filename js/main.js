/* Navigation scroll state + auto-hide on mobile */
const nav = document.getElementById('nav');
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

if (nav) {
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 40);

    if (isMobile()) {
      const menuOpen = navList?.classList.contains('nav__list--open');
      if (!menuOpen) {
        const delta = y - lastY;
        // Nur echtes Nutzer-Scrollen auswerten (kleine Schritte < 200px)
        // Große Sprünge = Browser-Scroll-Wiederherstellung → ignorieren
        if (delta > 4 && delta < 200 && y > 80) {
          nav.classList.add('nav--hidden');
        } else if (delta < 0) {
          nav.classList.remove('nav--hidden');
        }
      }
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile navigation toggle */
const toggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

function openNav() {
  toggle.setAttribute('aria-expanded', 'true');
  navList.classList.add('nav__list--open');
  document.body.classList.add('nav-open');
  nav.classList.remove('nav--hidden');
}
function closeNav() {
  toggle.setAttribute('aria-expanded', 'false');
  navList.classList.remove('nav__list--open');
  document.body.classList.remove('nav-open');
}

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
  });

  /* Close on link click */
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
}

/* Scroll reveal via IntersectionObserver */
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
}

/* Footer: aktuelles Jahr */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Back to top button (desktop) */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Mobile back to top button */
const mobileTop = document.getElementById('mobileBackToTop');
if (mobileTop) {
  mobileTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Subtle hero parallax */
const heroBg = document.querySelector('.hero__bg img');
if (heroBg) {
  const onParallax = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const offset = window.scrollY * 0.25;
    heroBg.style.transform = `translateY(${offset}px)`;
  };
  window.addEventListener('scroll', onParallax, { passive: true });
}
