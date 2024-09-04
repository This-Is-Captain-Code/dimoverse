// RadialChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

const RadialChart: React.FC<{ series: number[] }> = ({ series }) => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '22px',
            show: true,
          },
        },
      },
    },
    labels: ['Progress'],
  };

  // Let's assume the number you want to display is the first item in the series array
  const displayNumber = series[0];

  return (
    <Box sx={{ textAlign: 'center' }}> {/* Ensures content is centered */}
      <SettingsIcon sx={{ marginBottom: '8px' }} /> {/* Icon */}
      <Typography variant="h6" sx={{ marginBottom: '8px' }}>Progression</Typography>
      <ReactApexChart options={options} series={series} type="radialBar" height="200" />
      <Typography variant="body1">{displayNumber}%</Typography> {/* Display Number */}
    </Box>
  );
};

export default RadialChart;