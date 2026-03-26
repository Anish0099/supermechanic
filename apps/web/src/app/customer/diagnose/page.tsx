"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCreateJob } from "../../../lib/hooks/useCreateJob";
import { useLocation } from "../../../context/LocationContext";
import { VEHICLES } from "../../../data/services";
import { VEHICLE_MAKES, PROBLEM_AREAS, PARTS_BY_AREA, ProblemArea } from "../../../data/vehicleData";

const STEPS = [
  { label: "Vehicle", icon: "🚗" },
  { label: "Make & Model", icon: "🏭" },
  { label: "Problem", icon: "🔍" },
  { label: "Part", icon: "🔧" },
];

export default function DiagnosePage() {
  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [problemArea, setProblemArea] = useState("");
  const [selectedPart, setSelectedPart] = useState("");
  const [notes, setNotes] = useState("");
  const [makeSearch, setMakeSearch] = useState("");
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateJob();
  const { address: location, coords } = useLocation();

  // Derived data
  const makes = useMemo(() => VEHICLE_MAKES[vehicleType] || [], [vehicleType]);
  const filteredMakes = useMemo(() => {
    if (!makeSearch) return makes;
    const q = makeSearch.toLowerCase();
    return makes.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.models.some((mod) => mod.toLowerCase().includes(q)),
    );
  }, [makes, makeSearch]);

  const selectedMake = makes.find((m) => m.name === make);
  const parts = useMemo(() => PARTS_BY_AREA[problemArea] || [], [problemArea]);
  const selectedProblem = PROBLEM_AREAS.find((p) => p.id === problemArea);

  // Extended problem areas with "Don't know" option
  const extendedProblems: ProblemArea[] = [
    ...PROBLEM_AREAS,
    { id: "dont-know", name: "I don't know", icon: "❓", desc: "Not sure — need full inspection" },
    { id: "other", name: "Other", icon: "📝", desc: "Something not listed here" },
  ];

  // Extended parts with fallback options
  const extendedParts = [
    ...parts,
    { id: "not-sure", name: "Not sure — need inspection", icon: "❓" },
    { id: "other-part", name: "Other / Multiple parts", icon: "📝" },
  ];

  const canGoNext = () => {
    if (step === 0) return !!vehicleType;
    if (step === 1) return !!make && !!model;
    if (step === 2) return !!problemArea;
    if (step === 3) return !!selectedPart;
    return false;
  };

  const goNext = () => {
    if (canGoNext() && step < 3) {
      // If "don't know" is selected, skip to part selection with "not sure" auto-selected
      if (step === 2 && (problemArea === "dont-know" || problemArea === "other")) {
        setSelectedPart("not-sure");
        setStep(3);
      } else {
        setStep(step + 1);
      }
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const selectVehicle = (id: string) => {
    setVehicleType(id);
    setMake("");
    setModel("");
    setMakeSearch("");
  };

  const selectMake = (name: string) => {
    setMake(name);
    setModel("");
  };

  const partName = (id: string) => {
    if (id === "not-sure") return "Needs inspection";
    if (id === "other-part") return "Other / Multiple";
    return PARTS_BY_AREA[problemArea]?.find((p) => p.id === id)?.name || id;
  };

  const partIcon = (id: string) => {
    if (id === "not-sure") return "❓";
    if (id === "other-part") return "📝";
    return PARTS_BY_AREA[problemArea]?.find((p) => p.id === id)?.icon || "🔧";
  };

  const handleSubmit = async () => {
    const problemName = extendedProblems.find(p => p.id === problemArea)?.name || problemArea;
    const response = await mutateAsync({
      jobType: "INSPECTION",
      problem: `[${problemName}] ${partName(selectedPart)}`,
      vehicleType,
      vehicleDetails: `${make} ${model}`,
      location: {
        address: location || "Auto-detected",
        lat: coords?.lat,
        lng: coords?.lng,
      },
      notes,
      priority: "STANDARD",
    });
    window.localStorage.setItem("activeJobId", response.id);
    router.push(`/customer/tracking?jobId=${response.id}`);
  };

  // Summary items
  const summaryItems = [
    {
      label: "Vehicle",
      value: vehicleType ? VEHICLES.find((v) => v.id === vehicleType)?.label : null,
      icon: vehicleType ? VEHICLES.find((v) => v.id === vehicleType)?.icon : "🚗",
      done: !!vehicleType,
    },
    {
      label: "Make & Model",
      value: make ? `${make} ${model || ""}`.trim() : null,
      icon: "🏭",
      done: !!make && !!model,
    },
    {
      label: "Problem Area",
      value: problemArea ? extendedProblems.find((p) => p.id === problemArea)?.name : null,
      icon: problemArea ? extendedProblems.find((p) => p.id === problemArea)?.icon : "🔍",
      done: !!problemArea,
    },
    {
      label: "Affected Part",
      value: selectedPart ? partName(selectedPart) : null,
      icon: selectedPart ? partIcon(selectedPart) : "🔧",
      done: !!selectedPart,
    },
  ];

  const progress = summaryItems.filter((s) => s.done).length;

  return (
    <main className="page">
      <div className="flow-page">
        {/* ── Header ── */}
        <header className="flow-header">
          <span className="hero-eyebrow">🔍 Diagnose Issue — Inspection Flow</span>
          <h1 className="flow-title">Let's narrow down the problem</h1>
          <p className="flow-subtitle">
            Step through the wizard so the mechanic arrives prepared.
            Only <strong>₹149 inspection fee</strong> — accept or reject the repair estimate.
          </p>
        </header>

        {/* ── Progress Bar ── */}
        <div className="dg-progress">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div
                className={`dg-progress-step${i === step ? " dg-progress-step--active" : ""}${i < step ? " dg-progress-step--done" : ""}`}
              >
                <div className="dg-progress-dot">
                  {i < step ? "✓" : s.icon}
                </div>
                <span className="dg-progress-label">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`dg-progress-bar${i < step ? " dg-progress-bar--filled" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Main layout ── */}
        <div className="dg-layout">
          {/* Step Content */}
          <div className="dg-main">
            {/* Step 0: Vehicle Type */}
            {step === 0 && (
              <div className="dg-step-card">
                <h2 className="dg-step-title">What type of vehicle do you have?</h2>
                <div className="dg-options-grid">
                  {VEHICLES.map((v) => (
                    <button
                      key={v.id}
                      className={`dg-option-card${vehicleType === v.id ? " dg-option-card--selected" : ""}`}
                      onClick={() => selectVehicle(v.id)}
                      type="button"
                    >
                      <span className="dg-option-emoji">{v.icon}</span>
                      <span className="dg-option-label">{v.label}</span>
                      <span className="dg-option-sub">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Make & Model */}
            {step === 1 && (
              <div className="dg-step-card">
                <h2 className="dg-step-title">Select your vehicle make & model</h2>
                <input
                  className="dg-search"
                  placeholder="🔍 Search make or model..."
                  value={makeSearch}
                  onChange={(e) => setMakeSearch(e.target.value)}
                />

                <p style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 10, color: "var(--ink-muted)" }}>Make</p>
                <div className="dg-options-grid" style={{ marginBottom: 20 }}>
                  {filteredMakes.map((m) => (
                    <button
                      key={m.name}
                      className={`dg-option-card${make === m.name ? " dg-option-card--selected" : ""}`}
                      onClick={() => selectMake(m.name)}
                      type="button"
                    >
                      <span className="dg-option-label">{m.name}</span>
                      <span className="dg-option-sub">{m.models.length} models</span>
                    </button>
                  ))}
                </div>

                {selectedMake && (
                  <>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 10, color: "var(--ink-muted)" }}>Model — {make}</p>
                    <div className="dg-options-grid">
                      {selectedMake.models.map((mod) => (
                        <button
                          key={mod}
                          className={`dg-option-card${model === mod ? " dg-option-card--selected" : ""}`}
                          onClick={() => setModel(mod)}
                          type="button"
                        >
                          <span className="dg-option-label">{mod}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Problem Area */}
            {step === 2 && (
              <div className="dg-step-card">
                <h2 className="dg-step-title">Where is the problem?</h2>
                <p style={{ color: "var(--ink-muted)", fontSize: "0.85rem", marginBottom: 16 }}>
                  Not sure? Pick "I don't know" — the mechanic will do a full inspection.
                </p>
                <div className="dg-options-grid">
                  {extendedProblems.map((area) => (
                    <button
                      key={area.id}
                      className={`dg-option-card${problemArea === area.id ? " dg-option-card--selected" : ""}${area.id === "dont-know" || area.id === "other" ? " dg-option-card--fallback" : ""}`}
                      onClick={() => {
                        setProblemArea(area.id);
                        setSelectedPart("");
                      }}
                      type="button"
                    >
                      <span className="dg-option-emoji">{area.icon}</span>
                      <span className="dg-option-label">{area.name}</span>
                      <span className="dg-option-sub">{area.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Affected Part */}
            {step === 3 && (
              <div className="dg-step-card">
                <h2 className="dg-step-title">
                  {problemArea === "dont-know" || problemArea === "other"
                    ? "Any additional details?"
                    : `Which part is affected? (${selectedProblem?.name || "Unknown"})`}
                </h2>
                {problemArea !== "dont-know" && problemArea !== "other" && (
                  <div className="dg-options-grid" style={{ marginBottom: 16 }}>
                    {extendedParts.map((part) => (
                      <button
                        key={part.id}
                        className={`dg-option-card${selectedPart === part.id ? " dg-option-card--selected" : ""}${part.id === "not-sure" || part.id === "other-part" ? " dg-option-card--fallback" : ""}`}
                        onClick={() => setSelectedPart(part.id)}
                        type="button"
                      >
                        <span className="dg-option-emoji">{part.icon}</span>
                        <span className="dg-option-label">{part.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Notes */}
                <div style={{ marginTop: 8 }}>
                  <label className="field-label">
                    Describe the issue{" "}
                    <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>
                      {problemArea === "dont-know" ? "(tell us what you're experiencing)" : "(optional)"}
                    </span>
                  </label>
                  <textarea
                    className="field-textarea"
                    style={{ minHeight: 80 }}
                    placeholder="e.g. Strange noise when braking, happened after hitting a pothole, car shakes above 60 km/h..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ── Navigation ── */}
            <div className="dg-nav">
              {step > 0 && (
                <button className="dg-back-btn" onClick={goBack} type="button">← Back</button>
              )}
              {step < 3 ? (
                <button className="flow-cta" style={{ flex: 1 }} disabled={!canGoNext()} onClick={goNext}>
                  Continue →
                </button>
              ) : (
                <button
                  className="flow-cta"
                  style={{ flex: 1, background: "#10B981" }}
                  disabled={!canGoNext() || isPending}
                  onClick={handleSubmit}
                >
                  {isPending ? "Submitting…" : "Request Inspection 🔍"}
                </button>
              )}
            </div>
          </div>

          {/* ── Enhanced Summary Panel ── */}
          <div className="dg-summary-panel">
            {/* Progress ring */}
            <div className="dg-summary-progress">
              <div className="dg-summary-ring">
                <svg viewBox="0 0 80 80" className="dg-ring-svg">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(17,17,22,0.08)" strokeWidth="6" />
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke={progress === 4 ? "#10B981" : "var(--accent)"}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${34 * 2 * Math.PI}`}
                    strokeDashoffset={`${34 * 2 * Math.PI * (1 - progress / 4)}`}
                    style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
                  />
                </svg>
                <span className="dg-ring-text">{progress}/4</span>
              </div>
              <div>
                <p className="dg-summary-headline">
                  {progress === 0 && "Let's get started"}
                  {progress === 1 && "Great start!"}
                  {progress === 2 && "Almost there…"}
                  {progress === 3 && "One more step!"}
                  {progress === 4 && "Ready to submit! ✨"}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                  {4 - progress} step{4 - progress !== 1 ? "s" : ""} remaining
                </p>
              </div>
            </div>

            {/* Summary items */}
            <div className="dg-summary-items">
              {summaryItems.map((item, i) => (
                <div
                  key={i}
                  className={`dg-summary-item${item.done ? " dg-summary-item--done" : ""}${i === step ? " dg-summary-item--current" : ""}`}
                >
                  <span className="dg-summary-item-icon">{item.done ? item.icon : "○"}</span>
                  <div className="dg-summary-item-text">
                    <span className="dg-summary-item-label">{item.label}</span>
                    <span className="dg-summary-item-value">
                      {item.value || (i === step ? "Selecting…" : "Not selected")}
                    </span>
                  </div>
                  {item.done && <span className="dg-summary-item-check">✓</span>}
                </div>
              ))}
            </div>

            {/* Inspection fee */}
            <div className="dg-summary-fee">
              <div className="dg-summary-fee-row">
                <span>Inspection fee</span>
                <span className="dg-summary-fee-amount">₹149</span>
              </div>
              <p className="dg-summary-fee-note">
                Repair charges only after you approve the estimate. No hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
