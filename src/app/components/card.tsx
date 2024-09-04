import React from 'react';
import { Box, Typography } from '@mui/material';

interface CardProps {
    title: string;
    value: number | string;
}

export default function Card({ title, value }: CardProps) {
    return (
        <Box sx={{ bgcolor: '#2c2c2c', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
                {value}
            </Typography>
        </Box>
    );
}
