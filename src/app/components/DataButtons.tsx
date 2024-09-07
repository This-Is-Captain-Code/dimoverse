// Import React, Box, Typography, Button, and styled from MUI
import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

// Import various icons from MUI Icons
import SatelliteIcon from '@mui/icons-material/Satellite';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import TemperatureHighIcon from '@mui/icons-material/DevicesOther'; // Placeholder for Intake Temp
import AirIcon from '@mui/icons-material/Air'; // Placeholder for MAF
import TuneIcon from '@mui/icons-material/Tune'; // Placeholder for TPS
import PressureIcon from '@mui/icons-material/Speed'; // Placeholder as there's no direct Pressure icon
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Placeholder for Altitude or Location
import LockIcon from '@mui/icons-material/Lock'; // Placeholder for Redacted info & Security states
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import OilBarrelIcon from '@mui/icons-material/LocalGasStation'; // Placeholder for Oil Level
import ElectricCarIcon from '@mui/icons-material/ElectricCar'; // For Range, Type, or general vehicle info
import PowerIcon from '@mui/icons-material/Power';
import TimerIcon from '@mui/icons-material/AccessTime';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Handjet } from 'next/font/google';

const handjet = Handjet({
  subsets: ['latin'],
  weight: ['100', '300'],
});

// Styled GlassButton definition
const GlassButton = styled(Button)({
  background: '#1a1a1a',
  borderRadius: '10px',
  color: 'white',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '8px 16px',
});

// Mapping each data entry key to its corresponding MUI icon
const iconMapping = {
  'Satellites': SatelliteIcon,
  'Voltage': BatteryChargingFullIcon,
  'Pressure': PressureIcon,
  'Intake Temp': TemperatureHighIcon,
  'MAF': AirIcon,
  'TPS': TuneIcon,
  'Front Left Tire': BarChartIcon,
  'Front Right Tire': BarChartIcon,
  'Rear Left Tire': BarChartIcon,
  'Rear Right Tire': BarChartIcon,
  'Altitude': LocationOnIcon,
  'Redacted': LockIcon,
  'HDOP': LockIcon,
  'SSID': WifiIcon,
  'WPA State': LockIcon,
  'Engine Load': BarChartIcon,
  'Run Time': TimerIcon,
  'Coolant Temp': TemperatureHighIcon,
  'Engine Speed': SpeedIcon,
  'Fuel Types': LocalGasStationIcon,
  'Range': ElectricCarIcon,
  'Type': ElectricCarIcon,
  'Charge Limit': BatteryChargingFullIcon,
  'Charging': PowerIcon,
  'Power': PowerIcon,
  'Battery SOC': BatteryStdIcon,
  'Oil Level': OilBarrelIcon,
  'Oil Relative': OilBarrelIcon,
};

export default function DataButtons({ data }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 1,
        marginTop: 0,
        gridAutoRows: 'min-content',
        maxHeight: 'calc(80px * 2 + 32px)', // Adjust height to fit two rows of buttons
        overflowY: 'auto', // Enable scrolling if more than two rows
        padding: '0 16px', // Optional padding for better layout
      }}
    >
      {data.map(({ name, value }) => {
        const IconComponent = iconMapping[name] || SatelliteIcon;
        return (
          <Box key={name} sx={{ flex: 2, mb: 0 }}>
            <GlassButton fullWidth variant="contained" sx={{border: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <IconComponent sx={{ color: '#FFFFFF', mr: 2, alignSelf: 'center' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 0, justifyContent: 'center', textAlign: 'left' }}>
                <Typography font='Roboto' fontWeight='light' sx={{ color: '#FFFFFF', textTransform: 'none', fontFamily: handjet.style.fontFamily, fontSize: '1.5rem', fontWeight: 'Bold' }}>
                  {name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF', textTransform: 'none', fontFamily: handjet.style.fontFamily, fontSize: '1.5rem' }}>
                  {value}
                </Typography>
              </Box>
            </GlassButton>
          </Box>
        );
      })}
    </Box>
  );
}