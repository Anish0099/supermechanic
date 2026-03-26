"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthCta from "../components/AuthCta";
import ActiveJobCard from "../components/ActiveJobCard";
import { QUICK_FIX_SERVICES, EMERGENCY_SERVICES, Service } from "../data/services";

/* ─── Static Data ─── */

const DIAGNOSE_FEATURES = [
  {
    icon: "🔍",
    title: "Step-by-step diagnosis",
    desc: "Tell us your vehicle type, model, and problem area — we narrow it down precisely.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg,rgba(139,92,246,.16) 0%,rgba(139,92,246,.04) 100%)",
  },
  {
    icon: "🚗",
    title: "Vehicle-specific parts",
    desc: "Our wizard maps affected parts to your exact vehicle type and system.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg,rgba(6,182,212,.16) 0%,rgba(6,182,212,.04) 100%)",
  },
  {
    icon: "🔧",
    title: "Mechanic arrives prepared",
    desc: "The mechanic sees your report and arrives with exactly the right tools.",
    color: "#10B981",
    gradient: "linear-gradient(135deg,rgba(16,185,129,.16) 0%,rgba(16,185,129,.04) 100%)",
  },
  {
    icon: "💰",
    title: "Accept or reject estimate",
    desc: "Only the inspection fee (₹149) is charged if you decide not to proceed.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg,rgba(245,158,11,.16) 0%,rgba(245,158,11,.04) 100%)",
  },
];

const MECHANICS = [
  {
    name: "Rajesh Kumar",
    specialty: "Engine & Transmission",
    rating: 4.9,
    jobs: 412,
    location: "Connaught Place, Delhi",
    badge: "Top Rated",
    badgeColor: "#1A4DFF",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop&q=80",
    skills: ["Engine Repair", "Transmission", "AC Service"],
  },
  {
    name: "Amit Sharma",
    specialty: "Tyres & Suspension",
    rating: 4.8,
    jobs: 287,
    location: "Bandra, Mumbai",
    badge: "Fast Response",
    badgeColor: "#0DB97A",
    img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop&q=80",
    skills: ["Tyre Change", "Wheel Alignment", "Suspension"],
  },
  {
    name: "Suresh Nair",
    specialty: "Electrical & Battery",
    rating: 4.7,
    jobs: 193,
    location: "Koramangala, Bengaluru",
    badge: "Certified",
    badgeColor: "#6366F1",
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop&q=80",
    skills: ["Battery Jumpstart", "Wiring", "ECU Diagnosis"],
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Menon",
    city: "Bengaluru",
    text: "My car broke down at 9 PM and a mechanic was at my door in 18 minutes. Absolutely lifesaving! The pricing was completely transparent and the fix was solid. I've used SuperMechanic three times since — wouldn't trust anyone else.",
    rating: 5,
    service: "Emergency Towing",
    avatar: "PM",
    color: "#1A4DFF",
    featured: true,
  },
  {
    name: "Karan Bhatia",
    city: "Delhi",
    text: "Used SuperMechanic for a puncture repair on the expressway. The mechanic tracked my GPS and found me within minutes. The app showed his live location the whole time — no anxiety, no guessing. Worth every rupee.",
    rating: 5,
    service: "Puncture Repair",
    avatar: "KB",
    color: "#0DB97A",
    tall: true,
  },
  {
    name: "Divya Rao",
    city: "Mumbai",
    text: "The diagnose flow is pure genius — told me exactly what was wrong before the mechanic even arrived. Saved so much time and haggling.",
    rating: 5,
    service: "Diagnose & Repair",
    avatar: "DR",
    color: "#6366F1",
  },
  {
    name: "Arjun Patel",
    city: "Ahmedabad",
    text: "Battery died in a mall parking lot. Got help in 22 minutes flat. The mechanic was polite and professional. The app experience is smoother than any service I've used.",
    rating: 5,
    service: "Battery Jumpstart",
    avatar: "AP",
    color: "#F59E0B",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "📍",
    title: "Share your location",
    desc: "Tell us where you are — on the road, at home, or anywhere in the city. GPS ensures pinpoint accuracy.",
    color: "#1A4DFF",
  },
  {
    step: "02",
    icon: "🔧",
    title: "Pick your service",
    desc: "Choose Quick Fix for known issues, Emergency for urgent help, or Diagnose if you're unsure what's wrong.",
    color: "#0DB97A",
  },
  {
    step: "03",
    icon: "⚡",
    title: "Mechanic en route",
    desc: "We match you with the nearest verified mechanic. Track them live on the map until they reach you.",
    color: "#6366F1",
  },
];

const TRUST_STATS = [
  { value: "1,200+", label: "Verified Mechanics", icon: "🔧" },
  { value: "50+",    label: "Cities Covered",     icon: "🏙️" },
  { value: "28 min", label: "Avg. Response Time", icon: "⚡" },
  { value: "4.8 ★",  label: "Customer Rating",    icon: "⭐" },
];

const WHY_US = [
  {
    icon: "🔒",
    title: "Verified Mechanics Only",
    desc: "Every mechanic is background-checked, skill-tested, and insured before joining our platform.",
    color: "#1A4DFF",
    bg: "rgba(26,77,255,0.08)",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "No hidden charges. Fixed-price services are final. Inspection-based estimates need your approval.",
    color: "#0DB97A",
    bg: "rgba(13,185,122,0.08)",
  },
  {
    icon: "📍",
    title: "Real-time Tracking",
    desc: "Watch your mechanic navigate to you live on the map. No more waiting and wondering.",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.08)",
  },
  {
    icon: "🛡️",
    title: "Service Guarantee",
    desc: "All Quick Fix services come with a 7-day workmanship guarantee. Not right? We fix it free.",
    color: "#C49A1E",
    bg: "rgba(196,154,30,0.08)",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    desc: "Our support team is always on standby. Reach us any time via chat, call, or in-app messaging.",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: "⚡",
    title: "Emergency Dispatch",
    desc: "Stuck at midnight? Our emergency channel prioritises your request above all others.",
    color: "#E8403D",
    bg: "rgba(232,64,61,0.08)",
  },
];

const CITIES = [
  { name: "Delhi",     count: "180+ mechanics", icon: "🏛️" },
  { name: "Mumbai",    count: "210+ mechanics", icon: "🌊" },
  { name: "Bengaluru", count: "195+ mechanics", icon: "🌿" },
  { name: "Hyderabad", count: "140+ mechanics", icon: "💎" },
  { name: "Chennai",   count: "120+ mechanics", icon: "🎭" },
  { name: "Pune",      count: "110+ mechanics", icon: "🏔️" },
  { name: "Kolkata",   count: "95+ mechanics",  icon: "🎨" },
  { name: "Jaipur",    count: "80+ mechanics",  icon: "🏯" },
  { name: "Surat",     count: "70+ mechanics",  icon: "💍" },
];

const MECHANIC_FEATURES = [
  {
    icon: "🔩",
    bg: "rgba(26,77,255,0.10)",
    color: "#1A4DFF",
    title: "Fully equipped professionals",
    desc: "Every mechanic arrives with a certified toolkit and genuine spare parts.",
  },
  {
    icon: "📋",
    bg: "rgba(13,185,122,0.10)",
    color: "#0DB97A",
    title: "Digital job reports",
    desc: "Get a full PDF summary of the work done, parts replaced, and warranty terms.",
  },
  {
    icon: "⏱️",
    bg: "rgba(196,154,30,0.10)",
    color: "#C49A1E",
    title: "On-time or it's free",
    desc: "If your mechanic is more than 45 minutes late on a Quick Fix, the service is on us.",
  },
];

export default function HomePage() {
  const [detailService, setDetailService] = useState<Service | null>(null);

  const quickFixPreview   = QUICK_FIX_SERVICES.slice(0, 4);
  const emergencyPreview  = EMERGENCY_SERVICES.slice(0, 4);

  return (
    <>
      <main className="page">

        {/* ── Hero ── */}
        <section className="hero hero--wide fade-in">
          <div className="hero-content">
            <p className="hero-eyebrow">🔧 Vehicle help, on demand</p>
            <h1 className="hero-title">
              Car trouble?<br />
              Help is{" "}
              <span className="hero-title-accent">15 minutes</span>{" "}
              away.
            </h1>
            <p className="hero-subtitle">
              India&rsquo;s fastest roadside mechanic network. Verified professionals,
              transparent pricing, live GPS tracking.
            </p>
            <div className="hero-cta-row">
              <Link href="/customer/quick-fix" className="flow-cta hero-cta-primary">
                Get Quick Fix ⚡
              </Link>
              <Link href="/customer/emergency" className="ghost-button hero-cta-secondary">
                🚨 Emergency Help
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-img-card">
              <img
                src="https://images.unsplash.com/photo-1504222490345-c075b7b1f11e?w=700&h=500&fit=crop&q=85"
                alt="Mechanic working on a car at roadside"
                className="hero-img"
              />
              <div className="hero-img-overlay" />
              <div className="hero-img-badge">
                <div className="pulse-dot" style={{ margin: 0, width: 10, height: 10 }} />
                <span>Live mechanics nearby</span>
              </div>
            </div>
            {/* Floating stat cards */}
            <div className="hero-float-strip">
              <div className="hero-float-card">
                ⭐ <span>4.8 avg rating</span>
              </div>
              <div className="hero-float-card">
                🔧 <span>1,200+ mechanics</span>
              </div>
            </div>
          </div>
        </section>

        <AuthCta />
        <ActiveJobCard />

        {/* ── Trust Stats ── */}
        <div className="trust-bar fade-in-d1">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="trust-stat">
              <span className="trust-stat-icon">{stat.icon}</span>
              <span className="trust-stat-value">{stat.value}</span>
              <span className="trust-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── How It Works ── */}
        <section className="hp-section hiw-section">
          <div className="hp-section-header" style={{ marginBottom: 32 }}>
            <div>
              <span className="hp-section-badge" style={{ background: "#6366F1" }}>Simple process</span>
              <h2 className="hp-section-title">How SuperMechanic works</h2>
              <p className="hp-section-desc">From breakdown to fixed — in three simple steps.</p>
            </div>
          </div>
          <div className="hiw-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="hiw-card">
                <div className="hiw-step-num" style={{ color: step.color, borderColor: step.color }}>
                  {step.step}
                </div>
                <div className="hiw-icon" style={{ background: `${step.color}14`, color: step.color }}>
                  {step.icon}
                </div>
                <h3 className="hiw-title">{step.title}</h3>
                <p className="hiw-desc">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hiw-connector" aria-hidden>→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick Fix Preview ── */}
        <section className="hp-section">
          <div className="hp-section-header">
            <div>
              <span className="hp-section-badge" style={{ background: "#1A4DFF" }}>Fixed price</span>
              <h2 className="hp-section-title">⚡ Quick Fix</h2>
              <p className="hp-section-desc">
                Transparent pricing. Mechanic arrives in under 30 minutes.
              </p>
            </div>
            <Link href="/customer/quick-fix" className="hp-show-more">
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
                <div className="qf-card-icon" style={{ color: svc.color, background: svc.gradient }}>
                  {svc.icon}
                </div>
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
              <span className="hp-section-badge" style={{ background: "#E8403D" }}>Priority dispatch</span>
              <h2 className="hp-section-title">🚨 Emergency</h2>
              <p className="hp-section-desc">
                Fastest mechanic dispatched. Fixed, variable, and inspection-based pricing.
              </p>
            </div>
            <Link href="/customer/emergency" className="hp-show-more">
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
                <div className="qf-card-icon" style={{ color: svc.color, background: svc.gradient }}>
                  {svc.icon}
                </div>
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

        {/* ── Mechanic Showcase ── */}
        <section className="hp-section">
          <div className="hp-section-header" style={{ marginBottom: 32 }}>
            <div>
              <span className="hp-section-badge" style={{ background: "#0DB97A" }}>Our team</span>
              <h2 className="hp-section-title">Meet our top mechanics</h2>
              <p className="hp-section-desc">
                Verified professionals with proven track records. Background-checked and skill-certified.
              </p>
            </div>
          </div>
          <div className="mech-grid">
            {MECHANICS.map((m) => (
              <div key={m.name} className="mech-card">
                <div className="mech-card-img-wrap">
                  <img src={m.img} alt={m.name} className="mech-card-img" />
                  <div className="mech-card-img-overlay" />
                  <span className="mech-card-badge" style={{ background: m.badgeColor }}>
                    {m.badge}
                  </span>
                </div>
                <div className="mech-card-body">
                  <h3 className="mech-card-name">{m.name}</h3>
                  <p className="mech-card-specialty">{m.specialty}</p>
                  <div className="mech-card-meta">
                    <span className="mech-card-rating">⭐ {m.rating}</span>
                    <span className="mech-card-sep">·</span>
                    <span>{m.jobs} jobs</span>
                    <span className="mech-card-sep">·</span>
                    <span>📍 {m.location}</span>
                  </div>
                  <div className="mech-card-skills">
                    {m.skills.map((s) => (
                      <span key={s} className="mech-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Feature Strip — About our mechanics / Business ── */}
        <div className="feature-strip">
          <div className="feature-strip-media">
            <img
              src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=500&fit=crop&q=85"
              alt="Professional mechanic inspecting engine"
              className="feature-strip-img"
            />
            <div className="feature-strip-overlay" />
          </div>
          <div className="feature-strip-content">
            <div className="feature-strip-header">
              <span className="hp-section-badge" style={{ background: "#1A4DFF", marginBottom: 0 }}>
                What sets us apart
              </span>
              <h2 className="feature-strip-title">
                Mechanics you can actually trust
              </h2>
              <p className="feature-strip-desc">
                We don&rsquo;t just send any mechanic. Every professional on our network is vetted,
                insured, and equipped to deliver a premium on-site experience.
              </p>
            </div>
            <div className="feature-list">
              {MECHANIC_FEATURES.map((f, i) => (
                <div key={i} className="feature-item">
                  <div
                    className="feature-item-icon"
                    style={{ background: f.bg, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <div className="feature-item-body">
                    <div className="feature-item-title">{f.title}</div>
                    <div className="feature-item-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/customer/quick-fix" className="flow-cta" style={{ width: "fit-content" }}>
              Book a service now →
            </Link>
          </div>
        </div>

        {/* ── Why SuperMechanic ── */}
        <section className="hp-section">
          <div className="hp-section-header" style={{ marginBottom: 32 }}>
            <div>
              <span className="hp-section-badge" style={{ background: "#C49A1E" }}>Why us</span>
              <h2 className="hp-section-title">Built for the road ahead</h2>
              <p className="hp-section-desc">
                We didn&rsquo;t just build an app — we built a promise. Here&rsquo;s what makes us different.
              </p>
            </div>
          </div>
          <div className="why-grid">
            {WHY_US.map((item) => (
              <div key={item.title} className="why-card">
                <div className="why-icon" style={{ background: item.bg, color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cities Coverage ── */}
        <div className="cities-section">
          <div className="cities-inner">
            <div className="cities-text-side">
              <span className="cities-badge">🗺️ Coverage</span>
              <h2 className="cities-title">
                Now live in<br />50+ cities
              </h2>
              <p className="cities-desc">
                From metros to tier-2 cities, our network of verified mechanics is always nearby.
                Expanding every month.
              </p>
              <Link
                href="/customer/quick-fix"
                className="flow-cta"
                style={{ width: "fit-content", marginTop: 8 }}
              >
                Find a mechanic near you →
              </Link>
            </div>
            <div className="cities-grid-side">
              {CITIES.map((city) => (
                <div key={city.name} className="city-chip">
                  <span className="city-chip-icon">{city.icon}</span>
                  <span className="city-chip-name">{city.name}</span>
                  <span className="city-chip-count">{city.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Diagnose Preview ── */}
        <section className="hp-section" style={{ marginTop: 80 }}>
          <div className="hp-section-header">
            <div>
              <span className="hp-section-badge" style={{ background: "#8B5CF6" }}>Inspection flow</span>
              <h2 className="hp-section-title">🔍 Diagnose your issue</h2>
              <p className="hp-section-desc">
                Don&rsquo;t know the exact problem? Our wizard helps you narrow it down step by step.
              </p>
            </div>
            <Link href="/customer/diagnose" className="hp-show-more">
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
                <div className="qf-card-icon" style={{ color: feat.color, background: feat.gradient }}>
                  {feat.icon}
                </div>
                <div className="qf-card-body">
                  <h3 className="qf-card-name">{feat.title}</h3>
                  <p className="qf-card-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials — Asymmetric Layout ── */}
        <section className="hp-section">
          <div className="hp-section-header" style={{ marginBottom: 32 }}>
            <div>
              <span className="hp-section-badge" style={{ background: "#C49A1E" }}>Reviews</span>
              <h2 className="hp-section-title">What our customers say</h2>
              <p className="hp-section-desc">
                Real stories from people we&rsquo;ve helped get back on the road.
              </p>
            </div>
          </div>
          <div className="testimonials-layout">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={[
                  "testimonial-card",
                  t.featured ? "testimonial-card--featured" : "",
                  t.tall    ? "testimonial-card--tall"     : "",
                ].filter(Boolean).join(" ")}
              >
                <div>
                  <div className="testimonial-quote-mark">&ldquo;</div>
                  <div className="testimonial-stars">{"★".repeat(t.rating)}</div>
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <div
                    className="testimonial-avatar"
                    style={{ background: `${t.color}20`, color: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-meta">{t.city}</div>
                  </div>
                  <span className="testimonial-service-tag">{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA Banner ── */}
        <section className="cta-banner">
          <div className="cta-banner-inner">
            <div>
              <h2 className="cta-banner-title">Car trouble?<br />Don&rsquo;t wait.</h2>
              <p className="cta-banner-sub">
                A verified mechanic is standing by, just minutes away from you.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link href="/customer/quick-fix" className="cta-banner-btn-primary">
                Book Quick Fix ⚡
              </Link>
              <Link href="/customer/emergency" className="cta-banner-btn-ghost">
                🚨 Emergency
              </Link>
            </div>
          </div>
        </section>

      </main>

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

            {/* Close */}
            <button className="qf-modal-close" onClick={() => setDetailService(null)} aria-label="Close">✕</button>

            {/* ── Hero banner ── */}
            <div
              className="qf-modal-header"
              style={{ background: detailService.gradient, borderBottom: `1px solid ${detailService.color}22` }}
            >
              <div className="qf-modal-icon" style={{ color: detailService.color }}>
                {detailService.icon}
              </div>
              <div>
                <h2 className="qf-modal-title">{detailService.name}</h2>
                <p className="qf-modal-subtitle">{detailService.shortDesc}</p>
              </div>
            </div>

            {/* ── Info chips ── */}
            <div className="qf-modal-chips">
              <span className="qf-chip qf-chip--price">💰 {detailService.priceLabel}</span>
              <span className="qf-chip qf-chip--eta">⚡ {detailService.eta}</span>
              <span className="qf-chip">⏱ {detailService.duration}</span>
              <span className="qf-chip qf-chip--guarantee">🛡 {detailService.guarantee}</span>
            </div>

            {/* ── Body sections ── */}
            <div className="qf-modal-body">
              <div className="qf-modal-section">
                <p className="qf-modal-section-title">When do you need this?</p>
                <p className="qf-modal-section-text">{detailService.problem}</p>
              </div>

              <div className="qf-modal-section">
                <p className="qf-modal-section-title">What the mechanic does</p>
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
                <p className="qf-modal-section-title">What&rsquo;s included</p>
                <ul className="qf-include-list">
                  {detailService.included.map((item, i) => (
                    <li key={i} className="qf-include-item">
                      <span className="qf-check-icon" style={{ background: detailService.color }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {detailService.proTip && (
                <div className="qf-modal-section">
                  <div
                    className="qf-modal-tip"
                    style={{ borderColor: detailService.color, background: detailService.gradient }}
                  >
                    <span className="qf-modal-tip-icon">💡</span>
                    <span><strong style={{ color: detailService.color }}>Pro tip: </strong>{detailService.proTip}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Compatible vehicles ── */}
            <div className="qf-modal-compat-row">
              <span className="qf-modal-compat-label">🚗 Works for</span>
              <span className="qf-modal-compat-value">{detailService.compatibleVehicles}</span>
            </div>

            {/* ── Book CTA ── */}
            <div className="qf-modal-footer">
              <Link
                className="qf-modal-book-btn"
                style={{ background: detailService.color }}
                href={QUICK_FIX_SERVICES.some((s) => s.id === detailService.id) ? "/customer/quick-fix" : "/customer/emergency"}
              >
                Book this service ⚡
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
