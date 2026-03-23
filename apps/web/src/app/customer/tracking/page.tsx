"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useJobTracking } from '../../../lib/hooks/useJobTracking';
import { getSocket, disconnectSocket } from '../../../lib/realtime/socket';
import MapboxMap from '../../../components/MapboxMap';
import { useGeolocation } from '../../../lib/hooks/useGeolocation';

const TrackingPage = () => {
    const searchParams = useSearchParams();
    const jobIdParam = searchParams.get('jobId');
    const { data: jobData } = useJobTracking();
    const [realtimeJob, setRealtimeJob] = useState(jobData);
    const [markers, setMarkers] = useState<any[]>([]);
    const { coords, status, detect } = useGeolocation();

    useEffect(() => {
        if (jobData) {
            setRealtimeJob(jobData);
        }
    }, [jobData]);

    useEffect(() => {
        const socket = getSocket();

        if (jobIdParam) {
            socket.emit('join_job', jobIdParam);
        } else if (realtimeJob?.id) {
            socket.emit('join_job', realtimeJob.id);
        }

        socket.on('job_status_update', (payload) => {
            setRealtimeJob(payload);
        });

        socket.on('job_assigned', (payload) => {
            setRealtimeJob(payload);
        });

        socket.on('mechanic_location_update', (payload) => {
            setMarkers((prev) => {
                const next = prev.filter((item) => item.mechanicId !== payload.mechanicId);
                next.unshift(payload);
                return next.slice(0, 5);
            });
        });

        return () => {
            socket.off('job_status_update');
            socket.off('job_assigned');
            socket.off('mechanic_location_update');
            disconnectSocket();
        };
    }, [realtimeJob?.id]);

    return (
        <main className="page">
            <section className="tracking-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Active job</p>
                    <h1 className="flow-title">Mechanic is on the way.</h1>
                    <p className="flow-subtitle">
                        Track the mechanic in real time, stay updated with status changes, and call if needed.
                    </p>
                </header>

                <div className="tracking-grid">
                    <div className="tracking-card">
                        <div className="map-shell">
                            <div className="map-badge">Live map</div>
                            <MapboxMap markers={markers} customerLocation={coords ?? undefined} />
                            <div className="marker-list">
                                {markers.length ? (
                                    markers.map((marker) => (
                                        <div className="marker-item" key={marker.mechanicId}>
                                            <span>{marker.name ?? marker.mechanicId}</span>
                                            <span>
                                                {marker.lat?.toFixed?.(3) ?? marker.location?.coordinates?.[1]} /{' '}
                                                {marker.lng?.toFixed?.(3) ?? marker.location?.coordinates?.[0]}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="marker-item">
                                        <span>Waiting for live mechanic updates...</span>
                                        <span>—</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tracking-actions">
                            <button className="flow-cta" type="button">Call mechanic</button>
                            <button className="ghost-button" type="button" onClick={detect}>
                                {status === 'loading' ? 'Sharing...' : 'Share live location'}
                            </button>
                            <Link className="ghost-button" href={`/customer/payment?jobId=${jobIdParam ?? realtimeJob?.id ?? ''}`}>
                                Pay now
                            </Link>
                        </div>
                    </div>

                    <aside className="tracking-panel">
                        <div className="tracking-card">
                            <h3>Job details</h3>
                            <div className="flow-meta">
                                <span>Job ID: {jobIdParam ?? realtimeJob?.id ?? 'Loading...'}</span>
                                <span>Service: {realtimeJob?.service ?? 'Loading...'}</span>
                                <span>ETA: {realtimeJob?.eta ?? 'Loading...'}</span>
                                <span>Status: {realtimeJob?.status ?? 'Loading...'}</span>
                                <span>
                                    Mechanic: {(realtimeJob as any)?.mechanicId ?? 'Assigning...'}
                                </span>
                            </div>
                        </div>
                        <div className="tracking-card">
                            <h3>Status timeline</h3>
                            <div className="timeline">
                                {(realtimeJob?.timeline ?? []).map((step) => (
                                    <div className="timeline-item" key={step.title}>
                                        <span className={`timeline-dot${step.active ? ' active' : ''}`} />
                                        <div>
                                            <p className="timeline-title">{step.title}</p>
                                            <p className="timeline-note">{step.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tracking-card">
                            <h3>Need help?</h3>
                            <div className="flow-meta">
                                <span>Support: {realtimeJob?.supportPhone ?? 'Loading...'}</span>
                                <span>Chat support opens after mechanic arrival.</span>
                            </div>
                            <Link className="ghost-button" href="/customer">Back to services</Link>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default TrackingPage;
