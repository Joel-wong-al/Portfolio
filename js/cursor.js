/* ============================================================
   CUSTOM CURSOR
   - The dot snaps to the mouse position instantly.
   - The ring uses "lerp" (linear interpolation) so it trails
     behind smoothly — gives that responsive, soft feel.
   - When hovering interactive elements, the ring grows.
   ============================================================ */

(() => {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  // Mouse position (target)
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  // Ring position (current — interpolated)
  let rx = mx;
  let ry = my;

  // Update target position whenever the mouse moves.
  // The dot is updated immediately for a snappy feel.
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Animation loop: every frame, move the ring 18% of the way
  // toward the target. This produces smooth easing.
  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Grow the ring when hovering interactive elements.
  const hoverables = 'a, button, .folder, .planet, .stat-card, .step, .g-frame, li';
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();
