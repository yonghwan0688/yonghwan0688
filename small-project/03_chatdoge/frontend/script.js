// 변수생성
let userMessages = [];
let assistantMessages = [];
let birthDate = "";
let birthTime = "";
let requestCount = 0;
const MAX_FREE_REQUESTS = 5; // 무료 사용자 제한

// 사용량 추적
function trackUsage() {
  const today = new Date().toDateString();
  const stored = localStorage.getItem("chatdoge_usage");
  const usage = stored ? JSON.parse(stored) : {};

  if (usage.date !== today) {
    usage.date = today;
    usage.count = 0;
  }

  usage.count++;
  localStorage.setItem("chatdoge_usage", JSON.stringify(usage));

  // 분석 추적
  if (window.UserBehavior) {
    window.UserBehavior.trackMessageSent();
  }

  return usage.count;
}

function startChat() {
  const introContainer = document.getElementById("intro");
  const chatContainer = document.getElementById("chat");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("timeSelect");

  // 날짜 입력 필드가 비어있으면 경고 메시지 표시
  if (!dateInput.value) {
    alert("생년월일을 입력해주세요.");
    return;
  }

  // 전역 변수에 저장
  birthDate = dateInput.value;
  birthTime = timeSelect.value;

  // 챗봇 인터페이스로 전환
  introContainer.style.display = "none";
  chatContainer.style.display = "block";

  // 개선된 시작 메시지
  const welcomeMessage = `안녕하세요! ${birthDate} 출생하신 분이시군요. ${
    birthTime
      ? `출생시간은 ${birthTime}시로 기록되었습니다.`
      : "출생시간 정보가 없어도 운세를 봐드릴 수 있어요!"
  }\n\n오늘 궁금한 것이 있으시면 언제든 물어보세요! 💫`;

  addMessage(welcomeMessage, "bot");

  // 사용자 메시지 초기화
  userMessages = [];
  assistantMessages = [];

  // 사용량 체크 및 안내
  checkUsageLimit();
}

// 사용량 제한 체크
function checkUsageLimit() {
  // 프리미엄 사용자는 제한 없음
  if (window.PremiumManager && window.PremiumManager.isPremiumUser()) {
    return true;
  }

  const today = new Date().toDateString();
  const stored = localStorage.getItem("chatdoge_usage");
  const usage = stored ? JSON.parse(stored) : { date: today, count: 0 };

  if (usage.date !== today) {
    usage.date = today;
    usage.count = 0;
  }

  const remaining = MAX_FREE_REQUESTS - usage.count;

  if (remaining <= 0) {
    addMessage(
      "⭐ 오늘의 무료 이용 횟수를 모두 사용하셨습니다!\n\n🎁 프리미엄으로 업그레이드하시면:\n• 무제한 운세 상담\n• 더 상세한 분석\n• 개인 맞춤 조언\n• 광고 없는 이용",
      "bot"
    );

    // 프리미엄 모달 표시
    setTimeout(() => {
      if (window.PremiumManager) {
        window.PremiumManager.showPremiumModal();
      }
    }, 1000);

    document.getElementById("message-input").disabled = true;
    return false;
  } else if (remaining <= 2) {
    addMessage(`⚠️ 오늘 ${remaining}번의 무료 이용이 남았습니다.`, "bot");
  }

  return true;
}

function addMessage(text, sender) {
  const chatContainer = document.getElementById("chat-container");
  const msg = document.createElement("div");
  msg.className = `message ${sender}-message`;
  msg.innerHTML = text.replace(/\n/g, "<br>"); // 줄바꿈 처리
  chatContainer.appendChild(msg);
  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  // 사용량 제한 체크
  if (!checkUsageLimit()) {
    return;
  }

  document.getElementById("loader").style.display = "block";
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (!message) {
    alert("메시지를 입력해주세요.");
    document.getElementById("loader").style.display = "none";
    return;
  }

  // 사용자 메시지를 화면과 대화 기록에 추가
  addMessage(message, "user");
  userMessages.push(message);
  messageInput.value = "";

  // 사용량 추적
  const currentUsage = trackUsage();

  try {
    // 개발/프로덕션 환경에 따른 엔드포인트 설정
    const isProduction =
      window.location.hostname !== "localhost" &&
      !window.location.hostname.includes("127.0.0.1");
    const endpoint = isProduction
      ? "https://your-production-api.com/fortuneTell"
      : "http://localhost:3000/fortuneTell";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessages,
        assistantMessages,
        birthDate,
        birthTime,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      } else if (response.status === 503) {
        throw new Error(
          "서비스 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요."
        );
      } else {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }
    }

    const result = await response.json();
    const botMessage = result.fortune;

    document.getElementById("loader").style.display = "none";
    addMessage(botMessage, "bot");
    assistantMessages.push(botMessage);

    // 광고 표시 (매 3번째 요청마다)
    if (currentUsage % 3 === 0) {
      showAdvertisement();
    }
  } catch (error) {
    console.error("메시지 전송 실패:", error);
    document.getElementById("loader").style.display = "none";
    addMessage(
      `⚠️ ${
        error.message ||
        "메시지를 보내는 데 실패했어요. 잠시 후 다시 시도해주세요."
      }`,
      "bot"
    );
  }
}

// 빠른 질문 기능
function askQuickQuestion(question) {
  const messageInput = document.getElementById("message-input");
  messageInput.value = question;
  sendMessage();
}

// 뒤로가기 기능
function goBack() {
  const introContainer = document.getElementById("intro");
  const chatContainer = document.getElementById("chat");

  introContainer.style.display = "flex";
  chatContainer.style.display = "none";

  // 채팅 내용 초기화
  document.getElementById("chat-container").innerHTML = "";
  userMessages = [];
  assistantMessages = [];

  // 입력 필드 활성화
  document.getElementById("message-input").disabled = false;
}

// 광고 표시 함수
function showAdvertisement() {
  // 프리미엄 사용자에게는 광고 표시 안함
  if (window.PremiumManager && window.PremiumManager.isPremiumUser()) {
    return;
  }

  const adElement = document.querySelector(".kakao_ad_area");
  if (adElement) {
    adElement.style.display = "block";
    setTimeout(() => {
      adElement.style.display = "none";
    }, 10000); // 10초 후 숨김
  }
}

// Enter 키로 메시지 전송
function setupKeyboardEvents() {
  const messageInput = document.getElementById("message-input");
  if (messageInput) {
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

// 페이지 로드 시 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  // 프리미엄 사용자 상태 확인 및 표시
  if (window.PremiumManager && window.PremiumManager.isPremiumUser()) {
    const header = document.querySelector(".header h1");
    if (header) {
      const badge = document.createElement("span");
      badge.className = "premium-badge";
      badge.textContent = "PREMIUM";
      header.appendChild(badge);
    }

    // 남은 체험 일수 표시
    const remainingDays = window.PremiumManager.getRemainingTrialDays();
    if (remainingDays > 0) {
      const trialInfo = document.createElement("div");
      trialInfo.className = "trial-info";
      trialInfo.innerHTML = `🎁 프리미엄 체험 ${remainingDays}일 남음`;
      trialInfo.style.cssText = `
        background: linear-gradient(45deg, #ffd700, #ffed4a);
        color: #333;
        padding: 10px 20px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 10px;
        border-radius: 10px;
      `;
      document.querySelector(".header").appendChild(trialInfo);
    }
  }

  // A/B 테스트 적용
  if (window.ABTest) {
    // 환영 메시지 업데이트
    const welcomeH2 = document.querySelector(".welcome-section h2");
    if (welcomeH2) {
      welcomeH2.textContent = window.ABTest.getWelcomeMessage();
    }

    // CTA 버튼 텍스트 업데이트
    const startButton = document.getElementById("start-button");
    if (startButton) {
      const buttonText = startButton.querySelector("i").nextSibling;
      if (buttonText) {
        buttonText.textContent = " " + window.ABTest.getCtaButtonText();
      }
    }
  }

  const chatButton = document.getElementById("start-button");
  if (chatButton) {
    chatButton.addEventListener("click", () => {
      // A/B 테스트 전환 추적
      if (window.ABTest) {
        window.ABTest.trackConversion("cta_button", "click");
      }

      // 애널리틱스 추적
      if (window.Analytics) {
        window.Analytics.trackEvent(
          "start_chat",
          "interaction",
          "button_click"
        );
      }

      startChat();
    });
  }

  setupKeyboardEvents();

  // 사용량 안내 표시 (무료 사용자만)
  if (!window.PremiumManager || !window.PremiumManager.isPremiumUser()) {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("chatdoge_usage");
    const usage = stored ? JSON.parse(stored) : { date: today, count: 0 };

    if (usage.date === today && usage.count > 0) {
      const remaining = MAX_FREE_REQUESTS - usage.count;
      if (remaining > 0) {
        const usageInfo = document.createElement("div");
        usageInfo.className = "usage-info";
        usageInfo.innerHTML = `💫 오늘 ${remaining}번 더 이용하실 수 있어요!`;
        document.querySelector(".intro-container").appendChild(usageInfo);
      }
    }
  }

  // 페이지 뷰 추적
  if (window.Analytics) {
    window.Analytics.trackPageView("홈페이지");
  }
});
