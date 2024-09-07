import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { renderToString } from 'react-dom/server';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Handjet } from 'next/font/google';

const handjet = Handjet({
  subsets: ['latin'],
  weight: ['100', '300'],
});


// Create a custom icon for the car
const carIconHtml = renderToString(<DirectionsCarFilledOutlinedIcon style={{ fontSize: 60, color: 'white' }} />);
const carIcon = L.divIcon({
  html: carIconHtml,
  className: '',
  iconSize: [60, 60],
  iconAnchor: [30, 30],
});

function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo(position, 15, { duration: 10 });
    }
  }, [position, map]);

  return null;
}

function RoutingMachine({ pointA, pointB }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !pointA || !pointB) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pointA), L.latLng(pointB)],
      routeWhileDragging: true,
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: '#00bfa5', weight: 4 }],
      },
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        try {
          routingControl.getPlan().setWaypoints([]);
          map.removeControl(routingControl);
        } catch (error) {
          console.error("Error cleaning up routing control:", error);
        }
      }
    };
  }, [map, pointA, pointB]);

  return null;
}

export default function CarMap({ position }) {
  const [flyToLocation, setFlyToLocation] = useState(position);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    // Fetch trips from the API
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips/');
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleTripSelection = (event) => {
    const selectedTripId = event.target.value;
    const trip = trips.find(t => t.id === selectedTripId);
    if (trip) {
      setSelectedTrip({
        pointA: [trip.start.location.latitude, trip.start.location.longitude],
        pointB: [trip.end.location.latitude, trip.end.location.longitude],
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Map Container */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ height: '100%', width: '100%', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <Marker position={position} icon={carIcon}>
              <Popup>Your Vehicle's Current Location</Popup>
            </Marker>

            {/* Fly to the current flyToLocation when updated */}
            <FlyToLocation position={flyToLocation} />

            {/* Draw the route between pointA and pointB */}
            {selectedTrip && (
              <RoutingMachine pointA={selectedTrip.pointA} pointB={selectedTrip.pointB} />
            )}
          </MapContainer>
        </Box>
      </Box>

      {/* Dropdown Menu */}
      <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl variant="filled" sx={{ minWidth: 200 }}>
          <InputLabel sx={{color:'#97d3fe', fontFamily: handjet.style.fontFamily, fontSize: '1.2rem', fontWeight:'bold'}}>Recent Trips</InputLabel>
          <Select defaultValue="" onChange={handleTripSelection} sx={{color:'white', fontFamily: handjet.style.fontFamily, fontSize: '1.4rem', fontWeight:'400'}}>
            {trips.map((trip) => (
              <MenuItem key={trip.id} value={trip.id} sx={{backgrounColor:'black', fontFamily: handjet.style.fontFamily, fontSize: '1.2rem', fontWeight:'light'}}>
                {`Trip ID:${trip.id}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}