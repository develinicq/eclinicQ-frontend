
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import customMarker from './customMarker';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in leaflet for Vite/ESM
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={customMarker} />
  );
};

const MapLocation = ({
  className = '',
  heightClass = 'h-[300px]',
  addButtonLabel = 'Add Location',
  captionText,
  onChange, // callback to return lat/lng
  initialPosition = null, // [lat, lng] to show initial marker
}) => {
  const [position, setPosition] = useState(initialPosition);

  const handleSetPosition = (pos) => {
    setPosition(pos);
    if (onChange) onChange({ lat: pos[0], lng: pos[1] });
  };

  // Update position when initialPosition changes
  React.useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return (
    <div className={`w-full ${heightClass} bg-gray-100 border border-gray-300 rounded-lg relative overflow-hidden ${className}`}>
      <style>{`.leaflet-control-attribution { display: none !important; }`}</style>
      <MapContainer
        center={position || [20.5937, 78.9629]} // Centered on position or India
        zoom={position ? 13 : 5} // Zoom in if position exists
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        key={position ? `${position[0]}-${position[1]}` : 'default'} // Force re-render on position change
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={handleSetPosition} />
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000]">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          {addButtonLabel}
        </button>
      </div>
      {captionText && (
        <div className="absolute bottom-4 left-4 text-sm text-gray-600 z-[1000]">
          {captionText}
        </div>
      )}
  {/* Latitude and longitude display removed as per user request */}
    </div>
  );
};

export default MapLocation;
