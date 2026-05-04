/* ============================================================
   LANDING PAGE 3D (Three.js)
   A floating wireframe globe with an inner sphere, a particle
   ring, and drifting particles. The camera reacts to the mouse
   to create a subtle parallax effect.
   ============================================================ */

(() => {
  const canvas = document.getElementById('landing-canvas');
  if (!canvas) return;

  // ---------- RENDERER ----------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ---------- SCENE & CAMERA ----------
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  // Resize the renderer/camera to the canvas's actual box size.
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  // ---------- OUTER WIREFRAME (icosahedron) ----------
  // IcosahedronGeometry creates a 20-sided polyhedron. The second
  // argument is the "detail" level — higher = more triangles.
  const wireGeo = new THREE.IcosahedronGeometry(1.8, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x5cf2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const wireOuter = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireOuter);

  // ---------- INNER SPHERE (also wireframe, different color) ----------
  const innerGeo = new THREE.SphereGeometry(1.2, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xa26bff,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const innerSphere = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerSphere);

  // ---------- PARTICLE RING (around the equator) ----------
  const ringGeo   = new THREE.BufferGeometry();
  const ringCount = 400;
  const ringPos   = new Float32Array(ringCount * 3);

  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2;
    const r = 2.6 + Math.random() * 0.5;
    ringPos[i * 3]     = Math.cos(angle) * r;
    ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
    ringPos[i * 3 + 2] = Math.sin(angle) * r;
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));

  const ring = new THREE.Points(ringGeo, new THREE.PointsMaterial({
    color: 0xff5cd0,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  scene.add(ring);

  // ---------- DRIFTING PARTICLES (background fill) ----------
  const partGeo   = new THREE.BufferGeometry();
  const partCount = 250;
  const partPos   = new Float32Array(partCount * 3);

  for (let i = 0; i < partCount; i++) {
    partPos[i * 3]     = (Math.random() - 0.5) * 10;
    partPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    partPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));

  const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  }));
  scene.add(particles);

  resize();
  window.addEventListener('resize', resize);

  // ---------- MOUSE PARALLAX ----------
  // Track mouse position normalized to [-0.5, 0.5].
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth)  - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // ---------- ANIMATION LOOP ----------
  function loop() {
    // Slowly rotate each object on its own axis & speed.
    wireOuter.rotation.y   += 0.003;
    wireOuter.rotation.x   += 0.001;
    innerSphere.rotation.y -= 0.005;
    innerSphere.rotation.z += 0.002;
    ring.rotation.y        += 0.002;
    ring.rotation.x         = 0.3;
    particles.rotation.y   += 0.0008;

    // Camera drifts toward the mouse position. The lerp factor (0.04)
    // makes the movement smooth instead of snappy.
    camera.position.x += (mouseX *  0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0); // always point at the center

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();
})();
