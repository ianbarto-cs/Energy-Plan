import { useState } from "react";

const sections = [
  { id: "overview", label: "District Overview" },
  { id: "info", label: "Info to Acquire" },
  { id: "microgrid", label: "Microgrid Design" },
  { id: "software", label: "Software Plan" },
  { id: "deliverables", label: "Deliverables Checklist" },
];

const buildings = [
  {
    name: "Main Instructional Building",
    type: "Classrooms / Admin / Labs",
    sqft: "~80,000 sq ft",
    loads: "HVAC, lighting, computers, lab equipment",
    priority: "Critical",
    color: "#1E5B9C",
  },
  {
    name: "Automotive & Aviation Shop",
    type: "Heavy Shop / Garage",
    sqft: "~20,000 sq ft",
    loads: "Lifts, compressors, welders, diagnostic tools, lighting",
    priority: "Critical",
    color: "#2E7D32",
  },
  {
    name: "Building Trades / HVAC Shop",
    type: "Trades Lab",
    sqft: "~15,000 sq ft",
    loads: "HVAC trainers, electrical panels, plumbing fixtures, power tools",
    priority: "High",
    color: "#E65100",
  },
  {
    name: "Cosmetology / Health Sciences Building",
    type: "Specialty Lab",
    sqft: "~10,000 sq ft",
    loads: "Styling stations, lighting, medical equipment, computers",
    priority: "Medium",
    color: "#6A1B9A",
  },
  {
    name: "Student Commons / Cafeteria",
    type: "Common Space",
    sqft: "~12,000 sq ft",
    loads: "Kitchen equipment, HVAC, lighting, vending",
    priority: "Medium",
    color: "#00695C",
  },
];

const infoToAcquire = [
  {
    category: "Utility & Billing Data",
    icon: "⚡",
    color: "#1E5B9C",
    items: [
      { item: "Confirm utility provider", detail: "Almost certainly Xcel Energy (Public Service Co. of Colorado) — verify via a utility bill or call Jefferson County Public Schools facilities at (303) 982-8600", method: "Call JCPS Facilities or check a utility bill", priority: "High" },
      { item: "Rate schedule type", detail: "Likely Commercial General Service (Schedule SG or GS) or Medium General Service (MGS) — need the specific tariff name from the bill", method: "Xcel bill or call 800-481-4700", priority: "High" },
      { item: "12 months of electricity bills", detail: "Monthly kWh usage and peak demand (kW) for each month — ideally the past full calendar year. Key for sizing solar + battery.", method: "JCPS Facilities Manager / JCPS Energy Manager", priority: "High" },
      { item: "Demand charge data", detail: "Commercial accounts pay per-kW peak demand charges on top of energy charges — this is where battery storage saves the most money", method: "Xcel bill or energy manager", priority: "High" },
      { item: "Net metering policy", detail: "Xcel offers net metering for systems up to 2 MW for non-residential. Confirm current compensation rate and export limits.", method: "xcelenergy.com or call business line", priority: "Medium" },
    ]
  },
  {
    category: "Building & Site Data",
    icon: "🏢",
    color: "#2E7D32",
    items: [
      { item: "Confirm building list & names", detail: "Walk or use Google Maps satellite view of 13300 W 2nd Place, Lakewood CO 80228 to identify the 5 distinct structures on campus", method: "Google Maps satellite, campus visit, or school website", priority: "High" },
      { item: "Approximate square footage per building", detail: "Use publicly available Jefferson County Assessor records or Google Maps measurement tool — or ask facilities", method: "Jefferson County Assessor (jeffco.us/assessor) or JCPS Facilities", priority: "High" },
      { item: "Roof area and condition", detail: "Flat vs. pitched roof? Any obstructions (HVAC units, skylights)? This determines usable solar panel area. Estimate using Google Maps satellite.", method: "Google Maps satellite + campus visit", priority: "High" },
      { item: "Roof orientation", detail: "South-facing rooftop area is ideal for solar. Check compass orientation on Google Maps.", method: "Google Maps", priority: "Medium" },
      { item: "Parking lot / ground space", detail: "Any open ground or parking areas for ground-mounted solar or battery containers?", method: "Campus visit / Google Maps", priority: "Medium" },
      { item: "Existing electrical infrastructure", detail: "Where are the main electrical panels/switchgear? Is there a central utility room? This determines where the microgrid controller and battery would connect.", method: "JCPS Facilities / campus visit", priority: "High" },
    ]
  },
  {
    category: "Load & Operations Data",
    icon: "📊",
    color: "#E65100",
    items: [
      { item: "Operating hours per building", detail: "Classes run 7:30–10:30 AM and 12:00–3:45 PM Mon–Thu, and 7:30–10:30 AM Friday. After-hours activities? Summer operations?", method: "Warren Tech website / school office", priority: "High" },
      { item: "Critical vs. non-critical loads", detail: "What must stay on during an outage? Likely: fire alarm, emergency lighting, computer servers, refrigeration (health sciences), key HVAC zones. What can shed? Vending, shop lighting, etc.", method: "Facilities manager discussion", priority: "High" },
      { item: "Heavy load equipment inventory", detail: "Auto lifts, compressors, welding machines — what are their power draws (kW)? This shapes peak demand.", method: "Program instructors / equipment nameplates", priority: "Medium" },
      { item: "HVAC system type", detail: "Gas or electric heating? Central or distributed HVAC? Gas heating means electric load is lower in winter. Electric heat pumps = large winter electric load.", method: "Facilities / building mechanical drawings", priority: "High" },
      { item: "Any existing solar or energy systems", detail: "Does Warren Tech already have any PV panels, EV chargers, or generators on campus?", method: "Campus visit / facilities manager", priority: "Medium" },
    ]
  },
  {
    category: "Assumptions You Can Make (No Data Needed)",
    icon: "✅",
    color: "#6A1B9A",
    items: [
      { item: "Solar resource", detail: "Lakewood, CO gets ~5.5–5.8 peak sun hours/day — one of the best in the country. Use PVWatts at pvwatts.nrel.gov with address 13300 W 2nd Place, Lakewood CO.", method: "NREL PVWatts (free, online)", priority: "Use directly" },
      { item: "Rough load estimate", detail: "A 130,000 sq ft vocational/educational building typically uses 15–25 kWh/sq ft/year. Estimate ~1.5–2.5 million kWh/year total campus. Refine with real bills.", method: "EIA commercial building benchmarks", priority: "Use as placeholder" },
      { item: "Solar cost assumption", detail: "Commercial solar in Colorado: ~$2.00–2.50/W installed. 100 kW system ≈ $200–250k before incentives.", method: "SEIA national data / NREL ATB", priority: "Use directly" },
      { item: "Battery storage cost", detail: "Commercial lithium battery storage: ~$400–600/kWh installed. A 200 kWh system ≈ $80–120k.", method: "Wood Mackenzie / BloombergNEF public estimates", priority: "Use directly" },
      { item: "Federal ITC (Investment Tax Credit)", detail: "30% federal tax credit applies to solar + storage. Note: as a public school, Jeffco may use a direct pay option or a third-party ownership structure (PPA). Flag this in your report.", method: "IRS.gov / Inflation Reduction Act guidance", priority: "Note in report" },
    ]
  },
];

const mitigridDesign = [
  {
    tech: "Rooftop Solar PV Array",
    role: "Primary energy supply — generates clean electricity during school hours (7 AM–4 PM), which aligns almost perfectly with the school's operating schedule",
    sizing: "100–200 kW across the main building + shops roof area. At 5.7 peak sun hours in Lakewood, a 150 kW system generates ~295,000 kWh/year.",
    connects: "DC output → solar inverter → AC distribution panel → campus loads",
    outage: "In grid-connected mode, feeds campus and potentially exports. In island mode, becomes the primary generation source with battery regulation.",
    type: "Supply",
    icon: "☀️",
  },
  {
    tech: "Battery Energy Storage System (BESS)",
    role: "Stabilizes voltage during islanding, stores solar energy for use after school hours, provides demand charge reduction by shaving peaks, and enables the campus to disconnect from the grid",
    sizing: "200–400 kWh Li-ion (e.g., Tesla Megapack or smaller equivalent). Sized to support critical loads for 2–4 hours during an outage.",
    connects: "Bidirectional DC-AC inverter (with grid-forming capability) → main switchgear",
    outage: "Becomes the grid-forming element in island mode — sets voltage and frequency. Solar PV then feeds into this 'micro-grid' rather than the utility grid.",
    type: "Storage / Stabilization",
    icon: "🔋",
  },
  {
    tech: "Managed Load / Smart Load Shedding",
    role: "When the grid goes down and the battery is running low, non-critical loads are automatically shed (via smart breakers or a controller) so power lasts longer for critical equipment",
    sizing: "Software/controller-based — no additional hardware beyond smart breakers or a building management system (BMS) relay",
    connects: "Microgrid controller → existing electrical panels / BMS",
    outage: "Tier 1 shed: vending machines, non-essential shop lighting. Tier 2 shed: HVAC in unoccupied zones. Tier 3: everything except fire/life safety.",
    type: "Flexibility / Stabilization",
    icon: "🎛️",
  },
];

const softwarePlan = [
  {
    phase: "Phase 1",
    title: "PVWatts Solar Modeling",
    tool: "NREL PVWatts (pvwatts.nrel.gov)",
    free: true,
    description: "Run the official NREL solar calculator for Warren Tech's exact address. This gives you monthly and annual energy production estimates for your proposed solar system.",
    steps: [
      "Go to pvwatts.nrel.gov",
      "Enter address: 13300 W 2nd Place, Lakewood, CO 80228",
      "Set DC system size (start with 150 kW)",
      "Set module type: Standard, Array type: Fixed (Roof Mount)",
      "Set tilt: ~30° (latitude-based for Lakewood at 39.7° N)",
      "Set azimuth: 180° (due south)",
      "Set losses: 14% (default is fine)",
      "Download/screenshot the monthly production table",
      "Record: Annual AC energy output (kWh/year), capacity factor"
    ],
    output: "Monthly kWh production table, annual total — goes directly into your Cost & Value Spreadsheet"
  },
  {
    phase: "Phase 2",
    title: "Load Profile Estimation",
    tool: "EPA ENERGY STAR Portfolio Manager or EIA CBECS data + Excel",
    free: true,
    description: "Build a rough 8760-hour (hourly) load profile or a monthly load estimate for the campus. This tells you when the campus uses energy so you can size the battery properly.",
    steps: [
      "If you get real bills: enter 12 months of kWh data into Excel, plot by month",
      "If no bills: use EIA Commercial Buildings Energy Consumption Survey (CBECS) benchmarks for vocational/education buildings in Mountain climate zone",
      "Assume school day hours: 7:00 AM–4:00 PM Mon–Fri (with some Saturday activity)",
      "Create a simplified daily load curve: low (nights/weekends), medium (early morning), high (9 AM–3 PM)",
      "Estimate peak demand: rule of thumb for educational buildings = ~10–15 W/sq ft peak → 130,000 sq ft campus = 1,300–1,950 kW peak",
      "Identify critical loads list (estimate ~50–100 kW for fire/life safety + servers + key labs)"
    ],
    output: "Monthly load table + daily load curve sketch — drives battery sizing and operating strategy sections of your report"
  },
  {
    phase: "Phase 3",
    title: "Battery Sizing Calculation",
    tool: "Excel spreadsheet (your own)",
    free: true,
    description: "Calculate the battery size needed to support critical loads during a grid outage and to shift solar energy from daytime to evening.",
    steps: [
      "Define critical load: e.g., 75 kW (fire alarms, servers, emergency lighting, critical HVAC)",
      "Define outage duration target: e.g., 4 hours",
      "Required energy = 75 kW × 4 hours = 300 kWh",
      "Apply depth of discharge (DoD) factor: Li-ion typically 80–90% usable → size to 350–375 kWh nominal",
      "Check solar-battery balance: can 150 kW solar array fully charge the battery on a clear day? Yes — at 5.7 peak sun hours, 150 kW produces ~855 kWh/day, more than enough to charge a 350 kWh battery",
      "Demand charge reduction: estimate peak demand shaving value using Xcel's demand charge rate (typically $8–15/kW/month for commercial)"
    ],
    output: "Battery sizing justification for your report + a line item in the Cost & Value Spreadsheet"
  },
  {
    phase: "Phase 4",
    title: "System Diagram (Block Diagram)",
    tool: "draw.io (diagrams.net) — free browser-based",
    free: true,
    description: "Create the required conceptual system diagram showing how all components connect. The challenge only requires a block diagram — not an engineering one-line.",
    steps: [
      "Go to app.diagrams.net (no login needed)",
      "Draw blocks for: Utility Grid → Main Switchgear / PCC (Point of Common Coupling) → Microgrid Controller",
      "Add: Solar Array → Solar Inverter → AC Bus",
      "Add: Battery → Bidirectional Inverter → AC Bus",
      "Add: AC Bus → Building Loads (split into Critical and Non-Critical)",
      "Show the 'island switch' (transfer switch) between utility and campus",
      "Label power flows with arrows (→ for normal, dashed → for outage mode)",
      "Export as PNG or PDF for inclusion in your report"
    ],
    output: "System block diagram — required figure in the Microgrid Concept Design section of the report"
  },
  {
    phase: "Phase 5",
    title: "Cost & Value Spreadsheet",
    tool: "Microsoft Excel (.xlsx — required format)",
    free: true,
    description: "Build the required Cost and Value Spreadsheet with technology costs, energy contributions, and benefit calculations.",
    steps: [
      "Column A: Technology (Solar PV, Battery Storage, Microgrid Controller, Managed Load)",
      "Column B: System Size (150 kW, 350 kWh, 1 unit, software)",
      "Column C: Installed Cost ($/W or $/kWh × size)",
      "Column D: Total Installed Cost ($)",
      "Column E: Annual Energy Contribution (kWh/year from PVWatts)",
      "Column F: Annual $ Value (kWh × Xcel commercial rate ~$0.08–0.12/kWh)",
      "Column G: Other Benefits (demand charge reduction, resilience value, training value)",
      "Add a summary row: Total System Cost, Total Annual Benefit, Simple Payback (years)",
      "Add a notes tab: document all assumptions and sources"
    ],
    output: "Complete Excel file for submission (TeamName_SchoolShortName_MicrogridCostValue.xlsx)"
  },
  {
    phase: "Phase 6",
    title: "Presentation Slides",
    tool: "Microsoft PowerPoint (.pptx — required format)",
    free: true,
    description: "Build the final 8-minute presentation. Recommended structure and slide count for the 8-minute limit.",
    steps: [
      "Slide 1: Title — Team name, school, Warren Tech Central Microgrid",
      "Slide 2: District Overview — campus map/photo, 5 buildings, why it's a good microgrid candidate",
      "Slide 3: District Goals — pick 2–3: Outage Resilience + Cost Stability + Training Value",
      "Slide 4: Microgrid Design — system block diagram (from draw.io), technology list",
      "Slide 5: Solar PV Details — PVWatts result, estimated annual production, roof area used",
      "Slide 6: Battery Storage Details — sizing logic, outage hours supported, demand charge savings",
      "Slide 7: Operating Strategy — two-column: Normal Mode vs. Outage Mode",
      "Slide 8: Load Prioritization — table of Critical / High / Medium / Non-Critical loads",
      "Slide 9: Cost & Value Snapshot — bar chart from spreadsheet, payback period",
      "Slide 10: Workforce & Implementation — what jobs are involved, what students are learning by doing this",
      "Slide 11: Conclusion / Q&A"
    ],
    output: "Final .pptx file for submission + live presentation"
  },
];

const checklistItems = [
  { section: "District Overview (1–2 pp)", items: ["District name & location confirmed (Warren Tech Central, 13300 W 2nd Place, Lakewood, Jefferson County)", "Map image or sketch with campus boundary and 5 buildings labeled", "Building list with approximate sq footage and use type for all 5", "Utility provider named (Xcel Energy / Public Service Co. of Colorado)", "Rate type identified (Xcel Commercial, likely Schedule SG or MGS)", "2–3 district goals selected and explained"], done: [] },
  { section: "Microgrid Concept Design (2–4 pp)", items: ["At least 2 technologies specified", "At least 1 on-site electricity supply tech (Solar PV ✓)", "At least 1 flexibility/stabilization element (Battery ✓)", "Role of each technology explained", "Estimated sizes provided (order of magnitude kW / kWh)", "System block diagram included"], done: [] },
  { section: "Operating Strategy (1–2 pp)", items: ["Grid-connected (normal) mode described", "Outage / islanded mode described", "Load prioritization plan (critical vs. non-critical) included"], done: [] },
  { section: "Implementation & Workforce Plan (1–2 pp)", items: ["Permitting / interconnection considerations noted", "High-level build / commissioning steps listed", "Workforce roles identified (what jobs, what skills)", "Safety considerations addressed"], done: [] },
  { section: "Cost & Value Spreadsheet", items: ["Installed cost per technology (order of magnitude)", "Annual energy contribution per technology", "Non-monetary benefits noted (resilience, training value)", "File named correctly: TeamName_SchoolShortName_MicrogridCostValue.xlsx"], done: [] },
  { section: "Presentation Slides", items: ["Covers all 5 required topics (district, design, operating strategy, cost/value, workforce)", "16:9 PowerPoint format", "8 minutes deliverable (aim for 10–11 slides)", "File named correctly: TeamName_SchoolShortName_MicrogridPresentation.pptx"], done: [] },
  { section: "Report Formatting", items: ["PDF format, 6–10 pages (excl. title page)", "8.5\" × 11\" paper size", "Minimum 11pt font, 0.5\" margins", "Grammatically correct English throughout", "Assumptions and data sources documented", "File named correctly: TeamName_SchoolShortName_MicrogridReport.pdf"], done: [] },
];

export default function WarrenTechPlan() {
  const [active, setActive] = useState("overview");
  const [checked, setChecked] = useState({});

  const toggleCheck = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = checklistItems.reduce((a, s) => a + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((totalChecked / totalItems) * 100);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0f1923", minHeight: "100vh", color: "#e8e0d0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%)", borderBottom: "2px solid #2a5a8c", padding: "32px 24px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#5a9fd4", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>ENERGY CAREER CHALLENGE — COLORADO 2026</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#e8e0d0", letterSpacing: 1 }}>Warren Tech Central</h1>
          <div style={{ fontSize: 15, color: "#a0c4e8", marginTop: 4 }}>Microgrid Project 1 — Full Planning Document</div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            {[
              ["📍", "13300 W 2nd Place, Lakewood, CO 80228"],
              ["⚡", "Xcel Energy (Public Service Co. of Colorado)"],
              ["🏢", "5 Buildings | ~137,000 sq ft campus"],
              ["☀️", "~5.7 peak sun hours/day"],
            ].map(([icon, text]) => (
              <div key={text} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(90,159,212,0.3)", borderRadius: 6, padding: "5px 12px", fontSize: 12, color: "#c0d8ee", display: "flex", gap: 6, alignItems: "center" }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#111d2b", borderBottom: "1px solid #1e3a54", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              background: active === s.id ? "#1a3a5c" : "transparent",
              color: active === s.id ? "#5a9fd4" : "#8aa8c0",
              border: "none", borderBottom: active === s.id ? "2px solid #5a9fd4" : "2px solid transparent",
              padding: "14px 18px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Georgia, serif",
              transition: "all 0.2s"
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

        {/* OVERVIEW */}
        {active === "overview" && (
          <div>
            <SectionHeader icon="🏫" title="District Overview" subtitle="Warren Tech Central — Career & Technical Education Campus" />
            <div style={{ background: "rgba(26,58,92,0.3)", border: "1px solid #2a5a8c", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: "#c0d8ee" }}>
              Warren Tech Central is Jefferson County Public Schools' premier Career and Technical Education campus, serving roughly 1,600 juniors and seniors across 30+ programs. Located at 13300 W 2nd Place in Lakewood, CO, the campus operates half-day sessions (7:30–10:30 AM and 12:00–3:45 PM, Mon–Thu; 7:30–10:30 AM Friday), making it an ideal microgrid candidate — its predictable load schedule aligns nearly perfectly with peak solar production hours. The campus is served by <strong style={{color:"#5a9fd4"}}>Xcel Energy</strong> and sits in <strong style={{color:"#5a9fd4"}}>Jefferson County</strong>, Colorado.
            </div>

            <div style={{ display: "grid", gap: 14, marginBottom: 32 }}>
              {buildings.map((b, i) => (
                <div key={i} style={{ background: "#111d2b", border: `1px solid ${b.color}44`, borderLeft: `4px solid ${b.color}`, borderRadius: 8, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#e8e0d0" }}>Building {i+1}: {b.name}</div>
                      <div style={{ fontSize: 12, color: "#7a9ab8", marginTop: 2 }}>{b.type} — {b.sqft}</div>
                    </div>
                    <span style={{ background: b.color + "22", color: b.color, border: `1px solid ${b.color}55`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>
                      {b.priority} Priority
                    </span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 13, color: "#a0b8cc" }}>
                    <strong style={{color:"#7a9ab8"}}>Key loads:</strong> {b.loads}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111d2b", border: "1px solid #2a5a8c", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5a9fd4", marginBottom: 14, textTransform: "uppercase", letterSpacing: 2 }}>Recommended District Goals (pick 2–3 for your report)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {[
                  ["🔌", "Outage Resilience", "Campus hosts critical training programs. Battery + solar ensures critical systems (servers, emergency lighting, key labs) stay live during grid outages — a real Jefferson County risk during high-wind events."],
                  ["📉", "Cost Stability", "Demand charge reduction via battery peak-shaving can cut commercial electric bills significantly. Good financial case for JCPS."],
                  ["🎓", "Training & Workforce Value", "The Building Trades and Electrical programs can use a real, live microgrid as a teaching tool — students learn on actual hardware, not just simulations. Massive curriculum alignment."],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{ background: "rgba(42,90,140,0.15)", border: "1px solid #2a5a8c55", borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 700, color: "#e8e0d0", fontSize: 14, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#8aa8c0", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INFO TO ACQUIRE */}
        {active === "info" && (
          <div>
            <SectionHeader icon="🔍" title="Information to Acquire" subtitle="What you need to collect — and how to get it" />
            {infoToAcquire.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#e8e0d0" }}>{cat.category}</div>
                  <div style={{ flex: 1, height: 1, background: `${cat.color}44`, marginLeft: 8 }}></div>
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{ background: "#111d2b", border: `1px solid ${cat.color}33`, borderRadius: 8, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#e8e0d0" }}>{item.item}</div>
                        <span style={{ background: cat.color + "22", color: cat.color, border: `1px solid ${cat.color}55`, borderRadius: 20, padding: "1px 10px", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>{item.priority}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#a0b8cc", marginTop: 6, lineHeight: 1.6 }}>{item.detail}</div>
                      <div style={{ fontSize: 12, color: "#5a9fd4", marginTop: 8 }}>
                        <strong>How to get it:</strong> {item.method}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MICROGRID DESIGN */}
        {active === "microgrid" && (
          <div>
            <SectionHeader icon="⚙️" title="Proposed Microgrid Design" subtitle="3-technology system: Solar PV + Battery Storage + Smart Load Management" />
            <div style={{ background: "rgba(26,58,92,0.3)", border: "1px solid #2a5a8c", borderRadius: 10, padding: "14px 20px", marginBottom: 24, fontSize: 13, color: "#a0c4e8", lineHeight: 1.7 }}>
              This design meets all contest requirements: 2+ technologies, 1 on-site supply technology (solar), and 1 flexibility/stabilization element (battery + load management). It's also directly relevant to Warren Tech's Building Trades / Electrical programs as a teaching asset.
            </div>

            {mitigridDesign.map((t, ti) => (
              <div key={ti} style={{ background: "#111d2b", border: "1px solid #2a5a8c", borderRadius: 10, padding: "20px 24px", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "#e8e0d0" }}>{t.tech}</div>
                    <span style={{ background: "#1a3a5c", color: "#5a9fd4", borderRadius: 20, padding: "2px 10px", fontSize: 11 }}>{t.type}</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  {[
                    ["Role", t.role],
                    ["Sizing", t.sizing],
                    ["Connections", t.connects],
                    ["Outage Mode", t.outage],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a9fd4", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#c0d8ee", lineHeight: 1.6 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "#111d2b", border: "1px solid #2e7d3244", borderRadius: 10, padding: "20px 24px", marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4caf50", marginBottom: 14, textTransform: "uppercase", letterSpacing: 2 }}>Operating Strategy Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#4caf50", fontWeight: 700, marginBottom: 8 }}>⚡ NORMAL (Grid-Connected) MODE</div>
                  {["Solar PV feeds campus loads first, reducing utility consumption", "Excess solar charges the battery bank", "Battery handles demand peaks to reduce Xcel demand charges", "Grid supplies any shortfall (nights, cloudy days, high load periods)", "All buildings at full power — no load restrictions"].map(pt => (
                    <div key={pt} style={{ fontSize: 12, color: "#a0b8cc", padding: "4px 0", borderBottom: "1px solid #1e3a54", lineHeight: 1.5 }}>• {pt}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#ef5350", fontWeight: 700, marginBottom: 8 }}>🔌 OUTAGE (Islanded) MODE</div>
                  {["Transfer switch opens — campus disconnects from grid", "Battery becomes grid-forming element (sets voltage & frequency)", "Solar PV continues generating into the campus microgrid", "Tier 1 loads shed immediately (vending, decorative lighting)", "Critical systems protected: fire alarms, emergency lighting, servers, key labs", "Battery + solar estimated to sustain critical loads 4+ hours"].map(pt => (
                    <div key={pt} style={{ fontSize: 12, color: "#a0b8cc", padding: "4px 0", borderBottom: "1px solid #1e3a54", lineHeight: 1.5 }}>• {pt}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SOFTWARE PLAN */}
        {active === "software" && (
          <div>
            <SectionHeader icon="💻" title="Software & Analysis Plan" subtitle="6 phases — all free tools, step-by-step instructions" />
            <div style={{ background: "rgba(26,58,92,0.3)", border: "1px solid #2a5a8c", borderRadius: 10, padding: "14px 20px", marginBottom: 24, fontSize: 13, color: "#a0c4e8", lineHeight: 1.7 }}>
              Every tool listed here is <strong style={{color:"#5a9fd4"}}>free and browser-based</strong>. No software installation required. The challenge does not require advanced modeling software — these tools are exactly what the judges expect at the community college level.
            </div>
            {softwarePlan.map((p, pi) => (
              <div key={pi} style={{ background: "#111d2b", border: "1px solid #2a5a8c", borderRadius: 10, marginBottom: 18, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(90deg, #1a3a5c, #111d2b)", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ background: "#2a5a8c", color: "#5a9fd4", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{p.phase}</span>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#e8e0d0" }}>{p.title}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: "#0d2d1a", color: "#4caf50", border: "1px solid #2e7d3244", borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>FREE</span>
                    <span style={{ fontSize: 12, color: "#7a9ab8" }}>{p.tool}</span>
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ fontSize: 13, color: "#a0b8cc", lineHeight: 1.7, marginBottom: 14 }}>{p.description}</div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#5a9fd4", textTransform: "uppercase", marginBottom: 10 }}>Step-by-Step</div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {p.steps.map((step, si) => (
                      <div key={si} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ background: "#1a3a5c", color: "#5a9fd4", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{si + 1}</span>
                        <span style={{ fontSize: 12, color: "#c0d8ee", lineHeight: 1.6 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, background: "rgba(42,90,140,0.2)", border: "1px solid #2a5a8c55", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#5a9fd4" }}>
                    <strong>Output:</strong> {p.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHECKLIST */}
        {active === "deliverables" && (
          <div>
            <SectionHeader icon="✅" title="Deliverables Checklist" subtitle="Track your progress toward the final submission" />
            <div style={{ background: "#111d2b", border: "1px solid #2a5a8c", borderRadius: 10, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#a0b8cc" }}>Overall Progress</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#5a9fd4" }}>{totalChecked} / {totalItems} items</span>
                </div>
                <div style={{ background: "#0d1f30", borderRadius: 20, height: 10, overflow: "hidden" }}>
                  <div style={{ background: "linear-gradient(90deg, #1e5b9c, #4caf50)", height: "100%", width: `${progress}%`, borderRadius: 20, transition: "width 0.3s" }}></div>
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: progress === 100 ? "#4caf50" : "#5a9fd4" }}>{progress}%</div>
            </div>

            {checklistItems.map((section, si) => (
              <div key={si} style={{ background: "#111d2b", border: "1px solid #2a5a8c", borderRadius: 10, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ background: "#1a3a5c", padding: "12px 18px", fontSize: 13, fontWeight: 700, color: "#c0d8ee" }}>
                  {section.section}
                </div>
                <div style={{ padding: "12px 18px" }}>
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`;
                    const done = checked[key];
                    return (
                      <div key={ii} onClick={() => toggleCheck(si, ii)} style={{
                        display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 4px", cursor: "pointer",
                        borderBottom: ii < section.items.length - 1 ? "1px solid #1e3a54" : "none",
                        opacity: done ? 0.6 : 1, transition: "opacity 0.2s"
                      }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: 4, border: `2px solid ${done ? "#4caf50" : "#2a5a8c"}`,
                          background: done ? "#4caf50" : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1, transition: "all 0.2s"
                        }}>
                          {done && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: done ? "#5a9fd4" : "#c0d8ee", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#e8e0d0" }}>{title}</h2>
          <div style={{ fontSize: 13, color: "#5a9fd4", marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg, #2a5a8c, transparent)", marginTop: 16 }}></div>
    </div>
  );
}
