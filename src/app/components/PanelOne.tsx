import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

export default function PanelOne({ data }) {
    // Extract the car make from the passed data
    const carMake = data?.make;
    // Load the car model using the useGLTF hook
    const CarModel = () => {
        const { scene } = useGLTF('./models/tesla_model_s_plaid_2023.glb');
        return (
            <primitive
                object={scene}
                scale={0.01}
                position={[0, -0.3, 0]} // Adjust position as needed
                rotation={[0, - Math.PI /2, 0]} // Adjust rotation as needed
            />
        );
    };

    return (
        <Box sx={{
            display: 'flex',       // Enables flexbox
            flexDirection: 'column', // Stack children vertically
            flex: 1.5,               // Allows the box to expand
            bgcolor: '#1e1e1e',
            borderRadius: 10,
            color: 'white',
            overflowY: 'auto',     // Add if you want the box itself to be scrollable, adjusting as necessary
          }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'left', color: 'white', p: 2 }}>
              {carMake ? carMake : 'Loading...'}
            </Typography>
          
            <Box sx={{ height: 300, width: '100%' }}> {/* Fixed height for the canvas container */}
              <Canvas>
                <PerspectiveCamera makeDefault fov={20} position={[0, 0, 4]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} />
                <Suspense fallback={null}>
                  <CarModel />
                </Suspense>
                <OrbitControls target={[0, 0, 0]} enableZoom={true} />
              </Canvas>
            </Box>
          
            <Box sx={{ flex: 1, bgcolor: '#171717', borderRadius: '100px 100px 0 0' }}>
              {/* Add curvature to the top edge; the values are "top-left top-right bottom-right bottom-left" */}
              {/* Content for the second box; this box will take up the remaining space */}
            </Box>
          </Box>
    );
}
