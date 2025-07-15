# 🟢 Node.js 기초 정리

## 🎯 Node.js란?

**Node.js = JavaScript로 서버 만드는 도구!** 🖥️

쉽게 말해서:

- **브라우저 밖에서도** JavaScript를 쓸 수 있게 해줘요
- **웹 서버를 만들** 수 있어요
- **파일을 읽고 쓸** 수 있어요

### 🏪 식당으로 비유하면...

```
프론트엔드 = 손님이 보는 메뉴판, 테이블 (웹페이지)
Node.js = 주방 (서버)
데이터베이스 = 창고 (데이터 저장소)
```

---

## 🚀 Node.js 시작하기

### 설치 확인

```bash
node --version
npm --version
```

### 첫 번째 서버 만들기

```javascript
// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>안녕하세요! 첫 번째 서버예요 🎉</h1>");
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중!");
});
```

```bash
# 서버 실행하기
node server.js
# 브라우저에서 http://localhost:3000 접속
```

---

## 📦 npm - 패키지 관리자

### 프로젝트 시작하기

```bash
mkdir 내프로젝트
cd 내프로젝트
npm init -y
```

### 유용한 패키지 설치하기

```bash
# Express (웹 프레임워크)
npm install express

# nodemon (자동 재시작)
npm install -g nodemon

# 개발용 패키지
npm install --save-dev nodemon
```

---

## 🚀 Express로 쉽게 서버 만들기

### 기본 Express 서버

```javascript
// app.js
const express = require("express");
const app = express();
const port = 3000;

// 기본 라우트
app.get("/", (req, res) => {
  res.send("<h1>Express 서버입니다! 🚀</h1>");
});

// JSON 응답
app.get("/api/hello", (req, res) => {
  res.json({
    message: "안녕하세요!",
    time: new Date(),
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중!`);
});
```

### 여러 경로 만들기

```javascript
// 홈페이지
app.get("/", (req, res) => {
  res.send("홈페이지입니다");
});

// 소개 페이지
app.get("/about", (req, res) => {
  res.send("소개 페이지입니다");
});

// 사용자 정보 (파라미터 사용)
app.get("/user/:name", (req, res) => {
  const userName = req.params.name;
  res.send(`안녕하세요, ${userName}님!`);
});

// 쿼리 파라미터 사용
app.get("/search", (req, res) => {
  const keyword = req.query.q;
  res.send(`검색어: ${keyword}`);
});
```

---

## 📝 HTML 파일 서비스하기

### 정적 파일 서비스

```javascript
const express = require("express");
const path = require("path");
const app = express();

// public 폴더의 파일들을 서비스
app.use(express.static("public"));

// HTML 파일 보내기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000);
```

### 폴더 구조

```
프로젝트/
├── app.js
├── package.json
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 📊 데이터 주고받기

### POST 요청 처리하기

```javascript
// JSON 데이터 받기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 사용자 등록
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  console.log("받은 데이터:", { name, email });

  res.json({
    success: true,
    message: "사용자 등록 완료!",
    user: { name, email },
  });
});
```

### HTML 폼과 연동

```html
<!-- public/index.html -->
<form action="/api/users" method="POST">
  <input type="text" name="name" placeholder="이름" required />
  <input type="email" name="email" placeholder="이메일" required />
  <button type="submit">등록하기</button>
</form>
```

---

## 🗄️ 파일 다루기

### 파일 읽기/쓰기

```javascript
const fs = require("fs");

// 파일 읽기
app.get("/api/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "파일 읽기 실패" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// 파일 쓰기
app.post("/api/save", (req, res) => {
  const data = JSON.stringify(req.body, null, 2);

  fs.writeFile("data.json", data, (err) => {
    if (err) {
      res.status(500).json({ error: "파일 저장 실패" });
      return;
    }
    res.json({ success: true, message: "저장 완료!" });
  });
});
```

---

## 🎯 실습 프로젝트

### 간단한 할 일 관리 API

```javascript
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [
  { id: 1, text: "공부하기", done: false },
  { id: 2, text: "운동하기", done: true },
];

// 모든 할 일 조회
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// 할 일 추가
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    done: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// 할 일 완료/미완료 토글
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    todo.done = !todo.done;
    res.json(todo);
  } else {
    res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
  }
});

// 할 일 삭제
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("할 일 관리 서버 실행 중!");
});
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] Node.js 설치하고 기본 서버 만들기
- [ ] Express로 간단한 웹서버 만들기
- [ ] 정적 파일 서비스하기
- [ ] GET, POST 요청 처리하기

### 🥈 2단계: 중급 (2-3주)

- [ ] 파일 읽기/쓰기 기능
- [ ] JSON API 만들기
- [ ] 간단한 CRUD 기능 구현
- [ ] 프론트엔드와 연동하기

### 🥇 3단계: 고급 (4주 이상)

- [ ] 데이터베이스 연동하기
- [ ] 인증/권한 시스템 만들기
- [ ] 실시간 채팅 기능 (Socket.io)
- [ ] 배포하기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **nodemon 사용하기** - 코드 수정할 때마다 자동 재시작
- **환경변수 사용** - 포트번호, 비밀키 등을 .env 파일로 관리
- **에러 처리하기** - try-catch문으로 에러 상황 대비
- **API 테스트하기** - Postman이나 Thunder Client 사용

### ❌ 이건 피하세요

- 민감한 정보 (비밀번호, API 키) 코드에 직접 쓰기
- 에러 처리 없이 코드 작성하기
- 너무 복잡한 기능을 한 번에 만들려고 하기
- package.json 백업 안 하기

---

## 🌟 마무리

**Node.js 핵심 3가지:**

1. 🖥️ **서버** = JavaScript로 백엔드 만들기
2. 📦 **npm** = 다른 사람이 만든 패키지 사용하기
3. 🚀 **Express** = 쉽고 빠르게 웹서버 만들기

**기억하세요:**

- Node.js는 **풀스택 개발의 핵심**이에요
- 작은 API부터 차근차근 만들어보세요
- 에러가 나면 콘솔 로그를 잘 확인하세요
- 실제 프로젝트에 적용해보는 게 최고예요!

**화이팅! 🚀✨**
