"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateJob } from "../../../lib/hooks/useCreateJob";
import { useLocation } from "../../../context/LocationContext";

// ─── SVG Icon Components ──────────────────────────────────────────────────────

function TyreIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="14" cy="14" r="12" />
      <circle cx="14" cy="14" r="5" />
      <line x1="14" y1="2" x2="14" y2="9" />
      <line x1="14" y1="19" x2="14" y2="26" />
      <line x1="2" y1="14" x2="9" y2="14" />
      <line x1="19" y1="14" x2="26" y2="14" />
      <line x1="5.5" y1="5.5" x2="10" y2="10" />
      <line x1="18" y1="18" x2="22.5" y2="22.5" />
      <line x1="22.5" y1="5.5" x2="18" y2="10" />
      <line x1="10" y1="18" x2="5.5" y2="22.5" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="7" width="14" height="18" rx="2" />
      <line x1="8" y1="7" x2="8" y2="3" />
      <line x1="14" y1="7" x2="14" y2="3" />
      <line x1="8" y1="3" x2="14" y2="3" />
      <path d="M18 11h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3" />
      <line x1="11" y1="13" x2="11" y2="18" />
      <line x1="8.5" y1="15.5" x2="13.5" y2="15.5" />
    </svg>
  );
}

function BatteryJumpIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="9" width="20" height="11" rx="2" />
      <line x1="22" y1="12.5" x2="26" y2="12.5" />
      <line x1="22" y1="16.5" x2="26" y2="16.5" />
      <path d="M13 12l-3 5h5l-3 5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TowIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="10" width="14" height="9" rx="2" />
      <path d="M15 13h5l4 4v5H15V13z" />
      <circle cx="5.5" cy="22" r="2.5" />
      <circle cx="19.5" cy="22" r="2.5" />
      <line x1="8" y1="22" x2="17" y2="22" />
    </svg>
  );
}

function OilDropIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3C14 3, 5 13, 5 19a9 9 0 0 0 18 0C23 13, 14 3, 14 3z" />
      <path d="M18 22a5 5 0 0 1-8 0" strokeOpacity="0.45" />
    </svg>
  );
}

function CoolantIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3v5L6 12v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V12l-3-4V3" />
      <line x1="9" y1="3" x2="19" y2="3" />
      <path d="M9 17q2.5 2.5 5 0q2.5 2.5 5 0" strokeOpacity="0.5" />
    </svg>
  );
}

function WashIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17h20v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
      <path d="M6 17L9 11h10l3 6" />
      <circle cx="9" cy="24.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="24.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 6q1-2 2 0q1-2 2 0q1-2 2 0" />
      <line x1="14" y1="6" x2="14" y2="2" />
    </svg>
  );
}

function AirIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="14" cy="14" r="12" />
      <circle cx="14" cy="14" r="4" />
      <line x1="14" y1="2" x2="14" y2="8" />
      <line x1="14" y1="20" x2="14" y2="26" />
      <line x1="2" y1="14" x2="8" y2="14" />
      <line x1="20" y1="14" x2="26" y2="14" />
    </svg>
  );
}

function WiperIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M5 23 A16 16 0 0 1 23 23" />
      <path d="M7 21 A12 12 0 0 1 21 21" />
      <line x1="14" y1="23" x2="14" y2="7" />
      <circle cx="14" cy="23" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 23h8M11 26h6" />
      <path d="M14 3a8 8 0 0 1 6 13.3L18 23H10l-2-6.7A8 8 0 0 1 14 3z" />
      <line x1="11" y1="13" x2="17" y2="13" />
      <line x1="14" y1="10" x2="14" y2="16" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="11" r="7" />
      <line x1="17" y1="16" x2="26" y2="25" />
      <line x1="21" y1="21" x2="24" y2="18" />
      <line x1="23" y1="23" x2="26" y2="20" />
    </svg>
  );
}

function BatteryReplaceIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="9" width="20" height="11" rx="2" />
      <line x1="22" y1="12.5" x2="26" y2="12.5" />
      <line x1="22" y1="16.5" x2="26" y2="16.5" />
      <line x1="9" y1="14.5" x2="13" y2="14.5" />
      <line x1="11" y1="12.5" x2="11" y2="16.5" />
      <line x1="15" y1="14.5" x2="17" y2="14.5" />
    </svg>
  );
}

// ─── Vehicle Icons ────────────────────────────────────────────────────────────

function BikeIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="31" r="8" />
      <circle cx="35" cy="31" r="8" />
      <path d="M11 31 L18 15 L25 15 L31 23" />
      <path d="M31 23 L35 31" />
      <path d="M18 15 L22 23 L31 23" />
      <circle cx="22" cy="23" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ScooterIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="32" r="7" />
      <circle cx="36" cy="32" r="7" />
      <path d="M17 32h12" />
      <path d="M26 16a7 7 0 0 1 7 7v9" />
      <path d="M26 16h-8l-6 10h12" />
      <path d="M26 11v5" />
      <line x1="22" y1="11" x2="30" y2="11" />
    </svg>
  );
}

function CarSVGIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="23" width="38" height="11" rx="2" />
      <path d="M8 23L14 14h18l6 9" />
      <circle cx="12" cy="35" r="4.5" />
      <circle cx="34" cy="35" r="4.5" />
      <line x1="16.5" y1="35" x2="29.5" y2="35" />
      <path d="M15 14h16" />
      <line x1="4" y1="28" x2="42" y2="28" />
    </svg>
  );
}

function SUVIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="21" width="40" height="12" rx="2" />
      <path d="M6 21L10 11h26l7 10" />
      <circle cx="11.5" cy="34.5" r="4.5" />
      <circle cx="34.5" cy="34.5" r="4.5" />
      <line x1="16" y1="34.5" x2="30" y2="34.5" />
      <path d="M10 11h26" />
      <line x1="3" y1="27" x2="43" y2="27" />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="17" width="26" height="16" rx="2" />
      <path d="M28 22h7l6 6v8H28V22z" />
      <circle cx="9" cy="35" r="4" />
      <circle cx="23" cy="35" r="4" />
      <circle cx="38" cy="35" r="4" />
      <line x1="13" y1="35" x2="19" y2="35" />
      <line x1="27" y1="35" x2="34" y2="35" />
      <line x1="2" y1="26" x2="28" y2="26" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  eta: string;
  popular?: boolean;
  isNew?: boolean;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  shortDesc: string;
  problem: string;
  mechanicSteps: string[];
  included: string[];
  duration: string;
  guarantee: string;
  proTip?: string;
  compatibleVehicles: string;
}

const SERVICES: Service[] = [
  {
    id: "puncture-repair",
    name: "Puncture Repair",
    price: 299,
    priceLabel: "₹299 onwards",
    eta: "20–30 min",
    popular: true,
    color: "#FF7A45",
    gradient:
      "linear-gradient(135deg,rgba(255,122,69,.18) 0%,rgba(255,122,69,.04) 100%)",
    icon: <TyreIcon />,
    shortDesc: "Flat tyre fixed at your location",
    problem:
      "Your tyre has a puncture, slow leak, or complete flat and you cannot drive safely to a garage.",
    mechanicSteps: [
      "Arrive with professional puncture repair kit",
      "Assess tyre condition — tube vs. tubeless",
      "Remove tyre and locate exact puncture point",
      "Apply professional sealant or replace inner tube",
      "Remount, inflate to manufacturer PSI",
      "Road-safety check before leaving",
    ],
    included: [
      "Puncture sealant / tube replacement",
      "Tyre lever set",
      "Portable air compressor",
      "Pressure gauge calibration",
    ],
    duration: "25–40 minutes",
    guarantee: "7-day fix guarantee",
    proTip:
      "Works for both tube-type and tubeless tyres on all 2-wheelers and 4-wheelers.",
    compatibleVehicles: "Bike, Scooter, Car, SUV, Commercial",
  },
  {
    id: "fuel-delivery",
    name: "Fuel Delivery",
    price: 99,
    priceLabel: "₹99 + fuel cost",
    eta: "15–25 min",
    popular: true,
    color: "#1E62FF",
    gradient:
      "linear-gradient(135deg,rgba(30,98,255,.18) 0%,rgba(30,98,255,.04) 100%)",
    icon: <FuelIcon />,
    shortDesc: "Emergency fuel delivered to you",
    problem:
      "You've run out of fuel and are stranded on the road with no petrol pump nearby.",
    mechanicSteps: [
      "Confirm your exact GPS location",
      "Fetch correct fuel type (Petrol / Diesel)",
      "Deliver in certified leak-proof containers",
      "Refuel your vehicle safely",
      "Verify engine starts before leaving",
    ],
    included: [
      "Certified fuel container",
      "Funnel & spill-proof pouring",
      "Up to 5 litres delivery",
    ],
    duration: "15–20 minutes on-site",
    guarantee: "Engine start guarantee",
    proTip:
      "Mention Petrol or Diesel when placing the order for faster dispatch.",
    compatibleVehicles: "Bike, Scooter, Car, SUV, Commercial",
  },
  {
    id: "battery-jumpstart",
    name: "Battery Jumpstart",
    price: 349,
    priceLabel: "₹349",
    eta: "20–35 min",
    popular: true,
    color: "#F59E0B",
    gradient:
      "linear-gradient(135deg,rgba(245,158,11,.18) 0%,rgba(245,158,11,.04) 100%)",
    icon: <BatteryJumpIcon />,
    shortDesc: "Dead battery? Back on road fast",
    problem:
      "Your vehicle battery is dead — ignition won't crank, electronics are off, or you've left lights on overnight.",
    mechanicSteps: [
      "Inspect battery terminals for corrosion",
      "Connect professional grade booster pack",
      "Jump-start engine safely",
      "Check charging system (alternator test)",
      "Advise on battery health and lifespan",
    ],
    included: [
      "Professional booster pack",
      "Terminal cleaning",
      "Voltage & charging system check",
    ],
    duration: "20–30 minutes",
    guarantee: "Engine start guarantee",
    proTip:
      "Battery older than 3 years? Ask us about battery replacement before the next breakdown.",
    compatibleVehicles: "Bike, Scooter, Car, SUV",
  },
  {
    id: "towing",
    name: "Towing Service",
    price: 699,
    priceLabel: "₹699 onwards",
    eta: "30–45 min",
    color: "#EF4444",
    gradient:
      "linear-gradient(135deg,rgba(239,68,68,.18) 0%,rgba(239,68,68,.04) 100%)",
    icon: <TowIcon />,
    shortDesc: "Vehicle towed to your workshop",
    problem:
      "Your vehicle cannot be driven and needs to be transported to a workshop for major repairs.",
    mechanicSteps: [
      "Arrive with flatbed / crane tow truck",
      "Secure vehicle with certified straps",
      "Transport to your chosen workshop or nearest garage",
      "Unload and provide handover receipt",
    ],
    included: [
      "Flatbed transport",
      "Vehicle securing straps",
      "Up to 10 km towing",
    ],
    duration: "Depends on distance",
    guarantee: "Zero-damage delivery guarantee",
    proTip:
      "₹699 covers first 10 km. ₹50/km charged thereafter. Long-distance quotes available.",
    compatibleVehicles: "Bike, Scooter, Car, SUV, Commercial",
  },
  {
    id: "engine-oil-topup",
    name: "Engine Oil Top-up",
    price: 249,
    priceLabel: "₹249 + oil cost",
    eta: "20–30 min",
    color: "#10B981",
    gradient:
      "linear-gradient(135deg,rgba(16,185,129,.18) 0%,rgba(16,185,129,.04) 100%)",
    icon: <OilDropIcon />,
    shortDesc: "Engine oil checked & topped up",
    problem:
      "Engine oil warning light is on, or oil level is critically low causing poor performance and potential engine damage.",
    mechanicSteps: [
      "Check current oil level and grade",
      "Identify correct manufacturer-recommended grade",
      "Top up with grade-matched engine oil",
      "Verify no visible oil leaks",
      "Reset oil level indicator",
    ],
    included: [
      "Up to 1L grade-matched engine oil",
      "Dipstick inspection",
      "Underside leak check",
    ],
    duration: "20–30 minutes",
    guarantee: "Correct grade guarantee",
    proTip:
      "Always use the oil grade specified in your vehicle owner's manual. Wrong grade = engine damage.",
    compatibleVehicles: "Bike, Car, SUV, Commercial",
  },
  {
    id: "coolant-refill",
    name: "Coolant Refill",
    price: 199,
    priceLabel: "₹199 + coolant cost",
    eta: "20–30 min",
    color: "#06B6D4",
    gradient:
      "linear-gradient(135deg,rgba(6,182,212,.18) 0%,rgba(6,182,212,.04) 100%)",
    icon: <CoolantIcon />,
    shortDesc: "Prevent engine overheating now",
    problem:
      "Temperature gauge is in the red, coolant warning light is on, or coolant is visibly leaking.",
    mechanicSteps: [
      "Check coolant reservoir level",
      "Inspect hoses and radiator for leaks",
      "Allow engine to cool completely before opening",
      "Refill with correct premixed coolant",
      "Pressure-test cooling system",
    ],
    included: [
      "Up to 1L premixed coolant",
      "Radiator hose inspection",
      "Cooling system pressure test",
    ],
    duration: "25–35 minutes",
    guarantee: "Overheating prevention check",
    proTip:
      "NEVER open a hot radiator cap. Wait at least 30 minutes after engine shutoff.",
    compatibleVehicles: "Car, SUV, Commercial",
  },
  {
    id: "vehicle-wash",
    name: "Doorstep Car Wash",
    price: 349,
    priceLabel: "₹349 (2W) / ₹599 (4W)",
    eta: "30–50 min",
    isNew: true,
    color: "#8B5CF6",
    gradient:
      "linear-gradient(135deg,rgba(139,92,246,.18) 0%,rgba(139,92,246,.04) 100%)",
    icon: <WashIcon />,
    shortDesc: "Professional wash at your doorstep",
    problem:
      "Your vehicle is dirty but you can't find time to visit a car wash center.",
    mechanicSteps: [
      "Arrive with portable water tank and equipment",
      "Pre-rinse to remove loose dirt and debris",
      "Foam wash with pH-neutral shampoo",
      "Hand wash panels, wheels, and windows",
      "Dry with clean microfiber towels",
      "Interior wipe-down (dashboard & glass)",
    ],
    included: [
      "pH-neutral shampoo",
      "Microfiber drying",
      "Interior wipe",
      "Tyre sidewall dressing",
    ],
    duration: "35–55 minutes",
    guarantee: "No scratch guarantee",
    proTip:
      "Morning slots work best. Avoid booking during or before predicted rain.",
    compatibleVehicles: "Bike, Scooter, Car, SUV",
  },
  {
    id: "air-pressure",
    name: "Tyre Air Refill",
    price: 49,
    priceLabel: "₹49 (all 4 tyres)",
    eta: "10–15 min",
    color: "#14B8A6",
    gradient:
      "linear-gradient(135deg,rgba(20,184,166,.18) 0%,rgba(20,184,166,.04) 100%)",
    icon: <AirIcon />,
    shortDesc: "Correct pressure for all 4 wheels",
    problem:
      "Tyres look low, fuel efficiency has dropped, or you've not checked tyre pressure in over a month.",
    mechanicSteps: [
      "Check current pressure on all 4 tyres + spare",
      "Inflate or deflate to manufacturer PSI",
      "Inspect for slow punctures while filling",
      "Measure tyre tread depth",
    ],
    included: [
      "Calibrated pressure gauge",
      "All 4 tyres + spare tyre",
      "Tread depth check",
    ],
    duration: "10–15 minutes",
    guarantee: "Correct PSI guarantee",
    proTip:
      "Correct tyre pressure improves fuel efficiency by up to 3% and extends tyre life.",
    compatibleVehicles: "Car, SUV, Commercial",
  },
  {
    id: "wiper-replacement",
    name: "Wiper Replacement",
    price: 199,
    priceLabel: "₹199 per wiper",
    eta: "20–30 min",
    color: "#6366F1",
    gradient:
      "linear-gradient(135deg,rgba(99,102,241,.18) 0%,rgba(99,102,241,.04) 100%)",
    icon: <WiperIcon />,
    shortDesc: "Clear vision in rain, instantly",
    problem:
      "Wipers are streaking, skipping, or squeaking — especially dangerous during monsoon driving.",
    mechanicSteps: [
      "Remove old wiper blades and inspect arms",
      "Fit new OEM-grade wiper blades",
      "Test at all speed settings",
      "Check washer fluid and nozzle alignment",
    ],
    included: [
      "OEM-grade wiper blades (per unit)",
      "Installation",
      "Washer fluid top-up check",
    ],
    duration: "15–25 minutes",
    guarantee: "30-day blade performance guarantee",
    proTip:
      "Replace both front wipers together — uneven blades reduce visibility on the driver's side.",
    compatibleVehicles: "Car, SUV, Commercial",
  },
  {
    id: "bulb-replacement",
    name: "Headlight / Taillight",
    price: 249,
    priceLabel: "₹249 per bulb",
    eta: "20–30 min",
    color: "#D97706",
    gradient:
      "linear-gradient(135deg,rgba(217,119,6,.18) 0%,rgba(217,119,6,.04) 100%)",
    icon: <BulbIcon />,
    shortDesc: "Blown bulb replaced on the spot",
    problem:
      "A headlight or taillight has blown — a safety hazard and a traffic violation that can result in a challan.",
    mechanicSteps: [
      "Identify which bulb has failed",
      "Source correct replacement (Halogen / LED)",
      "Remove housing and replace bulb",
      "Check and adjust beam alignment",
      "Verify all lights are operational",
    ],
    included: [
      "Replacement bulb (Halogen standard)",
      "Installation",
      "Beam alignment check",
    ],
    duration: "20–30 minutes",
    guarantee: "30-day bulb guarantee",
    proTip:
      "Considering an upgrade? LED bulbs last 5× longer and give 3× more light.",
    compatibleVehicles: "Bike, Scooter, Car, SUV, Commercial",
  },
  {
    id: "lockout-assistance",
    name: "Key Lockout Help",
    price: 299,
    priceLabel: "₹299",
    eta: "20–35 min",
    color: "#EC4899",
    gradient:
      "linear-gradient(135deg,rgba(236,72,153,.18) 0%,rgba(236,72,153,.04) 100%)",
    icon: <KeyIcon />,
    shortDesc: "Locked out? We'll get you in safely",
    problem:
      "Keys are locked inside the vehicle, or the door lock mechanism has jammed and won't open.",
    mechanicSteps: [
      "Verify vehicle ownership (ID check)",
      "Assess lock type and entry method",
      "Use non-destructive slim-jim entry tools",
      "Retrieve keys or override lock safely",
      "Inspect lock mechanism for damage",
    ],
    included: [
      "Non-destructive entry tools",
      "Lock mechanism inspection",
      "Ownership verification",
    ],
    duration: "20–35 minutes",
    guarantee: "Zero damage guarantee",
    proTip:
      "Keep a spare key at home or with a trusted contact to avoid lockout charges.",
    compatibleVehicles: "Car, SUV, Commercial",
  },
  {
    id: "battery-replacement",
    name: "Battery Replacement",
    price: 1499,
    priceLabel: "₹1499 + battery",
    eta: "30–45 min",
    color: "#1D4ED8",
    gradient:
      "linear-gradient(135deg,rgba(29,78,216,.18) 0%,rgba(29,78,216,.04) 100%)",
    icon: <BatteryReplaceIcon />,
    shortDesc: "New battery fitted at your door",
    problem:
      "Your battery is completely dead, cannot hold charge, or is more than 3 years old and failing regularly.",
    mechanicSteps: [
      "Full load test of existing battery",
      "Confirm battery replacement is necessary",
      "Safely disconnect old battery (negative first)",
      "Install new OEM-equivalent battery",
      "Register new battery with vehicle ECU (if needed)",
      "Test all electrical systems post-install",
    ],
    included: [
      "New OEM-equivalent battery",
      "Professional installation",
      "Old battery recycling",
      "ECU registration",
    ],
    duration: "30–45 minutes",
    guarantee: "1-year battery warranty",
    proTip:
      "Ensure the CCA (cold cranking amps) matches your vehicle specification exactly.",
    compatibleVehicles: "Bike, Car, SUV, Commercial",
  },
];

const VEHICLES = [
  { id: "Bike", label: "Bike", desc: "150cc & below", icon: <BikeIcon /> },
  {
    id: "Scooter",
    label: "Scooter",
    desc: "Gearless / auto",
    icon: <ScooterIcon />,
  },
  { id: "Car", label: "Car", desc: "Hatchback / Sedan", icon: <CarSVGIcon /> },
  { id: "SUV", label: "SUV / MUV", desc: "SUV, Crossover", icon: <SUVIcon /> },
  {
    id: "Commercial",
    label: "Commercial",
    desc: "Auto, Van, Truck",
    icon: <CommercialIcon />,
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuickFixPage() {
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
      jobType: "FIXED",
      serviceType: selectedService!.name,
      vehicleType,
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

  return (
    <>
      <main className="page">
        <div className="flow-page">
          {/* ── Header ── */}
          <header className="flow-header">
            <span className="hero-eyebrow">⚡ Quick Fix — Fixed Price</span>
            <h1 className="flow-title">What do you need fixed?</h1>
            <p className="flow-subtitle">
              Transparent pricing. No inspection fees. A mechanic arrives in
              under 30 minutes.
            </p>
          </header>

          {/* ── Step 1: Service Selection ── */}
          <section>
            <div className="qf-step-label">
              <span className="qf-step-num">1</span>
              Choose a service
            </div>
            <div className="qf-services-grid">
              {SERVICES.map((svc) => (
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
                    <span
                      className="qf-badge"
                      style={{ background: svc.color }}
                    >
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
                    style={{ color: svc.color, background: svc.gradient }}
                  >
                    {svc.icon}
                  </div>

                  {/* Name & desc */}
                  <div className="qf-card-body">
                    <h3 className="qf-card-name">{svc.name}</h3>
                    <p className="qf-card-desc">{svc.shortDesc}</p>
                  </div>

                  {/* Price & ETA */}
                  <div className="qf-card-footer">
                    <span className="qf-card-price">{svc.priceLabel}</span>
                    <span className="qf-card-eta">🕐 {svc.eta}</span>
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
              <span className="qf-step-num">2</span>
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
                  <span className="qf-vehicle-icon">{v.icon}</span>
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
              <span className="qf-step-num">3</span>
              Additional details
            </div>
            <div className="field">
              <label className="field-label">
                Notes for mechanic{" "}
                <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>
                  (optional)
                </span>
              </label>
              <textarea
                className="field-textarea"
                style={{ minHeight: 80 }}
                placeholder="e.g. Front left tyre punctured · Silver Honda City · Near Gate 4"
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
            <p className="qf-sticky-hint">← Select a service to continue</p>
          )}
          <button
            className="flow-cta qf-book-btn"
            disabled={!canBook || isPending}
            onClick={handleBook}
            style={canBook ? { background: selectedService?.color } : undefined}
          >
            {isPending ? "Booking…" : "Confirm & Book ⚡"}
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
                Select this service ⚡
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
