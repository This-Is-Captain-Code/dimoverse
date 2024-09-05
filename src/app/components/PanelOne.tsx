import React, { Suspense, useRef, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import Speedometer from './Speedometer';
import Chart from 'react-apexcharts';

export default memo(function PanelOne({ data }) {
    // Extract the car data from the passed props
    const carMake = data?.make;
    const carModel = data?.model;
    const carYear = data?.year;
    const carSpeed = data?.speed;
    const carRPM = data?.obdEngineLoad;
    const carFuel = data?.fuelSystemRelativeLevel;
    const carDistance = data?.transmissionTravelledDistance;

    const chartHeight = 180; // Adjust height as needed
    const chartWidth = '210px'; // Fixed width for each chart
    const fontSizeValue = '20px'; // Adjust font size as needed
    const trackStrokeWidth = '90%'; // Thickness of the track
    const hollowSize = '90%'; // Size of the hollow area

    const chartValues = [
        { value: carFuel, label: 'Fuel' , valueColor: 'rgb(161, 209, 241)', labelColor: 'rgb(161, 209, 241)'},
        { value: carDistance, label: 'Distance' , valueColor: 'rgb(193, 254, 212)', labelColor: 'rgb(193, 254, 212)'},
        { value: carRPM, label: 'RPM', valueColor: 'rgb(149, 205, 244)', labelColor: 'rgb(149, 205, 244)'}
    ];

    const generateChartOptions = (value, label, valueColor, labelColor) => ({
        series: [value],
        chart: {
            height: chartHeight,
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: hollowSize,
                    background: 'rgba(23, 23, 23, 0)',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: 'rgba(23, 23, 23, 10)',
                    strokeWidth: trackStrokeWidth,
                    margin: 0,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: labelColor,
                        fontSize: '15px', // Adjust label font size here
                        fontFamily: 'Verdana', // Set font family here
                        fontWeight: 10 // Set font weight here
                    },
                    value: {
                        formatter: function(val) {
                            return parseInt(val);
                        },
                        color: valueColor,
                        fontSize: fontSizeValue, // Adjust value font size here
                        fontFamily: 'Verdana', // Set font family here
                        fontWeight: 500, // Set font weight here
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
        legend: {
            show: false, // Disable the legend if not needed
        }
    });


    // Load the car model and apply rotation
    const CarModel = memo(() => {
        const { scene } = useGLTF('./models/tesla_model_s_plaid_2023.glb');
        const modelRef = useRef();

        useFrame(() => {
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.0008; // Adjust speed as needed
            }
        });

        return (
            <primitive
                object={scene}
                scale={0.01}
                position={[0, -0.3, 0]} // Adjust position as needed
                rotation={[0, -Math.PI / 2, 0]} // Adjust initial rotation as needed
                ref={modelRef}
            />
        );
    });

    return (
        <Box sx={{
            display: 'flex',       // Enables flexbox
            flexDirection: 'column', // Stack children vertically
            flex: 1.2,               // Allows the box to expand
            bgcolor: 'rgba(30, 30, 30, 0.9)', // Semi-transparent background for glassmorphism
            borderRadius: 10,
            color: 'white',
            overflowY: 'auto',     // Add if you want the box itself to be scrollable, adjusting as necessary
            backdropFilter: 'blur(10px)',    // Blur effect for glassmorphism
            border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border for a frosted glass effect
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',   // Optional: Add some depth with a light shadow
        }}>
            <Typography
                variant="h4"
                sx={{ mb: 2, textAlign: 'left', color: 'white', p: 3 }}
            >
                {/* Car Make */}
                <Typography
                    variant="h5"
                    component="span"
                    sx={{ display: 'inline', color: 'white' }}
                >
                    {carMake ? `${carMake} ` : 'Loading...'}
                </Typography>

                {/* Car Model */}
                <Typography
                    variant="h5"
                    component="span"
                    sx={{ display: 'inline', color: 'lightgrey' }}
                >
                    {carModel ? `${carModel} ` : ' '}
                </Typography>

                {/* Car Year */}
                <Typography
                    variant="body2"
                    component="span"
                    sx={{ display: 'inline', color: 'grey' }}
                >
                    {carYear ? `${carYear} ` : ' '}
                </Typography>
            </Typography>
        
            <Box sx={{ height: 300, width: '100%' }}> {/* Fixed height for the canvas container */}
                <Canvas>
                    <PerspectiveCamera makeDefault fov={20} position={[0, 0, 4]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[100, 100, 100]} />
                    <Suspense fallback={null}>
                        <CarModel />
                    </Suspense>
                    <OrbitControls target={[0, 0, 0]} enableZoom={true} />
                </Canvas>
            </Box>
        
            <Box sx={{ flex: 1, bgcolor: 'rgba(23, 23, 23, 0.4)', borderRadius: '100px 100px 0 0', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                {/* ApexCharts Radial Bar Chart */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 'auto',
                        gap: '10px', // Adjust spacing between charts
                        overflowX: 'auto', // Handle overflow if needed
                        boxSizing: 'border-box', // Ensure padding and borders are included in width
                        padding: 0, // Remove any default padding
                        margin: 0, // Remove any default margin
                    }}
                >
                    {chartValues.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: chartWidth,
                                height: chartHeight,
                                overflow: 'hidden', // Hide overflow within each chart box
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Chart 
                                options={generateChartOptions(item.value, item.label, item.valueColor, item.labelColor)} 
                                series={[item.value]} 
                                type="radialBar" 
                                height={chartHeight} 
                                width={chartWidth} 
                            />
                        </Box>
                    ))}
                </Box>
                
                {/* Speedometer */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <Speedometer speed={carSpeed} imageSize="200px" />
                </Box>
            </Box>
        </Box>
    );
});
