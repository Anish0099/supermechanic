import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

const CustomerProfilePage = async () => {
    const user = await currentUser();
    const fullName    = user?.fullName ?? 'Guest User';
    const email       = user?.primaryEmailAddress?.emailAddress ?? 'Not available';
    const initials    = fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric',
          })
        : 'Recently joined';

    return (
        <main className="page">
            <div className="profile-page">

                {/* ── Profile Hero (Dark Card) ── */}
                <section className="profile-hero">
                    <div className="profile-hero-bg" aria-hidden />

                    {/* Top: Avatar + Info */}
                    <div className="profile-hero-top">
                        <div className="profile-avatar-wrap">
                            <div className="profile-avatar">
                                <span className="profile-avatar-initials">{initials}</span>
                            </div>
                            <div className="profile-avatar-badge">✓</div>
                        </div>
                        <div className="profile-hero-info">
                            <h1 className="profile-hero-name">{fullName}</h1>
                            <p className="profile-hero-email">{email}</p>
                            <div className="profile-hero-tags">
                                <span className="profile-tag profile-tag--green">● Active</span>
                                <span className="profile-tag">👤 Customer</span>
                                <span className="profile-tag">📅 Since {memberSince}</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="profile-hero-divider" aria-hidden />

                    {/* Stats Row inside Hero */}
                    <div className="profile-hero-stats">
                        <div className="profile-hero-stat">
                            <span className="profile-hero-stat-value">0</span>
                            <span className="profile-hero-stat-label">Jobs Completed</span>
                        </div>
                        <div className="profile-hero-stat">
                            <span className="profile-hero-stat-value">—</span>
                            <span className="profile-hero-stat-label">Avg. Rating Given</span>
                        </div>
                        <div className="profile-hero-stat">
                            <span className="profile-hero-stat-value">₹0</span>
                            <span className="profile-hero-stat-label">Total Spent</span>
                        </div>
                        <div className="profile-hero-stat">
                            <span className="profile-hero-stat-value">0</span>
                            <span className="profile-hero-stat-label">Vehicles Saved</span>
                        </div>
                    </div>
                </section>

                {/* ── Loyalty / Membership Banner ── */}
                <div className="profile-loyalty-card">
                    <div className="profile-loyalty-icon">🏆</div>
                    <div className="profile-loyalty-content">
                        <h3 className="profile-loyalty-title">SuperMechanic Pro</h3>
                        <p className="profile-loyalty-sub">
                            Upgrade for priority dispatch, exclusive discounts, and a dedicated support line.
                        </p>
                    </div>
                    <button className="profile-loyalty-cta" type="button">
                        Explore Pro →
                    </button>
                </div>

                {/* ── Details Grid ── */}
                <div className="profile-grid">

                    {/* Personal Details */}
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <div
                                className="profile-card-icon-wrap"
                                style={{ background: 'rgba(26,77,255,0.08)' }}
                            >
                                👤
                            </div>
                            <h2 className="profile-card-title">Personal Details</h2>
                        </div>
                        <div className="profile-field-list">
                            <div className="profile-field">
                                <span className="profile-field-label">Full Name</span>
                                <span className="profile-field-value">{fullName}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">Email Address</span>
                                <span className="profile-field-value">{email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">Phone</span>
                                <span className="profile-field-value profile-field-value--muted">Not added yet</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">Member Since</span>
                                <span className="profile-field-value">{memberSince}</span>
                            </div>
                        </div>
                        <button className="profile-edit-btn" type="button">
                            ✏️ Edit Details
                        </button>
                    </div>

                    {/* Account & Security */}
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <div
                                className="profile-card-icon-wrap"
                                style={{ background: 'rgba(13,185,122,0.08)' }}
                            >
                                🛡️
                            </div>
                            <h2 className="profile-card-title">Account &amp; Security</h2>
                        </div>
                        <div className="profile-field-list">
                            <div className="profile-field">
                                <span className="profile-field-label">Role</span>
                                <span className="profile-status-badge profile-status-badge--blue">Customer</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">Account Status</span>
                                <span className="profile-status-badge profile-status-badge--green">✓ Active</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">Email Verified</span>
                                <span className="profile-status-badge profile-status-badge--green">✓ Verified</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-label">2-Step Verification</span>
                                <span className="profile-status-badge profile-status-badge--orange">Set up</span>
                            </div>
                        </div>
                    </div>

                    {/* Saved Locations */}
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <div
                                className="profile-card-icon-wrap"
                                style={{ background: 'rgba(196,154,30,0.08)' }}
                            >
                                📍
                            </div>
                            <h2 className="profile-card-title">Saved Locations</h2>
                        </div>
                        <div className="profile-empty-state">
                            <span className="profile-empty-icon">🗺️</span>
                            <p className="profile-empty-text">No saved locations yet.</p>
                            <p className="profile-empty-sub">
                                Frequently used locations will appear here for one-tap access.
                            </p>
                        </div>
                        <button className="profile-edit-btn profile-edit-btn--ghost" type="button">
                            + Add Location
                        </button>
                    </div>

                    {/* My Vehicles */}
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <div
                                className="profile-card-icon-wrap"
                                style={{ background: 'rgba(139,92,246,0.08)' }}
                            >
                                🚗
                            </div>
                            <h2 className="profile-card-title">My Vehicles</h2>
                        </div>
                        <div className="profile-empty-state">
                            <span className="profile-empty-icon">🔑</span>
                            <p className="profile-empty-text">No vehicles saved.</p>
                            <p className="profile-empty-sub">
                                Add your vehicles for faster booking and better mechanic matching.
                            </p>
                        </div>
                        <button className="profile-edit-btn profile-edit-btn--ghost" type="button">
                            + Add Vehicle
                        </button>
                    </div>
                </div>

                {/* ── Quick Actions ── */}
                <div className="profile-actions-row">
                    <Link href="/customer/history" className="profile-action-btn">
                        <div
                            className="profile-action-icon"
                            style={{ background: 'rgba(26,77,255,0.08)' }}
                        >
                            📋
                        </div>
                        <div>
                            <div className="profile-action-title">View History</div>
                            <div className="profile-action-sub">See all your past jobs</div>
                        </div>
                        <span className="profile-action-arrow">→</span>
                    </Link>
                    <Link href="/customer/quick-fix" className="profile-action-btn">
                        <div
                            className="profile-action-icon"
                            style={{ background: 'rgba(13,185,122,0.08)' }}
                        >
                            ⚡
                        </div>
                        <div>
                            <div className="profile-action-title">Book a Service</div>
                            <div className="profile-action-sub">Get help in under 30 min</div>
                        </div>
                        <span className="profile-action-arrow">→</span>
                    </Link>
                    <Link href="/customer/emergency" className="profile-action-btn">
                        <div
                            className="profile-action-icon"
                            style={{ background: 'rgba(232,64,61,0.08)' }}
                        >
                            🚨
                        </div>
                        <div>
                            <div className="profile-action-title">Emergency Help</div>
                            <div className="profile-action-sub">Priority dispatch now</div>
                        </div>
                        <span className="profile-action-arrow">→</span>
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default CustomerProfilePage;
