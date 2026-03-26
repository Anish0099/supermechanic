"use client";

import React, { useEffect, useRef } from 'react';
import type { Map as MapboxMapType, Marker as MapboxMarker } from 'mapbox-gl';
import type { Feature, LineString } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

type MarkerPoint = {
    mechanicId: string;
    name?: string;
    lat?: number;
    lng?: number;
    location?: { coordinates?: number[] };
};

type CustomerLocation = {
    lat: number;
    lng: number;
};

type MapboxMapProps = {
    markers: MarkerPoint[];
    customerLocation?: CustomerLocation;
};

const MapboxMap = ({ markers, customerLocation }: MapboxMapProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapboxMapType | null>(null);
    const markerRefs = useRef<MapboxMarker[]>([]);
    const customerMarkerRef = useRef<MapboxMarker | null>(null);
    const mapReadyRef = useRef(false);

    useEffect(() => {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!containerRef.current || !token) {
            return;
        }

        let mounted = true;

        import('mapbox-gl').then((mapboxgl) => {
            if (!mounted || !containerRef.current) {
                return;
            }

            mapboxgl.default.accessToken = token;
            mapRef.current = new mapboxgl.default.Map({
                container: containerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: customerLocation ? [customerLocation.lng, customerLocation.lat] : [77.6245, 12.9352],
                zoom: 12,
            });

            mapRef.current.on('load', () => {
                mapReadyRef.current = true;
            });
        });

        return () => {
            mounted = false;
            mapRef.current?.remove();
            mapRef.current = null;
            mapReadyRef.current = false;
        };
        }, [customerLocation?.lat, customerLocation?.lng]);

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        if (!mapReadyRef.current) {
            return;
        }

        markerRefs.current.forEach((marker) => marker.remove());
        markerRefs.current = [];
        customerMarkerRef.current?.remove();
        customerMarkerRef.current = null;

        import('mapbox-gl').then((mapboxgl) => {
            const bounds = new mapboxgl.default.LngLatBounds();

            markers.forEach((marker) => {
                const lat = marker.lat ?? marker.location?.coordinates?.[1];
                const lng = marker.lng ?? marker.location?.coordinates?.[0];

                if (typeof lat !== 'number' || typeof lng !== 'number') {
                    return;
                }

                // Custom HTML element with bike emoji
                const el = document.createElement('div');
                el.style.cssText = 'font-size:1.6rem;cursor:pointer;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));';
                el.textContent = '🏍️';

                const markerInstance = new mapboxgl.default.Marker({ element: el })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new mapboxgl.default.Popup({ offset: 24 }).setText(
                            marker.name ? marker.name : marker.mechanicId
                        )
                    )
                    .addTo(mapRef.current!);

                markerRefs.current.push(markerInstance);
                bounds.extend([lng, lat]);
            });

            if (customerLocation) {
                customerMarkerRef.current = new mapboxgl.default.Marker({ color: '#1e5eff' })
                    .setLngLat([customerLocation.lng, customerLocation.lat])
                    .setPopup(new mapboxgl.default.Popup({ offset: 24 }).setText('Customer'))
                    .addTo(mapRef.current!);

                bounds.extend([customerLocation.lng, customerLocation.lat]);
            }

            if (!bounds.isEmpty()) {
                mapRef.current!.fitBounds(bounds, { padding: 60, maxZoom: 14 });
            }
        });
    }, [markers, customerLocation]);

    useEffect(() => {
        if (!mapRef.current || !mapReadyRef.current || !customerLocation) {
            return;
        }

        const map = mapRef.current;
        const mechanic = markers[0];
        const lat = mechanic?.lat ?? mechanic?.location?.coordinates?.[1];
        const lng = mechanic?.lng ?? mechanic?.location?.coordinates?.[0];

        if (typeof lat !== 'number' || typeof lng !== 'number') {
            if (map.getLayer('route-line')) {
                map.removeLayer('route-line');
            }
            if (map.getSource('route-line')) {
                map.removeSource('route-line');
            }
            return;
        }

        const routeData: Feature<LineString> = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [customerLocation.lng, customerLocation.lat],
                    [lng, lat],
                ],
            },
            properties: {},
        };

        if (map.getSource('route-line')) {
            (map.getSource('route-line') as any).setData(routeData);
            return;
        }

        map.addSource('route-line', {
            type: 'geojson',
            data: routeData,
        });

        map.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route-line',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#1e5eff',
                'line-width': 3,
                'line-opacity': 0.7,
            },
        });
    }, [markers, customerLocation]);

    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
        return (
            <div className="map-container" style={{ display: 'grid', placeItems: 'center' }}>
                <p className="flow-subtitle">Add NEXT_PUBLIC_MAPBOX_TOKEN to enable live maps.</p>
            </div>
        );
    }

    return <div className="map-container" ref={containerRef} />;
};

export default MapboxMap;
