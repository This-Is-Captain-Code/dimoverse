import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PanelTwo({ data }) {
  const [position, setPosition] = useState(undefined);

  useEffect(() => {
    // Using parseFloat to correctly process latitude and longitude as numbers
    if (data?.latitude && data?.longitude) {
      setPosition([parseFloat(data.latitude), parseFloat(data.longitude)]);
    }
  }, [data]); // This effect runs whenever 'data' changes

  // Render a loading state or null if the position is not yet available
  if (!position) {
    return (
      <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 2, color: 'white', overflowY: 'auto' }}>
        <Typography variant="h6">Loading map...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 3, bgcolor: '#1e1e1e', borderRadius: 10, p: 3, color: 'white', overflowY: 'auto' }}>
      <Box sx={{ height: 400, borderRadius: 10 }}>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}