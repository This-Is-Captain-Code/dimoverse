import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CarMap from './CarMap';
import DataButtons from './DataButtons';

interface DataType {
  [key: string]: any;
}

interface DataEntry {
  name: string;
  value: number | string;
}

export default function PanelTwo({ data }: { data: DataType | null }) {
  const [position, setPosition] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    if (data?.signals?.currentLocationLatitude?.value && data?.signals?.currentLocationLongitude?.value) {
      setPosition([
        parseFloat(data.signals.currentLocationLatitude.value.toString()),
        parseFloat(data.signals.currentLocationLongitude.value.toString())
      ]);
    }
  }, [data]);

  const keyToName: { [key: string]: string } = {
    'dimoAftermarketNSAT': 'Satellites',
    'lowVoltageBatteryCurrentVoltage': 'Voltage',
    'obdBarometricPressure': 'Pressure',
    'obdIntakeTemp': 'Intake Temp',
    'powertrainCombustionEngineMAF': 'MAF',
    'powertrainCombustionEngineTPS': 'TPS',
    'chassisAxleRow1WheelLeftTirePressure': 'Front Left Tire',
    'chassisAxleRow1WheelRightTirePressure': 'Front Right Tire',
    'chassisAxleRow2WheelLeftTirePressure': 'Rear Left Tire',
    'chassisAxleRow2WheelRightTirePressure': 'Rear Right Tire',
    'currentLocationAltitude': 'Altitude',
    'currentLocationIsRedacted': 'Redacted',
    'dimoAftermarketHDOP': 'HDOP',
    'dimoAftermarketSSID': 'SSID',
    'dimoAftermarketWPAState': 'WPA State',
    'obdEngineLoad': 'Engine Load',
    'obdRunTime': 'Run Time',
    'powertrainCombustionEngineECT': 'Coolant Temp',
    'powertrainCombustionEngineSpeed': 'Engine Speed',
    'powertrainFuelSystemSupportedFuelTypes': 'Fuel Types',
    'powertrainRange': 'Range',
    'powertrainType': 'Type',
    'powertrainTractionBatteryChargingChargeLimit': 'Charge Limit',
    'powertrainTractionBatteryChargingIsCharging': 'Charging',
    'powertrainTractionBatteryCurrentPower': 'Power',
    'powertrainTractionBatteryStateOfChargeCurrent': 'Battery SOC',
    'powertrainCombustionEngineEngineOilLevel': 'Oil Level',
    'powertrainCombustionEngineEngineOilRelativeLevel': 'Oil Relative',
  }
  const filteredKeys = Object.keys(keyToName);
  const filteredData: DataEntry[] = data
    ? Object.entries(data.signals || {})
        .filter(([key]) => filteredKeys.includes(key))
        .map(([key, entry]) => ({ name: keyToName[key], value: entry.value }))
    : [];

  if (!position) {
    return (
      <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
        <Typography variant="h6">Loading map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 3, bgcolor: 'rgba(30, 30, 30, 0.9)', borderRadius: 10, p: 3, color: 'white', overflowY: 'auto', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', }}>
      <Box sx={{ height: 400, borderRadius: 10, bgcolor: 'rgba(30, 30, 30, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
        <CarMap position={position} />
      </Box>
      <DataButtons data={filteredData} />
    </Box>
  );
}
