/* ============================================================
   MAIN PAGE BEHAVIOR
   - Reveals .reveal elements as they scroll into view
   - Nav links smooth-scroll to their target section
   ============================================================ */

/* ---------- SCROLL REVEALS ---------- */
// IntersectionObserver fires a callback whenever a watched
// element enters/leaves the viewport. We use it to trigger CSS
// animations once, then stop watching that element.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* ---------- SMOOTH ANCHOR SCROLLING ---------- */
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
