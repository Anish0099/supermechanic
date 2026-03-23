"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ActiveJobCard = () => {
    const [jobId, setJobId] = useState<string | null>(null);

    useEffect(() => {
        const stored = window.localStorage.getItem('activeJobId');
        if (stored) {
            setJobId(stored);
        }
    }, []);

    if (!jobId) {
        return null;
    }

    return (
        <section className="active-job">
            <div className="active-job-meta">
                <span className="hero-eyebrow">Active job</span>
                <span className="active-job-title">Tracking your current request</span>
                <span className="flow-subtitle">Job ID: {jobId}</span>
            </div>
            <div className="active-job-actions">
                <Link className="ghost-button" href={`/customer/tracking?jobId=${jobId}`}>
                    Resume tracking
                </Link>
                <button
                    className="danger-button"
                    type="button"
                    onClick={() => {
                        window.localStorage.removeItem('activeJobId');
                        setJobId(null);
                    }}
                >
                    Clear
                </button>
            </div>
        </section>
    );
};

export default ActiveJobCard;
