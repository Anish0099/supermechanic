"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { QUICK_FIX_SERVICES, EMERGENCY_SERVICES, Service } from '../../data/services';

// Diagnose descriptive cards
const DIAGNOSE_FEATURES = [
  {
    icon: "🔍",
    title: "Step-by-step diagnosis",
    desc: "Tell us your vehicle type, model, and problem area.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg,rgba(139,92,246,.18) 0%,rgba(139,92,246,.04) 100%)",
  },
  {
    icon: "🚗",
    title: "Vehicle-specific parts",
    desc: "Maps affected parts to your exact vehicle and system.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg,rgba(6,182,212,.18) 0%,rgba(6,182,212,.04) 100%)",
  },
  {
    icon: "🔧",
    title: "Mechanic arrives prepared",
    desc: "Sees exactly what's reported and brings the right tools.",
    color: "#10B981",
    gradient: "linear-gradient(135deg,rgba(16,185,129,.18) 0%,rgba(16,185,129,.04) 100%)",
  },
  {
    icon: "💰",
    title: "Accept or reject estimate",
    desc: "Only ₹149 inspection fee charged if you decline.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg,rgba(245,158,11,.18) 0%,rgba(245,158,11,.04) 100%)",
  },
];

export default function CustomerPage() {
  const [detailService, setDetailService] = useState<Service | null>(null);

  const quickFixPreview = QUICK_FIX_SERVICES.slice(0, 4);
  const emergencyPreview = EMERGENCY_SERVICES.slice(0, 4);

  return (
    <>
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

        {/* ── Quick Fix Preview ── */}
        <section className="hp-section">
          <div className="hp-section-header">
            <div>
              <span className="hp-section-badge" style={{ background: "#FF7A45" }}>Fixed price</span>
              <h2 className="hp-section-title">⚡ Quick Fix</h2>
              <p className="hp-section-desc">Transparent pricing. Mechanic arrives in under 30 minutes.</p>
            </div>
            <Link href="/customer/quick-fix" className="hp-show-more" style={{ color: "#FF7A45" }}>
              View all {QUICK_FIX_SERVICES.length} services →
            </Link>
          </div>
          <div className="hp-preview-grid">
            {quickFixPreview.map((svc) => (
              <div
                key={svc.id}
                className="qf-service-card"
                style={{ "--svc-color": svc.color } as React.CSSProperties}
                onClick={() => setDetailService(svc)}
              >
                <div className="qf-card-bg" style={{ background: svc.gradient }} aria-hidden />
                {(svc.popular || svc.isNew) && (
                  <span className="qf-badge" style={{ background: svc.color }}>
                    {svc.popular ? "Popular" : "New"}
                  </span>
                )}
                <div className="qf-card-icon" style={{ color: svc.color, background: svc.gradient, fontSize: "1.5rem" }}>{svc.icon}</div>
                <div className="qf-card-body">
                  <h3 className="qf-card-name">{svc.name}</h3>
                  <p className="qf-card-desc">{svc.shortDesc}</p>
                </div>
                <div className="qf-card-footer">
                  <span className="qf-card-price">{svc.priceLabel}</span>
                  <span className="qf-card-eta">🕐 {svc.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Emergency Preview ── */}
        <section className="hp-section">
          <div className="hp-section-header">
            <div>
              <span className="hp-section-badge" style={{ background: "#DC2626" }}>Priority dispatch</span>
              <h2 className="hp-section-title">🚨 Emergency</h2>
              <p className="hp-section-desc">Fastest mechanic dispatched. Fixed, variable, and inspection-based pricing.</p>
            </div>
            <Link href="/customer/emergency" className="hp-show-more" style={{ color: "#DC2626" }}>
              View all {EMERGENCY_SERVICES.length} services →
            </Link>
          </div>
          <div className="hp-preview-grid">
            {emergencyPreview.map((svc) => (
              <div
                key={svc.id}
                className="qf-service-card"
                style={{ "--svc-color": svc.color } as React.CSSProperties}
                onClick={() => setDetailService(svc)}
              >
                <div className="qf-card-bg" style={{ background: svc.gradient }} aria-hidden />
                {(svc.popular || svc.isNew) && (
                  <span className="qf-badge" style={{ background: svc.color }}>
                    {svc.popular ? "Popular" : "New"}
                  </span>
                )}
                <div className="qf-card-icon" style={{ color: svc.color, background: svc.gradient, fontSize: "1.5rem" }}>{svc.icon}</div>
                <div className="qf-card-body">
                  <h3 className="qf-card-name">{svc.name}</h3>
                  <p className="qf-card-desc">{svc.shortDesc}</p>
                </div>
                <div className="qf-card-footer">
                  <span className="qf-card-price">{svc.priceLabel}</span>
                  <span className="qf-card-eta">🕐 {svc.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Diagnose Preview ── */}
        <section className="hp-section">
          <div className="hp-section-header">
            <div>
              <span className="hp-section-badge" style={{ background: "#8B5CF6" }}>Inspection flow</span>
              <h2 className="hp-section-title">🔍 Diagnose Issue</h2>
              <p className="hp-section-desc">Don't know the exact problem? Our wizard helps you narrow it down.</p>
            </div>
            <Link href="/customer/diagnose" className="hp-show-more" style={{ color: "#8B5CF6" }}>
              Start diagnosis →
            </Link>
          </div>
          <div className="hp-preview-grid">
            {DIAGNOSE_FEATURES.map((feat, i) => (
              <div
                key={i}
                className="qf-service-card"
                style={{ "--svc-color": feat.color, cursor: "default" } as React.CSSProperties}
              >
                <div className="qf-card-bg" style={{ background: feat.gradient }} aria-hidden />
                <div className="qf-card-icon" style={{ color: feat.color, background: feat.gradient, fontSize: "1.5rem" }}>{feat.icon}</div>
                <div className="qf-card-body">
                  <h3 className="qf-card-name">{feat.title}</h3>
                  <p className="qf-card-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Service Detail Modal ── */}
      {detailService && (
        <div className="qf-modal-backdrop" onClick={() => setDetailService(null)} role="dialog" aria-modal="true">
          <div className="qf-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qf-modal-close" onClick={() => setDetailService(null)} aria-label="Close">✕</button>
            <div className="qf-modal-header">
              <div className="qf-modal-icon" style={{ color: detailService.color, background: detailService.gradient, fontSize: "2rem" }}>{detailService.icon}</div>
              <div>
                <h2 className="qf-modal-title">{detailService.name}</h2>
                <p className="qf-modal-subtitle">{detailService.shortDesc}</p>
              </div>
            </div>
            <div className="qf-modal-chips">
              <span className="qf-chip qf-chip--price">💰 {detailService.priceLabel}</span>
              <span className="qf-chip qf-chip--eta">🕐 {detailService.eta}</span>
              <span className="qf-chip">⏱ {detailService.duration}</span>
              <span className="qf-chip qf-chip--guarantee">✓ {detailService.guarantee}</span>
            </div>
            <div className="qf-modal-section">
              <p className="qf-modal-section-title">When do you need this?</p>
              <p className="qf-modal-section-text">{detailService.problem}</p>
            </div>
            <div className="qf-modal-section">
              <p className="qf-modal-section-title">What will the mechanic do?</p>
              <ol className="qf-step-list">
                {detailService.mechanicSteps.map((step, i) => (
                  <li key={i} className="qf-step-item">
                    <span className="qf-step-num-sm" style={{ background: detailService.color }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="qf-modal-section">
              <p className="qf-modal-section-title">What's included?</p>
              <ul className="qf-include-list">
                {detailService.included.map((item, i) => (
                  <li key={i} className="qf-include-item">
                    <span style={{ color: detailService.color, fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {detailService.proTip && (
              <div className="qf-modal-tip" style={{ borderColor: detailService.color, background: detailService.gradient }}>
                <span style={{ color: detailService.color, fontWeight: 700 }}>💡 Pro tip: </span>
                {detailService.proTip}
              </div>
            )}
            <Link
              className="flow-cta qf-modal-book-btn"
              style={{ background: detailService.color, textDecoration: "none" }}
              href={
                QUICK_FIX_SERVICES.some((s) => s.id === detailService.id)
                  ? "/customer/quick-fix"
                  : "/customer/emergency"
              }
            >
              Book this service ⚡
            </Link>
          </div>
        </div>
      )}
    </>
  );
}