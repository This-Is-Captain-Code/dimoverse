import React, { Suspense, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Speedometer from './Speedometer';
import CarModel from './CarModel';
import { RadialBarChart, RadialBar, PolarAngleAxis  } from 'recharts';

const PanelOne = memo(({ data }) => {
  const {
    make: carMake,
    model: carModel,
    year: carYear,
    signals: {
      speed: { value: carSpeed } = {},
      powertrainFuelSystemRelativeLevel: { value: carFuel } = {}, // For non-Tesla
      powertrainTransmissionTravelledDistance: { value: carDistance } = {},
      powertrainCombustionEngineMAF: { value: carRPM } = {}, // For non-Tesla
      powertrainRange: { value: carRange } = {}, // For Tesla
      powertrainTractionBatteryChargingChargeLimit: { value: carChargeLimit } = {}, // For Tesla
    } = {}
  } = data || {};

  // Define max values for each type of data
  const maxValues = {
    carFuel: 100,      // 100%
    carDistance: 500,  // Example maximum distance
    carRPM: 8000,      // Max RPM for non-Tesla
    carRange: 400,     // Max range for Tesla
    carChargeLimit: 100 // 100% charge limit
  };

  // Check if the values exist and fall back to 0 if undefined
  const chartValues = carMake === 'Tesla' ? [
    { value: carRange || 0, name: 'Range', max: maxValues.carRange, fill: 'rgb(161, 209, 241)' },
    { value: carDistance || 0, name: 'Distance', max: maxValues.carDistance, fill: 'rgb(193, 254, 212)' },
    { value: carChargeLimit || 0, name: 'Charge Limit', max: maxValues.carChargeLimit, fill: 'rgb(149, 205, 244)' }
  ] : [
    { value: carFuel || 0, name: 'Fuel', max: maxValues.carFuel, fill: 'rgb(161, 209, 241)' },
    { value: carDistance || 0, name: 'Distance', max: maxValues.carDistance, fill: 'rgb(193, 254, 212)' },
    { value: carRPM || 0, name: 'RPM', max: maxValues.carRPM, fill: 'rgb(149, 205, 244)' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1.2, bgcolor: 'rgba(30, 30, 30, 0.9)', borderRadius: 10, color: 'white', overflowY: 'auto', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'left', color: 'white', p: 3 }}>
        <Typography variant="h5" component="span" sx={{ display: 'inline', color: 'white' }}>
          {carMake + ' ' || 'Loading...'}
        </Typography>
        <Typography variant="h5" component="span" sx={{ display: 'inline', color: 'lightgrey' }}>
          {carModel + ' ' || ' '}
        </Typography>
        <Typography variant="body2" component="span" sx={{ display: 'inline', color: 'grey' }}>
          {' ' + carYear || ' '}
        </Typography>
      </Typography>

      <Box sx={{ height: 300, width: '100%' }}>
        <Canvas>
          <PerspectiveCamera makeDefault fov={20} position={[0, 0, 30]} />
          <ambientLight intensity={2} />
          <pointLight position={[100, 100, 100]} />
          <directionalLight color='white' intensity={20} />
          <Suspense fallback={null}>
            <CarModel carMake={carMake} />
          </Suspense>
          <OrbitControls target={[0, 0, 0]} enableZoom />
        </Canvas>
      </Box>

      <Box sx={{ flex: 1, bgcolor: 'rgba(23, 23, 23, 0.4)', borderRadius: '100px 100px 0 0', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', overflowX: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '150px', width: '100%', gap: '0', overflowX: 'auto', pl: 0, pt: 2, margin: 0 }}>
          {/* Radial Chart for each Data Type */}
          {chartValues.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <RadialBarChart
                width={120}
                height={120}
                innerRadius="70%"
                outerRadius="90%"
                barSize={10}
                data={[{ ...item, value: (item.value / item.max) * 100 }]} // Ensure data is structured correctly for RadialBarChart
              >
                <PolarAngleAxis type="number" domain={[0, 100]} hide tick={false}/> {/* Ensure the chart is scaled correctly */}
                <RadialBar
                  minAngle={15}
                  clockWise
                  dataKey="value"
                  cornerRadius={50 / 2} // Optional: Adjust for visual style
                  fill={item.fill}
                  background={{
                    fill: '#222222', // Optional: Adjust background styling
                  }}
                />
              </RadialBarChart>
              <Typography sx={{ color: 'white' }}>{item.name}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: 0 }}>
          <Speedometer speed={Math.round(carSpeed)} imageSize="200px" />
        </Box>
      </Box>
    </Box>
  );
});

export default PanelOne;
