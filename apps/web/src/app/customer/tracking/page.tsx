"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useJobTracking } from '../../../lib/hooks/useJobTracking';
import { getSocket, disconnectSocket } from '../../../lib/realtime/socket';
import { useLocation } from '../../../context/LocationContext';
import MapboxMap from '../../../components/MapboxMap';

type JobPhase = "searching" | "assigned" | "en_route" | "arrived" | "completed";

type MechanicInfo = {
    id: string;
    name: string;
    rating: number;
    trips: number;
    vehicle: string;
    phone: string;
    eta: string;
    etaMinutes: number;
};

// Simulated mechanic positions for the search radar (visual only)
const RADAR_MECHANICS = [
    { id: "m1", emoji: "🔧", top: "12%", left: "22%", delay: "0s" },
    { id: "m2", emoji: "🛠️", top: "8%", left: "68%", delay: "0.5s" },
    { id: "m3", emoji: "🔧", top: "35%", left: "85%", delay: "1s" },
    { id: "m4", emoji: "🛠️", top: "72%", left: "78%", delay: "1.5s" },
    { id: "m5", emoji: "🔧", top: "82%", left: "35%", delay: "2s" },
    { id: "m6", emoji: "🛠️", top: "55%", left: "8%", delay: "0.3s" },
];

const TrackingPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const jobIdParam = searchParams.get('jobId');
    const { data: jobData } = useJobTracking();
    const [realtimeJob, setRealtimeJob] = useState(jobData);
    const { coords } = useLocation();
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const [phase, setPhase] = useState<JobPhase>("searching");
    const [mechanic, setMechanic] = useState<MechanicInfo | null>(null);
    const [mechanicMarkers, setMechanicMarkers] = useState<any[]>([]);
    const [cancelling, setCancelling] = useState(false);

    // Searching timer
    useEffect(() => {
        if (phase !== "searching") return;
        const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        if (jobData) setRealtimeJob(jobData);
    }, [jobData]);

    // Real-time socket events — mechanic found ONLY when a real mechanic accepts
    useEffect(() => {
        const socket = getSocket();
        const jid = jobIdParam ?? realtimeJob?.id;

        if (jid) socket.emit('join_job', jid);

        // Mechanic accepts the job
        socket.on('job_assigned', (payload: any) => {
            setRealtimeJob(payload);
            setPhase("assigned");
            const m = payload.mechanic || {};
            setMechanic({
                id: m.id || payload.mechanicId || '',
                name: m.name || payload.mechanicName || "Assigned Mechanic",
                rating: m.rating || 4.5,
                trips: m.trips || 0,
                vehicle: m.vehicle || "—",
                phone: m.phone || "—",
                eta: m.eta || "15 min",
                etaMinutes: m.etaMinutes || 15,
            });
        });

        // Status transitions
        socket.on('job_status_update', (payload: any) => {
            setRealtimeJob(payload);
            if (payload.status === 'MECHANIC_EN_ROUTE') setPhase("en_route");
            if (payload.status === 'MECHANIC_ARRIVED') setPhase("arrived");
            if (payload.status === 'COMPLETED') setPhase("completed");
        });

        // Live mechanic location → update map marker
        socket.on('mechanic_location_update', (payload: any) => {
            setMechanicMarkers([{
                mechanicId: payload.mechanicId || mechanic?.id || 'mechanic',
                name: mechanic?.name || 'Mechanic',
                lat: payload.lat,
                lng: payload.lng,
            }]);
        });

        return () => {
            socket.off('job_status_update');
            socket.off('job_assigned');
            socket.off('mechanic_location_update');
            disconnectSocket();
        };
    }, [realtimeJob?.id, jobIdParam]);

    const handleCancel = useCallback(async () => {
        setCancelling(true);
        try {
            const jid = jobIdParam ?? realtimeJob?.id;
            if (jid) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (apiUrl) {
                    await fetch(`${apiUrl}/jobs/${jid}/status`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: 'CANCELLED' }),
                    });
                }
            }
            router.push('/customer');
        } catch {
            setCancelling(false);
        }
    }, [jobIdParam, realtimeJob?.id, router]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    // ─── SEARCHING PHASE ─────────────────────────────────────────────────────────
    if (phase === "searching") {
        return (
            <main className="page">
                <div className="tk-search-container">
                    {/* Radar animation */}
                    <div className="tk-radar">
                        <div className="tk-radar-ring" />
                        <div className="tk-radar-ring" />
                        <div className="tk-radar-ring" />
                        <div className="tk-radar-center">📍</div>
                        {RADAR_MECHANICS.map((m) => (
                            <div
                                key={m.id}
                                className="tk-mechanic-marker"
                                style={{ top: m.top, left: m.left, animationDelay: m.delay }}
                            >
                                {m.emoji}
                            </div>
                        ))}
                    </div>

                    <h1 className="tk-search-title">
                        Looking for the best mechanic<span className="tk-dots"></span>
                    </h1>
                    <p className="tk-search-sub">
                        Waiting for a verified mechanic to accept your request.
                        This usually takes 1–3 minutes.
                    </p>

                    <div className="tk-search-meta">
                        <div className="tk-search-meta-item">
                            <span className="tk-search-meta-label">Time elapsed</span>
                            <span className="tk-search-meta-value">{formatTime(elapsedSeconds)}</span>
                        </div>
                        <div className="tk-search-meta-item">
                            <span className="tk-search-meta-label">Job ID</span>
                            <span className="tk-search-meta-value" style={{ fontSize: "0.8rem" }}>
                                {jobIdParam ?? realtimeJob?.id ?? '—'}
                            </span>
                        </div>
                    </div>

                    {/* Cancel */}
                    <button
                        className="ghost-button"
                        style={{ marginTop: 28, color: '#DC2626', borderColor: '#DC2626' }}
                        onClick={handleCancel}
                        disabled={cancelling}
                        type="button"
                    >
                        {cancelling ? "Cancelling…" : "Cancel Request ✕"}
                    </button>
                </div>
            </main>
        );
    }

    // ─── ASSIGNED / EN ROUTE / ARRIVED / COMPLETED ──────────────────────────────
    const showMap = !!mechanic;
    const showPayment = phase === "completed";

    return (
        <main className="page">
            <div className="tk-assigned-container">
                {/* Celebration header */}
                <div className="tk-assigned-header">
                    <span className="tk-assigned-emoji">
                        {phase === "completed" ? "🎉" : phase === "arrived" ? "📍" : "✅"}
                    </span>
                    <h1 className="tk-assigned-title">
                        {phase === "completed"
                            ? "Service completed!"
                            : phase === "arrived"
                                ? "Mechanic has arrived!"
                                : "Mechanic assigned!"}
                    </h1>
                    <p className="tk-assigned-sub">
                        {phase === "completed"
                            ? "Your service is done. You can now proceed with payment."
                            : phase === "arrived"
                                ? "Your mechanic is at your location and ready to help."
                                : "Your mechanic is on the way. Track live below."}
                    </p>
                </div>

                {/* Mechanic Card */}
                {mechanic && (
                    <div className="tk-mechanic-card">
                        <div className="tk-mechanic-profile">
                            <div className="tk-mechanic-avatar">🔧</div>
                            <div className="tk-mechanic-info">
                                <p className="tk-mechanic-name">{mechanic.name}</p>
                                <p className="tk-mechanic-rating">
                                    <strong>⭐ {mechanic.rating}</strong> · {mechanic.trips} trips
                                </p>
                                <p className="tk-mechanic-vehicle">🏍️ {mechanic.vehicle}</p>
                            </div>
                        </div>

                        {/* ETA Bar — only before arrival */}
                        {phase !== "arrived" && phase !== "completed" && (
                            <div className="tk-eta-bar">
                                <div className="tk-eta-header">
                                    <span className="tk-eta-label">Estimated arrival</span>
                                    <span className="tk-eta-time">🕐 {mechanic.eta}</span>
                                </div>
                                <div className="tk-eta-progress">
                                    <div
                                        className="tk-eta-fill"
                                        style={{ width: phase === "en_route" ? "60%" : "25%" }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Live Map — shows mechanic going to customer */}
                {showMap && (
                    <div className="tk-map-wrapper">
                        <div className="tk-map-badge">🏍️ Live Tracking</div>
                        <MapboxMap
                            markers={mechanicMarkers}
                            customerLocation={coords ?? undefined}
                        />
                    </div>
                )}

                {/* Call / Chat actions */}
                <div className="tk-actions">
                    <button
                        className="tk-action-btn tk-action-btn--call"
                        onClick={() => { if (mechanic?.phone) window.open(`tel:${mechanic.phone}`); }}
                        type="button"
                    >
                        📞 Call Mechanic
                    </button>
                    <button className="tk-action-btn tk-action-btn--chat" type="button">
                        💬 Chat
                    </button>
                </div>

                {/* Job Details */}
                <div className="tk-detail-card">
                    <p className="tk-detail-title">📋 Job Details</p>
                    <div className="tk-detail-row">
                        <span className="tk-detail-label">Job ID</span>
                        <span className="tk-detail-value">
                            {jobIdParam ?? realtimeJob?.id ?? '—'}
                        </span>
                    </div>
                    <div className="tk-detail-row">
                        <span className="tk-detail-label">Service</span>
                        <span className="tk-detail-value">
                            {(realtimeJob as any)?.service || (realtimeJob as any)?.serviceType || '—'}
                        </span>
                    </div>
                    <div className="tk-detail-row">
                        <span className="tk-detail-label">Status</span>
                        <span className="tk-detail-value" style={{ color: "#10B981" }}>
                            {phase === "completed" ? "✅ Completed"
                                : phase === "arrived" ? "📍 Arrived"
                                    : phase === "en_route" ? "🏍️ En Route"
                                        : "✅ Assigned"}
                        </span>
                    </div>
                </div>

                {/* Bottom actions */}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    {/* Cancel — always available until completed */}
                    {phase !== "completed" && (
                        <button
                            className="ghost-button"
                            style={{ flex: 1, textAlign: "center", color: '#DC2626', borderColor: '#DC2626' }}
                            onClick={handleCancel}
                            disabled={cancelling}
                            type="button"
                        >
                            {cancelling ? "Cancelling…" : "Cancel Request ✕"}
                        </button>
                    )}
                    {/* Pay button — ONLY when service is completed */}
                    {showPayment && (
                        <Link
                            className="flow-cta"
                            href={`/customer/payment?jobId=${jobIdParam ?? realtimeJob?.id ?? ''}`}
                            style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
                        >
                            Pay now 💳
                        </Link>
                    )}
                    {/* Back to services — only on completion */}
                    {phase === "completed" && (
                        <Link
                            className="ghost-button"
                            href="/customer"
                            style={{ flex: 1, textAlign: "center" }}
                        >
                            ← Back to services
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TrackingPage;
