// 변수생성
let userMessages = [];
let assistantMessages = [];

function startChat() {
  const introContainer = document.getElementById("intro");
  const chatContainer = document.getElementById("chat");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("timeSelect");

  // 날짜와 시간 입력 필드가 비어있으면 경고 메시지 표시
  if (!dateInput.value) {
    alert("생년월일을 입력해주세요.");
    return;
  }

  // 챗봇 인터페이스로 전환
  introContainer.style.display = "none";
  chatContainer.style.display = "block";

  // 대화 시작 메시지 추가
  addMessage(`안녕하세요! ${dateInput.value} 출생하신 분이시군요.`, "bot");
  
  // 사용자 메시지 초기화
  userMessages = [];
  assistantMessages = [];
}

function addMessage(text, sender) {
  const chatContainer = document.getElementById("chat-container");
  const msg = document.createElement("div");
  msg.className = `message ${sender}-message`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  document.getElementById("loader").style.display = "block";
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (!message) {
    alert("메시지를 입력해주세요.");
    return;
  }

  // 사용자 메시지를 화면과 대화 기록에 추가
  addMessage(message, "user");
  userMessages.push(message);
  messageInput.value = "";

  try {
    // 로컬 개발 환경을 위한 엔드포인트
    const response = await fetch('http://localhost:3000/fortuneTell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessages,
        assistantMessages,
      }),
    });

    if (!response.ok) throw new Error(`서버 응답 오류: ${response.status}`);

    const result = await response.json();
    const botMessage = result.fortune;

    document.getElementById("loader").style.display = "none";
    addMessage(botMessage, "bot");
    assistantMessages.push(botMessage);
  } catch (error) {
    console.error("메시지 전송 실패:", error);
    addMessage("⚠️ 메시지를 보내는 데 실패했어요. 잠시 후 다시 시도해주세요.", "bot");
    document.getElementById("loader").style.display = "none";
  }
}

// 페이지 로드 시 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('start-button');
  if (chatButton) {
    chatButton.addEventListener('click', startChat);
  }
});
document.getElementById("chat-container").appendChild(p);
