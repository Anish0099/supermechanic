import React from 'react';
import { requireRole } from '../../lib/auth';

const AdminPage = async () => {
    await requireRole('admin');

    return (
        <main className="page">
            <section className="admin-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Admin control</p>
                    <h1 className="flow-title">Operational dashboard</h1>
                    <p className="flow-subtitle">
                        Monitor live jobs, manage mechanics, and keep pricing and commissions in check.
                    </p>
                </header>

                <section className="admin-grid">
                    <div className="metric-card">
                        <p className="metric-label">Active jobs</p>
                        <p className="metric-value">42</p>
                        <p className="metric-label">+8% since yesterday</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Revenue today</p>
                        <p className="metric-value">Rs 1.42L</p>
                        <p className="metric-label">Gross platform revenue</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Online mechanics</p>
                        <p className="metric-value">128</p>
                        <p className="metric-label">78% availability</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Avg ETA</p>
                        <p className="metric-value">14 min</p>
                        <p className="metric-label">Across all zones</p>
                    </div>
                </section>

                <section className="admin-card">
                    <h3>Live operations</h3>
                    <div className="flow-meta">
                        <span>Jobs waiting assignment: 6</span>
                        <span>Critical alerts: 2</span>
                        <span>Mechanics pending approval: 9</span>
                    </div>
                    <div className="admin-actions">
                        <a className="flow-cta" href="/admin/jobs">View live jobs</a>
                        <button className="ghost-button" type="button">Review mechanics</button>
                        <a className="ghost-button" href="/admin/payments">Payments ledger</a>
                        <button className="ghost-button" type="button">Pricing controls</button>
                    </div>
                </section>

                <section className="admin-card">
                    <h3>Manual assignment</h3>
                    <p className="flow-subtitle">
                        Assign a mechanic to a job when auto-matching is paused or when handling escalations.
                    </p>
                    <div className="admin-actions">
                        <button className="flow-cta" type="button">Open assignment console</button>
                        <button className="ghost-button" type="button">View queue</button>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default AdminPage;