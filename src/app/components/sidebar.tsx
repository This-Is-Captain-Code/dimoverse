import React from 'react';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import PhoneIcon from '@mui/icons-material/Phone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', pl: 3, pt: 6 }}>
                <Box
                    sx={{
                        bgcolor: '#1818FF00',
                        width: 75,
                        height: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="https://docs.dimo.org/~gitbook/image?url=https%3A%2F%2F1352636538-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FxWyj8cB7196oATKjpruK%252Flogo%252FQvGhYCEddPNQseVD4UZQ%252FDIMO_Logo_White%25403x.png%3Falt%3Dmedia%26token%3D0655c443-c068-4707-a164-144b0afd0186&width=192&dpr=4&quality=100&sign=d8e81576&sv=1"
                        alt="DIMO Logo"
                        style={{ width: '100%', height: '100%'}}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 4, pt: 25 }}>
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
        </Box>
        
    );
}
