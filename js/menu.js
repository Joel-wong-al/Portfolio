/* ============================================================
   HAMBURGER MENU — opens a slide-in drawer on small screens
   - Click button: toggles open/close
   - Click backdrop, click ×, or click any nav link: closes
   - Esc key: closes
   - Body scroll is locked while open
   ============================================================ */

(() => {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  const panel = menu.querySelector('.mobile-menu-panel');
  let lastFocus = null;

  function openMenu() {
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    // Focus the close button so keyboard users can dismiss easily
    setTimeout(() => {
      const closeBtn = document.getElementById('mobileMenuClose');
      if (closeBtn) closeBtn.focus();
    }, 60);
  }

  function closeMenu() {
    if (!menu.classList.contains('is-open')) return;
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  burger.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  // Any element with [data-menu-close] dismisses the menu
  // (close button, backdrop, every nav link)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('[data-menu-close]')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // If the viewport grows past 768px while the menu is open
  // (e.g. tablet rotated to landscape), close it cleanly.
  const desktopQuery = window.matchMedia('(min-width: 769px)');
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
})();
