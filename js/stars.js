/* ============================================================
   STARFIELD BACKGROUND
   A lightweight 2D canvas of twinkling, drifting stars.
   This runs on every page as the deep-space backdrop.
   It does NOT use Three.js — just the regular 2D canvas API,
   which is plenty fast for thousands of dots.
   ============================================================ */

(() => {
  const canvas = document.getElementById('stars-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];

  // Build (or rebuild) the star list and resize the canvas
  // to the viewport size. Called on load and on every resize.
  function setup() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];

    // Density scales with screen area, capped at 260 stars.
    const count = Math.min(260, Math.floor((canvas.width * canvas.height) / 9000));

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1 + 0.2,           // depth — bigger = closer
        r: Math.random() * 1.4 + 0.2,         // base radius
        tw: Math.random() * Math.PI * 2,      // twinkle phase
        twS: Math.random() * 0.04 + 0.01,     // twinkle speed
        c: Math.random() < 0.85
              ? '#ffffff'
              : (Math.random() < 0.5 ? '#5cf2ff' : '#a26bff')
      });
    }
  }
  setup();
  window.addEventListener('resize', setup);

  // Animation loop — clear, draw each star, advance phase, drift down.
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      // Twinkle: alpha oscillates with sine wave.
      s.tw += s.twS;
      const alpha = 0.4 + Math.sin(s.tw) * 0.4;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
      ctx.fillStyle    = s.c;
      ctx.globalAlpha  = alpha * s.z;
      ctx.shadowBlur   = 8 * s.z;
      ctx.shadowColor  = s.c;
      ctx.fill();

      // Slow downward drift; wrap around when off-screen.
      s.y += 0.05 * s.z;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }

    // Reset for next frame.
    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;

    requestAnimationFrame(loop);
  }
  loop();
})();
