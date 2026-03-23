"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateJob } from '../../../lib/hooks/useCreateJob';
import { useGeolocation } from '../../../lib/hooks/useGeolocation';

const EmergencyPage = () => {
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [jobId, setJobId] = useState<string | null>(null);
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateJob();
    const { coords, status, detect } = useGeolocation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await mutateAsync({
            jobType: 'EMERGENCY',
            location: {
                address: location || 'Auto-detected',
                lat: coords?.lat,
                lng: coords?.lng,
            },
            notes: details,
            priority: 'EMERGENCY',
        });
        setJobId(response.id);
        window.localStorage.setItem('activeJobId', response.id);
        router.push(`/customer/tracking?jobId=${response.id}`);
    };

    return (
        <main className="page">
            <section className="flow-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Emergency</p>
                    <h1 className="flow-title">Fastest mechanic, minimal input.</h1>
                    <p className="flow-subtitle">
                        Tap once to send your live location. We will dispatch the fastest available mechanic
                        and start the inspection flow on arrival.
                    </p>
                </header>

                <div className="flow-grid">
                    <form className="flow-card" onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="field-label" htmlFor="location">Live location</label>
                            <div className="field-row">
                                <input
                                    id="location"
                                    className="field-input"
                                    placeholder="Auto-detect location"
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                />
                                <button className="ghost-button" type="button" onClick={detect}>
                                    {status === 'loading' ? 'Detecting...' : 'Auto-detect'}
                                </button>
                            </div>
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="details">Anything we should know?</label>
                            <textarea
                                id="details"
                                className="field-textarea"
                                placeholder="Eg: stuck on highway, vehicle suddenly stopped"
                                value={details}
                                onChange={(event) => setDetails(event.target.value)}
                            />
                        </div>
                        <button className="flow-cta" type="submit" disabled={isPending}>
                            {isPending ? 'Submitting...' : 'Send Emergency Request'}
                        </button>
                        {jobId ? <p className="flow-subtitle">Request created: {jobId}</p> : null}
                        {status === 'error' ? (
                            <p className="flow-subtitle">Location error. Please enter manually.</p>
                        ) : null}
                    </form>

                    <aside className="flow-card">
                        <h3>What happens next</h3>
                        <div className="flow-meta">
                            <span>Inspection fee: Rs 199</span>
                            <span>Fastest mechanic within your radius is assigned.</span>
                            <span>Live tracking starts immediately.</span>
                        </div>
                        <div className="flow-meta">
                            <span>Accept or reject the estimate after diagnosis.</span>
                            <span>Only inspection fee is charged if rejected.</span>
                        </div>
                        <div>
                            <h3>Request summary</h3>
                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="summary-label">Priority</span>
                                    <span>Emergency</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Location</span>
                                    <span>{location || (coords ? 'Auto-detected' : 'Tap Auto-detect')}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Notes</span>
                                    <span>{details || 'Primary phone'}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default EmergencyPage;
