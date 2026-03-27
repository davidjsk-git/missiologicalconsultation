import { useState } from "react";

export default function Style1() {
  const [formData, setFormData] = useState({
    name: "", organization: "", ministry_location: "", id_number: "", kakao_id: "", email: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1f3c 100%)",
      fontFamily: "'Georgia', serif",
      color: "#e8d5a3"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px 40px",
        borderBottom: "1px solid rgba(212, 175, 55, 0.3)"
      }}>
        <div style={{ fontSize: "13px", letterSpacing: "4px", color: "#d4af37", marginBottom: "16px", textTransform: "uppercase" }}>
          GMF · 2026
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: "700",
          color: "#ffffff",
          margin: "0 0 12px",
          lineHeight: "1.3"
        }}>
          선교학적 자문모임
        </h1>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", color: "#d4af37", fontWeight: "400", margin: "0 0 24px" }}>
          Missiological Consultation
        </h2>
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(212, 175, 55, 0.5)",
          padding: "12px 32px",
          borderRadius: "2px",
          fontSize: "15px",
          color: "#d4af37",
          letterSpacing: "2px"
        }}>
          2026년 10월 5일(월) — 8일(목) · 제주
        </div>
      </div>

      {/* Bible verse */}
      <div style={{ textAlign: "center", padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontSize: "18px", lineHeight: "1.8", fontStyle: "italic", color: "#c4b080", margin: "0 0 8px" }}>
          "우리가 스스로 우리의 행위들을 조사하고 여호와께로 돌아가자"
        </p>
        <p style={{ fontSize: "13px", color: "#8a7a5a", letterSpacing: "2px" }}>— 예레미야애가 3:40</p>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "4px",
          padding: "40px",
          marginBottom: "40px"
        }}>
          <p style={{ fontSize: "16px", lineHeight: "2", color: "#c4b080", margin: 0 }}>
            성찰이 없는 선교는 위험하다는 경고가 이미 오래 전에 있었습니다. 세계선교의 지형이 변하고 한국교회의 선교가 앞으로 어떠해야 하는지 그리고 우리 GMF 공동체는 그 가운데 어떤 방향을 가져야 하는지를 성찰하는 일은 더 이상 미룰 수 없는 문제입니다.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "일시", value: "2026년 10월 5일(월)\n~ 8일(목)" },
            { label: "장소", value: "제주\n(구체적 장소 추후공지)" },
            { label: "대상", value: "GMF 소속\n선교사 약 50명" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: "4px",
              padding: "24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#d4af37", marginBottom: "10px", textTransform: "uppercase" }}>{item.label}</div>
              <div style={{ fontSize: "15px", color: "#e8d5a3", lineHeight: "1.6", whiteSpace: "pre-line" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Registration form */}
        {!submitted ? (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: "4px",
            padding: "40px"
          }}>
            <h3 style={{ color: "#d4af37", fontSize: "20px", marginBottom: "30px", textAlign: "center", letterSpacing: "2px" }}>
              참석 신청
            </h3>
            <form onSubmit={handleSubmit}>
              {[
                { key: "name", label: "이름", placeholder: "성함을 입력해주세요" },
                { key: "organization", label: "소속", placeholder: "소속 기관을 입력해주세요" },
                { key: "ministry_location", label: "사역지", placeholder: "사역지를 입력해주세요" },
                { key: "id_number", label: "주민번호 앞 6자리", placeholder: "예: 800101" },
                { key: "kakao_id", label: "카톡 아이디", placeholder: "카카오톡 ID를 입력해주세요" },
                { key: "email", label: "이메일", placeholder: "이메일 주소를 입력해주세요" },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "12px", letterSpacing: "2px", color: "#d4af37", marginBottom: "8px" }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      borderRadius: "2px",
                      padding: "12px 16px",
                      color: "#e8d5a3",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              ))}
              <div style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "2px",
                padding: "16px",
                marginBottom: "24px",
                fontSize: "13px",
                color: "#8a7a5a",
                lineHeight: "1.7"
              }}>
                ※ 제주 왕복 여행 경비는 본인 부담입니다. 숙소 및 식사 경비는 GMF에서 부담합니다.
              </div>
              <button type="submit" style={{
                width: "100%",
                background: "linear-gradient(135deg, #d4af37, #b8962e)",
                border: "none",
                borderRadius: "2px",
                padding: "16px",
                color: "#0a1628",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "3px",
                cursor: "pointer"
              }}>
                참석 신청하기
              </button>
            </form>
          </div>
        ) : (
          <div style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "4px",
            padding: "60px 40px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✝️</div>
            <h3 style={{ color: "#d4af37", fontSize: "22px", marginBottom: "12px" }}>신청이 완료되었습니다</h3>
            <p style={{ color: "#c4b080", fontSize: "15px", lineHeight: "1.8" }}>
              참석 신청해 주셔서 감사합니다.<br />추후 안내 말씀 드리겠습니다.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px", color: "#5a4a2a", fontSize: "13px", letterSpacing: "1px" }}>
          GMF 대표 권성찬 드림
        </div>
      </div>
    </div>
  );
}
