"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateJob } from '../../../lib/hooks/useCreateJob';
import { useGeolocation } from '../../../lib/hooks/useGeolocation';

const QuickFixPage = () => {
    const [serviceType, setServiceType] = useState('Puncture repair');
    const [vehicleType, setVehicleType] = useState('Bike');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [jobId, setJobId] = useState<string | null>(null);
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateJob();
    const { coords, status, detect } = useGeolocation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await mutateAsync({
            jobType: 'FIXED',
            serviceType,
            vehicleType,
            location: {
                address: location || 'Auto-detected',
                lat: coords?.lat,
                lng: coords?.lng,
            },
            notes,
            priority: 'STANDARD',
        });
        setJobId(response.id);
        window.localStorage.setItem('activeJobId', response.id);
        router.push(`/customer/tracking?jobId=${response.id}`);
    };

    return (
        <main className="page">
            <section className="flow-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Quick Fix</p>
                    <h1 className="flow-title">Fixed-price roadside services.</h1>
                    <p className="flow-subtitle">
                        Select a quick fix service, confirm the price and ETA, and we will dispatch the nearest
                        mechanic to your location.
                    </p>
                </header>

                <div className="flow-grid">
                    <form className="flow-card" onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="field-label" htmlFor="serviceType">Service type</label>
                            <select
                                id="serviceType"
                                className="field-select"
                                value={serviceType}
                                onChange={(event) => setServiceType(event.target.value)}
                            >
                                <option>Puncture repair</option>
                                <option>Fuel delivery</option>
                                <option>Battery jumpstart</option>
                                <option>Towing</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="vehicleType">Vehicle type</label>
                            <select
                                id="vehicleType"
                                className="field-select"
                                value={vehicleType}
                                onChange={(event) => setVehicleType(event.target.value)}
                            >
                                <option>Bike</option>
                                <option>Scooter</option>
                                <option>Car</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="location">Current location</label>
                            <div className="field-row">
                                <input
                                    id="location"
                                    className="field-input"
                                    placeholder="Auto-detect or enter landmark"
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                />
                                <button className="ghost-button" type="button" onClick={detect}>
                                    {status === 'loading' ? 'Detecting...' : 'Auto-detect'}
                                </button>
                            </div>
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="notes">Notes for mechanic</label>
                            <textarea
                                id="notes"
                                className="field-textarea"
                                placeholder="Add any helpful details"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                            />
                        </div>
                        <button className="flow-cta" type="submit" disabled={isPending}>
                            {isPending ? 'Submitting...' : 'Confirm Quick Fix'}
                        </button>
                        {jobId ? <p className="flow-subtitle">Request created: {jobId}</p> : null}
                        {status === 'error' ? (
                            <p className="flow-subtitle">Location error. Please enter manually.</p>
                        ) : null}
                    </form>

                    <aside className="flow-card">
                        <h3>Price + ETA</h3>
                        <div className="flow-meta">
                            <span>Estimated price: Rs 499</span>
                            <span>ETA: 18-24 minutes</span>
                            <span>Includes service charge and basic consumables.</span>
                        </div>
                        <div className="flow-meta">
                            <span>Nearest mechanic within 3.2 km</span>
                            <span>Live tracking enabled after booking</span>
                        </div>
                        <div>
                            <h3>Request summary</h3>
                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="summary-label">Service</span>
                                    <span>{serviceType}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Vehicle</span>
                                    <span>{vehicleType}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Location</span>
                                    <span>{location || (coords ? 'Auto-detected' : 'Tap Auto-detect')}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default QuickFixPage;
