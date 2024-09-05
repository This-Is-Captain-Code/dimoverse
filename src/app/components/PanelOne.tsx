import React, { Suspense, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas  } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Speedometer from './Speedometer';
import RadialChart from './RadialChart';
import CarModel from './CarModel';
import { DirectionalLight } from 'three';

const PanelOne = memo(({ data }) => {
  const { make: carMake, model: carModel, year: carYear, speed: carSpeed, obdEngineLoad: carRPM, fuelSystemRelativeLevel: carFuel, transmissionTravelledDistance: carDistance } = data || {};

  const chartValues = [
    { value: carFuel, label: 'Fuel', valueColor: 'rgb(161, 209, 241)', labelColor: 'rgb(161, 209, 241)' },
    { value: carDistance, label: 'Distance', valueColor: 'rgb(193, 254, 212)', labelColor: 'rgb(193, 254, 212)' },
    { value: carRPM, label: 'RPM', valueColor: 'rgb(149, 205, 244)', labelColor: 'rgb(149, 205, 244)' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1.2, bgcolor: 'rgba(30, 30, 30, 0.9)', borderRadius: 10, color: 'white', overflowY: 'auto', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'left', color: 'white', p: 3 }}>
        <Typography variant="h5" component="span" sx={{ display: 'inline', color: 'white' }}>
          {carMake + ' ' || 'Loading...'}
        </Typography>
        <Typography variant="h5" component="span" sx={{ display: 'inline', color: 'lightgrey' }}>
          {carModel + '' || ' '}
        </Typography>
        <Typography variant="body2" component="span" sx={{ display: 'inline', color: 'grey' }}>
          {' '+carYear|| ' '}
        </Typography>
      </Typography>

      <Box sx={{ height: 300, width: '100%' }}>
        <Canvas>
          <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
          <ambientLight intensity={2} />
          <pointLight position={[100, 100, 100]} />
          <directionalLight color = 'white' intensity = {20}/>
          <Suspense fallback={null}>
            <CarModel />
          </Suspense>
          <OrbitControls target={[0, 0, 0]} enableZoom />
        </Canvas>
      </Box>

      <Box sx={{ flex: 1, bgcolor: 'rgba(23, 23, 23, 0.4)', borderRadius: '100px 100px 0 0', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', overflowX:'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '150px', width: '200px', gap: '0px', overflowX: 'none', pl: 17.6, margin: 0 }}>
            {chartValues.map((item, index) => (
                <RadialChart
                    key={index}
                    value={item.value}
                    label={item.label}
                    valueColor={item.valueColor}
                    labelColor={item.labelColor}
                    chartHeight={200}  // Control height here
                    chartWidth={180}   // Control width here
                    fontSizeValue={'20px'}
                    hollowSize={'70%'}
                    trackStrokeWidth={'50%'}
                />
            ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Speedometer speed={carSpeed} imageSize="200px" />
        </Box>
      </Box>
    </Box>
  );
});

export default PanelOne;
