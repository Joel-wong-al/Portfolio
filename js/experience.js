/* ============================================================
   WORK EXPERIENCE — GALAXY FORMATION (replayable)
   The cards swirl in when the section enters the viewport, and
   swirl out when it leaves. Returning to the section triggers
   the entry animation again from scratch.
   ============================================================ */

(() => {
  const stage = document.getElementById('experience');
  const field = document.getElementById('galaxyParticles');
  if (!stage || !field) return;

  /* ---------- 1. Generate the particle field once ---------- */
  // Particles are static DOM elements; the CSS controls when they
  // fade in/out via the .has-formed class on the parent stage.
  const PARTICLE_COUNT = 80;
  const COLOUR_CLASSES = ['', '', '', '', 'cyan', 'cyan', 'magenta', 'amber'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');

    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';

    const colourClass = COLOUR_CLASSES[Math.floor(Math.random() * COLOUR_CLASSES.length)];
    if (colourClass) p.classList.add(colourClass);

    // Stagger entry timing for the wave effect
    const delay = Math.random() * 0.9;
    p.style.setProperty('--delay', delay + 's');

    // Brightness variation
    const peakOpacity = 0.4 + Math.random() * 0.6;
    const restOpacity = 0.25 + Math.random() * 0.55;
    p.style.setProperty('--peak-opacity', peakOpacity);
    p.style.setProperty('--rest-opacity', restOpacity);

    // Drift vectors for the ambient phase
    const driftX = (Math.random() - 0.5) * 30;
    const driftY = (Math.random() - 0.5) * 30;
    p.style.setProperty('--drift-x', driftX + 'px');
    p.style.setProperty('--drift-y', driftY + 'px');

    // Scale variation
    const scale = 0.6 + Math.random() * 1.3;
    p.style.transform = `scale(${scale})`;

    p.style.animationDelay = `${delay}s, ${1.4 + Math.random() * 4}s`;

    field.appendChild(p);
  }

  /* ---------- 2. Toggle formation based on viewport visibility ---------- */
  // IntersectionObserver fires every time the section's
  // visibility changes. When it intersects → form. When it
  // leaves → unform. Using threshold: 0 means we only consider
  // it "out of view" when it's fully off-screen, which keeps
  // the animation from triggering during partial scrolls.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          stage.classList.add('has-formed');
          stage.classList.remove('is-leaving');
        } else {
          // Mark as leaving so CSS can apply the reverse-stagger
          // exit transitions, then strip both classes once cards
          // are back to their pre-formed state.
          if (stage.classList.contains('has-formed')) {
            stage.classList.add('is-leaving');
            stage.classList.remove('has-formed');
          }
        }
      }
    },
    {
      threshold: 0,
      rootMargin: '0px'
    }
  );
  observer.observe(stage);

  /* ---------- 3. Initial state on page load ---------- */
  // If the page loads with the section already in view (e.g.
  // from an anchor link or refresh on a long page), trigger the
  // formation immediately rather than waiting for a scroll.
  setTimeout(() => {
    const rect = stage.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      stage.classList.add('has-formed');
    }
  }, 100);
})();
