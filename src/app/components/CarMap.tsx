import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { renderToString } from 'react-dom/server';

// Create a custom icon using the DirectionsCar MUI Icon
const carIconHtml = renderToString(<DirectionsCarFilledOutlinedIcon style={{ fontSize: 60, color: 'white' }} />);
const carIcon = L.divIcon({
  html: carIconHtml,
  className: '',
  iconSize: [60, 60], // Adjust size as needed
  iconAnchor: [30, 30], // Adjust anchor as needed
});

function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15, { duration: 2 });
  }, [position]);
  return null;
}

export default function CarMap({ position }) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: 10 }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <Marker position={position} icon={carIcon}>
        <Popup>Your Vehicle's Current Location</Popup>
      </Marker>
      <FlyToLocation position={position} />
    </MapContainer>
  );
}