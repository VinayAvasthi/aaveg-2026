import { useCallback, useState } from 'react';
import Forest3D from './Forest3D.jsx';
import FallbackForest from './FallbackForest.jsx';

export default function CastleScrollCanvas({ progressRef }) {
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);
  if (failed) return <FallbackForest />;
  return <Forest3D progressRef={progressRef} onFail={onFail} />;
}
