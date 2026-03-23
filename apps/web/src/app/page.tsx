import React from 'react';
import Link from 'next/link';
import AuthCta from '../components/AuthCta';
import ActiveJobCard from '../components/ActiveJobCard';

const HomePage = () => {
    return (
        <main className="page">
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-eyebrow">Vehicle help, on demand</p>
                    <h1 className="hero-title">Get back on the road in minutes.</h1>
                    <p className="hero-subtitle">
                        Choose the service flow that fits your situation. We match you with the nearest
                        verified mechanic and keep you updated in real time.
                    </p>
                </div>
                <div className="hero-panel">
                    <div className="pulse-dot" />
                    <p className="hero-panel-title">Live mechanics nearby</p>
                    <p className="hero-panel-subtitle">Instant matching, live tracking, and secure payments.</p>
                </div>
            </section>

            <AuthCta />
            <ActiveJobCard />

            <section className="options">
                <div className="options-grid">
                    <Link className="option-card" href="/customer/quick-fix">
                        <div className="option-badge">Fixed price</div>
                        <h2 className="option-title">Quick Fix ⚡</h2>
                        <p className="option-desc">
                            Puncture, fuel delivery, jumpstart, towing, and other rapid services.
                        </p>
                        <span className="option-action">Start Quick Fix</span>
                    </Link>

                    <Link className="option-card" href="/customer/diagnose">
                        <div className="option-badge">Inspection flow</div>
                        <h2 className="option-title">Diagnose Issue 🔍</h2>
                        <p className="option-desc">
                            For unknown or complex issues. Pay only the inspection fee if you reject the estimate.
                        </p>
                        <span className="option-action">Start Diagnosis</span>
                    </Link>

                    <Link className="option-card" href="/customer/emergency">
                        <div className="option-badge">Fastest arrival</div>
                        <h2 className="option-title">Emergency 🚨</h2>
                        <p className="option-desc">
                            Tap once, share location, and get the quickest mechanic dispatched immediately.
                        </p>
                        <span className="option-action">Get Emergency Help</span>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default HomePage;