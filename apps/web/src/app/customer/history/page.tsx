"use client";

import React from 'react';
import Link from 'next/link';
import { useJobHistory } from '../../../lib/hooks/useJobHistory';

const CustomerHistoryPage = () => {
    const { data: jobs = [] } = useJobHistory();
    const items = jobs.length
        ? jobs
        : [
            {
                id: 'VS-2301',
                jobType: 'FIXED',
                serviceType: 'Puncture repair',
                status: 'COMPLETED',
                createdAt: '2026-03-22T00:00:00.000Z',
                price: 499,
            },
        ];

    return (
        <main className="page">
            <section className="flow-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Customer history</p>
                    <h1 className="flow-title">Your recent service requests.</h1>
                    <p className="flow-subtitle">
                        Review completed jobs, pending payments, and past estimates.
                    </p>
                </header>

                <div className="history-card">
                    {items.map((job) => (
                        <div className="history-row" key={job.id}>
                            <div>
                                <p className="history-title">
                                    {job.jobType === 'FIXED'
                                        ? `Quick Fix - ${job.serviceType ?? 'Service'}`
                                        : job.jobType === 'INSPECTION'
                                            ? `Diagnose - ${job.problem ?? 'Inspection'}`
                                            : `Emergency - ${job.problem ?? 'Assistance'}`}
                                </p>
                                <p className="flow-subtitle">
                                    Job ID: {job.id} • {new Date(job.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="history-meta">
                                <span className="history-status">{job.status}</span>
                                <span className="history-price">{job.price ? `Rs ${job.price}` : '—'}</span>
                                <Link className="ghost-button" href={`/customer/tracking?jobId=${job.id}`}>
                                    View details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default CustomerHistoryPage;
