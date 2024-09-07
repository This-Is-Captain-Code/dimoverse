import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Handjet } from 'next/font/google';

const handjet = Handjet({
    subsets: ['latin'],
    weight: ['300', '300'],
  });

export default function Header({ data }: { data: any }) {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [carExteriorTemperatureString, setCarExteriorTemperatureString] = useState('');

    useEffect(() => {
        if (data?.signals?.exteriorAirTemperature?.value !== undefined) {
            setCarExteriorTemperatureString(String(data.signals.exteriorAirTemperature.value));
        }
    }, [data]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            setCurrentTime(timeString);
            setCurrentDate(dateString);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 3, pb: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: handjet.style.fontFamily }}>{currentTime}</Typography>
                <Typography variant="h5" sx={{ color: '#aaa', fontFamily: handjet.style.fontFamily }}>{currentDate}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'light', fontFamily: handjet.style.fontFamily }}>
                    Exterior Temperature: {carExteriorTemperatureString || 'Loading...'}°F
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#333', color: 'white', borderRadius: 1 }}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}
