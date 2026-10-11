import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRealisticPumpkinModel } from '../../utils/realisticPumpkin';

export default function ThreeScrollExperience() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const progressRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      progressRef.current = p;
      if (containerRef.current) {
        containerRef.current.style.opacity = Math.min(0.88, 0.4 + (p * 5) * 0.48);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: window.devicePixelRatio <= 1.5,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed in ThreeScrollExperience:', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040508, 0.018);

    const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 250);
    camera.position.set(0, 2.5, 30);

    const ambientLight = new THREE.AmbientLight(0x0a0c12, 1.2);
    scene.add(ambientLight);

    const moonRim = new THREE.DirectionalLight(0x556688, 1.4);
    moonRim.position.set(-6, 22, -45);
    scene.add(moonRim);

    const groundBounce = new THREE.DirectionalLight(0x661100, 1.2);
    groundBounce.position.set(6, 8, 10);
    scene.add(groundBounce);

    const travelLantern = new THREE.PointLight(0xff5500, 1.8, 30, 2);
    travelLantern.position.set(0, 2, 26);
    scene.add(travelLantern);

    const createCleanMoonTexture = () => {
      const size = 512;
      const mCanvas = document.createElement('canvas');
      mCanvas.width = size;
      mCanvas.height = size;
      const ctx = mCanvas.getContext('2d');

      const grad = ctx.createRadialGradient(size / 2, size / 2, 85, size / 2, size / 2, size / 2);
      grad.addColorStop(0, '#FFE8D2');
      grad.addColorStop(0.25, '#FF5500');
      grad.addColorStop(0.6, '#7A0A00');
      grad.addColorStop(0.85, 'rgba(80, 5, 0, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = 'rgba(18, 4, 2, 0.6)';
      const craters = [
        { x: 210, y: 215, r: 45 },
        { x: 290, y: 195, r: 35 },
        { x: 310, y: 275, r: 50 },
        { x: 190, y: 310, r: 38 },
        { x: 250, y: 290, r: 28 },
      ];
      craters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      return new THREE.CanvasTexture(mCanvas);
    };

    const moonTex = createCleanMoonTexture();
    const moonGeom = new THREE.PlaneGeometry(36, 36);
    const moonMat = new THREE.MeshBasicMaterial({
      map: moonTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moonMesh = new THREE.Mesh(moonGeom, moonMat);
    moonMesh.position.set(0, 20, -165);
    scene.add(moonMesh);

    const groundGeom = new THREE.PlaneGeometry(70, 260, 16, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x06070a,
      roughness: 0.95,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.6, -60);
    scene.add(ground);

    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.95,
      metalness: 0.1,
    });
    const pedestalGeom = new THREE.BoxGeometry(2.4, 0.6, 2.4);

    const pumpkinWorld = new THREE.Group();
    const pumpkinModels = [];

    const heroWaypoints = [
      { z: 22, x: -4.8, scale: 1.15, hasPedestal: true },
      { z: 19, x: 4.8, scale: 1.1, hasPedestal: true },
      { z: -12, x: -5.2, scale: 1.25, hasPedestal: true },
      { z: -46, x: 5.4, scale: 1.2, hasPedestal: true },
      { z: -82, x: -5.5, scale: 1.35, hasPedestal: true },
      { z: -118, x: 5.2, scale: 1.3, hasPedestal: true },
    ];

    heroWaypoints.forEach((wp) => {
      const site = new THREE.Group();
      site.position.set(wp.x, -0.3, wp.z);

      if (wp.hasPedestal) {
        const ped = new THREE.Mesh(pedestalGeom, pedestalMat);
        ped.position.y = 0.3;
        site.add(ped);
      }

      const pModel = createRealisticPumpkinModel({
        scale: wp.scale,
        includeLight: true,
        lightIntensity: 2.2,
      });

      pModel.group.position.y = wp.hasPedestal ? 0.6 + (wp.scale * 0.42) : wp.scale * 0.42;
      pModel.group.rotation.y = wp.x < 0 ? 0.45 : -0.45;
      site.add(pModel.group);

      pumpkinModels.push(pModel);
      pumpkinWorld.add(site);
    });

    const kingSite = new THREE.Group();
    kingSite.position.set(-16, -0.2, -150);
    const kingModel = createRealisticPumpkinModel({
      scale: 4.2,
      includeLight: true,
      lightIntensity: 3.8,
    });
    kingModel.group.position.y = 4.2 * 0.42;
    kingModel.group.rotation.y = 0.5;
    kingSite.add(kingModel.group);
    pumpkinModels.push(kingModel);
    pumpkinWorld.add(kingSite);

    scene.add(pumpkinWorld);

    const batGroup = new THREE.Group();
    const bats = [];

    const createMinimalBat = () => {
      const bObj = new THREE.Group();
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.quadraticCurveTo(0.6, 0.4, 1.2, 0.1);
      wingShape.quadraticCurveTo(0.5, -0.2, 0, 0);

      const wingGeom = new THREE.ShapeGeometry(wingShape);
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x050608, side: THREE.DoubleSide });

      const lWing = new THREE.Mesh(wingGeom, wingMat);
      lWing.scale.set(-1, 1, 1);
      lWing.position.set(-0.05, 0, 0);

      const rWing = new THREE.Mesh(wingGeom, wingMat);
      rWing.position.set(0.05, 0, 0);

      bObj.add(lWing);
      bObj.add(rWing);
      bObj.scale.set(0.7, 0.7, 0.7);

      return { bObj, lWing, rWing };
    };

    for (let b = 0; b < 6; b++) {
      const { bObj, lWing, rWing } = createMinimalBat();
      bObj.position.set((Math.random() - 0.5) * 26, 7 + Math.random() * 5, 15 - b * 28);
      batGroup.add(bObj);
      bats.push({
        bObj,
        lWing,
        rWing,
        flapSpeed: 0.015 + Math.random() * 0.005,
        offset: Math.random() * 20,
        driftX: (Math.random() - 0.5) * 0.015,
        driftY: (Math.random() - 0.5) * 0.01,
      });
    }
    scene.add(batGroup);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    let animationId;
    let targetCameraZ = 30;
    let currentCameraZ = 30;
    let currentCameraY = 2.5;

    const renderLoop = (time) => {
      animationId = requestAnimationFrame(renderLoop);
      if (!isVisibleRef.current) return;

      const p = progressRef.current;
      targetCameraZ = 30 - p * 165;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.055;

      const targetY = 2.2 + Math.sin(p * Math.PI * 4) * 0.2;
      currentCameraY += (targetY - currentCameraY) * 0.045;

      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.04;
      m.y += (m.targetY - m.y) * 0.04;

      camera.position.z = currentCameraZ;
      camera.position.x = m.x * 1.1;
      camera.position.y = currentCameraY - m.y * 0.4;
      camera.rotation.y = -m.x * 0.03;
      camera.rotation.x = m.y * 0.02;

      travelLantern.position.set(camera.position.x, camera.position.y - 0.3, currentCameraZ - 5);
      travelLantern.intensity = 1.8 + Math.sin(time * 0.012) * 0.3;

      pumpkinModels.forEach((p) => {
        p.update(time * 0.001);
      });

      bats.forEach((bat) => {
        const flap = Math.sin(time * bat.flapSpeed + bat.offset) * 0.42;
        bat.lWing.rotation.z = -flap;
        bat.rWing.rotation.z = flap;
        bat.bObj.position.x += bat.driftX;
        bat.bObj.position.y += bat.driftY;
      });

      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      renderer.dispose();
      moonGeom.dispose();
      moonMat.dispose();
      groundGeom.dispose();
      groundMat.dispose();
      pedestalGeom.dispose();
      pedestalMat.dispose();
      pumpkinModels.forEach((p) => p.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: 0.4,
        transition: 'opacity 0.3s ease-out',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5, 6, 8, 0.72) 80%, #050608 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
