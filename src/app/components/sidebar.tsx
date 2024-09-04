import React from 'react';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import PhoneIcon from '@mui/icons-material/Phone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, pl: 4 }}>
            <IconButton sx={{ bgcolor: '#181818', color: 'white', borderRadius: '50%', width: 75, height: 75 }}>
                <HomeIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: '#181818', color: 'white', borderRadius: '50%', width: 75, height: 75 }}>
                <AppsIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: '#181818', color: 'white', borderRadius: '50%', width: 75, height: 75 }}>
                <PhoneIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: '#181818', color: 'white', borderRadius: '50%', width: 75, height: 75 }}>
                <PlayArrowIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: '#181818', color: 'white', borderRadius: '50%', width: 75, height: 75 }}>
                <SettingsIcon />
            </IconButton>
        </Box>
    );
}
