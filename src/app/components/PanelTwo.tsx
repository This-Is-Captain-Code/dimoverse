import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CarMap from './CarMap';
import DataButtons from './DataButtons';

interface DataType {
  [key: string]: number | string;
}

export default function PanelTwo({ data }: { data: DataType | null }) {
  const [position, setPosition] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setPosition([parseFloat(data.latitude.toString()), parseFloat(data.longitude.toString())]);
    }
  }, [data]);

  const filteredKeys = [
    'NSAT',
    'lowVoltageBatteryCurrentVoltage',
    'obdBarometricPressure',
    'obdEngineLoad',
    'obdIntakeTemp',
    'engineMAF',
    'engineSpeed',
    'engineTPS',
    'fuelSystemRelativeLevel',
  ];

  const filteredData = data ? Object.entries(data).filter(([key]) => filteredKeys.includes(key)) : [];

  if (!position) {
    return (
      <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
        <Typography variant="h6">Loading map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 3, color: 'white', overflowY: 'auto' }}>
      <Box sx={{ height: 400, borderRadius: 10 }}>
        <CarMap position={position} />
      </Box>
      <DataButtons data={filteredData} />
    </Box>
  );
}
