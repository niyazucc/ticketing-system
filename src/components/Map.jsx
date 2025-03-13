    import React from 'react'
    import Map, { Marker, Popup } from 'react-map-gl/mapbox'
    import "mapbox-gl/dist/mapbox-gl.css"
    import { useState } from 'react';
    import tickets from '../data/tickets';

    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    

    export default function MapComponent() {
        const [selectedTicket, setSelectedTicket] = useState(null);

        return (
            <>
                <Map mapboxAccessToken={MAPBOX_TOKEN}
                    initialViewState={{
                        longitude: 101.6869,
                        latitude: 3.139,
                        zoom: 15,
                    }}
                    style={{ width: "100%", height: "400px", borderRadius: "10px" }}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                >
                    {tickets.map((ticket) => (
                        <Marker
                            key={ticket.id}
                            longitude={ticket.longitude}
                            latitude={ticket.latitude}
                            color='red'
                            onClick={() => setSelectedTicket(ticket)}
                        />
                    ))}

                    {selectedTicket && (
                        <Popup
                            longitude={selectedTicket.longitude}
                            latitude={selectedTicket.latitude}
                            onClose={() => setSelectedTicket(null)}
                            closeOnClick={false}
                        >
                            <div>
                                <p className='fw-medium fs-6 p-0 m-0'>{selectedTicket.title}</p>
                                <p className='fw-normal p-0 m-0'>{selectedTicket.description}</p>
                                <p className='fw-normal mb-0 mt-4'>Status: {selectedTicket.status}</p>
                            </div>
                        </Popup>
                    )}

                </Map>
            </>
        )
    }
