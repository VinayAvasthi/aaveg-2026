const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function createForest(THREE, mergeGeometries, container, progressRef) {
  const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: !mobile, powerPreference: 'high-performance' });
  if (!renderer.getContext()) throw new Error('WebGL unavailable');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const fogColor = new THREE.Color('#15080C');
  scene.background = fogColor;
  scene.fog = new THREE.FogExp2(fogColor, 0.0135);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 500);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 3.4, 2), new THREE.Vector3(0, 3.4, -26), new THREE.Vector3(2.2, 3.2, -54),
    new THREE.Vector3(-2.0, 3.0, -82), new THREE.Vector3(1.0, 2.9, -106), new THREE.Vector3(0.2, 3.4, -122),
    new THREE.Vector3(0.4, 4.0, -132), new THREE.Vector3(0.606, 4.505, -137.2),
  ], false, 'centripetal');

  // lights
  scene.add(new THREE.AmbientLight('#40121A', 1.15));
  const moonLight = new THREE.DirectionalLight('#F5E8EB', 0.95);
  moonLight.position.set(-20, 40, -60); scene.add(moonLight);
  const houseLight = new THREE.PointLight('#FF2838', 160, 60, 2);
  houseLight.position.set(0, 4, -124); scene.add(houseLight);

  // ground + path ribbon
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 340),
    new THREE.MeshStandardMaterial({ color: '#0E0609', roughness: 0.95 }));
  ground.rotation.x = -Math.PI / 2; ground.position.set(0, 0, -80); scene.add(ground);
  {
    const N = 90, pos = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = curve.getPointAt(t), tg = curve.getTangentAt(t);
      const nx = -tg.z, nz = tg.x, l = Math.hypot(nx, nz) || 1;
      pos.push(p.x + (nx / l) * 1.8, 0.03, p.z + (nz / l) * 1.8, p.x - (nx / l) * 1.8, 0.03, p.z - (nz / l) * 1.8);
      if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx); g.computeVertexNormals();
    const path = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: '#1B0A10', roughness: 0.9, side: THREE.DoubleSide }));
    scene.add(path);
  }

  // Real Gothic tree silhouette PNG textures (with transparent background)
  const texLoader = new THREE.TextureLoader();
  const treeTex1 = texLoader.load('/assets/tree_1.png');
  treeTex1.colorSpace = THREE.SRGBColorSpace;
  const treeTex2 = texLoader.load('/assets/tree_2.png');
  treeTex2.colorSpace = THREE.SRGBColorSpace;
  const branchTex = texLoader.load('/assets/tree_branches.png');
  branchTex.colorSpace = THREE.SRGBColorSpace;

  const treeMat1 = new THREE.MeshBasicMaterial({
    map: treeTex1,
    transparent: true,
    alphaTest: 0.08,
    depthWrite: true,
    side: THREE.DoubleSide,
  });
  const treeMat2 = new THREE.MeshBasicMaterial({
    map: treeTex2,
    transparent: true,
    alphaTest: 0.08,
    depthWrite: true,
    side: THREE.DoubleSide,
  });

  // Cross-plane geometry so tree is visible in full 3D from all angles
  const createCrossTreeGeo = (w, h) => {
    const g1 = new THREE.PlaneGeometry(w, h);
    g1.translate(0, h / 2, 0);
    const g2 = new THREE.PlaneGeometry(w, h);
    g2.rotateY(Math.PI / 2);
    g2.translate(0, h / 2, 0);
    return mergeGeometries([g1, g2]);
  };

  const treeGeo1 = createCrossTreeGeo(7.8, 10.5);
  const treeGeo2 = createCrossTreeGeo(7.2, 10.2);

  const treeCount1 = mobile ? 22 : 38;
  const treeCount2 = mobile ? 22 : 38;
  const treesMesh1 = new THREE.InstancedMesh(treeGeo1, treeMat1, treeCount1);
  const treesMesh2 = new THREE.InstancedMesh(treeGeo2, treeMat2, treeCount2);

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), ps = new THREE.Vector3();

  const populateTrees = (mesh, count) => {
    for (let i = 0; i < count; i++) {
      const u = 0.02 + Math.random() * 0.94;
      const p = curve.getPointAt(u);
      const side = Math.random() < 0.5 ? -1 : 1;
      const distFromPath = (p.z < -110 ? 14 : 5.0) + Math.pow(Math.random(), 1.3) * 16;
      ps.set(
        p.x + side * distFromPath,
        0,
        p.z + (Math.random() - 0.5) * 6
      );
      e.set(
        (Math.random() - 0.5) * 0.06,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.06
      );
      q.setFromEuler(e);
      const s = 0.85 + Math.random() * 0.75;
      sc.set(s, s * (0.92 + Math.random() * 0.3), s);
      mesh.setMatrixAt(i, m4.compose(ps, q, sc));
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  populateTrees(treesMesh1, treeCount1);
  populateTrees(treesMesh2, treeCount2);
  scene.add(treesMesh1);
  scene.add(treesMesh2);

  // Camera foreground hanging branches positioned safely in upper-right periphery
  const branchMat = new THREE.MeshBasicMaterial({
    map: branchTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });
  const branchGeo = new THREE.PlaneGeometry(8, 8);
  const topBranches = new THREE.Mesh(branchGeo, branchMat);
  topBranches.position.set(3.4, 3.2, -5.2);
  topBranches.rotation.z = -0.15;
  camera.add(topBranches);
  scene.add(camera);

  // celestial blood moon + soft atmospheric corona
  const mc = document.createElement('canvas'); mc.width = mc.height = 512;
  const mg = mc.getContext('2d');
  const gr = mg.createRadialGradient(230, 220, 20, 256, 256, 256);
  gr.addColorStop(0, '#FFF5F6'); gr.addColorStop(0.32, '#FFA0AC'); gr.addColorStop(0.75, '#D91428'); gr.addColorStop(1, '#8A0512');
  mg.fillStyle = gr; mg.beginPath(); mg.arc(256, 256, 250, 0, 7); mg.fill();
  for (let i = 0; i < 18; i++) {
    mg.fillStyle = 'rgba(110, 10, 22, 0.28)'; mg.beginPath();
    mg.arc(110 + Math.random() * 290, 110 + Math.random() * 290, 10 + Math.random() * 38, 0, 7); mg.fill();
  }
  const moonTex = new THREE.CanvasTexture(mc); moonTex.colorSpace = THREE.SRGBColorSpace;
  const moon = new THREE.Mesh(new THREE.CircleGeometry(9, 64), new THREE.MeshBasicMaterial({ map: moonTex, transparent: true, fog: false }));
  scene.add(moon);
  const glowTex = (stops) => {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(([o, col]) => r.addColorStop(o, col)); g.fillStyle = r; g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex([[0, 'rgba(255,40,55,0.6)'], [0.4, 'rgba(190,12,28,0.25)'], [1, 'rgba(21,8,12,0)']]),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  halo.scale.setScalar(82); scene.add(halo);

  // Castle facade with doorway portal opening
  const houseTex = texLoader.load('/assets/haunted_house_portal.png');
  houseTex.colorSpace = THREE.SRGBColorSpace;
  const houseMat = new THREE.MeshBasicMaterial({
    map: houseTex,
    transparent: true,
    alphaTest: 0.02,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
  });
  const houseW = 34.5, houseH = 23;
  const house = new THREE.Mesh(new THREE.PlaneGeometry(houseW, houseH), houseMat);
  house.position.set(0, houseH / 2 - 0.2, -136);
  scene.add(house);
  const houseLook = new THREE.Vector3(0, 6.2, -136);
  const gateLook = new THREE.Vector3(0.606, 4.505, -138.5);

  // The castle's own gates extracted directly from the user's gate image
  const leftDoorTex = texLoader.load('/assets/castle_door_left.png');
  leftDoorTex.colorSpace = THREE.SRGBColorSpace;
  const rightDoorTex = texLoader.load('/assets/castle_door_right.png');
  rightDoorTex.colorSpace = THREE.SRGBColorSpace;

  const doorMatLeft = new THREE.MeshBasicMaterial({ map: leftDoorTex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
  const doorMatRight = new THREE.MeshBasicMaterial({ map: rightDoorTex, transparent: true, side: THREE.DoubleSide, depthWrite: false });

  const doorLeafW = 1.516, doorH = 4.553;
  const doorCenterY = 4.505;

  // Left door leaf hinged on the left door jamb of this exact gate
  const leftGatePivot = new THREE.Group();
  leftGatePivot.position.set(-0.910, doorCenterY, -135.98);
  const leftDoor = new THREE.Mesh(new THREE.PlaneGeometry(doorLeafW, doorH), doorMatLeft);
  leftDoor.position.set(doorLeafW / 2, 0, 0);
  leftGatePivot.add(leftDoor);
  scene.add(leftGatePivot);

  // Right door leaf hinged on the right door jamb of this exact gate
  const rightGatePivot = new THREE.Group();
  rightGatePivot.position.set(2.123, doorCenterY, -135.98);
  const rightDoor = new THREE.Mesh(new THREE.PlaneGeometry(doorLeafW, doorH), doorMatRight);
  rightDoor.position.set(-doorLeafW / 2, 0, 0);
  rightGatePivot.add(rightDoor);
  scene.add(rightGatePivot);

  // Pure pitch-black interior behind the door
  const darkInterior = new THREE.Mesh(
    new THREE.PlaneGeometry(doorLeafW * 2.2, doorH * 1.05),
    new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.DoubleSide })
  );
  darkInterior.position.set(0.606, doorCenterY, -136.08);
  scene.add(darkInterior);

  // Red glow behind house silhouetting the spires
  const houseGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex([[0, 'rgba(255,30,45,0.7)'], [0.35, 'rgba(180,10,25,0.35)'], [0.7, 'rgba(90,4,12,0.15)'], [1, 'rgba(7,6,8,0)']]),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  houseGlow.position.set(0, 11, -138);
  houseGlow.scale.set(58, 44, 1);
  scene.add(houseGlow);

  // Fullscreen pure-black overlay for end of animation
  const fadeMat = new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0, depthTest: false, fog: false });
  const fadeOverlay = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), fadeMat);
  fadeOverlay.renderOrder = 9999;
  camera.add(fadeOverlay);
  fadeOverlay.position.set(0, 0, -0.2);

  // 3D "AAVEG" title with transparent horror typographic logo
  const titleCanvas = document.createElement('canvas'); titleCanvas.width = 2048; titleCanvas.height = 1024;
  const tg = titleCanvas.getContext('2d');

  const renderTitleCanvas = (useImg = null) => {
    tg.clearRect(0, 0, 2048, 1024);

    if (useImg) {
      // User-provided transparent typographic logo (1931 x 814)
      // Slicing top 690px contains the horror "AAVEG" title & "POORNIMA COLLEGE OF ENGINEERING"
      const srcW = 1931;
      const srcH = 690;
      const targetW = 1860;
      const targetH = (srcH / srcW) * targetW; // ~ 664px
      const destX = (2048 - targetW) / 2;
      const destY = 60;

      // Glow aura
      tg.save();
      tg.shadowColor = 'rgba(255, 30, 45, 0.7)';
      tg.shadowBlur = 45;
      tg.drawImage(useImg, 0, 0, srcW, srcH, destX, destY, targetW, targetH);
      tg.restore();

      // Sharp logo
      tg.drawImage(useImg, 0, 0, srcW, srcH, destX, destY, targetW, targetH);

      // Updated dates: 22 – 24 OCTOBER 2026
      const dateY = destY + targetH + 85;
      tg.font = '800 56px "Cinzel", "DM Sans", sans-serif';
      tg.textAlign = 'center';
      tg.textBaseline = 'middle';
      if ('letterSpacing' in tg) tg.letterSpacing = '10px';
      tg.fillStyle = '#FF5263';
      tg.shadowColor = 'rgba(255, 30, 45, 0.95)';
      tg.shadowBlur = 24;
      tg.fillText('—  22 – 24  OCTOBER  2026  —', 1024, dateY);
      tg.shadowBlur = 0;
    } else {
      // Immediate clean typography while image loads
      tg.font = '900 370px "Cinzel Decorative", "Cinzel", Anton, serif'; tg.textAlign = 'center'; tg.textBaseline = 'middle';
      if ('letterSpacing' in tg) tg.letterSpacing = '18px';
      tg.shadowColor = 'rgba(255,20,35,0.95)'; tg.shadowBlur = 95; tg.fillStyle = '#6B000B';
      tg.fillText('AAVEG', 1024, 300); tg.fillText('AAVEG', 1024, 300);
      tg.shadowBlur = 35; tg.shadowColor = 'rgba(255,50,60,0.8)';
      tg.lineJoin = 'round'; tg.lineWidth = 32; tg.strokeStyle = '#050203';
      tg.strokeText('AAVEG', 1024, 300);
      tg.shadowBlur = 0;
      const fg = tg.createLinearGradient(0, 80, 0, 520);
      fg.addColorStop(0, '#FFFFFF'); fg.addColorStop(0.28, '#FFAEBA'); fg.addColorStop(0.65, '#E50914'); fg.addColorStop(1, '#8A020B');
      tg.fillStyle = fg; tg.fillText('AAVEG', 1024, 300);
      tg.lineWidth = 4; tg.strokeStyle = 'rgba(255,255,255,0.7)';
      tg.strokeText('AAVEG', 1024, 300);

      tg.shadowColor = 'rgba(229,9,20,0.7)'; tg.shadowBlur = 24;
      tg.font = '700 70px "Cinzel", "DM Sans", sans-serif';
      if ('letterSpacing' in tg) tg.letterSpacing = '14px';
      tg.fillStyle = '#FFF0F3'; tg.fillText('POORNIMA COLLEGE OF ENGINEERING', 1024, 525);

      tg.font = '800 56px "DM Sans", sans-serif';
      if ('letterSpacing' in tg) tg.letterSpacing = '10px';
      tg.fillStyle = '#FF5263'; tg.shadowBlur = 20;
      tg.fillText('22 – 24  OCTOBER  2026', 1024, 620);
      tg.shadowBlur = 0;
    }
  };

  renderTitleCanvas(null);

  const titleTex = new THREE.CanvasTexture(titleCanvas); titleTex.colorSpace = THREE.SRGBColorSpace; titleTex.anisotropy = 4;
  const titleMat = new THREE.MeshBasicMaterial({ map: titleTex, transparent: true, depthWrite: false, fog: false, toneMapped: false, color: '#FFFFFF' });
  const title = new THREE.Mesh(new THREE.PlaneGeometry(36, 18), titleMat);
  title.position.set(0, 4.2, -18); scene.add(title);
  const titleStart = new THREE.Vector3(0, 4.2, -18);
  const titleEnd = new THREE.Vector3(0, 18.5, -134);

  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  logoImg.onload = () => {
    renderTitleCanvas(logoImg);
    titleTex.needsUpdate = true;
  };
  logoImg.src = '/assets/aaveg_horror_logo.png';

  // ambient smoke
  const smokeTex = glowTex([[0, 'rgba(255,255,255,0.7)'], [0.5, 'rgba(255,255,255,0.18)'], [1, 'rgba(255,255,255,0)']]);
  const smoke = [];
  for (let i = 0; i < (mobile ? 16 : 30); i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, color: '#4A141E', transparent: true, opacity: 0.11 + Math.random() * 0.11, depthWrite: false }));
    const p = curve.getPointAt(Math.random() * 0.97);
    s.position.set(p.x + (Math.random() - 0.5) * 30, 1 + Math.random() * 5, p.z);
    s.scale.setScalar(14 + Math.random() * 14); s.userData = { sp: 0.1 + Math.random() * 0.2, ph: Math.random() * 9 };
    scene.add(s); smoke.push(s);
  }

  // embers (incandescent fire sparks)
  const eCount = mobile ? 260 : 650, ePos = new Float32Array(eCount * 3), eSeed = new Float32Array(eCount * 2);
  for (let i = 0; i < eCount; i++) {
    const p = curve.getPointAt(Math.random() * 0.98);
    ePos[i * 3] = p.x + (Math.random() - 0.5) * 34; ePos[i * 3 + 1] = Math.random() * 16; ePos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 8;
    eSeed[i * 2] = 0.3 + Math.random() * 0.9; eSeed[i * 2 + 1] = Math.random() * 20;
  }
  const eGeo = new THREE.BufferGeometry(); eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  const embers = new THREE.Points(eGeo, new THREE.PointsMaterial({
    size: mobile ? 0.36 : 0.28,
    map: glowTex([[0, 'rgba(255,245,230,1)'], [0.35, 'rgba(255,50,60,0.85)'], [1, 'rgba(160,0,15,0)']]),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  embers.frustumCulled = false; scene.add(embers);

  // sizing
  const resize = () => {
    const w = container.clientWidth || window.innerWidth, h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false); renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    const aspect = w / h; camera.aspect = aspect; camera.fov = aspect < 0.8 ? 72 : 58; camera.updateProjectionMatrix();
    const visH = 2 * 20 * Math.tan((camera.fov * Math.PI) / 360);
    const visW = visH * aspect;
    const fitScale = (visW * (aspect < 0.8 ? 0.85 : 0.92)) / 36;
    title.scale.setScalar(Math.min(1.05, fitScale));
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(container);

  let cur = 0, mx = 0, my = 0, tmx = 0, tmy = 0, time = 0, last = performance.now(), running = true, raf;
  const onMove = (ev) => { tmx = (ev.clientX / window.innerWidth - 0.5) * 2; tmy = (ev.clientY / window.innerHeight - 0.5) * 2; };
  if (!mobile) window.addEventListener('pointermove', onMove, { passive: true });
  const io = new IntersectionObserver(([en]) => { running = en.isIntersecting; }, { threshold: 0 }); io.observe(container);
  const pos3 = new THREE.Vector3(), look = new THREE.Vector3();

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!running) return;
    time += dt;
    cur += (progressRef.current - cur) * (1 - Math.exp(-dt * 4));
    mx += (tmx - mx) * (1 - Math.exp(-dt * 3)); my += (tmy - my) * (1 - Math.exp(-dt * 3));
    const u = Math.min(1, cur);
    curve.getPointAt(u, pos3);

    // Dynamic look targeting: path -> house overview & title -> straight into gate
    if (cur < 0.65) {
      curve.getPointAt(Math.min(1, u + 0.04), look);
    } else if (cur < 0.85) {
      const pLook = new THREE.Vector3();
      curve.getPointAt(Math.min(1, u + 0.04), pLook);
      look.copy(pLook).lerp(houseLook, sstep(0.65, 0.85, cur));
    } else {
      look.copy(houseLook).lerp(gateLook, sstep(0.85, 0.97, cur));
    }

    // Camera sway reduces near the gate for cinematic precision dive
    const swayFactor = 1 - sstep(0.88, 0.98, cur);
    pos3.x += (Math.sin(time * 0.6) * 0.12 + mx * 0.9) * swayFactor;
    pos3.y += (Math.sin(time * 0.9) * 0.08 - my * 0.25) * swayFactor;
    look.x += mx * 1.6 * swayFactor;
    look.y -= my * 0.8 * swayFactor;
    camera.position.copy(pos3); camera.lookAt(look); camera.rotateZ(Math.sin(time * 0.5) * 0.008 * swayFactor);

    // The castle's own gate opens
    const gateOpen = sstep(0.80, 0.93, cur);
    leftGatePivot.rotation.y = -gateOpen * 1.55;
    rightGatePivot.rotation.y = gateOpen * 1.55;

    // Foreground branches fade out
    topBranches.position.x = 3.4 + Math.sin(time * 0.8) * 0.08;
    topBranches.position.y = 3.2 + Math.cos(time * 0.6) * 0.04;
    topBranches.rotation.z = -0.15 + Math.sin(time * 0.5) * 0.02;
    topBranches.material.opacity = 0.85 * (1 - sstep(0.35, 0.65, cur));
    topBranches.visible = topBranches.material.opacity > 0.01;

    // Remove title when door begins to open (completely gone by 86%)
    title.position.lerpVectors(titleStart, titleEnd, sstep(0, 0.58, cur));
    title.lookAt(camera.position);
    const visH = 2 * 20 * Math.tan((camera.fov * Math.PI) / 360);
    const visW = visH * camera.aspect;
    const fitScale = (visW * (camera.aspect < 0.8 ? 0.85 : 0.92)) / 36;
    const baseScale = Math.min(1.05, fitScale);
    const titleScale = baseScale * (1.0 + sstep(0, 0.58, cur) * 0.45);
    title.scale.setScalar(titleScale);
    titleMat.opacity = 1 - sstep(0.76, 0.86, cur);
    title.visible = titleMat.opacity > 0.01;

    // Remove all scene lights, celestial bodies, and embers as door opens
    const sceneVisibility = 1 - sstep(0.82, 0.94, cur);
    moon.material.opacity = sceneVisibility;
    moon.visible = sceneVisibility > 0.01;
    halo.material.opacity = sceneVisibility;
    halo.visible = sceneVisibility > 0.01;
    houseGlow.material.opacity = sceneVisibility;
    houseGlow.visible = sceneVisibility > 0.01;
    houseLight.intensity = (130 + 40 * Math.sin(time * 5)) * sceneVisibility;
    embers.material.opacity = sceneVisibility;
    embers.visible = sceneVisibility > 0.01;

    moon.position.set(-24 + pos3.x * 0.8, 31, pos3.z - 150); moon.lookAt(camera.position);
    halo.position.copy(moon.position);

    // Translucent gothic atmospheric transition into portal
    fadeMat.opacity = sstep(0.88, 0.98, cur) * 0.7;

    for (let i = 0; i < smoke.length; i++) {
      const s = smoke[i]; s.position.x += Math.sin(time * 0.2 + s.userData.ph) * 0.01;
      s.position.y += s.userData.sp * dt; if (s.position.y > 9) s.position.y = 1;
    }
    for (let i = 0; i < eCount; i++) {
      ePos[i * 3 + 1] += eSeed[i * 2] * dt * 1.2; ePos[i * 3] += Math.sin(time * 0.6 + eSeed[i * 2 + 1]) * 0.006;
      if (ePos[i * 3 + 1] > 16) ePos[i * 3 + 1] = 0.2;
    }
    eGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove);
    scene.traverse((o) => { o.geometry?.dispose?.(); const m = o.material; (Array.isArray(m) ? m : m ? [m] : []).forEach((x) => { x.map?.dispose?.(); x.dispose(); }); });
    renderer.dispose(); renderer.domElement.remove();
  };
}
