import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CarMap from './CarMap';
import DataButtons from './DataButtons';

interface DataType {
  [key: string]: number | string;
}

interface DataEntry {
  name: string;
  value: number | string;
}

export default function PanelTwo({ data }: { data: DataType | null }) {
  const [position, setPosition] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setPosition([parseFloat(data.latitude.toString()), parseFloat(data.longitude.toString())]);
    }
  }, [data]);

  const keyToName: { [key: string]: string } = {
    'NSAT': '# of Satellites',
    'lowVoltageBatteryCurrentVoltage': 'Voltage',
    'obdBarometricPressure': 'Pressure',
    'obdIntakeTemp': 'Intake Temp',
    'engineMAF': 'Engine MAF',
    'engineTPS': 'Engine TPS',
  };

  const filteredKeys = Object.keys(keyToName);
  const filteredData: DataEntry[] = data
    ? Object.entries(data)
        .filter(([key]) => filteredKeys.includes(key))
        .map(([key, value]) => ({ name: keyToName[key], value }))
    : [];

  if (!position) {
    return (
      <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
        <Typography variant="h6">Loading map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flex: 3, 
      bgcolor: 'rgba(30, 30, 30, 0.9)',  // Semi-transparent background for glassmorphism
      borderRadius: 10, 
      p: 3, 
      color: 'white', 
      overflowY: 'auto',
      backdropFilter: 'blur(10px)',    // Blur effect for glassmorphism
      border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border for a frosted glass effect
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',   // Optional: Add some depth with a light shadow
    }}>
      <Box sx={{ 
        height: 400, 
        borderRadius: 10, 
        bgcolor: 'rgba(30, 30, 30, 0.5)',  // Apply glassmorphism to the inner box as well
        backdropFilter: 'blur(10px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' 
      }}>
        <CarMap position={position} />
      </Box>
      <DataButtons data={filteredData} />
    </Box>
  );
}
