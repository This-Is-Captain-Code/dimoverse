import React from 'react';
import { Box, Typography } from '@mui/material';
import { Font } from 'three/examples/jsm/Addons.js';
import { Handjet } from 'next/font/google';

const handjet = Handjet({
    subsets: ['latin'],
    weight: ['100', '300'],
  });
  

export default function Speedometer({ speed, imageSize }) {
    // Calculate the rotation angle of the needle based on the speed
    const needleRotation = (speed / 100) * 180 - 90; // Mapping speed to 0-180 degrees

    return (
        <Box
            sx={{
                position: 'relative',
                width: '200px',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //marginBottom: '40px', // Add margin to move the Speedometer lower
            }}
        >
            {/* Speedometer background image */}
            <Box
                sx={{
                    position: 'absolute',
                    width: imageSize || '300px',
                    height: imageSize || '300px',
                    backgroundImage: `url(/images/speedometer.png)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: '2px',
                    height: '40%',
                    backgroundColor: '#8ebbd8',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${needleRotation}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: '150px',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="Consolas"
                    component="div"
                    sx={{
                        color: 'white',
                        fontSize: '35px',
                        fontFamily: handjet.style.fontFamily,
                        fontWeight: '300',
                    }}
                >
                    {speed}
                </Typography>
                <Typography
                    component="div"
                    sx={{
                        color: 'white',
                        fontFamily: handjet.style.fontFamily,

                        //fontSize: '0.875rem', // Adjust the font size as needed
                    }}
                >
                    km/hr
                </Typography>
            </Box>
        </Box>
    );
}
