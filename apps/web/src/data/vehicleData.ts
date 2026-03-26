// ─── Vehicle Makes / Models by Type ──────────────────────────────────────────

export interface VehicleMake {
  name: string;
  models: string[];
}

export const VEHICLE_MAKES: Record<string, VehicleMake[]> = {
  Bike: [
    { name: "Hero", models: ["Splendor Plus", "HF Deluxe", "Passion Pro", "Xtreme 160R", "Glamour", "XPulse 200"] },
    { name: "Honda", models: ["Shine", "Unicorn", "SP125", "Hornet 2.0", "CB350", "Hness CB350"] },
    { name: "Bajaj", models: ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "CT110", "Avenger 220"] },
    { name: "TVS", models: ["Apache RTR 160", "Apache RTR 200", "Raider 125", "Star City Plus", "Sport", "Ronin"] },
    { name: "Royal Enfield", models: ["Classic 350", "Bullet 350", "Meteor 350", "Hunter 350", "Himalayan", "Continental GT"] },
    { name: "Yamaha", models: ["FZ-S V3", "MT-15 V2", "R15 V4", "FZX"] },
    { name: "KTM", models: ["Duke 200", "Duke 390", "RC 200", "RC 390", "Adventure 250", "Adventure 390"] },
    { name: "Suzuki", models: ["Gixxer 155", "Gixxer 250", "Intruder 150", "Hayabusa"] },
  ],
  Scooter: [
    { name: "Honda", models: ["Activa 6G", "Activa 125", "Dio", "Grazia 125", "Activa E"] },
    { name: "TVS", models: ["Jupiter", "Jupiter 125", "Ntorq 125", "iQube Electric", "Scooty Pep Plus"] },
    { name: "Suzuki", models: ["Access 125", "Burgman Street", "Avenis 125"] },
    { name: "Ola Electric", models: ["S1 Pro", "S1 Air", "S1 X"] },
    { name: "Ather", models: ["450X", "450S", "Rizta"] },
    { name: "Hero", models: ["Maestro Edge 125", "Pleasure Plus", "Destini Prime"] },
    { name: "Bajaj", models: ["Chetak"] },
    { name: "Vespa", models: ["VXL 125", "SXL 150", "Elegante"] },
  ],
  Car: [
    { name: "Maruti Suzuki", models: ["Alto K10", "WagonR", "Swift", "Baleno", "Dzire", "Ciaz", "Celerio", "Ignis", "S-Presso"] },
    { name: "Hyundai", models: ["i10 Nios", "i20", "Aura", "Verna", "Elantra"] },
    { name: "Tata", models: ["Tiago", "Tigor", "Altroz", "Punch"] },
    { name: "Honda", models: ["Amaze", "City", "City Hybrid", "Elevate"] },
    { name: "Toyota", models: ["Glanza", "Camry"] },
    { name: "Kia", models: ["Sonet", "Seltos"] },
    { name: "Skoda", models: ["Slavia", "Rapid"] },
    { name: "Volkswagen", models: ["Virtus", "Polo"] },
  ],
  SUV: [
    { name: "Tata", models: ["Nexon", "Harrier", "Safari", "Punch", "Nexon EV"] },
    { name: "Hyundai", models: ["Creta", "Venue", "Tucson", "Alcazar", "Kona EV"] },
    { name: "Mahindra", models: ["Thar", "Scorpio N", "XUV700", "XUV300", "Bolero", "XUV400 EV"] },
    { name: "Kia", models: ["Seltos", "Sonet", "Carens", "EV6"] },
    { name: "Maruti Suzuki", models: ["Brezza", "Grand Vitara", "Jimny", "Fronx", "Invicto"] },
    { name: "Toyota", models: ["Fortuner", "Innova Crysta", "Innova Hycross", "Urban Cruiser"] },
    { name: "MG", models: ["Hector", "Astor", "ZS EV", "Gloster"] },
    { name: "Jeep", models: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"] },
  ],
  Commercial: [
    { name: "Tata", models: ["Ace", "Intra V20", "Yodha", "407", "Signa", "Ultra"] },
    { name: "Mahindra", models: ["Bolero Pickup", "Supro", "Jeeto", "Alfa"] },
    { name: "Ashok Leyland", models: ["Dost", "Bada Dost", "Partner", "Ecomet", "Boss"] },
    { name: "Force", models: ["Traveller", "Trax", "Urbania", "Gurkha"] },
    { name: "Bajaj", models: ["RE Auto", "Maxima C", "Maxima Z"] },
    { name: "Piaggio", models: ["Ape City", "Ape Xtra", "Ape E-City"] },
    { name: "Maruti Suzuki", models: ["Eeco Cargo", "Super Carry"] },
  ],
};

// ─── Problem Areas / Systems ─────────────────────────────────────────────────

export interface ProblemArea {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

export const PROBLEM_AREAS: ProblemArea[] = [
  { id: "engine", name: "Engine", icon: "🔧", desc: "Starting, power, noise, smoke" },
  { id: "brakes", name: "Brakes", icon: "🛑", desc: "Pads, rotors, fluid, ABS" },
  { id: "electrical", name: "Electrical", icon: "⚡", desc: "Lights, battery, wiring, fuses" },
  { id: "suspension", name: "Suspension", icon: "🔩", desc: "Shocks, springs, ride quality" },
  { id: "transmission", name: "Transmission", icon: "⚙️", desc: "Gear, clutch, drivetrain" },
  { id: "cooling", name: "Cooling System", icon: "❄️", desc: "Radiator, fan, overheating" },
  { id: "exhaust", name: "Exhaust", icon: "💨", desc: "Silencer, catalytic, emissions" },
  { id: "steering", name: "Steering", icon: "🎯", desc: "Power steering, alignment, play" },
  { id: "tyres", name: "Tyres & Wheels", icon: "🛞", desc: "Tyre wear, alignment, balance" },
  { id: "ac", name: "AC / Heating", icon: "🌡️", desc: "Cooling, heating, blower" },
  { id: "fuel", name: "Fuel System", icon: "⛽", desc: "Pump, filter, injector, lines" },
  { id: "body", name: "Body & Exterior", icon: "🚗", desc: "Dents, paint, mirrors, locks" },
];

// ─── Parts per Problem Area (mapped per vehicle type category) ───────────────

export interface AffectedPart {
  id: string;
  name: string;
  icon: string;
}

// Common parts across vehicle types, keyed by problem area ID
export const PARTS_BY_AREA: Record<string, AffectedPart[]> = {
  engine: [
    { id: "spark-plug", name: "Spark Plug", icon: "🔌" },
    { id: "air-filter", name: "Air Filter", icon: "🌬️" },
    { id: "timing-belt", name: "Timing Belt / Chain", icon: "⛓️" },
    { id: "oil-filter", name: "Oil Filter", icon: "🛢️" },
    { id: "carburetor", name: "Carburetor / Throttle Body", icon: "🔧" },
    { id: "piston-rings", name: "Piston Rings", icon: "⭕" },
    { id: "head-gasket", name: "Head Gasket", icon: "📋" },
    { id: "engine-mount", name: "Engine Mount", icon: "🔩" },
    { id: "valve", name: "Valves / Valve Seals", icon: "🎛️" },
  ],
  brakes: [
    { id: "brake-pads", name: "Brake Pads", icon: "🛑" },
    { id: "brake-disc", name: "Brake Disc / Rotor", icon: "💿" },
    { id: "brake-drum", name: "Brake Drum / Shoes", icon: "🥁" },
    { id: "brake-fluid", name: "Brake Fluid", icon: "💧" },
    { id: "brake-caliper", name: "Brake Caliper", icon: "🔧" },
    { id: "brake-line", name: "Brake Line / Hose", icon: "🔗" },
    { id: "abs-sensor", name: "ABS Sensor / Module", icon: "📡" },
    { id: "master-cylinder", name: "Master Cylinder", icon: "⚙️" },
  ],
  electrical: [
    { id: "battery", name: "Battery", icon: "🔋" },
    { id: "alternator", name: "Alternator / Charging", icon: "⚡" },
    { id: "starter-motor", name: "Starter Motor", icon: "🔑" },
    { id: "fuse-box", name: "Fuse Box / Relay", icon: "📦" },
    { id: "wiring-harness", name: "Wiring Harness", icon: "🔌" },
    { id: "headlight", name: "Headlight / Taillight", icon: "💡" },
    { id: "horn", name: "Horn", icon: "📢" },
    { id: "indicator", name: "Indicators / Blinkers", icon: "🔶" },
    { id: "ecu", name: "ECU / Sensors", icon: "🖥️" },
  ],
  suspension: [
    { id: "shock-absorber", name: "Shock Absorber", icon: "🔧" },
    { id: "coil-spring", name: "Coil Spring", icon: "🔩" },
    { id: "ball-joint", name: "Ball Joint", icon: "⚽" },
    { id: "control-arm", name: "Control Arm / Wishbone", icon: "💪" },
    { id: "strut", name: "Strut Assembly", icon: "📐" },
    { id: "bush", name: "Suspension Bush", icon: "🟤" },
    { id: "sway-bar", name: "Sway Bar / Link", icon: "🔗" },
  ],
  transmission: [
    { id: "clutch-plate", name: "Clutch Plate", icon: "💿" },
    { id: "clutch-cable", name: "Clutch Cable / Wire", icon: "🔗" },
    { id: "gear-oil", name: "Gear Oil / Transmission Fluid", icon: "🛢️" },
    { id: "gear-box", name: "Gearbox", icon: "⚙️" },
    { id: "chain-sprocket", name: "Chain & Sprocket (2W)", icon: "⛓️" },
    { id: "cv-joint", name: "CV Joint / Axle", icon: "🔩" },
    { id: "differential", name: "Differential", icon: "🔄" },
  ],
  cooling: [
    { id: "radiator", name: "Radiator", icon: "🔲" },
    { id: "coolant", name: "Coolant / Antifreeze", icon: "💧" },
    { id: "thermostat", name: "Thermostat", icon: "🌡️" },
    { id: "water-pump", name: "Water Pump", icon: "🔄" },
    { id: "radiator-hose", name: "Radiator Hose", icon: "🔗" },
    { id: "cooling-fan", name: "Cooling Fan / Motor", icon: "🌀" },
    { id: "radiator-cap", name: "Radiator Cap", icon: "🔘" },
  ],
  exhaust: [
    { id: "silencer", name: "Silencer / Muffler", icon: "🔇" },
    { id: "exhaust-pipe", name: "Exhaust Pipe / Manifold", icon: "🔧" },
    { id: "catalytic", name: "Catalytic Converter", icon: "♻️" },
    { id: "o2-sensor", name: "O2 Sensor / Lambda", icon: "📡" },
    { id: "exhaust-gasket", name: "Exhaust Gasket", icon: "📋" },
  ],
  steering: [
    { id: "power-steering", name: "Power Steering Pump", icon: "🔄" },
    { id: "steering-rack", name: "Steering Rack", icon: "🔧" },
    { id: "tie-rod", name: "Tie Rod End", icon: "🔗" },
    { id: "steering-column", name: "Steering Column", icon: "📐" },
    { id: "ps-fluid", name: "Power Steering Fluid", icon: "💧" },
    { id: "wheel-alignment", name: "Wheel Alignment Issue", icon: "📏" },
  ],
  tyres: [
    { id: "tyre-wear", name: "Tyre Wear / Bald", icon: "🛞" },
    { id: "puncture", name: "Puncture / Flat", icon: "📌" },
    { id: "wheel-balance", name: "Wheel Balancing", icon: "⚖️" },
    { id: "alloy-damage", name: "Alloy Wheel Damage", icon: "💎" },
    { id: "tyre-rotation", name: "Tyre Rotation Needed", icon: "🔄" },
    { id: "valve-stem", name: "Valve Stem / Cap", icon: "🔘" },
  ],
  ac: [
    { id: "compressor", name: "AC Compressor", icon: "❄️" },
    { id: "gas-refill", name: "AC Gas Refill", icon: "💨" },
    { id: "condenser", name: "Condenser", icon: "🔲" },
    { id: "blower-motor", name: "Blower Motor", icon: "🌀" },
    { id: "cabin-filter", name: "Cabin Air Filter", icon: "🌬️" },
    { id: "evaporator", name: "Evaporator", icon: "🔧" },
    { id: "ac-belt", name: "AC Belt", icon: "⛓️" },
  ],
  fuel: [
    { id: "fuel-pump", name: "Fuel Pump", icon: "⛽" },
    { id: "fuel-filter", name: "Fuel Filter", icon: "🔧" },
    { id: "fuel-injector", name: "Fuel Injector", icon: "💉" },
    { id: "fuel-line", name: "Fuel Line / Hose", icon: "🔗" },
    { id: "fuel-tank", name: "Fuel Tank", icon: "🛢️" },
    { id: "fuel-cap", name: "Fuel Cap / Seal", icon: "🔘" },
  ],
  body: [
    { id: "dent", name: "Dent / Scratch", icon: "😬" },
    { id: "bumper", name: "Bumper Damage", icon: "🛡️" },
    { id: "mirror", name: "Side Mirror", icon: "🪞" },
    { id: "door-handle", name: "Door Handle / Lock", icon: "🚪" },
    { id: "windshield", name: "Windshield / Glass", icon: "🪟" },
    { id: "wiper", name: "Wiper Blade", icon: "🌧️" },
    { id: "paint", name: "Paint / Touch Up", icon: "🎨" },
  ],
};
