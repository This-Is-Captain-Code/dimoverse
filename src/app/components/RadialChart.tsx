import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamically import Chart to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadialChart = ({ 
  value, 
  label, 
  valueColor, 
  labelColor, 
  chartHeight, 
  chartWidth, 
  fontSizeValue, 
  hollowSize, 
  trackStrokeWidth 
}) => {

  const [chartData, setChartData] = useState({
    value: 0,
    label: '',
  });

  useEffect(() => {
    // Validate the value and label before rendering the chart
    if (value !== undefined && label !== undefined) {
      setChartData({ value, label });
    }
  }, [value, label]);

  const generateChartOptions = () => ({
    series: [chartData.value],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: hollowSize,
          background: 'rgba(23, 23, 23, 0)',
        },
        track: {
          background: 'rgba(23, 23, 23, 10)',
          strokeWidth: trackStrokeWidth,
        },
        dataLabels: {
          name: { color: labelColor, fontSize: '15px' },
          value: { 
            formatter: (val) => parseInt(val), 
            color: valueColor, 
            fontSize: fontSizeValue 
          }
        }
      }
    },
    fill: { type: 'gradient', gradient: { stops: [0, 100] } },
    stroke: { lineCap: 'round' },
    labels: [chartData.label],
  });

  if (!chartData.value || !chartData.label) {
    return <div>Loading...</div>; // Handle loading state while data is being prepared
  }

  return (
    <Box
      sx={{
        height: `${chartHeight}px`,
        width: `${chartWidth}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px',
      }}
    >
      <Chart
        options={generateChartOptions()}
        series={[chartData.value]}
        type="radialBar"
        height={chartHeight}
        width={chartWidth}
      />
    </Box>
  );
};

export default RadialChart;
