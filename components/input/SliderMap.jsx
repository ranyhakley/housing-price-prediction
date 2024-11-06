import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SliderMap = ({ km, onKmChange }) => {
  const cbdCoords = [-37.8136, 144.9631]; // Melbourne CBD coordinates
  const radius = km * 1000; // Convert KM to meters

  return (
    <div>
      {/* Merged SliderField component */}
      <div className="p-4">
        <label className="block font-bold">KM from CBD: {km} km</label>
        <input
          type="range"
          name="KMFromCBD"
          min={1}
          max={100}
          value={km}
          onChange={(e) => onKmChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Leaflet Map */}
      <div className="p-4 mt-5 lg:mt-0 lg:flex-1">
        <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]">
          <MapContainer
            center={cbdCoords}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Circle
              center={cbdCoords}
              radius={radius}
              color="green"
              fillOpacity={0.2}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SliderMap;
