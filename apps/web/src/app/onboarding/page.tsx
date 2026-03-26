"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Role = "customer" | "mechanic";

const ROLES = [
  {
    id: "customer" as Role,
    emoji: "🚗",
    title: "I need a mechanic",
    subtitle: "Customer",
    description:
      "Book on-demand vehicle repairs, roadside assistance, and servicing at your location.",
    perks: [
      "Quick Fix, Diagnose & Emergency flows",
      "Real-time mechanic tracking on map",
      "Transparent fixed & estimated pricing",
      "Pay securely after service is done",
      "Rate and review your mechanic",
    ],
    color: "#FF7A45",
    gradient:
      "linear-gradient(135deg, rgba(255,122,69,0.14) 0%, rgba(255,122,69,0.03) 100%)",
    borderSelected: "#FF7A45",
  },
  {
    id: "mechanic" as Role,
    emoji: "🔧",
    title: "I am a mechanic",
    subtitle: "Mechanic / Service Provider",
    description:
      "Accept nearby job requests, travel to customers, and grow your earnings with full flexibility.",
    perks: [
      "Go online / offline with one tap",
      "Receive job requests in real time",
      "Accept or reject with full details shown",
      "Enter inspection estimates on-site",
      "Weekly earnings dashboard & reports",
    ],
    color: "#1E62FF",
    gradient:
      "linear-gradient(135deg, rgba(30,98,255,0.14) 0%, rgba(30,98,255,0.03) 100%)",
    borderSelected: "#1E62FF",
  },
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selected || !isLoaded || !user) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selected }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save role");
      }

      // Force Clerk to reload the session so publicMetadata is fresh
      await user.reload();

      // Use window.location.href instead of router.push to ensure
      // middleware sees the fresh session token/metadata
      window.location.href =
        selected === "mechanic" ? "/mechanic" : "/customer";
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <main className="page ob-page">
        <div
          style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}
        >
          <div className="pulse-dot" />
        </div>
      </main>
    );
  }

  const firstName = user?.firstName || "there";

  return (
    <main className="page ob-page">
      <div className="ob-container">
        {/* Header */}
        <header className="ob-header">
          <span className="hero-eyebrow">Welcome to SuperMechanic</span>
          <h1 className="ob-title">
            Hey {firstName}, how will you use the platform?
          </h1>
          <p className="ob-subtitle">
            Choose your role to get the right experience. You can contact
            support to change it later.
          </p>
        </header>

        {/* Role Cards */}
        <div className="ob-roles-grid">
          {ROLES.map((role) => {
            const isSelected = selected === role.id;
            return (
              <button
                key={role.id}
                id={`role-card-${role.id}`}
                className={`ob-role-card${isSelected ? " ob-role-card--selected" : ""}`}
                style={
                  {
                    "--role-color": role.color,
                    "--role-gradient": role.gradient,
                    borderColor: isSelected ? role.borderSelected : undefined,
                  } as React.CSSProperties
                }
                onClick={() => setSelected(role.id)}
                type="button"
                aria-pressed={isSelected}
              >
                {/* Background glow */}
                <div
                  className="ob-card-bg"
                  style={{ background: role.gradient }}
                  aria-hidden
                />

                {/* Selected indicator */}
                {isSelected && (
                  <span
                    className="ob-card-check"
                    style={{ background: role.color }}
                  >
                    ✓
                  </span>
                )}

                {/* Emoji */}
                <div
                  className="ob-card-emoji"
                  style={{ background: role.gradient, color: role.color }}
                >
                  {role.emoji}
                </div>

                {/* Titles */}
                <div className="ob-card-titles">
                  <span
                    className="ob-card-subtitle"
                    style={{ color: role.color }}
                  >
                    {role.subtitle}
                  </span>
                  <h2 className="ob-card-title">{role.title}</h2>
                  <p className="ob-card-desc">{role.description}</p>
                </div>

                {/* Perks */}
                <ul className="ob-card-perks">
                  {role.perks.map((perk, i) => (
                    <li key={i} className="ob-perk-item">
                      <span
                        className="ob-perk-dot"
                        style={{ background: role.color }}
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Admin note */}
        <p className="ob-admin-note">
          🛡️ Admin accounts are set up separately. Contact your platform
          administrator.
        </p>

        {/* Error */}
        {error && <p className="ob-error">{error}</p>}

        {/* CTA */}
        <button
          id="onboarding-continue-btn"
          className="ob-cta"
          disabled={!selected || loading}
          onClick={handleContinue}
          style={
            selected
              ? { background: ROLES.find((r) => r.id === selected)?.color }
              : undefined
          }
        >
          {loading
            ? "Setting up your account…"
            : selected
              ? `Continue as ${selected === "customer" ? "Customer 🚗" : "Mechanic 🔧"}`
              : "Select a role to continue"}
        </button>
      </div>
    </main>
  );
}
