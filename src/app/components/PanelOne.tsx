import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function PanelOne() {
  // Load the car model using the useGLTF hook
  const CarModel = () => {
    const { scene } = useGLTF('./models/tesla_model_s_plaid_2023.glb');
    return <primitive object={scene} scale={0.02} />;
  };

  return (
    <Box sx={{ flex: 1, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} />
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </Box>
  );
}