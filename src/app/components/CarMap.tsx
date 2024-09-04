import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CarMapProps {
  position: [number, number];
}

const carIcon = new L.DivIcon({
  html: `<div style="color: white; font-size: 60px;"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.92 6.01C18.72 5.42 18.14 5 17.5 5h-11c-.64 0-1.22.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-4.99zM6.5 7h11l1.16 3H5.34L6.5 7zM19 16H5v-4h14v4zM7.5 14c-.83 0-1.5.67-1.5 1.5S6.67 17 7.5 17s1.5-.67 1.5-1.5S8.33 14 7.5 14zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill="white"/></svg></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function CarMap({ position }: CarMapProps) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: 10 }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <Marker position={position} icon={carIcon}>
        <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
}
