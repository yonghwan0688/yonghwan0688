const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

console.log("WebSocket 서버가 포트 3000에서 실행 중입니다...");

server.on("connection", (ws) => {
  console.log("새로운 클라이언트가 연결되었습니다.");
  ws.send("[서버접속완료]");

  // 클라이언트에서 메시지가 수신된 경우의 이벤트 핸들러
  ws.on("message", (message) => {
    console.log(`클라이언트로부터 메시지 수신: ${message}`);
    ws.send(`서버로부터 응답: ${message}`);
  });

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });

  ws.on("error", (error) => {
    console.error("WebSocket 오류:", error);
  });
});

server.on("error", (error) => {
  console.error("서버 오류:", error);
});
