import { useState } from "react";

export default function Style3() {
  const [formData, setFormData] = useState({
    name: "", organization: "", ministry_location: "", id_number: "", kakao_id: "", email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      color: "#1e293b"
    }}>
      {/* Top bar */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: "800", fontSize: "18px", color: "#0f4c81", letterSpacing: "-0.5px" }}>GMF</div>
        <div style={{ fontSize: "13px", color: "#64748b" }}>Missiological Consultation 2026</div>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0f4c81 0%, #1565c0 50%, #0288d1 100%)",
        padding: "80px 20px",
        textAlign: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 60%)"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <span style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: "13px", color: "#e0f2ff", letterSpacing: "1px" }}>참석 신청 진행중</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)", color: "#ffffff", fontWeight: "800", margin: "0 0 16px", lineHeight: "1.3", letterSpacing: "-1px" }}>
            GMF 선교학적 자문모임
          </h1>
          <p style={{ fontSize: "18px", color: "#bfdbfe", margin: "0 0 8px" }}>
            2026년 10월 5일(월) — 8일(목)
          </p>
          <p style={{ fontSize: "16px", color: "#93c5fd", margin: "0 0 40px" }}>📍 제주</p>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            padding: "20px 32px",
            maxWidth: "500px"
          }}>
            <p style={{ fontSize: "16px", color: "#e0f2ff", fontStyle: "italic", margin: 0, lineHeight: "1.8" }}>
              "우리가 스스로 우리의 행위들을 조사하고<br />여호와께로 돌아가자"
            </p>
            <p style={{ fontSize: "13px", color: "#7dd3fc", margin: "8px 0 0" }}>예레미야애가 3:40</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { label: "행사 기간", value: "4일" },
            { label: "예상 참석자", value: "50명" },
            { label: "강사진", value: "5명" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "24px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid #e2e8f0" : "none"
            }}>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f4c81" }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          {/* Left */}
          <div>
            <div style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid #f1f5f9"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f4c81", marginBottom: "16px" }}>📋 초대의 말씀</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.9", color: "#475569", margin: 0 }}>
                성찰이 없는 선교는 위험하다는 경고가 이미 오래 전에 있었습니다. 세계선교의 지형이 변하고 한국교회의 선교가 앞으로 어떠해야 하는지, GMF 공동체의 방향을 함께 성찰하는 자문모임입니다.
              </p>
            </div>

            <div style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid #f1f5f9"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f4c81", marginBottom: "16px" }}>🎤 강사</h3>
              {[
                { role: "말씀", name: "이재훈 목사", org: "GMF 이사장" },
                { role: "말씀", name: "정갑신 목사", org: "GMF 이사" },
                { role: "발제", name: "정민영 선교사", org: "GMF 이사" },
                { role: "발제", name: "홍현철 선교사", org: "kriM 원장" },
                { role: "발제", name: "권성찬 선교사", org: "GMF 대표" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none" }}>
                  <div>
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>{s.name}</span>
                    <span style={{ fontSize: "12px", color: "#94a3b8", marginLeft: "8px" }}>{s.org}</span>
                  </div>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    background: s.role === "말씀" ? "#eff6ff" : "#f0fdf4",
                    color: s.role === "말씀" ? "#1d4ed8" : "#15803d"
                  }}>{s.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {!submitted ? (
              <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid #f1f5f9"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>참석 신청</h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "24px" }}>아래 정보를 입력해주세요</p>
                <form onSubmit={handleSubmit}>
                  {[
                    { key: "name", label: "이름", placeholder: "성함" },
                    { key: "organization", label: "소속", placeholder: "소속 기관" },
                    { key: "ministry_location", label: "사역지", placeholder: "사역지" },
                    { key: "id_number", label: "주민번호 앞 6자리", placeholder: "예: 800101" },
                    { key: "kakao_id", label: "카톡 아이디", placeholder: "카카오톡 ID" },
                    { key: "email", label: "이메일", placeholder: "이메일 주소" },
                  ].map((field) => (
                    <div key={field.key} style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
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
                          border: focused === field.key ? "2px solid #0f4c81" : "1.5px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          fontSize: "14px",
                          color: "#1e293b",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                          background: "#fafbfc"
                        }}
                      />
                    </div>
                  ))}
                  <div style={{
                    background: "#fffbeb",
                    border: "1px solid #fcd34d",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "20px",
                    fontSize: "12px",
                    color: "#92400e",
                    lineHeight: "1.6"
                  }}>
                    ⚠️ 제주 왕복 여행 경비는 본인 부담입니다.
                  </div>
                  <button type="submit" style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #0f4c81, #1565c0)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15,76,129,0.3)"
                  }}>
                    신청 완료하기 →
                  </button>
                </form>
              </div>
            ) : (
              <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "60px 32px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ color: "#0f4c81", fontSize: "20px", marginBottom: "12px" }}>신청 완료!</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.8" }}>
                  참석 신청해 주셔서 감사합니다.<br />추후 안내 드리겠습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
          GMF 대표 권성찬 드림
        </div>
      </div>
    </div>
  );
}
