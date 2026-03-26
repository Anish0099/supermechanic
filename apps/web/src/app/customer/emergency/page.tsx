"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateJob } from "../../../lib/hooks/useCreateJob";
import { useLocation } from "../../../context/LocationContext";
import { EMERGENCY_SERVICES, VEHICLES, Service } from "../../../data/services";

export default function EmergencyPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [detailService, setDetailService] = useState<Service | null>(null);
  const [vehicleType, setVehicleType] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateJob();
  const { address: location, coords } = useLocation();

  const canBook = !!selectedService && !!vehicleType;

  const handleBook = async () => {
    if (!canBook) return;
    const response = await mutateAsync({
      jobType: "EMERGENCY",
      serviceType: selectedService!.name,
      vehicleType,
      location: {
        address: location || "Auto-detected",
        lat: coords?.lat,
        lng: coords?.lng,
      },
      notes,
      priority: "EMERGENCY",
    });
    window.localStorage.setItem("activeJobId", response.id);
    router.push(`/customer/tracking?jobId=${response.id}`);
  };

  const severityLabel = (s?: string) => {
    if (s === "critical") return "🔴 Critical";
    if (s === "urgent") return "🟡 Urgent";
    return "🟢 Standard";
  };

  const priceTypeLabel = (t: string) => {
    if (t === "fixed") return "Fixed price";
    if (t === "inspect") return "Inspect first";
    return "Variable";
  };

  return (
    <>
      <main className="page">
        <div className="flow-page">
          {/* ── Header ── */}
          <header className="flow-header">
            <span className="hero-eyebrow">🚨 Emergency — Priority Dispatch</span>
            <h1 className="flow-title">What emergency are you facing?</h1>
            <p className="flow-subtitle">
              Fastest available mechanic dispatched to your location. Some
              services have fixed pricing, others require on-site inspection.
            </p>
          </header>

          {/* ── Step 1: Service Selection ── */}
          <section>
            <div className="qf-step-label">
              <span className="qf-step-num" style={{ background: "#DC2626" }}>1</span>
              Select emergency type
            </div>
            <div className="qf-services-grid">
              {EMERGENCY_SERVICES.map((svc) => (
                <div
                  key={svc.id}
                  className={`qf-service-card${selectedService?.id === svc.id ? " qf-service-card--selected" : ""}`}
                  style={{ "--svc-color": svc.color } as React.CSSProperties}
                  onClick={() => setSelectedService(svc)}
                >
                  {/* Background gradient overlay */}
                  <div
                    className="qf-card-bg"
                    style={{ background: svc.gradient }}
                    aria-hidden
                  />

                  {/* Badge */}
                  {(svc.popular || svc.isNew) && (
                    <span className="qf-badge" style={{ background: svc.color }}>
                      {svc.popular ? "Popular" : "New"}
                    </span>
                  )}

                  {/* Selected checkmark */}
                  {selectedService?.id === svc.id && (
                    <span
                      className="qf-selected-check"
                      style={{ background: svc.color }}
                    >
                      ✓
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className="qf-card-icon"
                    style={{ color: svc.color, background: svc.gradient, fontSize: "1.5rem" }}
                  >
                    {svc.icon}
                  </div>

                  {/* Name & desc */}
                  <div className="qf-card-body">
                    <h3 className="qf-card-name">{svc.name}</h3>
                    <p className="qf-card-desc">{svc.shortDesc}</p>
                  </div>

                  {/* Price, ETA, severity */}
                  <div className="qf-card-footer">
                    <span className="qf-card-price">{svc.priceLabel}</span>
                    <span className="qf-card-eta">🕐 {svc.eta}</span>
                  </div>

                  {/* Price & severity type badges */}
                  <div className="qf-card-footer" style={{ gap: 6 }}>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: "rgba(17,17,22,0.06)",
                      color: "var(--ink-muted)",
                    }}>
                      {priceTypeLabel(svc.priceType)}
                    </span>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}>
                      {severityLabel(svc.severity)}
                    </span>
                  </div>

                  {/* Details link */}
                  <button
                    className="qf-card-details-btn"
                    style={{ color: svc.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailService(svc);
                    }}
                    type="button"
                  >
                    View details →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Step 2: Vehicle Selection ── */}
          <section>
            <div className="qf-step-label">
              <span className="qf-step-num" style={{ background: "#DC2626" }}>2</span>
              Select your vehicle
            </div>
            <div className="qf-vehicles-grid">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  className={`qf-vehicle-card${vehicleType === v.id ? " qf-vehicle-card--selected" : ""}`}
                  onClick={() => setVehicleType(v.id)}
                  type="button"
                  aria-pressed={vehicleType === v.id}
                >
                  <span className="qf-vehicle-icon" style={{ fontSize: "2rem" }}>{v.icon}</span>
                  <span className="qf-vehicle-label">{v.label}</span>
                  <span className="qf-vehicle-desc">{v.desc}</span>
                  {vehicleType === v.id && (
                    <span className="qf-vehicle-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* ── Step 3: Notes ── */}
          <section className="flow-card">
            <div className="qf-step-label" style={{ marginBottom: 0 }}>
              <span className="qf-step-num" style={{ background: "#DC2626" }}>3</span>
              Describe the situation
            </div>
            <div className="field">
              <textarea
                className="field-textarea"
                style={{ minHeight: 80 }}
                placeholder="e.g. Stuck on highway after collision · White Hyundai Creta · Near KM marker 45"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </section>

          {/* Spacer for sticky bar */}
          <div style={{ height: 88 }} />
        </div>
      </main>

      {/* ── Sticky Booking Bar ── */}
      <div className={`qf-sticky-bar${canBook ? " qf-sticky-bar--ready" : ""}`}>
        <div className="qf-sticky-inner">
          {selectedService ? (
            <div className="qf-sticky-summary">
              <span
                className="qf-sticky-icon"
                style={{
                  color: selectedService.color,
                  background: selectedService.gradient,
                  fontSize: "1.3rem",
                }}
              >
                {selectedService.icon}
              </span>
              <div className="qf-sticky-details">
                <span className="qf-sticky-service">
                  {selectedService.name}
                </span>
                <span className="qf-sticky-meta">
                  {vehicleType || (
                    <span style={{ color: "#EF4444" }}>Select vehicle ↑</span>
                  )}
                  <span className="qf-sticky-sep">·</span>
                  <strong style={{ color: "var(--accent-dark)" }}>
                    {selectedService.priceLabel}
                  </strong>
                  <span className="qf-sticky-sep">·</span>
                  🕐 {selectedService.eta}
                </span>
              </div>
            </div>
          ) : (
            <p className="qf-sticky-hint">← Select an emergency service to continue</p>
          )}
          <button
            className="flow-cta qf-book-btn"
            disabled={!canBook || isPending}
            onClick={handleBook}
            style={canBook ? { background: selectedService?.color } : undefined}
          >
            {isPending ? "Dispatching…" : "Request Emergency ⚡"}
          </button>
        </div>
      </div>

      {/* ── Service Detail Modal ── */}
      {detailService && (
        <div
          className="qf-modal-backdrop"
          onClick={() => setDetailService(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${detailService.name} details`}
        >
          <div className="qf-modal" onClick={(e) => e.stopPropagation()}>

            {/* ── Colored Hero Banner ── */}
            <div
              className="qf-modal-header"
              style={{
                background: detailService.gradient,
                borderBottom: `1px solid ${detailService.color}22`,
              }}
            >
              <div
                className="qf-modal-icon"
                style={{ color: detailService.color }}
              >
                {detailService.icon}
              </div>
              <div className="qf-modal-header-text">
                <h2 className="qf-modal-title">{detailService.name}</h2>
                <p className="qf-modal-subtitle">{detailService.shortDesc}</p>
              </div>
              <button
                className="qf-modal-close"
                onClick={() => setDetailService(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* ── Chips ── */}
            <div className="qf-modal-chips">
              <span className="qf-chip qf-chip--price">💰 {detailService.priceLabel}</span>
              <span className="qf-chip qf-chip--eta">🕐 {detailService.eta}</span>
              <span className="qf-chip">⏱ {detailService.duration}</span>
              <span className="qf-chip qf-chip--guarantee">✓ {detailService.guarantee}</span>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="qf-modal-body">

              <div className="qf-modal-section">
                <p className="qf-modal-section-title">When do you need this?</p>
                <p className="qf-modal-section-text">{detailService.problem}</p>
              </div>

              <div className="qf-modal-section">
                <p className="qf-modal-section-title">What will the mechanic do?</p>
                <ol className="qf-step-list">
                  {detailService.mechanicSteps.map((step, i) => (
                    <li key={i} className="qf-step-item">
                      <span
                        className="qf-step-num-sm"
                        style={{ background: detailService.color }}
                      >
                        {i + 1}
                      </span>
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
                      <span
                        className="qf-check-icon"
                        style={{ background: detailService.color }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {detailService.proTip && (
                <div
                  className="qf-modal-tip"
                  style={{ borderColor: detailService.color }}
                >
                  <span className="qf-modal-tip-icon">💡</span>
                  <span>
                    <strong style={{ color: detailService.color }}>Pro tip: </strong>
                    {detailService.proTip}
                  </span>
                </div>
              )}
            </div>

            {/* ── Compatible Vehicles ── */}
            <div className="qf-modal-compat-row">
              <span className="qf-modal-compat-label">Works for:</span>
              <span className="qf-modal-compat-value">{detailService.compatibleVehicles}</span>
            </div>

            {/* ── Sticky Footer CTA ── */}
            <div className="qf-modal-footer">
              <button
                className="qf-modal-book-btn"
                style={{ background: detailService.color }}
                onClick={() => {
                  setSelectedService(detailService);
                  setDetailService(null);
                  setTimeout(() => {
                    document
                      .querySelector(".qf-vehicles-grid")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 100);
                }}
              >
                Select this service 🚨
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
