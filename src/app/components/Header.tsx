import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Example icon, replace with your preferred icon

export default function Header() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 3,pb: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{currentTime}</Typography>
                <Typography variant="body2" sx={{ color: '#aaa' }}>{currentDate}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: 'white' }}>21°C</Typography>
                <Button variant="contained" sx={{ bgcolor: '#333', color: 'white', borderRadius: 1 }}>
                    Login
                </Button>
                
            </Box>
        </Box>
    );
}
