"use client";

import React, { useEffect, useState } from 'react';
import { getSocket, disconnectSocket } from '../lib/realtime/socket';
import { assignJobMechanic, markJobTimeout, rejectJobMechanic, updateJobStatusMechanic } from '../lib/api/client';
import { useAuth } from '@clerk/nextjs';
import ConfirmModal from './ConfirmModal';

const MechanicRealtime = () => {
    const [activeJob, setActiveJob] = useState<any>(null);
    const [isOnline, setIsOnline] = useState(true);
    const { getToken } = useAuth();
    const mechanicId = 'MECH-001';
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [timer, setTimer] = useState(45);

    useEffect(() => {
        const socket = getSocket();
        socket.emit('join_mechanic', mechanicId);

        socket.emit('mechanic_location_update', {
            mechanicId,
            name: 'Arjun Mech',
            rating: 4.8,
            isOnline,
            isAvailable: true,
            lat: 12.9352,
            lng: 77.6245,
            address: 'Koramangala 4th Block, Bengaluru',
        });

        socket.on('job_assigned', (payload) => {
            setActiveJob(payload);
            setTimer(45);
        });

        return () => {
            socket.off('job_assigned');
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        if (!activeJob?.id) {
            return;
        }

        if (timer <= 0) {
            const setTimeoutStatus = async () => {
                if (!activeJob?.id) {
                    return;
                }
                const token = await getToken();
                await markJobTimeout(activeJob.id, token ?? undefined);
                setActiveJob((prev: any) => ({ ...prev, status: 'TIMEOUT' }));
            };
            setTimeoutStatus();
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [activeJob?.id, timer]);

    return (
        <main className="page">
            <section className="mechanic-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Mechanic console</p>
                    <h1 className="flow-title">Incoming job requests.</h1>
                    <p className="flow-subtitle">
                        Accept the job within the timer window to get dispatched. If you reject, the job will
                        be offered to the next mechanic in line.
                    </p>
                </header>

                <section className="status-card">
                    <div className="status-text">
                        <h2>Availability status</h2>
                        <p className="flow-subtitle">Go online to receive new job requests in your area.</p>
                    </div>
                    <label className="toggle" aria-label="Toggle availability">
                        <input
                            type="checkbox"
                            checked={isOnline}
                            onChange={(event) => {
                                const nextValue = event.target.checked;
                                setIsOnline(nextValue);
                                const socket = getSocket();
                                socket.emit('mechanic_location_update', {
                                    mechanicId: 'MECH-001',
                                    name: 'Arjun Mech',
                                    rating: 4.8,
                                    isOnline: nextValue,
                                    isAvailable: nextValue,
                                    lat: 12.9352,
                                    lng: 77.6245,
                                    address: 'Koramangala 4th Block, Bengaluru',
                                });
                            }}
                        />
                        <span className="toggle-track">
                            <span className="toggle-thumb" />
                        </span>
                    </label>
                </section>

                <div className="job-card">
                    <div className="job-header">
                        <div>
                            <h2 className="job-title">
                                {activeJob?.serviceType ? `Quick Fix - ${activeJob.serviceType}` : 'Quick Fix - Fuel delivery'}
                            </h2>
                            <p className="hero-subtitle">Job ID: {activeJob?.id ?? 'VS-3007'}</p>
                        </div>
                        <span className="job-badge">New request • 00:{String(timer).padStart(2, '0')}</span>
                    </div>

                    <div className="job-meta-grid">
                        <div className="job-meta">
                            <span>Pickup distance</span>
                            <strong>3.8 km</strong>
                        </div>
                        <div className="job-meta">
                            <span>ETA to customer</span>
                            <strong>16 minutes</strong>
                        </div>
                        <div className="job-meta">
                            <span>Estimated payout</span>
                            <strong>Rs 380</strong>
                        </div>
                        <div className="job-meta">
                            <span>Customer rating</span>
                            <strong>4.8 (112)</strong>
                        </div>
                        <div className="job-meta">
                            <span>Status</span>
                            <strong>{activeJob?.status ?? 'REQUEST_CREATED'}</strong>
                        </div>
                    </div>

                    <div className="flow-meta">
                        <span>Location: {activeJob?.location?.address ?? 'Koramangala 4th Block, Bengaluru'}</span>
                        <span>Notes: {activeJob?.notes ?? 'Fuel gauge empty, parked near metro station.'}</span>
                    </div>

                    <div className="job-actions">
                        <button
                            className="flow-cta"
                            type="button"
                            onClick={async () => {
                                if (!activeJob?.id) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await assignJobMechanic(
                                    activeJob.id,
                                    mechanicId,
                                    token ?? undefined
                                );
                                setActiveJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Accept job
                        </button>
                        <button
                            className="danger-button"
                            type="button"
                            onClick={() => setIsRejectOpen(true)}
                        >
                            Reject
                        </button>
                        <button className="ghost-button" type="button">View on map</button>
                    </div>

                    <div className="job-actions">
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!activeJob?.id) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusMechanic(
                                    activeJob.id,
                                    'EN_ROUTE',
                                    token ?? undefined
                                );
                                setActiveJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Mark en route
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!activeJob?.id) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusMechanic(
                                    activeJob.id,
                                    'ARRIVED',
                                    token ?? undefined
                                );
                                setActiveJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Mark arrived
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!activeJob?.id) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusMechanic(
                                    activeJob.id,
                                    'IN_PROGRESS',
                                    token ?? undefined
                                );
                                setActiveJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Start service
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!activeJob?.id) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusMechanic(
                                    activeJob.id,
                                    'PAYMENT_PENDING',
                                    token ?? undefined
                                );
                                setActiveJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Mark payment pending
                        </button>
                    </div>
                </div>
            </section>
            {isRejectOpen ? (
                <ConfirmModal
                    title="Reject job"
                    description="Please provide a reason before rejecting."
                    confirmLabel="Reject job"
                    onCancel={() => setIsRejectOpen(false)}
                    onConfirm={async () => {
                        if (!activeJob?.id) {
                            return;
                        }
                        const token = await getToken();
                        await rejectJobMechanic(activeJob.id, rejectReason, token ?? undefined);
                        setActiveJob((prev: any) => ({ ...prev, status: 'CANCELLED' }));
                        setIsRejectOpen(false);
                    }}
                >
                    <textarea
                        className="field-textarea"
                        placeholder="Reason for rejection"
                        value={rejectReason}
                        onChange={(event) => setRejectReason(event.target.value)}
                    />
                </ConfirmModal>
            ) : null}
        </main>
    );
};

export default MechanicRealtime;
