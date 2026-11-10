(function () {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  let savedTheme;
  try { savedTheme = localStorage.getItem('hashika-theme'); } catch (_) { /* local storage unavailable */ }
  const theme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  function setTheme(value) {
    root.setAttribute('data-theme', value);
    themeToggle.setAttribute('aria-label', value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    metaTheme.setAttribute('content', value === 'dark' ? '#071324' : '#edf4ff');
    try { localStorage.setItem('hashika-theme', value); } catch (_) {}
  }
  setTheme(theme);
  themeToggle.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
  document.getElementById('year').textContent = new Date().getFullYear();

  const menu = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = () => { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation menu'); };
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!e.target.closest('.nav') && menu.classList.contains('open')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.certificate-card')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const chosen = filter.dataset.filter;
    filters.forEach(btn => { const on = btn === filter; btn.classList.toggle('active', on); btn.setAttribute('aria-pressed', String(on)); });
    cards.forEach(card => { card.hidden = chosen !== 'all' && card.dataset.category !== chosen; });
  }));

  // Graceful offline fallback for the three certificates hosted on the original portfolio.
  document.querySelectorAll('.certificate-preview img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.src.includes('fallback.svg')) {
        const name = this.src.split('/').pop().replace('.png', '-fallback.svg');
        if (name !== 'profile-fallback.svg') this.src = 'assets/' + name;
      }
    });
  });

  const modal = document.getElementById('cert-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalIssuer = document.getElementById('modal-issuer');
  const modalOpen = document.getElementById('modal-open');
  const modalClose = document.getElementById('modal-close');
  let previouslyFocused = null;
  document.querySelectorAll('.certificate-preview').forEach(button => {
    button.addEventListener('click', () => {
      previouslyFocused = button;
      modalImage.src = button.dataset.img;
      modalImage.alt = button.dataset.title + ' completion certificate';
      modalTitle.textContent = button.dataset.title;
      modalIssuer.textContent = button.dataset.issuer;
      modalOpen.href = button.dataset.img;
      if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
      modalClose.focus();
    });
  });
  modalImage.addEventListener('error', () => {
    if (!modalImage.src.includes('-fallback.svg')) {
      const name = modalImage.src.split('/').pop().replace('.png', '-fallback.svg');
      modalImage.src = 'assets/' + name;
    }
  });
  modalClose.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { if (previouslyFocused) previouslyFocused.focus(); });
  
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const watcher = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); watcher.unobserve(entry.target); } }); }, { threshold: .08 });
    document.querySelectorAll('.section-head, .panel, .credential-note').forEach(el => { el.classList.add('reveal'); watcher.observe(el); });
  }
})();
