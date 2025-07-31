// 변수생성
let userMessages = [];
let assistantMessages = [];

function start() {
  const introContainer = document.getElementById("intro");
  const chatContainer = document.getElementById("chat");
  const dateInput = document.getElementById("date");

  // 날짜 입력 필드가 비어있으면 경고 메시지 표시
  if (!dateInput.value) {
    alert("생년월일을 입력해주세요.");
    return;
  }

  // 챗봇 인터페이스로 전환
  introContainer.style.display = "none";
  chatContainer.style.display = "block";

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
  // 현재 코드의 'username-input'을 메시지 입력창으로 사용합니다.
  // HTML에서 id를 'message-input'으로 변경하는 것을 권장합니다.
  document.getElementById("loader").style.display = "block";
  const input = document.getElementById("username-input");
  const message = input.value.trim();

  if (!message) {
    alert("메시지를 입력해주세요.");
    return;
  }

  // 사용자 메시지를 화면과 대화 기록에 추가
  addMessage(message, "user");
  userMessages.push(message);
  input.value = "";

  try {
    // 백엔드에 대화 기록을 포함하여 메시지 전송
    const response = await fetch("http://localhost:3000/fortuneTell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    // 챗봇 응답을 화면과 대화 기록에 추가
    addMessage(botMessage, "bot");
    assistantMessages.push(botMessage);
  } catch (error) {
    console.error("메시지 전송 실패:", error);
    addMessage("⚠️ 메시지를 보내는 데 실패했어요. 다시 시도해주세요.", "bot");
  }
}
