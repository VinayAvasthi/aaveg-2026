import * as THREE from 'three';

let cachedTextures = null;

export function getPumpkinTextures() {
  if (cachedTextures) return cachedTextures;

  const width = 1024;
  const height = 512;

  // 1. Diffuse / Color Map
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');

  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#561d02');
  baseGrad.addColorStop(0.12, '#a73703');
  baseGrad.addColorStop(0.45, '#d9530b');
  baseGrad.addColorStop(0.82, '#b23d04');
  baseGrad.addColorStop(1, '#461501');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  const numRibs = 10;
  for (let i = 0; i < numRibs; i++) {
    const cx = (i / numRibs) * width;
    const furrowGrad = ctx.createLinearGradient(cx - 24, 0, cx + 24, 0);
    furrowGrad.addColorStop(0, 'rgba(0,0,0,0)');
    furrowGrad.addColorStop(0.5, 'rgba(38, 10, 2, 0.65)');
    furrowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = furrowGrad;
    ctx.fillRect(cx - 24, 0, 48, height);

    const crestX = ((i + 0.5) / numRibs) * width;
    const crestGrad = ctx.createLinearGradient(crestX - 28, 0, crestX + 28, 0);
    crestGrad.addColorStop(0, 'rgba(255, 140, 40, 0)');
    crestGrad.addColorStop(0.5, 'rgba(255, 150, 50, 0.18)');
    crestGrad.addColorStop(1, 'rgba(255, 140, 40, 0)');
    ctx.fillStyle = crestGrad;
    ctx.fillRect(crestX - 28, 0, 56, height);
  }

  ctx.fillStyle = 'rgba(70, 18, 2, 0.15)';
  for (let x = 0; x < width; x += 2) {
    if (Math.sin(x * 13.7) > 0.1) {
      ctx.fillRect(x, 0, 1.2, height);
    }
  }

  for (let p = 0; p < 800; p++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    const pr = Math.random() * 2.5 + 0.8;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(50, 15, 0, 0.15)' : 'rgba(255, 180, 80, 0.12)';
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Carved Face
  const centerX = width * 0.5;
  const centerY = height * 0.54;

  const drawFace = (targetCtx, isEmissive = false) => {
    const leftEye = [
      { x: centerX - 82, y: centerY - 58 },
      { x: centerX - 24, y: centerY - 28 },
      { x: centerX - 42, y: centerY + 18 },
      { x: centerX - 94, y: centerY - 12 },
    ];
    const rightEye = [
      { x: centerX + 82, y: centerY - 58 },
      { x: centerX + 24, y: centerY - 28 },
      { x: centerX + 42, y: centerY + 18 },
      { x: centerX + 94, y: centerY - 12 },
    ];
    const nose = [
      { x: centerX, y: centerY - 6 },
      { x: centerX - 22, y: centerY + 30 },
      { x: centerX + 22, y: centerY + 30 },
    ];
    const mouth = [
      { x: centerX - 120, y: centerY + 58 },
      { x: centerX - 80, y: centerY + 82 },
      { x: centerX - 60, y: centerY + 65 },
      { x: centerX - 35, y: centerY + 92 },
      { x: centerX, y: centerY + 68 },
      { x: centerX + 35, y: centerY + 92 },
      { x: centerX + 60, y: centerY + 65 },
      { x: centerX + 80, y: centerY + 82 },
      { x: centerX + 120, y: centerY + 58 },
      { x: centerX + 95, y: centerY + 115 },
      { x: centerX + 55, y: centerY + 128 },
      { x: centerX, y: centerY + 108 },
      { x: centerX - 55, y: centerY + 128 },
      { x: centerX - 95, y: centerY + 115 },
    ];

    const fillPolygon = (pts, style) => {
      targetCtx.beginPath();
      targetCtx.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) targetCtx.lineTo(pts[k].x, pts[k].y);
      targetCtx.closePath();
      targetCtx.fillStyle = style;
      targetCtx.fill();
    };

    if (!isEmissive) {
      targetCtx.lineWidth = 10;
      targetCtx.strokeStyle = '#ffd269';
      targetCtx.lineJoin = 'miter';
      [leftEye, rightEye, nose, mouth].forEach((pts) => {
        targetCtx.beginPath();
        targetCtx.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) targetCtx.lineTo(pts[k].x, pts[k].y);
        targetCtx.closePath();
        targetCtx.stroke();
      });
      [leftEye, rightEye, nose, mouth].forEach((pts) => fillPolygon(pts, '#160501'));
    } else {
      targetCtx.shadowColor = '#ff4400';
      targetCtx.shadowBlur = 24;
      const flameGrad = targetCtx.createRadialGradient(
        centerX, centerY + 30, 10,
        centerX, centerY + 30, 160
      );
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.2, '#fff285');
      flameGrad.addColorStop(0.55, '#ff7300');
      flameGrad.addColorStop(1, '#ff2200');
      [leftEye, rightEye, nose, mouth].forEach((pts) => fillPolygon(pts, flameGrad));
    }
  };

  drawFace(ctx, false);

  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext('2d');
  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, width, height);
  drawFace(eCtx, true);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  for (let i = 0; i < numRibs; i++) {
    const cx = (i / numRibs) * width;
    const furrowBump = bCtx.createLinearGradient(cx - 20, 0, cx + 20, 0);
    furrowBump.addColorStop(0, '#808080');
    furrowBump.addColorStop(0.5, '#353535');
    furrowBump.addColorStop(1, '#808080');
    bCtx.fillStyle = furrowBump;
    bCtx.fillRect(cx - 20, 0, 40, height);

    const crestX = ((i + 0.5) / numRibs) * width;
    const crestBump = bCtx.createLinearGradient(crestX - 25, 0, crestX + 25, 0);
    crestBump.addColorStop(0, '#808080');
    crestBump.addColorStop(0.5, '#a5a5a5');
    crestBump.addColorStop(1, '#808080');
    bCtx.fillStyle = crestBump;
    bCtx.fillRect(crestX - 25, 0, 50, height);
  }

  bCtx.fillStyle = '#656565';
  for (let x = 0; x < width; x += 4) {
    if (Math.sin(x * 9.1) > 0.3) bCtx.fillRect(x, 0, 1, height);
  }

  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.wrapS = THREE.RepeatWrapping;
  colorTexture.wrapT = THREE.ClampToEdgeWrapping;

  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  emissiveTexture.wrapS = THREE.RepeatWrapping;
  emissiveTexture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  cachedTextures = { colorTexture, emissiveTexture, bumpTexture };
  return cachedTextures;
}

export function createRealisticPumpkinGeometry(radius = 1.0, radialSegments = 54, heightSegments = 30) {
  const geom = new THREE.BufferGeometry();
  const vertices = [];
  const uvs = [];
  const indices = [];

  const hRatio = 0.78;
  const numRibs = 10;
  const ribAmp = 0.155;

  for (let j = 0; j <= heightSegments; j++) {
    const v = j / heightSegments;
    const phi = v * Math.PI;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    let dimpleY = 0;
    if (phi < 0.38) {
      const tTop = 1.0 - phi / 0.38;
      dimpleY = -0.22 * Math.pow(tTop, 2.2) * radius;
    } else if (phi > Math.PI - 0.35) {
      const tBot = 1.0 - (Math.PI - phi) / 0.35;
      dimpleY = 0.16 * Math.pow(tBot, 2.0) * radius;
    }

    const y = (hRatio * cosPhi * radius) + dimpleY;
    const bellyScale = 1.0 + 0.14 * Math.pow(sinPhi, 1.4);
    const rBase = sinPhi * radius * bellyScale;
    const ribFade = Math.pow(sinPhi, 0.55);

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = (u - 0.5) * Math.PI * 2;
      const ribLobe = Math.cos(numRibs * theta) - 0.22 * Math.cos(numRibs * 2 * theta);
      const rRib = rBase * (1.0 + (ribAmp * ribLobe * ribFade));
      const asym = 1.0 + 0.025 * Math.sin(3 * theta + 1.2) * sinPhi;

      const x = rRib * Math.sin(theta) * asym;
      const z = rRib * Math.cos(theta) * asym;

      vertices.push(x, y, z);
      uvs.push(u, 1.0 - v);
    }
  }

  const rowSize = radialSegments + 1;
  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * rowSize + i;
      const b = (j + 1) * rowSize + i;
      const c = (j + 1) * rowSize + (i + 1);
      const d = j * rowSize + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setIndex(indices);
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.computeVertexNormals();
  return geom;
}

export function createRealisticStemGeometry(scale = 1.0) {
  const geom = new THREE.CylinderGeometry(scale * 0.055, scale * 0.11, scale * 0.42, 6, 5);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const progress = (y + scale * 0.21) / (scale * 0.42);
    const bendZ = -Math.pow(progress, 1.6) * (scale * 0.16);
    const bendX = Math.sin(progress * Math.PI) * (scale * 0.04);
    if (progress < 0.25) {
      const flare = (1.0 - progress / 0.25) * 1.5;
      pos.setX(i, pos.getX(i) * flare);
      pos.setZ(i, pos.getZ(i) * flare);
    }
    pos.setX(i, pos.getX(i) + bendX);
    pos.setZ(i, pos.getZ(i) + bendZ);
  }
  geom.computeVertexNormals();
  return geom;
}

export function createRealisticPumpkinModel({
  scale = 1.0,
  includeLight = true,
  lightIntensity = 2.0,
} = {}) {
  const group = new THREE.Group();
  const textures = getPumpkinTextures();

  const bodyMaterial = new THREE.MeshStandardMaterial({
    map: textures.colorTexture,
    bumpMap: textures.bumpTexture,
    bumpScale: 0.035 * scale,
    emissiveMap: textures.emissiveTexture,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 1.8,
    roughness: 0.58,
    metalness: 0.06,
  });

  const bodyGeom = createRealisticPumpkinGeometry(scale);
  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
  group.add(bodyMesh);

  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x222c15,
    roughness: 0.92,
    metalness: 0.04,
  });

  const stemGeom = createRealisticStemGeometry(scale);
  const stemMesh = new THREE.Mesh(stemGeom, stemMaterial);
  stemMesh.position.set(0, scale * 0.72, 0);
  stemMesh.rotation.y = 0.4;
  group.add(stemMesh);

  let innerLight = null;
  if (includeLight) {
    innerLight = new THREE.PointLight(0xff6a00, lightIntensity, scale * 8, 1.8);
    innerLight.position.set(0, scale * 0.1, scale * 0.45);
    group.add(innerLight);
  }

  const update = (time) => {
    if (innerLight) {
      const flicker =
        Math.sin(time * 9.2) * 0.22 +
        Math.cos(time * 17.7) * 0.14 +
        Math.sin(time * 31.4) * 0.08;
      innerLight.intensity = Math.max(0.8, lightIntensity + flicker);
      innerLight.position.x = Math.sin(time * 4.2) * (scale * 0.04);
      innerLight.position.y = (scale * 0.1) + Math.cos(time * 5.8) * (scale * 0.03);
    }
  };

  const dispose = () => {
    bodyGeom.dispose();
    stemGeom.dispose();
    bodyMaterial.dispose();
    stemMaterial.dispose();
  };

  return {
    group,
    bodyMesh,
    stemMesh,
    innerLight,
    update,
    dispose,
  };
}
