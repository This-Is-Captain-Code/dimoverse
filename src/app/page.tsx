"use client";

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Card from './components/card';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

export default function Page() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/hackathon');
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#121212' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px' }}>
                <Sidebar />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2, boxSizing: 'border-box' }}>
                <Box sx={{pb: 1}}>
                    <Header/>
                </Box>
                <MainContent data={data} />
            </Box>
        </Box>
    );
}
