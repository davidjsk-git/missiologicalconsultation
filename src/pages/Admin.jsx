import { useState, useEffect } from "react";

const API = "https://skavatar-e083fafa.base44.app/functions/getRegistrations";

export default function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, { method: "GET" });
      const json = await res.json();
      if (json.ok) setRegistrations(json.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("이 신청자를 삭제하시겠습니까?")) return;
    try {
      await fetch(API, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setRegistrations(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const filtered = registrations.filter(r =>
    [r.name, r.organization, r.ministry_location, r.email, r.gender].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const glass = {
    background: "rgba(255,255,255,0.58)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.85)",
    borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(80,150,120,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  };

  const orgGroups = registrations.reduce((acc, r) => {
    const org = r.organization || "미입력";
    acc[org] = (acc[org] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      background: "linear-gradient(135deg, #f0f4f0 0%, #e8f0ee 50%, #eef0f8 100%)",
      padding: "40px 20px",
      color: "#1e293b"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <h1 style={{ fontSize:"28px", fontWeight:"800", color:"#0f172a", margin:"0 0 6px", letterSpacing:"-1px" }}>
                📋 참석 신청자 관리
              </h1>
              <p style={{ fontSize:"14px", color:"#64748b", margin:0 }}>
                GMF Missiological Consultation 2026 · 제주
              </p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{
                background:"linear-gradient(135deg, #0891b2, #059669)",
                color:"#fff", borderRadius:"100px",
                padding:"8px 20px", fontSize:"14px", fontWeight:"700",
                boxShadow:"0 2px 12px rgba(8,145,178,0.25)"
              }}>
                총 {registrations.length}명 신청
              </div>
              <button onClick={load} style={{
                background:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.9)",
                borderRadius:"100px", padding:"8px 18px", fontSize:"13px",
                cursor:"pointer", color:"#475569", fontWeight:"600", fontFamily:"inherit"
              }}>
                🔄 새로고침
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        {registrations.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:"12px", marginBottom:"16px" }}>
            {[
              { label:"총 신청자", value:`${registrations.length}명`, color:"#0891b2" },
              { label:"오늘 신청", value:`${registrations.filter(r => new Date(r.created_date).toDateString() === new Date().toDateString()).length}명`, color:"#059669" },
              ...Object.entries(orgGroups).map(([org, cnt]) => ({ label: org, value: `${cnt}명`, color:"#7c3aed" })),
            ].map((stat, i) => (
              <div key={i} style={{ ...glass, padding:"18px 20px", textAlign:"center" }}>
                <div style={{ fontSize:"22px", fontWeight:"800", color:stat.color, marginBottom:"4px" }}>{stat.value}</div>
                <div style={{ fontSize:"12px", color:"#94a3b8", fontWeight:"600" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div style={{ ...glass, padding:"14px 20px", marginBottom:"14px" }}>
          <input
            type="text"
            placeholder="🔍  이름, 소속, 성별, 사역지, 이메일로 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width:"100%", background:"transparent", border:"none",
              outline:"none", fontSize:"15px", color:"#0f172a",
              fontFamily:"inherit", boxSizing:"border-box"
            }}
          />
        </div>

        {/* Table */}
        <div style={{ ...glass, padding:"0", overflow:"hidden" }}>
          {loading ? (
            <div style={{ textAlign:"center", padding:"60px", color:"#94a3b8", fontSize:"15px" }}>불러오는 중...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px" }}>
              <div style={{ fontSize:"48px", marginBottom:"12px" }}>📭</div>
              <p style={{ color:"#94a3b8", fontSize:"15px" }}>
                {search ? "검색 결과가 없습니다." : "아직 신청자가 없습니다."}
              </p>
            </div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"rgba(255,255,255,0.5)", borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
                    {["#","이름","성별","소속","사역지","주민번호 앞자리","카톡 아이디","이메일","신청일시",""].map((h, i) => (
                      <th key={i} style={{
                        padding:"14px 16px", fontSize:"12px", fontWeight:"700",
                        color:"#64748b", textAlign:"left", whiteSpace:"nowrap"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, idx) => (
                    <tr key={r.id}
                      style={{
                        borderBottom:"1px solid rgba(0,0,0,0.04)",
                        background: idx % 2 === 0 ? "rgba(255,255,255,0.3)" : "transparent",
                        transition:"background 0.15s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(8,145,178,0.04)"}
                      onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "rgba(255,255,255,0.3)" : "transparent"}
                    >
                      <td style={{ padding:"14px 16px", fontSize:"12px", color:"#94a3b8", fontWeight:"600" }}>
                        {filtered.length - idx}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"14px", fontWeight:"700", color:"#0f172a", whiteSpace:"nowrap" }}>
                        {r.name}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#334155", whiteSpace:"nowrap" }}>
                        <span style={{
                          background: r.gender === "남" ? "rgba(37,99,235,0.08)" : "rgba(236,72,153,0.08)",
                          color: r.gender === "남" ? "#1d4ed8" : "#be185d",
                          border: r.gender === "남" ? "1px solid rgba(37,99,235,0.2)" : "1px solid rgba(236,72,153,0.2)",
                          borderRadius:"100px", padding:"3px 10px", fontSize:"12px", fontWeight:"700"
                        }}>{r.gender || "-"}</span>
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#334155", whiteSpace:"nowrap" }}>
                        {r.organization || "-"}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#334155", whiteSpace:"nowrap" }}>
                        {r.ministry_location || "-"}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#334155" }}>
                        {r.id_number || "-"}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#334155" }}>
                        {r.kakao_id || "-"}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"13px", color:"#0891b2" }}>
                        {r.email || "-"}
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:"11px", color:"#94a3b8", whiteSpace:"nowrap" }}>
                        {formatDate(r.created_date)}
                      </td>
                      <td style={{ padding:"14px 16px" }}>
                        <button
                          onClick={() => handleDelete(r.id)}
                          style={{
                            background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)",
                            borderRadius:"8px", padding:"5px 12px", fontSize:"12px",
                            color:"#ef4444", cursor:"pointer", fontFamily:"inherit", fontWeight:"600"
                          }}
                        >삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back link */}
        <div style={{ textAlign:"center", marginTop:"32px" }}>
          <a href="/MissiologicalConsultation" style={{
            fontSize:"14px", color:"#94a3b8", textDecoration:"none",
            borderBottom:"1px solid rgba(148,163,184,0.3)", paddingBottom:"2px"
          }}>← 초대 페이지로 돌아가기</a>
        </div>
      </div>
    </div>
  );
}
