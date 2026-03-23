import React from 'react';
import Link from 'next/link';

const CustomerPage = () => {
    return (
        <main className="page">
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-eyebrow">Customer workspace</p>
                    <h1 className="hero-title">Choose your service flow.</h1>
                    <p className="hero-subtitle">
                        Book a fixed-price quick fix, request an inspection-based diagnosis,
                        or tap for emergency assistance.
                    </p>
                </div>
                <div className="hero-panel">
                    <div className="pulse-dot" />
                    <p className="hero-panel-title">Live updates included</p>
                    <p className="hero-panel-subtitle">Track mechanics in real time and pay securely.</p>
                </div>
            </section>

            <section className="options">
                <div className="options-grid">
                    <Link className="option-card" href="/customer/quick-fix">
                        <div className="option-badge">Fixed price</div>
                        <h2 className="option-title">Quick Fix</h2>
                        <p className="option-desc">
                            Puncture, fuel delivery, jumpstart, towing, and other rapid services.
                        </p>
                        <span className="option-action">Start Quick Fix</span>
                    </Link>

                    <Link className="option-card" href="/customer/diagnose">
                        <div className="option-badge">Inspection flow</div>
                        <h2 className="option-title">Diagnose Issue</h2>
                        <p className="option-desc">
                            Describe your issue. Accept or reject the estimate after inspection.
                        </p>
                        <span className="option-action">Start Diagnosis</span>
                    </Link>

                    <Link className="option-card" href="/customer/emergency">
                        <div className="option-badge">Fastest arrival</div>
                        <h2 className="option-title">Emergency</h2>
                        <p className="option-desc">
                            One-tap request with auto-location and fastest mechanic assignment.
                        </p>
                        <span className="option-action">Get Emergency Help</span>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default CustomerPage;