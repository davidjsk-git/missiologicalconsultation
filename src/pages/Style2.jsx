import { useState } from "react";

export default function Style2() {
  const [formData, setFormData] = useState({
    name: "", organization: "", ministry_location: "", id_number: "", kakao_id: "", email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const schedule = [
    {
      day: "10/5 (월)",
      date: "10월 5일 월요일",
      items: [
        { time: "08:00–14:00", title: "도착", note: "점심식사 전까지" },
        { time: "12:30–14:00", title: "점심식사", note: "" },
        { time: "14:00–14:30", title: "등록", note: "" },
        { time: "14:30–17:30", title: "말씀 1: 이재훈", note: "오리엔테이션 및 소개" },
        { time: "18:00–19:00", title: "저녁식사", note: "" },
        { time: "19:30–21:00", title: "말씀 2: 이재훈", note: "" },
      ]
    },
    {
      day: "10/6 (화)",
      date: "10월 6일 화요일",
      items: [
        { time: "08:00–09:00", title: "아침식사", note: "" },
        { time: "09:00–09:30", title: "준비", note: "" },
        { time: "09:30–12:30", title: "세션 1", note: "발제: 정민영" },
        { time: "12:30–14:00", title: "점심식사", note: "" },
        { time: "14:00–14:30", title: "준비", note: "" },
        { time: "14:30–17:30", title: "세션 2", note: "발제: 홍현철" },
        { time: "18:00–19:00", title: "저녁식사", note: "" },
        { time: "19:30–21:00", title: "말씀 3: 정갑신", note: "" },
      ]
    },
    {
      day: "10/7 (수)",
      date: "10월 7일 수요일",
      items: [
        { time: "08:00–09:00", title: "아침식사", note: "" },
        { time: "09:00–09:30", title: "준비", note: "" },
        { time: "09:30–12:30", title: "세션 3", note: "발제: 권성찬" },
        { time: "12:30–14:00", title: "점심식사", note: "" },
        { time: "14:00–17:30", title: "Outing", note: "제주 탐방" },
        { time: "18:00–19:00", title: "저녁식사", note: "" },
        { time: "19:30–21:00", title: "말씀 4: 정갑신", note: "" },
      ]
    },
    {
      day: "10/8 (목)",
      date: "10월 8일 목요일",
      items: [
        { time: "08:00–09:00", title: "아침식사", note: "" },
        { time: "09:00–09:30", title: "준비", note: "" },
        { time: "09:30–12:30", title: "정리 및 발표", note: "선교적 성찬: 정민영" },
        { time: "12:30–14:00", title: "점심식사", note: "" },
        { time: "14:00~", title: "귀가", note: "제주 출발" },
      ]
    },
  ];

  const getItemColor = (title) => {
    if (title.includes("말씀")) return { bg: "#e8f5e2", color: "#2d5a27", border: "#a5d6a7" };
    if (title.includes("세션")) return { bg: "#fff3e0", color: "#e65100", border: "#ffcc80" };
    if (title.includes("식사") || title.includes("아침") || title.includes("점심") || title.includes("저녁")) return { bg: "#fafafa", color: "#616161", border: "#e0e0e0" };
    if (title.includes("Outing")) return { bg: "#e3f2fd", color: "#1565c0", border: "#90caf9" };
    if (title.includes("귀가") || title.includes("집")) return { bg: "#f3e5f5", color: "#6a1b9a", border: "#ce93d8" };
    return { bg: "#f5f5f5", color: "#424242", border: "#e0e0e0" };
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f0e8",
      fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      color: "#3a2e1e"
    }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, #2d5a27 0%, #3d7a35 60%, #4a8f40 100%)",
        padding: "80px 20px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "20px",
            padding: "6px 20px",
            fontSize: "13px",
            color: "#c8e6c4",
            marginBottom: "20px",
            letterSpacing: "1px"
          }}>
            GMF Missiological Consultation 2026
          </div>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 42px)", color: "#ffffff", fontWeight: "700", margin: "0 0 16px", lineHeight: "1.4" }}>
            선교학적 자문모임에<br />초대합니다
          </h1>
          <p style={{ fontSize: "17px", color: "#c8e6c4", margin: "0 0 32px", lineHeight: "1.7", fontStyle: "italic" }}>
            "우리가 스스로 우리의 행위들을 조사하고<br />여호와께로 돌아가자" — 애 3:40
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {["📅 2026.10.5(월)–8(목)", "📍 제주", "👥 GMF 선교사 약 50명"].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "10px 20px",
                color: "#ffffff",
                fontSize: "14px"
              }}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Invitation text */}
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          marginBottom: "32px",
          boxShadow: "0 2px 20px rgba(45,90,39,0.08)",
          borderLeft: "4px solid #3d7a35"
        }}>
          <p style={{ fontSize: "16px", lineHeight: "2", color: "#4a3f2e", margin: "0 0 16px" }}>
            성찰이 없는 선교는 위험하다는 경고가 이미 오래 전에 있었습니다. 세계선교의 지형이 변하고 한국교회의 선교가 앞으로 어떠해야 하는지 그리고 우리 GMF 공동체는 그 가운데 어떤 방향을 가져야 하는지를 성찰하는 일은 더 이상 미룰 수 없는 문제입니다.
          </p>
          <p style={{ fontSize: "16px", lineHeight: "2", color: "#4a3f2e", margin: 0 }}>
            이에 선교적 성찰을 함께 하기위해 선교학적 자문모임을 갖고자 합니다. 자문은 외부의 자문이 아니라 공동체가 함께 스스로 질문하면서 성찰하는 자문입니다.
          </p>
        </div>

        {/* Speakers */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "20px", color: "#2d5a27", marginBottom: "16px", fontWeight: "700" }}>강사 소개</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {[
              { role: "말씀", name: "이재훈 목사", org: "GMF 이사장" },
              { role: "말씀", name: "정갑신 목사", org: "GMF 이사" },
              { role: "발제", name: "정민영 선교사", org: "GMF 이사" },
              { role: "발제", name: "홍현철 선교사", org: "kriM 원장" },
              { role: "발제", name: "권성찬 선교사", org: "GMF 대표" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
              }}>
                <div style={{
                  background: s.role === "말씀" ? "#e8f5e2" : "#fff3e0",
                  color: s.role === "말씀" ? "#2d5a27" : "#e65100",
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  minWidth: "36px",
                  textAlign: "center"
                }}>{s.role}</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px" }}>{s.name}</div>
                  <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>{s.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected results */}
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "32px 40px",
          marginBottom: "32px",
          boxShadow: "0 2px 20px rgba(45,90,39,0.08)"
        }}>
          <h3 style={{ fontSize: "20px", color: "#2d5a27", marginBottom: "20px", fontWeight: "700" }}>기대하는 결과</h3>
          {[
            "GMF가 지속적인 선교적 성찰 공동체가 된다.",
            "말씀을 통해 새로운 영적 각성을 경험한다.",
            "GMF에 속한 선교사들이 한 몸 공동체임을 이해한다.",
            "발제와 각 조의 상호자문을 통해 '선교가 무엇인지?'에 대한 공동체적 이해를 갖는다.",
            "발제와 각 조의 상호자문을 통해 선교의 변화에 대한 합의된 이해를 갖는다.",
            "발제와 각 조의 상호자문을 통해 GMF 선교 공동체의 합의된 방향을 공유한다.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-start" }}>
              <div style={{
                minWidth: "26px", height: "26px",
                background: "#2d5a27",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2px"
              }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.8", color: "#4a3f2e" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "20px", color: "#2d5a27", marginBottom: "16px", fontWeight: "700" }}>📅 행사 일정</h3>

          {/* Day tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {schedule.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "700",
                  background: activeDay === i ? "#2d5a27" : "#ffffff",
                  color: activeDay === i ? "#ffffff" : "#2d5a27",
                  boxShadow: activeDay === i ? "0 4px 12px rgba(45,90,39,0.3)" : "0 1px 6px rgba(0,0,0,0.08)",
                  transition: "all 0.2s"
                }}
              >
                {day.day}
              </button>
            ))}
          </div>

          {/* Schedule items */}
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 2px 20px rgba(45,90,39,0.08)"
          }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2d5a27", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #e8f5e2" }}>
              {schedule[activeDay].date}
            </div>
            {schedule[activeDay].items.map((item, i) => {
              const colors = getItemColor(item.title);
              return (
                <div key={i} style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "12px",
                  alignItems: "flex-start"
                }}>
                  <div style={{
                    minWidth: "110px",
                    fontSize: "12px",
                    color: "#888",
                    paddingTop: "8px",
                    lineHeight: "1.4"
                  }}>{item.time}</div>
                  <div style={{
                    flex: 1,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    padding: "10px 16px"
                  }}>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: colors.color }}>{item.title}</div>
                    {item.note && <div style={{ fontSize: "12px", color: "#888", marginTop: "3px" }}>{item.note}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Registration form */}
        {!submitted ? (
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 2px 20px rgba(45,90,39,0.08)"
          }}>
            <h3 style={{ fontSize: "22px", color: "#2d5a27", marginBottom: "8px", fontWeight: "700" }}>참석 신청</h3>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>아래 정보를 입력해주세요</p>
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
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#3a2e1e", marginBottom: "8px" }}>
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
                      border: "1.5px solid #e0d8cc",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontSize: "15px",
                      color: "#3a2e1e",
                      outline: "none",
                      boxSizing: "border-box",
                      background: "#fafaf8"
                    }}
                  />
                </div>
              ))}
              <div style={{
                background: "#f0f7ee",
                border: "1px solid #c8e6c4",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                fontSize: "13px",
                color: "#5a7a55",
                lineHeight: "1.7"
              }}>
                ※ 제주 왕복 여행 경비는 본인 부담입니다.<br />
                ※ 숙소 및 식사 경비는 GMF에서 부담합니다.
              </div>
              <button type="submit" style={{
                width: "100%",
                background: "linear-gradient(135deg, #2d5a27, #3d7a35)",
                border: "none",
                borderRadius: "10px",
                padding: "16px",
                color: "#ffffff",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(45,90,39,0.3)"
              }}>
                참석 신청하기
              </button>
            </form>
          </div>
        ) : (
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 2px 20px rgba(45,90,39,0.08)"
          }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🙏</div>
            <h3 style={{ color: "#2d5a27", fontSize: "24px", marginBottom: "12px", fontWeight: "700" }}>신청이 완료되었습니다</h3>
            <p style={{ color: "#6a7a65", fontSize: "15px", lineHeight: "1.9" }}>
              참석 신청해 주셔서 감사합니다.<br />추후 안내 말씀 드리겠습니다.
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "48px",
          paddingTop: "32px",
          borderTop: "1px solid #e0d8cc",
          color: "#9a8a7a",
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <div style={{ fontWeight: "700", color: "#5a4a2a", marginBottom: "4px" }}>GMF 대표 권성찬 드림</div>
          <div style={{ fontSize: "12px" }}>Global Mission Fellowship</div>
        </div>
      </div>
    </div>
  );
}
