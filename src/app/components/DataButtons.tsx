import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

interface DataEntry {
  name: string;
  value: number | string;
}

interface DataButtonsProps {
  data: DataEntry[];
}

const GlassButton = styled(Button)({
  background: '#1a1a1a',
  borderRadius: '10px',
  color: 'black',
  backdropFilter: 'blur(10px)',
  // border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
});

export default function DataButtons({ data }: DataButtonsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2,
        marginTop: 4,
      }}
    >
      {data.map(({ name, value }) => (
        <Box key={name} sx={{ flex: 1, mb: 1 }}>
          <GlassButton fullWidth variant="contained" sx={{ height: '120px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography font='Roboto' fontWeight='light' sx={{ color: '#FFFFFF', textTransform: 'none' }}>
                {name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#FFFFFF', textTransform: 'none', marginTop: '4px' }}>
                {value}
              </Typography>
            </Box>
          </GlassButton>
        </Box>
      ))}
    </Box>
  );
}
