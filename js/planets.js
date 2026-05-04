/* ============================================================
   SKILLS — SOLAR SYSTEM ENGINE
   Drives orbital motion, axial rotation, depth scaling, and
   mouse parallax for the skills section. Runs at 60fps using
   requestAnimationFrame.
   ============================================================ */

(() => {
  const system    = document.getElementById('planetSystem');
  const stage     = document.getElementById('parallaxStage');
  const tooltip   = document.getElementById('planetTooltip');
  const partBox   = document.getElementById('systemParticles');
  const streakBox = document.getElementById('lightStreaks');
  const panel     = document.getElementById('scanPanel');
  const closeBtn  = document.getElementById('scanClose');

  if (!system || !stage) return;

  /* ============================================================
     1.  ORBIT CONFIGURATION
     Each planet has its own elliptical orbit. Different radii
     and speeds keep the motion organic — nothing in real space
     orbits in lockstep, and neither should this.

     We apply a viewport-based scale so mobile screens get a
     compact solar system that fits the narrower box, and the
     scale re-applies on resize (e.g. orientation change).
     ============================================================ */

  // Pick a scale factor based on viewport width.
  // 100% on desktop, ~80% on tablet, ~60% on small tablet, ~45% on phone.
  function getOrbitScale() {
    const w = window.innerWidth;
    if (w < 480) return 0.45;
    if (w < 768) return 0.6;
    if (w < 1024) return 0.8;
    return 1;
  }

  // Base configuration at desktop scale (1.0)
  const BASE_CONFIGS = [
    // 3D Modelling — closest, slowest, biggest
    { rx: 110, ry: 38, speed: 0.00025, phase: 0.2, size: 105, spin:  0.04 },
    // Web Dev — mid-orbit, slim
    { rx: 165, ry: 56, speed: 0.00038, phase: 1.8, size: 80,  spin: -0.06 },
    // UI/UX — outer, slow
    { rx: 215, ry: 72, speed: 0.00018, phase: 3.5, size: 110, spin:  0.03 },
    // Game Dev — outermost, fastest
    { rx: 260, ry: 86, speed: 0.00045, phase: 5.0, size: 90,  spin: -0.05 },
    // Tools — second-outer
    { rx: 235, ry: 78, speed: 0.00030, phase: 2.6, size: 75,  spin:  0.07 },
  ];

  const planets = Array.from(stage.querySelectorAll('.planet')).map((el, i) => {
    const base = BASE_CONFIGS[i] || {};
    return {
      el,
      base,
      surface: el.querySelector('.planet-surface'),
      // Live orbit values — recomputed on resize
      rx: 0, ry: 0, size: 0,
      speed: base.speed, phase: base.phase, spin: base.spin,
    };
  });

  // Apply the current scale to every planet's rx/ry/size.
  function applyOrbitScale() {
    const scale = getOrbitScale();
    for (const p of planets) {
      p.rx   = p.base.rx   * scale;
      p.ry   = p.base.ry   * scale;
      p.size = p.base.size * scale;
      p.el.style.width  = p.size + 'px';
      p.el.style.height = p.size + 'px';
    }
  }
  applyOrbitScale();

  // Re-scale on resize (debounced so we don't thrash)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyOrbitScale, 120);
  });

  /* ============================================================
     2.  ANIMATION LOOP
     Each frame:
       - Compute each planet's orbit position (ellipse parametric).
       - Set transform: translate(x, y) — that puts it on the orbit.
       - Compute "depth" from y position in the orbit. Planets in
         the lower half of their orbit are "in front" (closer to
         viewer) → bigger and crisper. Top half = behind → smaller
         and slightly blurred.
       - Update the surface's background-position to simulate
         axial rotation (the texture shifts horizontally).
     ============================================================ */
  let mouseDx = 0, mouseDy = 0;       // parallax target offset
  let stageDx = 0, stageDy = 0;       // current applied offset (lerped)

  function animate(t) {
    // --- Parallax (lerp toward mouse target) ---
    stageDx += (mouseDx - stageDx) * 0.05;
    stageDy += (mouseDy - stageDy) * 0.05;
    stage.style.transform =
      `translate(calc(-50% + ${stageDx}px), calc(-50% + ${stageDy}px))`;

    // --- Each planet ---
    for (const p of planets) {
      const angle = t * p.speed + p.phase;

      // Parametric ellipse position. cos→x, sin→y, scaled by radii.
      const x = Math.cos(angle) * p.rx;
      const y = Math.sin(angle) * p.ry;

      // Depth: sin(angle) ranges -1 → +1 over a full orbit.
      // We map: bottom half (y > 0) = closer (depth 1), top half = farther (depth 0).
      const depth = (Math.sin(angle) + 1) * 0.5;   // 0 → 1
      const scale = 0.8 + depth * 0.35;            // 0.8 → 1.15
      const blur  = (1 - depth) * 1.4;             // 0 → 1.4 px blur on far side
      const opacity = 0.65 + depth * 0.35;         // 0.65 → 1

      p.el.style.transform =
        `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${scale})`;
      p.el.style.zIndex = Math.round(depth * 10) + 1; // 1..11
      p.surface.style.filter = `blur(${blur.toFixed(2)}px) brightness(${0.7 + depth * 0.4})`;
      p.el.style.opacity = opacity;

      // Axial rotation — the texture is wider than the sphere, so
      // shifting background-position horizontally fakes a spin.
      const spinPercent = ((t * p.spin) % 400 + 400) % 400;
      p.surface.style.backgroundPosition =
        `${spinPercent.toFixed(2)}% center`;
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  /* ============================================================
     3.  MOUSE PARALLAX
     Mouse position relative to the system box, normalized to
     [-1, 1] on each axis, multiplied by max shift in pixels.
     ============================================================ */
  system.addEventListener('mousemove', (e) => {
    const rect = system.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    mouseDx = nx * 30;   // ±15 px shift max
    mouseDy = ny * 20;
  });
  system.addEventListener('mouseleave', () => {
    mouseDx = 0;
    mouseDy = 0;
  });

  /* ============================================================
     4.  AMBIENT PARTICLES
     ============================================================ */
  const PARTICLE_COUNT = 50;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    p.style.setProperty('--dx', (Math.random() - 0.5) * 120 + 'px');
    p.style.setProperty('--dy', (Math.random() - 0.5) * 120 + 'px');
    const dur = 10 + Math.random() * 14;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay    = -Math.random() * dur + 's';
    const brightness = 0.3 + Math.random() * 0.7;
    p.style.opacity = brightness;
    if (Math.random() < 0.18) p.style.background = '#5cf2ff';
    else if (Math.random() < 0.08) p.style.background = '#ff5cd0';
    partBox.appendChild(p);
  }

  /* ============================================================
     5.  LIGHT STREAKS
     Occasional thin diagonal lines that drift across.
     ============================================================ */
  const STREAK_COUNT = 4;
  for (let i = 0; i < STREAK_COUNT; i++) {
    const s = document.createElement('span');
    const startX = Math.random() * 100;
    const angle  = 15 + Math.random() * 25;
    s.style.left = startX + '%';
    s.style.setProperty('--sx', (Math.random() - 0.5) * 60 + 'px');
    s.style.setProperty('--ex', (Math.random() - 0.5) * 60 + 'px');
    s.style.setProperty('--sa', angle + 'deg');
    const dur = 6 + Math.random() * 8;
    s.style.animationDuration = dur + 's';
    s.style.animationDelay    = -Math.random() * dur + 's';
    streakBox.appendChild(s);
  }

  /* ============================================================
     6.  HOVER + TOOLTIP
     ============================================================ */
  planets.forEach(({ el }) => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('is-hover');
      tooltip.classList.add('show');
      tooltip.querySelector('.tt-name').textContent = el.dataset.skill;
      tooltip.querySelector('.tt-tag').textContent  = el.dataset.tagline;
    });
    el.addEventListener('mousemove', (e) => {
      const rect = system.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left) + 'px';
      tooltip.style.top  = (e.clientY - rect.top)  + 'px';
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('is-hover');
      tooltip.classList.remove('show');
    });
    el.addEventListener('click', () => openScanPanel(el));
  });

  /* ============================================================
     7.  SCAN PANEL
     ============================================================ */
  function openScanPanel(planet) {
    document.getElementById('scanTitle').textContent = planet.dataset.skill;
    document.getElementById('scanTag').textContent   = planet.dataset.tagline;
    document.getElementById('scanDesc').textContent  = planet.dataset.desc;
    document.getElementById('scanClass').textContent = planet.dataset.skill.split(/[\s/&]/)[0];

    // Copy the surface styles to the scan panel so it reads as
    // the same planet zoomed in.
    const inner = document.getElementById('scanPlanetInner');
    const surface = planet.querySelector('.planet-surface');
    const cs = window.getComputedStyle(surface);
    inner.style.backgroundImage = cs.backgroundImage;
    inner.style.backgroundSize  = cs.backgroundSize;

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeScanPanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeScanPanel);
  panel.querySelector('.scan-backdrop').addEventListener('click', closeScanPanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeScanPanel();
  });
})();
