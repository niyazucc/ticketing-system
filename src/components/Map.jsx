import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import tickets from '../data/tickets';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapComponent({ ticket, isUpdate,onLocationChange }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    // Default Map Location
    const defaultLocation = {
        latitude: 3.139,  // Kuala Lumpur
        longitude: 101.6869,
        zoom: 12,
    };

    // Use ticket location if available, otherwise fallback to default
    const mapCenter = ticket?.location
        ? { latitude: ticket.location.lat, longitude: ticket.location.lng, zoom: 15 }
        : defaultLocation;

    return (
        <Map
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

                        // Call the parent's handleChange function
                        if (onLocationChange) {
                            onLocationChange({
                                target: { name: "location", value: newCoords }
                            });
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
    );

}
