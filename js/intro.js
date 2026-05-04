/* ============================================================
   INTRO ANIMATION (Three.js)
   A cinematic Earth that flies in from deep space, then
   transitions out to reveal the landing page.

   Uses Three.js — see notes in this file's comments and the
   README for an explanation of how Three.js works.
   ============================================================ */

let introDone = false;

(() => {
  const canvas = document.getElementById('intro-canvas');
  if (!canvas) return;

  // ---------- 1. RENDERER ----------
  // The renderer is the engine that paints 3D pixels onto the canvas.
  // antialias smooths edges; alpha lets us see the page behind it.
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ---------- 2. SCENE ----------
  // The scene is the "world container" — every object lives inside it.
  const scene = new THREE.Scene();

  // ---------- 3. CAMERA ----------
  // The camera is the viewer's eye. We use a perspective camera
  // so distant objects look smaller (just like real life).
  // Args: field-of-view (degrees), aspect ratio, near clip, far clip.
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0, 30);

  // ---------- 4. STARS (3D point cloud) ----------
  // BufferGeometry stores vertex data efficiently in typed arrays.
  // Each star is one vertex; we render them as Points (dots).
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1500;
  const positions  = new Float32Array(starCount * 3); // x,y,z per star
  const starColors = new Float32Array(starCount * 3); // r,g,b per star

  for (let i = 0; i < starCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 800;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

    const c = Math.random();
    if (c < 0.7) {        // 70% white
      starColors[i * 3] = 1; starColors[i * 3 + 1] = 1; starColors[i * 3 + 2] = 1;
    } else if (c < 0.88) { // 18% cyan
      starColors[i * 3] = 0.36; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 1;
    } else {              // 12% purple
      starColors[i * 3] = 0.64; starColors[i * 3 + 1] = 0.42; starColors[i * 3 + 2] = 1;
    }
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeo.setAttribute('color',    new THREE.BufferAttribute(starColors, 3));

  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,                // stars further away are smaller
    blending: THREE.AdditiveBlending,     // overlapping stars get brighter
    depthWrite: false
  }));
  scene.add(stars);

  // ---------- 5. PLANET ----------
  // We generate the texture procedurally on a 2D canvas. This way
  // we don't need to load any external image, and the site works offline.
  function makePlanetTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const g = c.getContext('2d');

    // Ocean: blue gradient base
    const grad = g.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0,   '#0a1a4a');
    grad.addColorStop(0.5, '#1a4a9a');
    grad.addColorStop(1,   '#0a2050');
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);

    // Continents — irregular green blobs
    g.fillStyle = '#2a8a5a';
    for (let i = 0; i < 14; i++) {
      const cx = Math.random() * c.width;
      const cy = Math.random() * c.height;
      const r  = 40 + Math.random() * 120;
      g.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.2) {
        const rr = r * (0.6 + Math.random() * 0.8);
        const x  = cx + Math.cos(a) * rr;
        const y  = cy + Math.sin(a) * rr * 0.7;
        a === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.closePath(); g.fill();
    }

    // Highlights (lighter green spots)
    g.fillStyle = 'rgba(140, 220, 150, 0.4)';
    for (let i = 0; i < 60; i++) {
      g.beginPath();
      g.arc(Math.random() * c.width, Math.random() * c.height,
            Math.random() * 8 + 2, 0, Math.PI * 2);
      g.fill();
    }

    // Cloud wisps
    g.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < 30; i++) {
      g.beginPath();
      g.ellipse(
        Math.random() * c.width, Math.random() * c.height,
        Math.random() * 60 + 20, Math.random() * 15 + 8,
        Math.random() * Math.PI, 0, Math.PI * 2
      );
      g.fill();
    }

    return new THREE.CanvasTexture(c);
  }

  // Geometry = the SHAPE (a sphere mesh).
  // Material = the SURFACE (color, shininess, texture).
  // Mesh    = geometry + material combined into a renderable object.
  const planetGeo = new THREE.SphereGeometry(4, 64, 64);
  const planetMat = new THREE.MeshPhongMaterial({
    map: makePlanetTexture(),
    shininess: 25,
    specular: 0x223355
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  planet.position.set(-40, -10, -200); // start far away & off-center
  scene.add(planet);

  // ---------- 6. ATMOSPHERE GLOW ----------
  // A slightly larger sphere rendered from the BACK side with a custom
  // shader. The "Fresnel" effect makes edges glow brighter than the center.
  const atmoGeo = new THREE.SphereGeometry(4.25, 64, 64);
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    uniforms: {
      c: { value: 0.6 },
      p: { value: 3.0 },
      glowColor: { value: new THREE.Color(0x5cf2ff) }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float c;
      uniform float p;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `,
    blending: THREE.AdditiveBlending
  });
  const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
  planet.add(atmosphere); // attach to planet so it follows along

  // ---------- 7. LIGHTS ----------
  // Without lights, MeshPhongMaterial renders BLACK.
  // AmbientLight = soft, evenly-spread fill.
  // DirectionalLight = parallel rays (like sunlight).
  scene.add(new THREE.AmbientLight(0x222244, 0.6));

  const sun = new THREE.DirectionalLight(0xffffff, 1.4);
  sun.position.set(10, 6, 8);
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0x5cf2ff, 0.5);
  rim.position.set(-8, 2, -4);
  scene.add(rim);

  // ---------- 8. ANIMATION LOOP ----------
  const duration = 4500;          // total animation in ms
  const start    = performance.now();

  function animate(now) {
    if (introDone) return;

    const elapsed = now - start;
    const k = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - k, 3); // cubic-out easing

    // Earth flies from far position to center.
    planet.position.x = -40  + 40  * eased;
    planet.position.y = -10  + 10  * eased;
    planet.position.z = -200 + 195 * eased;
    planet.rotation.y += 0.004;
    planet.rotation.x = -0.2 + 0.2 * eased;

    // Stars slowly rotate in 3D space.
    stars.rotation.y += 0.0008;
    stars.rotation.x += 0.0003;

    // Camera dollies in slightly.
    camera.position.z = 30 - 5 * eased;

    // Render this frame — the camera takes a "photo" of the scene.
    renderer.render(scene, camera);

    if (k >= 1) {
      // Hold briefly, then fade the intro out.
      setTimeout(finishIntro, 700);
      return;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Keep the renderer in sync with window resizes.
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// Fade out the intro and reveal the navigation bar.
function finishIntro() {
  if (introDone) return;
  introDone = true;

  document.getElementById('intro').classList.add('done');
  document.getElementById('mainNav').classList.add('show');

  // Remove from layout once the fade is complete.
  setTimeout(() => {
    const el = document.getElementById('intro');
    if (el) el.style.display = 'none';
  }, 1300);
}

// Wire up the skip button and a max-time failsafe.
document.addEventListener('DOMContentLoaded', () => {
  const skip = document.getElementById('skipBtn');
  if (skip) skip.addEventListener('click', finishIntro);
});
setTimeout(finishIntro, 6500);
