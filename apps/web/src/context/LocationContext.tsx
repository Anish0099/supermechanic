"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

type LocationState = {
  address: string;
  coords: Coordinates | null;
  status: "idle" | "loading" | "success" | "error";
  error?: string;
};

type LocationContextType = LocationState & {
  setAddress: (address: string) => void;
  detect: () => void;
};

const LocationContext = createContext<LocationContextType | null>(null);

const STORAGE_KEY = "supermechanic_location";

// Reverse geocode coordinates to a readable address using Nominatim
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { headers: { "Accept-Language": "en" } },
    );
    if (!res.ok) return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    const data = await res.json();
    // Build a short address: suburb/neighbourhood + city
    const a = data.address || {};
    const parts = [
      a.neighbourhood || a.suburb || a.hamlet || a.village || "",
      a.city || a.town || a.county || a.state_district || "",
      a.state || "",
    ].filter(Boolean);
    return parts.slice(0, 2).join(", ") || data.display_name?.split(",").slice(0, 3).join(",") || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<LocationState>({
    address: "",
    coords: null,
    status: "idle",
  });

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({
          address: parsed.address || "",
          coords: parsed.coords || null,
          status: parsed.coords ? "success" : "idle",
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (state.address || state.coords) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ address: state.address, coords: state.coords }),
      );
    }
  }, [state.address, state.coords]);

  const setAddress = useCallback((address: string) => {
    setState((prev) => ({ ...prev, address }));
  }, []);

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Geolocation not supported",
      }));
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", error: undefined }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const coords = { lat, lng };

        // Set coords immediately
        setState((prev) => ({ ...prev, coords, status: "success" }));

        // Then reverse geocode to fill the address
        const addr = await reverseGeocode(lat, lng);
        setState((prev) => ({ ...prev, address: addr }));
      },
      (err) => {
        setState((prev) => ({
          ...prev,
          coords: null,
          status: "error",
          error: err.message,
        }));
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return (
    <LocationContext.Provider value={{ ...state, setAddress, detect }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return ctx;
};
