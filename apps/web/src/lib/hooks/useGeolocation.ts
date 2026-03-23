"use client";

import { useCallback, useState } from 'react';

type Coordinates = {
    lat: number;
    lng: number;
};

type GeoState = {
    coords: Coordinates | null;
    status: 'idle' | 'loading' | 'success' | 'error';
    error?: string;
};

export const useGeolocation = () => {
    const [state, setState] = useState<GeoState>({
        coords: null,
        status: 'idle',
    });

    const detect = useCallback(() => {
        if (!navigator.geolocation) {
            setState({ coords: null, status: 'error', error: 'Geolocation not supported' });
            return;
        }

        setState((prev) => ({ ...prev, status: 'loading', error: undefined }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    coords: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    status: 'success',
                });
            },
            (error) => {
                setState({
                    coords: null,
                    status: 'error',
                    error: error.message,
                });
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    return { ...state, detect };
};
