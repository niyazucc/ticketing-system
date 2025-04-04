import React, { useState, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import tickets from '../data/tickets';
import { SearchBox } from '@mapbox/search-js-react';
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapComponent({ ticket, isUpdate, onLocationChange }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const mapRef = useRef(); // Reference for the react-map-gl map

    const defaultLocation = {
        latitude: 3.139, // Kuala Lumpur
        longitude: 101.6869,
        zoom: 12,
    };

    const mapCenter = ticket?.location
        ? { latitude: ticket.location.lat, longitude: ticket.location.lng, zoom: 15 }
        : defaultLocation;

        const handleSearchResult = (result) => {
            if (!result || !result.features || result.features.length === 0) {
                console.error("Invalid search result:", result);
                return;
            }
        
            const feature = result.features[0]; // Get first search result
            const coordinates = feature.geometry?.coordinates; // Use geometry.coordinates instead of center
        
            if (!coordinates || coordinates.length < 2) {
                console.error("No valid coordinates found in result:", feature);
                return;
            }
        
            const newCoords = { lat: coordinates[1], lng: coordinates[0] };
        
            // Update parent component with new location
            if (onLocationChange) {
                onLocationChange({
                    target: { name: "location", value: newCoords }
                });
            }
        
            // Move the map to the new location
            mapRef.current?.flyTo({ center: coordinates, zoom: 15 });
        };
        


    return (
        <div style={{ position: "relative" }}>
            {/* Search Box for Location */}
            <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, width: "300px", background: "white" }}>
                <SearchBox
                    accessToken={MAPBOX_TOKEN}
                    map={mapRef.current} // Connects search with the map
                    mapboxgl={mapboxgl}
                    onRetrieve={handleSearchResult} // Handles selected search result
                    placeholder="Search for a location..."
                />
            </div>

            <Map
                ref={mapRef} // Store map instance in ref
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={mapCenter}
                style={{ width: "100%", height: "400px", borderRadius: "10px" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                {/* If ticket exists, show single marker */}
                {ticket && (
                    <Marker
                        key={ticket.id}
                        longitude={ticket.location.lng}
                        latitude={ticket.location.lat}
                        color="red"
                        draggable={isUpdate}
                        onDragEnd={(e) => {
                            const newCoords = { lat: e.lngLat.lat, lng: e.lngLat.lng };
                            if (onLocationChange) {
                                onLocationChange({ target: { name: "location", value: newCoords } });
                            }
                        }}
                    />
                )}

                {/* If no specific ticket is selected, show all tickets */}
                {!ticket &&
                    tickets.map((t) => (
                        <Marker
                            key={t.id}
                            longitude={t.location.lng}
                            latitude={t.location.lat}
                            color="red"
                            onClick={() => setSelectedTicket(t)}
                        />
                    ))}

                {/* Popup for selected ticket */}
                {selectedTicket && (
                    <Popup
                        longitude={selectedTicket.location.lng}
                        latitude={selectedTicket.location.lat}
                        onClose={() => setSelectedTicket(null)}
                        closeOnClick={false}
                    >
                        <div>
                            <p className="fw-medium fs-6 p-0 m-0">{selectedTicket.title}</p>
                            <p className="fw-normal p-0 m-0">{selectedTicket.description}</p>
                            <p className="fw-normal mb-0 mt-4">Status: {selectedTicket.status}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
