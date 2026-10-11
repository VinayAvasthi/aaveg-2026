import { useEffect, useRef } from 'react';

export default function Forest3D({ progressRef, onFail }) {
  const mount = useRef(null);
  useEffect(() => {
    let disposed = false, cleanup = () => {};
    (async () => {
      try {
        const [THREE, utils] = await Promise.all([
          import('three'),
          import('three/examples/jsm/utils/BufferGeometryUtils.js'),
          document.fonts?.load('400 200px Anton').catch(() => {}),
        ]);
        const { createForest } = await import('../scene/forestScene.js');
        if (disposed) return;
        cleanup = createForest(THREE, utils.mergeGeometries, mount.current, progressRef);
      } catch (err) {
        console.warn('3D scene unavailable, using fallback:', err);
        if (!disposed) onFail();
      }
    })();
    return () => { disposed = true; cleanup(); };
  }, []); // eslint-disable-line
  return <div ref={mount} className="forest-canvas" aria-hidden="true" />;
}
