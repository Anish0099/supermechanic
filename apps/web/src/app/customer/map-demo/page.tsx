"use client";

import React from 'react';
import MapboxMap from '../../../components/MapboxMap';

// Quick demo page to show the bike emoji marker on Mapbox map
// Access at /customer/map-demo — no auth required
export default function MapDemoPage() {
    // Mock mechanic position near Bangalore
    const mockMechanicMarkers = [
        {
            mechanicId: "demo-mechanic-1",
            name: "Rajesh (Demo)",
            lat: 12.9352,
            lng: 77.6245,
        },
        {
            mechanicId: "demo-mechanic-2",
            name: "Suresh (Demo)",
            lat: 12.9400,
            lng: 77.6300,
        },
    ];

    const customerLocation = {
        lat: 12.9280,
        lng: 77.6200,
    };

    return (
        <main className="page" style={{ padding: 24 }}>
            <h1 style={{ marginBottom: 8 }}>🏍️ Map Demo — Bike Emoji Markers</h1>
            <p style={{ color: 'var(--ink-muted)', marginBottom: 20 }}>
                Mechanic markers use 🏍️ emoji. Customer marker is blue pin.
                Route line drawn between customer and nearest mechanic.
            </p>
            <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid var(--outline)',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(17,17,22,0.1)',
                }}>
                    🏍️ Live Tracking (Demo)
                </div>
                <div style={{ height: 500 }}>
                    <MapboxMap
                        markers={mockMechanicMarkers}
                        customerLocation={customerLocation}
                    />
                </div>
            </div>
        </main>
    );
}
