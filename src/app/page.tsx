"use client";
import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

export default function Page() {
    const [data, setData] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false); // State to check if we are on the client

    useEffect(() => {
        // Check if window is defined to make sure it's only run on the client side
        setIsClient(true);
        
        async function fetchData() {
            const response = await fetch('/api/telemetry');
            const result = await response.json();
            setData(result);
        }

        if (typeof window !== 'undefined') {
            fetchData();

            // Mouse move event listener
            const handleMouseMove = (e: MouseEvent) => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    // Memoize the background gradient to avoid unnecessary re-renders
    const backgroundStyle = useMemo(() => ({
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 56, 56, 0.8), rgba(30, 30, 30, 0.5), rgba(17, 17, 17, 0.5))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: `0 0 50px rgba(255, 255, 255, 0.1)`,
        transition: 'background 0.2s ease-out, box-shadow 0.2s ease-out',
        mixBlendMode: 'screen',
        minHeight: '100%', // Ensure it covers the content height dynamically
        minWidth: '100vw'  // Ensure full width
    }), [mousePosition]);

    if (!isClient) {
        // Don't render anything server-side if it depends on window
        return null;
    }

    return (
        <Box sx={{ ...backgroundStyle, display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2, boxSizing: 'border-box' }}>
                <Header data={data} />
                <MainContent data={data} />
            </Box>
        </Box>
    );
}
