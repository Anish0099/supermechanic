"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateJob } from '../../../lib/hooks/useCreateJob';
import { useGeolocation } from '../../../lib/hooks/useGeolocation';

const DiagnosePage = () => {
    const [problem, setProblem] = useState('Bike not starting');
    const [vehicleType, setVehicleType] = useState('Bike');
    const [location, setLocation] = useState('');
    const [jobId, setJobId] = useState<string | null>(null);
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateJob();
    const { coords, status, detect } = useGeolocation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await mutateAsync({
            jobType: 'INSPECTION',
            problem,
            vehicleType,
            location: {
                address: location || 'Auto-detected',
                lat: coords?.lat,
                lng: coords?.lng,
            },
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
                    <p className="hero-eyebrow">Diagnose Issue</p>
                    <h1 className="flow-title">Inspection-based diagnosis.</h1>
                    <p className="flow-subtitle">
                        Tell us what is happening. We will dispatch a mechanic to inspect and share an estimate
                        before any repair work begins.
                    </p>
                </header>

                <div className="flow-grid">
                    <form className="flow-card" onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="field-label" htmlFor="problem">Describe the problem</label>
                            <textarea
                                id="problem"
                                className="field-textarea"
                                placeholder="Eg: Bike not starting, engine noise, electrical issue"
                                value={problem}
                                onChange={(event) => setProblem(event.target.value)}
                            />
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
                        <button className="flow-cta" type="submit" disabled={isPending}>
                            {isPending ? 'Submitting...' : 'Request Inspection'}
                        </button>
                        {jobId ? <p className="flow-subtitle">Request created: {jobId}</p> : null}
                        {status === 'error' ? (
                            <p className="flow-subtitle">Location error. Please enter manually.</p>
                        ) : null}
                    </form>

                    <aside className="flow-card">
                        <h3>Inspection fee</h3>
                        <div className="flow-meta">
                            <span>Inspection fee: Rs 149</span>
                            <span>Payable even if you reject the repair estimate.</span>
                            <span>ETA: 20-30 minutes</span>
                        </div>
                        <div className="flow-meta">
                            <span>We will share a detailed quote after diagnosis.</span>
                            <span>Accept to start repairs immediately.</span>
                        </div>
                        <div>
                            <h3>Request summary</h3>
                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="summary-label">Issue</span>
                                    <span>{problem || 'Describe the issue'}</span>
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

export default DiagnosePage;
