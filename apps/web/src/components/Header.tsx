"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from '@clerk/nextjs';
import { useLocation } from '../context/LocationContext';

type AppRole = 'customer' | 'mechanic' | 'admin';

type Suggestion = {
    display_name: string;
    lat: string;
    lon: string;
};

const Header = () => {
    const { user } = useUser();
    const role = (user?.publicMetadata?.role ?? 'customer') as AppRole;
    const { address, coords, status, setAddress, detect } = useLocation();
    const pathname = usePathname();

    // Autocomplete state
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const roleLinks: Record<AppRole, Array<{ href: string; label: string }>> = {
        customer: [
            { href: '/customer', label: 'Home' },
            { href: '/customer/history', label: 'History' },
            { href: '/customer/profile', label: 'Profile' },
        ],
        mechanic: [
            { href: '/mechanic', label: 'Mechanic' },
        ],
        admin: [
            { href: '/admin', label: 'Admin' },
            { href: '/admin/payments', label: 'Payments' },
            { href: '/admin/jobs', label: 'Jobs' },
        ],
    };

    const isActive = (href: string) => {
        if (href === '/customer') return pathname === '/customer';
        return pathname.startsWith(href);
    };

    // Fetch autocomplete suggestions from Nominatim
    const fetchSuggestions = useCallback(async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        setIsFetching(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=in`,
                { headers: { 'Accept-Language': 'en' } }
            );
            if (res.ok) {
                const data: Suggestion[] = await res.json();
                setSuggestions(data);
                setShowDropdown(data.length > 0);
            }
        } catch {
            // Silently ignore
        } finally {
            setIsFetching(false);
        }
    }, []);

    // Handle input change with debounce
    const handleInputChange = (value: string) => {
        setAddress(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(value), 400);
    };

    // Select a suggestion
    const selectSuggestion = (sug: Suggestion) => {
        // Shorten display name: take first 3 parts
        const short = sug.display_name.split(',').slice(0, 3).join(',').trim();
        setAddress(short);
        setSuggestions([]);
        setShowDropdown(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link className="brand" href="/">
                    Super<span className="brand-accent">Mechanic</span>
                </Link>
                <nav className="nav-links">
                    {roleLinks[role].map((link) => (
                        <Link
                            className={`nav-link${isActive(link.href) ? ' nav-link--active' : ''}`}
                            key={link.href}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="nav-links">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="ghost-button" type="button">Sign in</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="flow-cta" type="button">Create account</button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* Global Location Bar */}
            <div className="loc-bar">
                <div className="loc-bar-inner" ref={dropdownRef} style={{ position: 'relative' }}>
                    <span className="loc-bar-icon">📍</span>
                    <input
                        id="global-location-input"
                        className="loc-bar-input"
                        placeholder="Enter your location (area, landmark, or street)"
                        value={address}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => { if (suggestions.length) setShowDropdown(true); }}
                        autoComplete="off"
                    />
                    {isFetching && <span className="loc-bar-check" style={{ color: 'var(--ink-muted)' }}>⟳</span>}
                    {coords && status === "success" && !isFetching && (
                        <span className="loc-bar-check">✓ GPS</span>
                    )}
                    <button
                        className="loc-bar-detect"
                        type="button"
                        onClick={detect}
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "⟳ Detecting…" : "Auto-detect"}
                    </button>

                    {/* Autocomplete Dropdown */}
                    {showDropdown && (
                        <div className="loc-autocomplete">
                            {suggestions.map((sug, i) => {
                                const parts = sug.display_name.split(',');
                                const primary = parts.slice(0, 2).join(',').trim();
                                const secondary = parts.slice(2, 4).join(',').trim();
                                return (
                                    <button
                                        key={i}
                                        className="loc-autocomplete-item"
                                        onClick={() => selectSuggestion(sug)}
                                        type="button"
                                    >
                                        <span className="loc-autocomplete-icon">📍</span>
                                        <div className="loc-autocomplete-text">
                                            <span className="loc-autocomplete-primary">{primary}</span>
                                            <span className="loc-autocomplete-secondary">{secondary}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                {status === "error" && (
                    <p className="loc-bar-error">Location unavailable — please enter manually.</p>
                )}
            </div>
        </header>
    );
};

export default Header;
