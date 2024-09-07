import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from './card';
import PanelOne from './PanelOne';
import PanelTwo from './PanelTwo';

export default function MainContent({ data }) {
    return (
        <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 1 }}>
                    <PanelOne data={data} />
                    <PanelTwo data={data} />
                    {/* <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
                        {data ? (
                            Object.entries(data).map(([key, value]) => (
                                <Card key={key} title={key} value={value} />
                            ))
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
                    </Box> */}
                </Box>
    );
}
