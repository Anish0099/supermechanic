"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { assignJobAdmin, matchJobAdmin, updateJobStatusAdmin } from '../lib/api/client';
import { getSocket, disconnectSocket } from '../lib/realtime/socket';
import MapboxMap from './MapboxMap';
import ConfirmModal from './ConfirmModal';

const fetchJobs = async (token?: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        return [];
    }

    const response = await fetch(`${apiUrl}/jobs`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!response.ok) {
        throw new Error('Failed to load jobs');
    }

    return response.json();
};

const AdminJobsClient = () => {
        const getZone = (job: any) => {
            const lat = job.location?.lat ?? job.location?.coordinates?.[1];
            const lng = job.location?.lng ?? job.location?.coordinates?.[0];

            if (typeof lat !== 'number' || typeof lng !== 'number') {
                return 'Unknown';
            }

            if (lat > 12.96) {
                return 'North';
            }
            if (lat < 12.90) {
                return 'South';
            }
            if (lng > 77.64) {
                return 'East';
            }
            if (lng < 77.58) {
                return 'West';
            }
            return 'Central';
        };
    const { getToken } = useAuth();
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [matchResults, setMatchResults] = useState<any[]>([]);
    const [latestMechanic, setLatestMechanic] = useState<any>(null);
    const [zoneFilter, setZoneFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const { data: jobs = [], refetch } = useQuery({
        queryKey: ['admin-jobs'],
        queryFn: async () => {
            const token = await getToken();
            return fetchJobs(token ?? undefined);
        },
    });

    useEffect(() => {
        const socket = getSocket();

        socket.on('job_created', () => {
            refetch();
        });

        socket.on('job_status_update', () => {
            refetch();
        });

        socket.on('job_assigned', () => {
            refetch();
        });

        socket.on('mechanic_location_update', (payload) => {
            setLatestMechanic(payload);
        });

        return () => {
            socket.off('job_created');
            socket.off('job_status_update');
            socket.off('job_assigned');
            socket.off('mechanic_location_update');
            disconnectSocket();
        };
    }, [refetch]);

    return (
        <main className="page">
            <section className="admin-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Admin</p>
                    <h1 className="flow-title">Live jobs</h1>
                    <p className="flow-subtitle">Monitor active requests and manually assign mechanics.</p>
                </header>

                <section className="history-card">
                    <div className="history-row">
                        <div>
                            <p className="history-title">Filter by zone</p>
                            <p className="flow-subtitle">Use location labels to scope jobs.</p>
                        </div>
                        <div className="history-meta">
                            <select
                                className="field-select"
                                value={zoneFilter}
                                onChange={(event) => setZoneFilter(event.target.value)}
                            >
                                <option>All</option>
                                <option>Central</option>
                                <option>North</option>
                                <option>South</option>
                                <option>East</option>
                                <option>West</option>
                            </select>
                        </div>
                    </div>
                    <div className="history-row">
                        <div>
                            <p className="history-title">Filter by status</p>
                            <p className="flow-subtitle">Focus on active or pending jobs.</p>
                        </div>
                        <div className="history-meta">
                            <select
                                className="field-select"
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                            >
                                <option>All</option>
                                <option>REQUEST_CREATED</option>
                                <option>SEARCHING_MECHANIC</option>
                                <option>ASSIGNED</option>
                                <option>EN_ROUTE</option>
                                <option>ARRIVED</option>
                                <option>IN_PROGRESS</option>
                                <option>PAYMENT_PENDING</option>
                                <option>COMPLETED</option>
                                <option>CANCELLED</option>
                            </select>
                        </div>
                    </div>
                    {jobs.length ? (
                        jobs
                            .filter((job: any) => {
                                if (zoneFilter === 'All') {
                                    return true;
                                }
                                const address = job.location?.address ?? '';
                                const computedZone = getZone(job);
                                return (
                                    address.toLowerCase().includes(zoneFilter.toLowerCase()) ||
                                    computedZone.toLowerCase() === zoneFilter.toLowerCase()
                                );
                            })
                            .filter((job: any) => {
                                if (statusFilter === 'All') {
                                    return true;
                                }
                                return job.status === statusFilter;
                            })
                            .map((job: any) => (
                            <button
                                key={job.id}
                                className="history-row"
                                type="button"
                                onClick={() => setSelectedJob(job)}
                                style={{ textAlign: 'left', background: 'transparent', border: 'none' }}
                            >
                                <div>
                                    <p className="history-title">{job.jobType} • {job.status}</p>
                                    <p className="flow-subtitle">
                                        Job ID: {job.id} • {job.location?.address ?? 'No address'}
                                    </p>
                                </div>
                                <div className="history-meta">
                                    <span className="history-status">{job.status}</span>
                                    <span className="history-price">Zone: {getZone(job)}</span>
                                    <span className="history-price">{job.mechanicId ?? 'Unassigned'}</span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="history-row">
                            <p className="flow-subtitle">No active jobs yet.</p>
                        </div>
                    )}
                </section>

                <section className="admin-card">
                    <h3>Manual assignment</h3>
                    <div className="flow-meta">
                        <span>Job: {selectedJob?.id ?? 'Select a job'}</span>
                        <span>Status: {selectedJob?.status ?? '—'}</span>
                        <span>Mechanic: {selectedJob?.mechanicId ?? 'Unassigned'}</span>
                        <span>
                            Latest mechanic update: {latestMechanic?.mechanicId ?? '—'}
                            {latestMechanic?.location?.address ? ` • ${latestMechanic.location.address}` : ''}
                        </span>
                        {selectedJob?.rejectReason ? (
                            <span>Reject reason: {selectedJob.rejectReason}</span>
                        ) : null}
                        {selectedJob?.auditLog?.length ? (
                            <span>
                                Last update: {selectedJob.auditLog[selectedJob.auditLog.length - 1]?.status}
                            </span>
                        ) : null}
                    </div>
                    {selectedJob?.auditLog?.length ? (
                        <div className="history-row">
                            <p className="flow-subtitle">Status log</p>
                            <div className="history-meta">
                                {selectedJob.auditLog.map((entry: any, index: number) => {
                                    const timestamp = entry?.updatedAt
                                        ? new Date(entry.updatedAt).toLocaleString('en-IN')
                                        : '—';
                                    const byline = entry?.updatedBy ? ` • ${entry.updatedBy}` : '';
                                    const note = entry?.note ? ` • ${entry.note}` : '';
                                    return (
                                        <span key={`${entry.status}-${index}`} className="history-price">
                                            {entry?.status ?? 'UPDATE'} • {timestamp}
                                            {byline}
                                            {note}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}
                    <div className="admin-actions">
                        <button
                            className="flow-cta"
                            type="button"
                            onClick={async () => {
                                if (!selectedJob) {
                                    return;
                                }
                                const token = await getToken();
                                const lat = selectedJob.location?.lat ?? selectedJob.location?.coordinates?.[1];
                                const lng = selectedJob.location?.lng ?? selectedJob.location?.coordinates?.[0];
                                if (typeof lat !== 'number' || typeof lng !== 'number') {
                                    return;
                                }
                                const result = await matchJobAdmin(selectedJob.id, { lat, lng }, token ?? undefined);
                                setMatchResults(result.mechanics ?? []);
                            }}
                        >
                            Find mechanics
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!selectedJob || !matchResults[0]) {
                                    return;
                                }
                                const token = await getToken();
                                const assigned = await assignJobAdmin(
                                    selectedJob.id,
                                    matchResults[0].mechanicId,
                                    token ?? undefined
                                );
                                setSelectedJob((prev: any) => ({ ...prev, mechanicId: assigned.mechanicId }));
                            }}
                        >
                            Assign top match
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!selectedJob) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusAdmin(
                                    selectedJob.id,
                                    'IN_PROGRESS',
                                    token ?? undefined
                                );
                                setSelectedJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Mark in progress
                        </button>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={async () => {
                                if (!selectedJob) {
                                    return;
                                }
                                const token = await getToken();
                                const updated = await updateJobStatusAdmin(
                                    selectedJob.id,
                                    'COMPLETED',
                                    token ?? undefined
                                );
                                setSelectedJob((prev: any) => ({ ...prev, status: updated.status }));
                            }}
                        >
                            Mark completed
                        </button>
                        <button
                            className="danger-button"
                            type="button"
                            onClick={async () => {
                                if (!selectedJob) {
                                    return;
                                }
                                setIsCancelOpen(true);
                            }}
                        >
                            Cancel job
                        </button>
                    </div>
                    {matchResults.length ? (
                        <div className="flow-meta">
                            {matchResults.map((mechanic) => (
                                <span key={mechanic.mechanicId}>
                                    {mechanic.mechanicId} • {Math.round(mechanic.distanceMeters ?? 0)}m
                                </span>
                            ))}
                        </div>
                    ) : null}
                </section>

                <section className="admin-card">
                    <h3>Map preview</h3>
                    <div className="admin-map">
                        <MapboxMap
                            markers={latestMechanic ? [latestMechanic] : []}
                            customerLocation={
                                selectedJob?.location?.lat && selectedJob?.location?.lng
                                    ? { lat: selectedJob.location.lat, lng: selectedJob.location.lng }
                                    : selectedJob?.location?.coordinates?.length === 2
                                        ? {
                                            lat: selectedJob.location.coordinates[1],
                                            lng: selectedJob.location.coordinates[0],
                                        }
                                        : undefined
                            }
                        />
                    </div>
                </section>
            </section>
            {isCancelOpen && selectedJob ? (
                <ConfirmModal
                    title="Cancel job"
                    description="Cancel this job? This action cannot be undone."
                    confirmLabel="Cancel job"
                    onCancel={() => setIsCancelOpen(false)}
                    onConfirm={async () => {
                        const token = await getToken();
                        const updated = await updateJobStatusAdmin(
                            selectedJob.id,
                            'CANCELLED',
                            token ?? undefined
                        );
                        setSelectedJob((prev: any) => ({ ...prev, status: updated.status }));
                        setIsCancelOpen(false);
                    }}
                />
            ) : null}
        </main>
    );
};

export default AdminJobsClient;
