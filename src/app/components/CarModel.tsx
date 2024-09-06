import React, { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const CarModel = memo(({ carMake }) => {
  // List of available car makes
  const availableModels = ['Lexus', 'Mercedes-Benz', 'Subaru', 'Tesla'];

  // Check if the carMake is in the available models, otherwise default to 'Tesla'
  const modelPath = `/models/${availableModels.includes(carMake) ? carMake : 'Tesla'}.glb`;

  const { scene } = useGLTF(modelPath);
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