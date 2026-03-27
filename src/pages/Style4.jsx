import { useState, useEffect, useRef } from "react";
import { Registration } from "@/api/entities";

// ── Aurora + Grid + Light Glide Background ──────────────────────────────────
function AnimatedBackground() {
  const svgRef = useRef(null);
  const frameRef = useRef(null);

  const CELL_W = 300;  // 가로 간격
  const CELL_H = 180;  // 세로 간격
  const DOT_R  = 5;   // 교차점 원 크기

  // Glass 흰색 빛 비임
  const hBeams = [
    { row: 2,  duration: 7000,  delay: 0,    },
    { row: 5,  duration: 9500,  delay: 1800, },
    { row: 8,  duration: 6500,  delay: 3200, },
    { row: 11, duration: 11000, delay: 600,  },
  ];
  const vBeams = [
    { col: 2,  duration: 8000,  delay: 500,  },
    { col: 5,  duration: 10000, delay: 2000, },
    { col: 8,  duration: 7500,  delay: 1200, },
    { col: 11, duration: 9000,  delay: 3500, },
  ];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const startTime = performance.now();

    const animate = (now) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      svg.setAttribute("width", W);
      svg.setAttribute("height", H);

      const elapsed = now - startTime;

      // Horizontal beams
      const hRects = svg.querySelectorAll(".hbeam");
      hRects.forEach((rect, i) => {
        const b = hBeams[i];
        const raw = (elapsed - b.delay) % b.duration;
        const pos = raw < 0 ? 0 : raw / b.duration;
        const beamW = 200;
        const x = pos * (W + beamW * 2) - beamW;
        rect.setAttribute("x", x - beamW / 2);
        rect.setAttribute("y", b.row * CELL_H - 2);
        rect.setAttribute("width", beamW);
        rect.setAttribute("height", 4);
      });

      // Vertical beams
      const vRects = svg.querySelectorAll(".vbeam");
      vRects.forEach((rect, i) => {
        const b = vBeams[i];
        const raw = (elapsed - b.delay) % b.duration;
        const pos = raw < 0 ? 0 : raw / b.duration;
        const beamH = 160;
        const y = pos * (H + beamH * 2) - beamH;
        rect.setAttribute("x", b.col * CELL_W - 2);
        rect.setAttribute("y", y - beamH / 2);
        rect.setAttribute("width", 4);
        rect.setAttribute("height", beamH);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const W = typeof window !== "undefined" ? window.innerWidth  : 1440;
  const H = typeof window !== "undefined" ? window.innerHeight : 900;
  const cols = Math.ceil(W / CELL_W) + 1;
  const rows = Math.ceil(H / CELL_H) + 1;

  // 교차점 도트 — 모든 격자 교차점
  const dotPositions = [];
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r <= rows; r++) {
      dotPositions.push({ x: c * CELL_W, y: r * CELL_H, key: c * 1000 + r });
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
      {/* Base */}
      <div style={{ position: "absolute", inset: 0, background: "#f0f4f0" }} />

      {/* Aurora layer 1 — lime-green + sky-blue, 12s */}
      <div style={{
        position: "absolute", inset: "-20%",
        background: `
          radial-gradient(ellipse 60% 50% at 20% 40%, rgba(160,220,180,0.55) 0%, transparent 70%),
          radial-gradient(ellipse 50% 45% at 75% 20%, rgba(140,195,235,0.50) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 55% 75%, rgba(170,225,195,0.45) 0%, transparent 65%)
        `,
        animation: "aurora1 12s ease-in-out infinite alternate",
      }} />

      {/* Aurora layer 2 — lavender + sky, 16s */}
      <div style={{
        position: "absolute", inset: "-20%",
        background: `
          radial-gradient(ellipse 55% 45% at 80% 60%, rgba(185,165,235,0.45) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 30% 75%, rgba(130,190,230,0.40) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 60% 20%, rgba(155,215,185,0.40) 0%, transparent 65%)
        `,
        animation: "aurora2 16s ease-in-out infinite alternate",
      }} />

      {/* SVG: grid + dots + beams */}
      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0 }}
        width={W} height={H}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Horizontal beam — glass white gradient */}
          {hBeams.map((_, i) => (
            <linearGradient key={`hg${i}`} id={`hg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
              <stop offset="25%"  stopColor="rgba(255,255,255,0.55)" />
              <stop offset="50%"  stopColor="rgba(255,255,255,0.75)" />
              <stop offset="75%"  stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          ))}
          {/* Vertical beam — glass white gradient */}
          {vBeams.map((_, i) => (
            <linearGradient key={`vg${i}`} id={`vg${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
              <stop offset="25%"  stopColor="rgba(255,255,255,0.55)" />
              <stop offset="50%"  stopColor="rgba(255,255,255,0.75)" />
              <stop offset="75%"  stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          ))}
        </defs>

        {/* Vertical grid lines — glass white */}
        {Array.from({ length: cols + 1 }).map((_, c) => (
          <line key={`v${c}`}
            x1={c * CELL_W} y1={0} x2={c * CELL_W} y2="100%"
            stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"
          />
        ))}

        {/* Horizontal grid lines — glass white */}
        {Array.from({ length: rows + 1 }).map((_, r) => (
          <line key={`h${r}`}
            x1={0} y1={r * CELL_H} x2="100%" y2={r * CELL_H}
            stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"
          />
        ))}

        {/* Intersection dots — glass white, r=10 */}
        {dotPositions.map((d) => (
          <circle key={d.key}
            cx={d.x} cy={d.y} r={DOT_R}
            fill="rgba(255,255,255,0.22)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="0.8"
          />
        ))}

        {/* Horizontal light beams */}
        {hBeams.map((b, i) => (
          <rect key={`hb${i}`} className="hbeam"
            x={0} y={b.row * CELL_H - 2}
            width={200} height={4}
            fill={`url(#hg${i})`}
            rx={2}
          />
        ))}

        {/* Vertical light beams */}
        {vBeams.map((b, i) => (
          <rect key={`vb${i}`} className="vbeam"
            x={b.col * CELL_W - 2} y={0}
            width={4} height={160}
            fill={`url(#vg${i})`}
            rx={2}
          />
        ))}
      </svg>

      <style>{`
        @keyframes aurora1 {
          0%   { transform: translate(0%,  0%)  scale(1);    }
          100% { transform: translate(6%, -5%)  scale(1.08); }
        }
        @keyframes aurora2 {
          0%   { transform: translate(0%,  0%)  scale(1.05); }
          100% { transform: translate(-7%, 5%)  scale(1);    }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Style4() {
  const [formData, setFormData] = useState({
    name: "", organization: "", ministry_location: "", id_number: "", kakao_id: "", email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState("");

  // 시간 행 정의 (docx 기준)
  const timeSlots = [
    "08:00-09:00",
    "09:00-09:30",
    "09:30-12:30",
    "12:30-14:00",
    "14:00-14:30",
    "14:30-17:30",
    "18:00-19:00",
    "19:30-21:00",
  ];

  const days = [
    { day: "10/05(월)", color: "#2563eb", borderColor: "rgba(37,99,235,0.25)" },
    { day: "10/06(화)", color: "#0891b2", borderColor: "rgba(8,145,178,0.25)" },
    { day: "10/07(수)", color: "#059669", borderColor: "rgba(5,150,105,0.25)" },
    { day: "10/08(목)", color: "#16a34a", borderColor: "rgba(22,163,74,0.25)" },
  ];

  // grid[timeIndex][dayIndex]
  // 도착은 08:00~12:30 rowSpan:3, 점심은 colSpan:4, Outing+집으로는 rowSpan:2 등
  const grid = [
    // 08:00-09:00
    [
      { title: "도착", note: "점심식사 전까지", type: "default", rowSpan: 3 },
      { title: "아침식사", note: "", type: "meal", rowSpan: 1 },
      { title: "아침식사", note: "", type: "meal", rowSpan: 1 },
      { title: "아침식사", note: "", type: "meal", rowSpan: 1 },
    ],
    // 09:00-09:30
    [
      "RSPAN",
      { title: "준비", note: "", type: "default", rowSpan: 1 },
      { title: "준비", note: "", type: "default", rowSpan: 1 },
      { title: "준비", note: "", type: "default", rowSpan: 1 },
    ],
    // 09:30-12:30
    [
      "RSPAN",
      { title: "세션 1", note: "발제: 정민영", type: "session", rowSpan: 1 },
      { title: "세션 3", note: "발제: 권성찬", type: "session", rowSpan: 1 },
      { title: "정리 및 발표", note: "선교적 성찬: 정민영", type: "session", rowSpan: 1 },
    ],
    // 12:30-14:00
    [
      { title: "점심식사", note: "", type: "meal", colSpan: 4 },
      "CSPAN", "CSPAN", "CSPAN",
    ],
    // 14:00-14:30
    [
      { title: "등록", note: "", type: "default", rowSpan: 1 },
      { title: "준비", note: "", type: "default", rowSpan: 1 },
      { title: "Outing", note: "제주 탐방", type: "outing", rowSpan: 2 },
      { title: "집으로", note: "", type: "outing", rowSpan: 2 },
    ],
    // 14:30-17:30
    [
      { title: "말씀 1: 이재훈", note: "오리엔테이션 및 소개", type: "word", rowSpan: 1 },
      { title: "세션 2", note: "발제: 홍현철", type: "session", rowSpan: 1 },
      "RSPAN",
      "RSPAN",
    ],
    // 18:00-19:00
    [
      { title: "저녁 식사", note: "", type: "meal", colSpan: 3 },
      "CSPAN", "CSPAN",
      { title: "집으로", note: "", type: "outing", rowSpan: 1 },
    ],
    // 19:30-21:00
    [
      { title: "말씀 2: 이재훈", note: "", type: "word", rowSpan: 1 },
      { title: "말씀 3: 정갑신", note: "", type: "word", rowSpan: 1 },
      { title: "말씀 4: 정갑신", note: "", type: "word", rowSpan: 1 },
      null,
    ],
  ];

  const typeStyles = {
    word:    { bg: "rgba(37,99,235,0.07)",  border: "rgba(37,99,235,0.18)",  color: "#1d4ed8" },
    session: { bg: "rgba(8,145,178,0.07)",  border: "rgba(8,145,178,0.18)",  color: "#0369a1" },
    meal:    { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      color: "#64748b" },
    outing:  { bg: "rgba(5,150,105,0.07)",  border: "rgba(5,150,105,0.18)",  color: "#047857" },
    default: { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.07)",      color: "#475569" },
  };

  const glass = {
    background: "rgba(255,255,255,0.58)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.85)",
    borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(80,150,120,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      position: "relative",
      overflowX: "hidden",
      color: "#1e293b"
    }}>
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "72px 20px 48px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.60)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: "100px",
            padding: "8px 28px",
            fontSize: "13px", color: "#0891b2",
            letterSpacing: "1.5px", marginBottom: "28px", fontWeight: "600",
            boxShadow: "0 2px 12px rgba(80,150,120,0.1)"
          }}>
            GMF Missiological Consultation 2026
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 5vw, 54px)", fontWeight: "800",
            color: "#0f172a", margin: "0 0 20px",
            lineHeight: "1.2", letterSpacing: "-1.5px",
          }}>
            선교학적 자문모임에<br />초대합니다
          </h1>

          <p style={{ fontSize: "17px", color: "#0891b2", fontStyle: "italic", margin: "0 0 8px", lineHeight: "1.8" }}>
            "우리가 스스로 우리의 행위들을 조사하고 여호와께로 돌아가자"
          </p>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 40px" }}>— 예레미야애가 3:40</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {[
              { icon: "📅", text: "2026.10.5(월) — 8(목)" },
              { icon: "📍", text: "제주" },
              { icon: "👥", text: "GMF 선교사 약 50명" },
            ].map((pill, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.60)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.85)",
                borderRadius: "100px", padding: "10px 24px",
                fontSize: "14px", color: "#334155", fontWeight: "500",
                boxShadow: "0 2px 10px rgba(80,150,120,0.07)"
              }}>
                {pill.icon} {pill.text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 20px 80px" }}>

          {/* Invitation */}
          <div style={{ ...glass, padding: "40px", marginBottom: "20px" }}>
            <p style={{ fontSize: "16px", lineHeight: "2", color: "#334155", margin: "0 0 20px" }}>
              성찰이 없는 선교는 위험하다는 경고는 이미 오래 전부터 제기되어 왔습니다. 세계선교의 지형이 변하고 한국교회의 선교가 앞으로 어떠해야 하는지 그리고 우리 GMF 공동체는 그 가운데 어떤 방향을 가져야 하는지를 성찰하는 일은 더 이상 미룰 수 없는 문제입니다.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "2", color: "#334155", margin: "0 0 28px" }}>
              이에 선교적 성찰을 함께 하기위해 선교학적 자문모임을 갖고자 합니다. 이 모임은 외부의 자문이 아니라 공동체가 함께 스스로 질문하면서 성찰하는 자리입니다. 각 파송기관 대표님들과의 협의를 통해 선교사님을 이 모임에 초대하게 되었으니, 시간을 내어 함께해 주시기를 부탁드립니다.
            </p>
            <div style={{ textAlign: "right", fontSize: "15px", fontWeight: "700", color: "#0891b2" }}>
              — GMF 대표 권성찬 드림
            </div>
          </div>

          {/* Speakers */}
          <div style={{ ...glass, padding: "36px 40px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>🎤 강사 소개</h3>
            <div style={{ display: "grid", gap: "10px" }}>
              {[
                { role: "말씀", name: "이재훈 목사",  org: "GMF 이사장" },
                { role: "말씀", name: "정갑신 목사",  org: "GMF 이사"   },
                { role: "발제", name: "정민영 선교사", org: "GMF 이사"   },
                { role: "발제", name: "홍현철 선교사", org: "kriM 원장"  },
                { role: "발제", name: "권성찬 선교사", org: "GMF 대표"   },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.65)",
                  borderRadius: "12px", padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: "14px",
                  border: "1px solid rgba(255,255,255,0.9)"
                }}>
                  <div style={{
                    background: s.role === "말씀" ? "rgba(37,99,235,0.09)" : "rgba(8,145,178,0.09)",
                    color:      s.role === "말씀" ? "#1d4ed8" : "#0369a1",
                    fontSize: "12px", fontWeight: "700",
                    padding: "4px 12px", borderRadius: "100px",
                    border: s.role === "말씀" ? "1px solid rgba(37,99,235,0.18)" : "1px solid rgba(8,145,178,0.18)"
                  }}>{s.role}</div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "15px", color: "#0f172a" }}>{s.name}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{s.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected results */}
          <div style={{ ...glass, padding: "36px 40px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>✨ 기대하는 결과</h3>
            {[
              "GMF가 지속적인 선교적 성찰 공동체가 된다.",
              "말씀을 통해 새로운 영적 각성을 경험한다.",
              "GMF에 속한 선교사들이 한 몸 공동체임을 이해한다.",
              "발제와 각 조의 상호자문을 통해 '선교가 무엇인지?'에 대한 공동체적 이해를 갖는다.",
              "발제와 각 조의 상호자문을 통해 선교의 변화에 대한 합의된 이해를 갖는다.",
              "발제와 각 조의 상호자문을 통해 GMF 선교 공동체의 합의된 방향을 공유한다.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "flex-start" }}>
                <div style={{
                  minWidth: "28px", height: "28px",
                  background: "linear-gradient(135deg, #0891b2, #059669)",
                  borderRadius: "50%", color: "#fff",
                  fontSize: "12px", fontWeight: "800",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "1px", flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(8,145,178,0.25)"
                }}>{i + 1}</div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.8", color: "#334155" }}>{item}</p>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div style={{ ...glass, padding: "36px 40px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>📅 행사 일정</h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>2026년 10월 5일(월) — 8일(목) · 제주</p>

            {/* Legend */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
              {[
                { label: "말씀",        color: "#2563eb" },
                { label: "세션/발제",   color: "#0891b2" },
                { label: "식사",        color: "#94a3b8" },
                { label: "Outing/귀가", color: "#059669" },
              ].map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>

            {/* 5-column table: 시간 + 4일 */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "6px" }}>
                <thead>
                  <tr>
                    {/* 시간 헤더 */}
                    <th style={{
                      background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: "10px", padding: "10px 12px", fontSize: "12px",
                      fontWeight: "700", color: "#64748b", textAlign: "center", width: "100px"
                    }}>시간</th>
                    {/* 날짜 헤더 */}
                    {days.map((d, i) => (
                      <th key={i} style={{
                        background: "rgba(255,255,255,0.65)",
                        border: `1px solid ${d.borderColor}`,
                        borderTop: `3px solid ${d.color}`,
                        borderRadius: "10px", padding: "10px 12px",
                        fontSize: "13px", fontWeight: "800", color: d.color, textAlign: "center"
                      }}>{d.day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, ti) => (
                    <tr key={ti}>
                      {/* 시간 셀 */}
                      <td style={{
                        background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.7)",
                        borderRadius: "8px", padding: "8px 10px",
                        fontSize: "10px", color: "#64748b", textAlign: "center",
                        whiteSpace: "nowrap", verticalAlign: "middle", fontWeight: "600"
                      }}>{time}</td>
                      {/* 각 날짜 셀 — RSPAN/CSPAN 은 건너뜀 */}
                      {grid[ti].map((cell, di) => {
                        if (cell === "RSPAN" || cell === "CSPAN") return null;
                        const s = cell ? typeStyles[cell.type] : null;
                        const colSpan = cell?.colSpan || 1;
                        const rowSpan = cell?.rowSpan || 1;
                        return (
                          <td key={di} colSpan={colSpan} rowSpan={rowSpan} style={{
                            background: s ? s.bg : "rgba(255,255,255,0.15)",
                            border: s ? `1px solid ${s.border}` : "1px solid rgba(255,255,255,0.25)",
                            borderRadius: "8px", padding: s ? "12px 10px" : "8px",
                            verticalAlign: "middle", textAlign: "center"
                          }}>
                            {cell && (
                              <>
                                <div style={{ fontSize: "12px", fontWeight: "700", color: s.color, lineHeight: "1.5" }}>{cell.title}</div>
                                {cell.note && <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "3px" }}>{cell.note}</div>}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <div style={{ ...glass, padding: "40px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>참석 신청</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "28px" }}>아래 정보를 입력해주세요</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await Registration.create(formData);
                  setSubmitted(true);
                } catch (err) {
                  alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
                }
              }}>
                {[
                  { key: "name",              label: "이름",           placeholder: "성함을 입력해주세요" },
                  { key: "organization",      label: "소속",           placeholder: "소속 기관을 입력해주세요" },
                  { key: "ministry_location", label: "사역지",         placeholder: "사역지를 입력해주세요" },
                  { key: "id_number",         label: "주민번호 앞 6자리", placeholder: "예: 800101" },
                  { key: "kakao_id",          label: "카톡 아이디",    placeholder: "카카오톡 ID를 입력해주세요" },
                  { key: "email",             label: "이메일",         placeholder: "이메일 주소를 입력해주세요" },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused("")}
                      required
                      style={{
                        width: "100%",
                        background: focused === field.key ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
                        border: focused === field.key ? "1.5px solid rgba(8,145,178,0.4)" : "1.5px solid rgba(255,255,255,0.9)",
                        borderRadius: "12px", padding: "12px 16px",
                        fontSize: "15px", color: "#0f172a", outline: "none",
                        boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit"
                      }}
                    />
                  </div>
                ))}
                <div style={{
                  background: "rgba(8,145,178,0.06)", border: "1px solid rgba(8,145,178,0.15)",
                  borderRadius: "12px", padding: "14px 18px", marginBottom: "24px",
                  fontSize: "13px", color: "#0891b2", lineHeight: "1.7"
                }}>
                  ※ 제주 왕복 여행 경비는 본인 부담입니다.<br />
                  ※ 숙소 및 식사 경비는 GMF에서 부담합니다.
                </div>
                <button type="submit" style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #0891b2, #059669)",
                  border: "none", borderRadius: "14px", padding: "16px",
                  color: "#fff", fontSize: "17px", fontWeight: "700", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(8,145,178,0.28)",
                  letterSpacing: "-0.3px", fontFamily: "inherit"
                }}>
                  참석 신청하기
                </button>
              </form>
            </div>
          ) : (
            <div style={{ ...glass, padding: "70px 40px", textAlign: "center" }}>
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>🙏</div>
              <h3 style={{ color: "#0f172a", fontSize: "24px", marginBottom: "12px", fontWeight: "800" }}>신청이 완료되었습니다</h3>
              <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.9" }}>
                참석 신청해 주셔서 감사합니다.<br />추후 안내 말씀 드리겠습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
