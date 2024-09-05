import React, { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const CarModel = memo(() => {
  const { scene } = useGLTF('/models/lexus_lc-500.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.01}
      position={[0, -2, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      ref={modelRef}
    />
  );
});

export default CarModel;
