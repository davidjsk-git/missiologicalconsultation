import { useState, useEffect, useRef } from "react";
import { Registration } from "@/api/entities";

// ── Aurora + Grid Background ─────────────────────────────────────────────────
function AnimatedBackground() {
  const svgRef = useRef(null);
  const frameRef = useRef(null);
  const CELL_W = 300;
  const CELL_H = 180;
  const DOT_R  = 5;
  const hBeams = [
    { row: 2,  duration: 7000,  delay: 0    },
    { row: 5,  duration: 9500,  delay: 1800 },
    { row: 8,  duration: 6500,  delay: 3200 },
    { row: 11, duration: 11000, delay: 600  },
  ];
  const vBeams = [
    { col: 2,  duration: 8000,  delay: 500  },
    { col: 5,  duration: 10000, delay: 2000 },
    { col: 8,  duration: 7500,  delay: 1200 },
    { col: 11, duration: 9000,  delay: 3500 },
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
      svg.querySelectorAll(".hbeam").forEach((rect, i) => {
        const b = hBeams[i];
        const pos = Math.max(0, (elapsed - b.delay) % b.duration) / b.duration;
        const beamW = 200;
        rect.setAttribute("x", pos * (W + beamW * 2) - beamW * 1.5);
        rect.setAttribute("y", b.row * CELL_H - 2);
        rect.setAttribute("width", beamW);
        rect.setAttribute("height", 4);
      });
      svg.querySelectorAll(".vbeam").forEach((rect, i) => {
        const b = vBeams[i];
        const pos = Math.max(0, (elapsed - b.delay) % b.duration) / b.duration;
        const beamH = 160;
        rect.setAttribute("x", b.col * CELL_W - 2);
        rect.setAttribute("y", pos * (H + beamH * 2) - beamH * 1.5);
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
  const dots = [];
  for (let c = 0; c <= cols; c++)
    for (let r = 0; r <= rows; r++)
      dots.push({ x: c * CELL_W, y: r * CELL_H, key: c * 1000 + r });
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "#f0f4f0" }} />
      <div style={{ position: "absolute", inset: "-20%", animation: "aurora1 12s ease-in-out infinite alternate",
        background: `radial-gradient(ellipse 60% 50% at 20% 40%, rgba(160,220,180,0.55) 0%, transparent 70%),
          radial-gradient(ellipse 50% 45% at 75% 20%, rgba(140,195,235,0.50) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 55% 75%, rgba(170,225,195,0.45) 0%, transparent 65%)` }} />
      <div style={{ position: "absolute", inset: "-20%", animation: "aurora2 16s ease-in-out infinite alternate",
        background: `radial-gradient(ellipse 55% 45% at 80% 60%, rgba(185,165,235,0.45) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 30% 75%, rgba(130,190,230,0.40) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 60% 20%, rgba(155,215,185,0.40) 0%, transparent 65%)` }} />
      <svg ref={svgRef} style={{ position: "absolute", inset: 0 }} width={W} height={H}>
        <defs>
          {hBeams.map((_, i) => (
            <linearGradient key={`hg${i}`} id={`hg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          ))}
          {vBeams.map((_, i) => (
            <linearGradient key={`vg${i}`} id={`vg${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          ))}
        </defs>
        {Array.from({ length: cols + 1 }).map((_, c) => (
          <line key={`v${c}`} x1={c * CELL_W} y1={0} x2={c * CELL_W} y2="100%" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        ))}
        {Array.from({ length: rows + 1 }).map((_, r) => (
          <line key={`h${r}`} x1={0} y1={r * CELL_H} x2="100%" y2={r * CELL_H} stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        ))}
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={DOT_R} fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
        ))}
        {hBeams.map((b, i) => <rect key={`hb${i}`} className="hbeam" x={0} y={0} width={200} height={4} fill={`url(#hg${i})`} rx={2} />)}
        {vBeams.map((b, i) => <rect key={`vb${i}`} className="vbeam" x={0} y={0} width={4} height={160} fill={`url(#vg${i})`} rx={2} />)}
      </svg>
      <style>{`
        @keyframes aurora1 { 0% { transform: translate(0%,0%) scale(1); } 100% { transform: translate(6%,-5%) scale(1.08); } }
        @keyframes aurora2 { 0% { transform: translate(0%,0%) scale(1.05); } 100% { transform: translate(-7%,5%) scale(1); } }
      `}</style>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function MissiologicalConsultation() {
  const [formData, setFormData] = useState({
    name: "", gender: "", organization: "", ministry_location: "", id_number: "", kakao_id: "", email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const timeSlots = ["08:00-09:00","09:00-09:30","09:30-12:30","12:30-14:00","14:00-14:30","14:30-17:30","18:00-19:00","19:30-21:00"];
  const days = [
    { day: "10/05(월)", color: "#2563eb", borderColor: "rgba(37,99,235,0.25)" },
    { day: "10/06(화)", color: "#0891b2", borderColor: "rgba(8,145,178,0.25)" },
    { day: "10/07(수)", color: "#059669", borderColor: "rgba(5,150,105,0.25)" },
    { day: "10/08(목)", color: "#16a34a", borderColor: "rgba(22,163,74,0.25)" },
  ];
  const grid = [
    [{ title:"도착", note:"점심식사 전까지", type:"default", rowSpan:3 }, { title:"아침식사", note:"", type:"meal" }, { title:"아침식사", note:"", type:"meal" }, { title:"아침식사", note:"", type:"meal" }],
    ["RSPAN", { title:"준비", note:"", type:"default" }, { title:"준비", note:"", type:"default" }, { title:"준비", note:"", type:"default" }],
    ["RSPAN", { title:"세션 1", note:"발제: 정민영", type:"session" }, { title:"세션 3", note:"발제: 권성찬", type:"session" }, { title:"정리 및 발표", note:"선교적 성찬: 정민영", type:"session" }],
    [{ title:"점심식사", note:"", type:"meal", colSpan:4 }, "CSPAN","CSPAN","CSPAN"],
    [{ title:"등록", note:"", type:"default" }, { title:"준비", note:"", type:"default" }, { title:"Outing", note:"제주 탐방", type:"outing", rowSpan:2 }, { title:"집으로", note:"", type:"outing", rowSpan:2 }],
    [{ title:"말씀 1: 이재훈", note:"오리엔테이션 및 소개", type:"word" }, { title:"세션 2", note:"발제: 홍현철", type:"session" }, "RSPAN","RSPAN"],
    [{ title:"저녁 식사", note:"", type:"meal", colSpan:3 }, "CSPAN","CSPAN", { title:"집으로", note:"", type:"outing" }],
    [{ title:"말씀 2: 이재훈", note:"", type:"word" }, { title:"말씀 3: 정갑신", note:"", type:"word" }, { title:"말씀 4: 정갑신", note:"", type:"word" }, null],
  ];
  const typeStyles = {
    word:    { bg:"rgba(37,99,235,0.07)",  border:"rgba(37,99,235,0.18)",  color:"#1d4ed8" },
    session: { bg:"rgba(8,145,178,0.07)",  border:"rgba(8,145,178,0.18)",  color:"#0369a1" },
    meal:    { bg:"rgba(0,0,0,0.03)",      border:"rgba(0,0,0,0.08)",      color:"#64748b" },
    outing:  { bg:"rgba(5,150,105,0.07)",  border:"rgba(5,150,105,0.18)",  color:"#047857" },
    default: { bg:"rgba(0,0,0,0.03)",      border:"rgba(0,0,0,0.07)",      color:"#475569" },
  };
  const glass = {
    background: "rgba(255,255,255,0.58)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.85)", borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(80,150,120,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
  };
  const inputStyle = (key) => ({
    width: "100%", display: "block",
    background: focused === key ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
      border: focused === key ? "1.5px solid rgba(8,145,178,0.4)" : "1.5px solid rgba(255,255,255,0.9)",
    borderRadius: "12px", padding: "14px 16px",
    fontSize: "17px", color: "#0f172a", outline: "none",
    transition: "all 0.2s", fontFamily: "inherit",
  });

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'Apple SD Gothic Neo','Malgun Gothic',sans-serif", position:"relative", overflowX:"hidden", color:"#1e293b" }}>
      <AnimatedBackground />
      <style>{`
        * { box-sizing: border-box; }
        .schedule-table { min-width: 560px; }
        .schedule-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

        /* 일정표 셀 텍스트 */
        .cell-title { font-size: 15px; font-weight: 700; line-height: 1.5; }
        .cell-note  { font-size: 14px; font-weight: 600; margin-top: 4px; color: #555; }
        .time-cell  { font-size: 14px; font-weight: 600; }
        .day-header { font-size: 16px; font-weight: 800; }
        .time-header { font-size: 14px; font-weight: 700; }

        /* 모바일 */
        @media (max-width: 600px) {
          .hero-title { font-size: 32px !important; }
          .hero-sub   { font-size: 17px !important; }
          .hero-verse { font-size: 15px !important; }
          .section-pad { padding: 28px 22px !important; }
          .content-wrap { padding: 0 14px 60px !important; }
          .pill { padding: 10px 18px !important; font-size: 15px !important; }
          .body-text { font-size: 17px !important; line-height: 2.0 !important; }
          .section-title { font-size: 22px !important; }
          .speaker-name { font-size: 18px !important; }
          .speaker-org  { font-size: 15px !important; }
          .speaker-role { font-size: 14px !important; }
          .outcome-text { font-size: 17px !important; }
          .form-label   { font-size: 16px !important; }
          .form-note    { font-size: 15px !important; }
          .submit-btn   { font-size: 18px !important; padding: 20px !important; }
          .done-title   { font-size: 26px !important; }
          .done-text    { font-size: 17px !important; }

          /* 일정표 모바일 */
          .cell-title  { font-size: 15px !important; }
          .cell-note   { font-size: 14px !important; }
          .time-cell   { font-size: 13px !important; }
          .day-header  { font-size: 15px !important; }
          .time-header { font-size: 13px !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"80px 20px 48px" }}>
        <div style={{ marginBottom:"20px" }}>
          <span style={{
            display:"inline-block",
            background:"rgba(8,145,178,0.10)", border:"1px solid rgba(8,145,178,0.30)",
            borderRadius:"100px", padding:"7px 22px",
            fontSize:"20px", letterSpacing:"0.5px",
            color:"#0891b2", fontWeight:"700",
            backdropFilter:"blur(8px)",
          }}>
            초대합니다
          </span>
        </div>
        <h1 className="hero-title" style={{
          fontSize:"60px", fontWeight:"900", lineHeight:"1.25",
          color:"#4c77fa", margin:"0 0 24px", letterSpacing:"-1.5px",
        }}>
          Missiological Consultation<br />
          <span style={{ fontSize: "46px", color: "#64748b", fontWeight: 400 }}>GMF 선교학적 자문모임</span>
        </h1>
        <p className="hero-sub" style={{ fontSize:"19px", color:"#0891b2", fontStyle:"italic", margin:"0 0 8px", lineHeight:"1.8" }}>
          "우리가 스스로 우리의 행위들을 조사하고 여호와께로 돌아가자"
        </p>
        <p className="hero-verse" style={{ fontSize:"15px", color:"#64748b", margin:"0 0 40px" }}>— 예레미야애가 3:40</p>
        <div style={{ display:"flex", justifyContent:"center", gap:"12px", flexWrap:"wrap" }}>
          {[
            { icon:"📅", text:"2026.10.5(월) — 8(목)" },
            { icon:"📍", text:"제주" },
            { icon:"👥", text:"GMF 선교사 약 50명" },
          ].map((pill, i) => (
            <div key={i} className="pill" style={{
              background:"rgba(255,255,255,0.60)", backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.85)", borderRadius:"100px",
              padding:"11px 26px", fontSize:"15px", color:"#334155", fontWeight:"500",
              boxShadow:"0 2px 10px rgba(80,150,120,0.07)"
            }}>
              {pill.icon} {pill.text}
            </div>
          ))}
        </div>
      </div>

      <div className="content-wrap" style={{ maxWidth:"820px", margin:"0 auto", padding:"0 20px 80px", position:"relative", zIndex:1 }}>

        {/* Invitation */}
        <div className="section-pad" style={{ ...glass, padding:"40px", marginBottom:"20px" }}>
          <p className="body-text" style={{ fontSize:"18px", lineHeight:"2.1", color:"#334155", margin:"0 0 20px" }}>
            성찰이 없는 선교는 위험하다는 경고는 이미 오래 전부터 제기되어 왔습니다. 세계선교의 지형이 변하고 한국교회의 선교가 앞으로 어떠해야 하는지 그리고 우리 GMF 공동체는 그 가운데 어떤 방향을 가져야 하는지를 성찰하는 일은 더 이상 미룰 수 없는 문제입니다.
          </p>
          <p className="body-text" style={{ fontSize:"18px", lineHeight:"2.1", color:"#334155", margin:"0 0 28px" }}>
            이에 선교적 성찰을 함께 하기위해 선교학적 자문모임을 갖고자 합니다. 이 모임은 외부의 자문이 아니라 공동체가 함께 스스로 질문하면서 성찰하는 자리입니다. 각 파송기관 대표님들과의 협의를 통해 선교사님을 이 모임에 초대하게 되었으니, 시간을 내어 함께해 주시기를 부탁드립니다.
          </p>
          <div style={{ textAlign:"right", fontSize:"17px", fontWeight:"700", color:"#0891b2" }}>
            — GMF 대표 권성찬 드림
          </div>
        </div>

        {/* Speakers */}
        <div className="section-pad" style={{ ...glass, padding:"36px 40px", marginBottom:"20px" }}>
          <h3 className="section-title" style={{ fontSize:"22px", fontWeight:"700", color:"#0f172a", marginBottom:"20px" }}>🎤 강사 소개</h3>
          <div style={{ display:"grid", gap:"10px" }}>
            {/* 말씀 강사 */}
            {[{ role:"말씀", name:"이재훈 목사",  org:"GMF 이사장" },
              { role:"말씀", name:"정갑신 목사",  org:"GMF 이사" }].map((s, i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.65)", borderRadius:"12px", padding:"16px 20px",
                display:"flex", alignItems:"center", gap:"14px",
                border:"1px solid rgba(255,255,255,0.9)"
              }}>
                <div style={{
                  background: "rgba(37,99,235,0.09)",
                  color: "#1d4ed8",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(37,99,235,0.18)",
                  flexShrink: 0,
                }} className="speaker-role">{s.role}</div>
                <div>
                  <div className="speaker-name" style={{ fontWeight:"700", fontSize:"18px", color:"#0f172a" }}>{s.name}</div>
                  <div className="speaker-org" style={{ fontSize:"14px", color:"#94a3b8", marginTop:"2px" }}>{s.org}</div>
                </div>
              </div>
            ))}

            {/* 발제 강사: 데스크탑에서는 가로, 모바일에서는 세로 */}
            <div className="presentation-row" style={{ display:"flex", flexWrap:"wrap", gap:"14px", marginTop:"10px" }}>
              {[
                { role:"발제", name:"정민영 선교사", org:"GMF 이사", subject:"하나님의 나라, 하나님의 선교" },
                { role:"발제", name:"홍현철 선교사", org:"kriM 원장", subject:"한국 선교와 세계 선교의 흐름" },
                { role:"발제", name:"권성찬 선교사", org:"GMF 대표", subject:"글로벌 교회 시대의 선교 방향" },
              ].map((s, i) => {
                // 홍현철 선교사(두 번째)만 아래로 강제 배치
                const isSecond = i === 1;
                return (
                  <div key={i} style={{
                    background:"rgba(255,255,255,0.65)", borderRadius:"12px", padding:"16px 20px",
                    display:"flex", alignItems:"center", gap:"14px",
                    border:"1px solid rgba(255,255,255,0.9)",
                    minWidth: 0, flex: 1, flexBasis: isSecond ? "100%" : "260px", maxWidth: "100%"
                  }}>
                    <div style={{
                      background: "rgba(8,145,178,0.09)",
                      color: "#0369a1",
                      fontSize: "14px",
                      fontWeight: "700",
                      padding: "5px 14px",
                      borderRadius: "100px",
                      border: "1px solid rgba(8,145,178,0.18)",
                      flexShrink: 0,
                    }} className="speaker-role">{s.role}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="speaker-name" style={{ fontWeight:"700", fontSize:"18px", color:"#0f172a" }}>{s.name}</div>
                      <div className="speaker-org" style={{ fontSize:"14px", color:"#94a3b8", marginTop:"2px" }}>{s.org}</div>
                    </div>
                    <div className="speaker-subject" style={{ fontSize:"18px", color:"#0891b2", fontWeight:600, marginLeft:"10px", whiteSpace:"nowrap", flexShrink:0 }}>
                      {s.subject}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 반응형 스타일 */}
          <style>{`
            @media (max-width: 700px) {
              .presentation-row {
                flex-direction: column !important;
              }
              .presentation-row > div {
                width: 100% !important;
                min-width: 0 !important;
                margin-right: 0 !important;
                margin-bottom: 10px !important;
              }
              .speaker-subject {
                margin-left: 0 !important;
                margin-top: 8px !important;
                white-space: normal !important;
              }
            }
          `}</style>
        </div>

        {/* Expected Results */}
        <div className="section-pad" style={{ ...glass, padding:"36px 40px", marginBottom:"20px" }}>
          <h3 className="section-title" style={{ fontSize:"22px", fontWeight:"700", color:"#0f172a", marginBottom:"20px" }}>✨ 기대하는 결과</h3>
          {[
            "GMF가 지속적인 선교적 성찰 공동체가 된다.",
            "말씀을 통해 새로운 영적 각성을 경험한다.",
            "GMF에 속한 선교사들이 한 몸 공동체임을 이해한다.",
            "발제와 각 조의 상호자문을 통해 '선교가 무엇인지?'에 대한 공동체적 이해를 갖는다.",
            "발제와 각 조의 상호자문을 통해 선교의 변화에 대한 합의된 이해를 갖는다.",
            "발제와 각 조의 상호자문을 통해 GMF 선교 공동체의 합의된 방향을 공유한다.",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:"14px", marginBottom:"16px", alignItems:"flex-start" }}>
              <div style={{
                minWidth:"30px", height:"30px",
                background:"linear-gradient(135deg, #0891b2, #059669)",
                borderRadius:"50%", color:"#fff", fontSize:"13px", fontWeight:"800",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginTop:"2px", flexShrink:0, boxShadow:"0 2px 8px rgba(8,145,178,0.25)"
              }}>{i + 1}</div>
              <p className="outcome-text" style={{ margin:0, fontSize:"17px", lineHeight:"1.9", color:"#334155" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="section-pad" style={{ ...glass, padding:"36px 40px", marginBottom:"20px" }}>
          <h3 className="section-title" style={{ fontSize:"22px", fontWeight:"700", color:"#0f172a", marginBottom:"4px" }}>📅 행사 일정</h3>
          <p style={{ fontSize:"15px", color:"#94a3b8", marginBottom:"20px" }}>2026년 10월 5일(월) — 8일(목) · 제주</p>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", marginBottom:"16px" }}>
            {[
              { label:"말씀",        color:"#2563eb" },
              { label:"세션/발제",   color:"#0891b2" },
              { label:"식사",        color:"#94a3b8" },
              { label:"Outing/귀가", color:"#059669" },
            ].map((l, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"14px", color:"#64748b" }}>
                <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:l.color }} />
                {l.label}
              </div>
            ))}
          </div>
          <p style={{ fontSize:"12px", color:"#94a3b8", marginBottom:"12px" }}>← 좌우로 스크롤하여 전체 일정을 확인하세요</p>
          <div className="schedule-wrap">
            <table className="schedule-table" style={{ width:"100%", borderCollapse:"separate", borderSpacing:"5px" }}>
              <thead>
                <tr>
                  <th style={{
                    background:"rgba(255,255,255,0.5)", border:"1px solid rgba(255,255,255,0.85)",
                    borderRadius:"10px", padding:"10px 8px", fontSize:"15px",
                    fontWeight:"700", color:"#555", textAlign:"center", width:"90px", whiteSpace:"nowrap"
                  }}>시간</th>
                  {days.map((d, i) => (
                    <th key={i} style={{
                      background:"rgba(255,255,255,0.65)",
                      border:`1px solid ${d.borderColor}`, borderTop:`3px solid ${d.color}`,
                      borderRadius:"10px", padding:"10px 8px",
                      fontSize:"17px", fontWeight:"800", color:d.color, textAlign:"center", whiteSpace:"nowrap"
                    }}>{d.day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, ti) => (
                  <tr key={ti}>
                    <td style={{
                      background:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.7)",
                      borderRadius:"8px", padding:"10px 6px",
                      fontSize:"14px", color:"#555", textAlign:"center",
                      whiteSpace:"nowrap", verticalAlign:"middle", fontWeight:"700"
                    }}>{time}</td>
                    {grid[ti].map((cell, di) => {
                      if (cell === "RSPAN" || cell === "CSPAN") return null;
                      const s = cell ? typeStyles[cell.type] : null;
                      return (
                        <td key={di} colSpan={cell?.colSpan||1} rowSpan={cell?.rowSpan||1} style={{
                          background: s ? s.bg : "rgba(255,255,255,0.15)",
                          border: s ? `1px solid ${s.border}` : "1px solid rgba(255,255,255,0.25)",
                          borderRadius:"8px", padding: s ? "10px 8px" : "8px",
                          verticalAlign:"middle", textAlign:"center"
                        }}>
                          {cell && <>
                            <div className="cell-title" style={{ fontSize:"14px", fontWeight:"700", color:s.color, lineHeight:"1.5" }}>{cell.title}</div>
                            {cell.note && <div className="cell-note" style={{ fontSize:"13px", color:"#64748b", marginTop:"4px", fontWeight:"600" }}>{cell.note}</div>}
                          </>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registration Form */}
        {!submitted ? (
          <div className="section-pad" style={{ ...glass, padding:"40px" }}>
            <h3 style={{ fontSize:"26px", fontWeight:"800", color:"#0f172a", marginBottom:"6px" }}>참석 신청</h3>
            <p style={{ fontSize:"16px", color:"#94a3b8", marginBottom:"28px" }}>아래 정보를 입력해주세요</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch("https://skavatar-e083fafa.base44.app/functions/submitRegistration", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "오류 발생");
                setSubmitted(true);
              } catch (err) {
                console.error(err);
                alert("신청 중 오류가 발생했습니다: " + err.message);
              }
            }}>

              {/* 텍스트 필드들 */}
              {[
                { key:"name",              label:"이름",             placeholder:"성함을 입력해주세요" },
                { key:"ministry_location", label:"사역지",           placeholder:"사역지를 입력해주세요" },
                { key:"id_number",         label:"주민번호 앞 6자리", placeholder:"예: 800101" },
                { key:"kakao_id",          label:"카톡 아이디",      placeholder:"카카오톡 ID를 입력해주세요" },
                { key:"email",             label:"이메일",           placeholder:"이메일 주소를 입력해주세요" },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom:"20px" }}>
                  <label style={{ display:"block", fontSize:"16px", fontWeight:"600", color:"#475569", marginBottom:"8px" }}>
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
                    style={inputStyle(field.key)}
                  />
                </div>
              ))}

              {/* 성별 드롭다운 */}
              <div style={{ marginBottom:"20px" }}>
                <label style={{ display:"block", fontSize:"16px", fontWeight:"600", color:"#475569", marginBottom:"8px" }}>성별</label>
                <div style={{ position:"relative" }}>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    onFocus={() => setFocused("gender")}
                    onBlur={() => setFocused("")}
                    required
                    style={{ ...inputStyle("gender"), appearance:"none", WebkitAppearance:"none", cursor:"pointer", paddingRight:"40px", color: formData.gender ? "#0f172a" : "#94a3b8" }}
                  >
                    <option value="" disabled>성별을 선택해주세요</option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                  <div style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#94a3b8", fontSize:"12px" }}>▼</div>
                </div>
              </div>

              {/* 소속 드롭다운 */}
              <div style={{ marginBottom:"20px" }}>
                <label style={{ display:"block", fontSize:"16px", fontWeight:"600", color:"#475569", marginBottom:"8px" }}>소속</label>
                <div style={{ position:"relative" }}>
                  <select
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    onFocus={() => setFocused("organization")}
                    onBlur={() => setFocused("")}
                    required
                    style={{ ...inputStyle("organization"), appearance:"none", WebkitAppearance:"none", cursor:"pointer", paddingRight:"40px", color: formData.organization ? "#0f172a" : "#94a3b8" }}
                  >
                    <option value="" disabled>소속을 선택해주세요</option>
                    <option value="GBT">GBT</option>
                    <option value="GMP">GMP</option>
                    <option value="HOPE">HOPE</option>
                    <option value="FMnC">FMnC</option>
                    <option value="강사 및 준비위원">강사 및 준비위원</option>
                    <option value="산하기관 대표/원장">산하기관 대표/원장</option>
                  </select>
                  <div style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#94a3b8", fontSize:"12px" }}>▼</div>
                </div>
              </div>

              {/* 안내 */}
              <div style={{
                background:"rgba(8,145,178,0.06)", border:"1px solid rgba(8,145,178,0.15)",
                borderRadius:"12px", padding:"16px 20px", marginBottom:"28px",
                fontSize:"16px", color:"#0891b2", lineHeight:"1.8"
              }}>
                ※ 제주 왕복 여행 경비는 본인 부담입니다.<br />
                ※ 숙소 및 식사 경비는 GMF에서 부담합니다.
              </div>

              <button type="submit" style={{
                width:"100%", padding:"18px",
                background:"linear-gradient(135deg, #0891b2, #059669)",
                border:"none", borderRadius:"14px",
                color:"#fff", fontSize:"19px", fontWeight:"700",
                cursor:"pointer", fontFamily:"inherit",
                boxShadow:"0 4px 20px rgba(8,145,178,0.35)",
                transition:"opacity 0.2s",
              }}>
                참석 신청하기 →
              </button>
            </form>
          </div>
        ) : (
          <div className="section-pad" style={{ ...glass, padding:"60px 40px", textAlign:"center" }}>
            <div style={{ fontSize:"64px", marginBottom:"20px" }}>🎉</div>
            <h3 className="done-title" style={{ fontSize:"26px", fontWeight:"800", color:"#0f172a", marginBottom:"12px" }}>신청이 완료되었습니다!</h3>
            <p className="done-text" style={{ fontSize:"18px", color:"#64748b", lineHeight:"1.9" }}>
              참석 신청해 주셔서 감사합니다.<br />
              추후 일정 및 안내를 이메일로 보내드리겠습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
