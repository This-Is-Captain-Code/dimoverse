import React from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const RadialChart = ({ value, label, valueColor, labelColor, chartHeight, chartWidth }) => {
  // Prepare the data in the format required by Recharts
  const data = [
    {
      name: label,
      value: value,
      fill: valueColor
    }
  ];

  const style = {
    top: 0,
    left: 350,
    lineHeight: '24px',
  };

  return (
    <RadialBarChart
      width={chartWidth}
      height={chartHeight}
      cx="50%"
      cy="50%"
      innerRadius="70%"
      outerRadius="100%"
      barSize={10}
      data={data}
    >
      <RadialBar
        minAngle={15}
        label={{ position: 'insideStart', fill: labelColor }}
        background
        clockWise
        dataKey="value"
      />
      <Legend
        iconSize={10}
        width={chartWidth}
        height={chartHeight}
        layout="horizontal"
        verticalAlign="middle"
        align="center"
        wrapperStyle={style}
      />
    </RadialBarChart>
  );
};

export default RadialChart;
