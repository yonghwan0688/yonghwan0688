# 🌐 API & REST 기초 정리

## 🎯 API란?

**API = 프로그램들이 대화하는 방법!** 🗣️

쉽게 말해서:

- **다른 서비스의 기능을 빌려쓰는** 방법이에요
- **데이터를 주고받는** 규칙이에요
- 웹사이트가 **서버와 소통하는** 방법이에요

### 🍕 피자 주문으로 비유하면...

```
고객 (프론트엔드) → 전화 주문 (API) → 피자집 (서버)
"피자 하나 주세요"     →     "네, 30분 후 배달"
```

---

## 🚀 REST API란?

**REST = 웹에서 데이터 주고받는 규칙!** 📋

### 4가지 기본 동작 (CRUD)

- **GET** = 데이터 가져오기 📥
- **POST** = 새 데이터 만들기 ➕
- **PUT** = 데이터 수정하기 ✏️
- **DELETE** = 데이터 삭제하기 🗑️

### URL 패턴

```
GET    /api/users        → 모든 사용자 목록
GET    /api/users/123    → ID가 123인 사용자 정보
POST   /api/users        → 새 사용자 생성
PUT    /api/users/123    → ID가 123인 사용자 수정
DELETE /api/users/123    → ID가 123인 사용자 삭제
```

---

## 🛠️ JavaScript로 API 사용하기

### fetch() 기본 사용법

```javascript
// GET 요청 - 데이터 가져오기
fetch("https://api.example.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log("사용자 목록:", data);
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });
```

### async/await 방식 (더 쉬운 방법)

```javascript
async function 사용자목록가져오기() {
  try {
    const response = await fetch("https://api.example.com/users");
    const users = await response.json();
    console.log("사용자들:", users);
  } catch (error) {
    console.error("에러:", error);
  }
}
```

### POST 요청 - 데이터 보내기

```javascript
async function 사용자생성하기() {
  const 새사용자 = {
    name: "철수",
    email: "cheol@email.com",
    age: 25,
  };

  try {
    const response = await fetch("https://api.example.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(새사용자),
    });

    const 결과 = await response.json();
    console.log("생성된 사용자:", 결과);
  } catch (error) {
    console.error("에러:", error);
  }
}
```

---

## 🎯 실습 예제들

### 1. 날씨 정보 가져오기

```javascript
async function 날씨가져오기(도시) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${도시}&appid=YOUR_API_KEY&units=metric`
    );
    const 날씨데이터 = await response.json();

    document.getElementById("날씨").innerHTML = `
      <h3>${날씨데이터.name}의 날씨</h3>
      <p>온도: ${날씨데이터.main.temp}°C</p>
      <p>날씨: ${날씨데이터.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("날씨 정보를 가져올 수 없습니다:", error);
  }
}
```

### 2. 할 일 목록 API

```javascript
// 할 일 목록 가져오기
async function 할일목록가져오기() {
  const response = await fetch("/api/todos");
  const todos = await response.json();

  const 목록HTML = todos
    .map(
      (todo) => `
    <li>
      ${todo.text} 
      <button onclick="할일삭제(${todo.id})">삭제</button>
    </li>
  `
    )
    .join("");

  document.getElementById("할일목록").innerHTML = 목록HTML;
}

// 새 할 일 추가하기
async function 할일추가(텍스트) {
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: 텍스트 }),
  });

  할일목록가져오기(); // 목록 다시 불러오기
}

// 할 일 삭제하기
async function 할일삭제(id) {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  할일목록가져오기(); // 목록 다시 불러오기
}
```

---

## 🔧 Node.js로 API 만들기

### Express로 간단한 API 서버

```javascript
const express = require("express");
const app = express();

app.use(express.json());

let 사용자목록 = [
  { id: 1, name: "철수", email: "cheol@email.com" },
  { id: 2, name: "영희", email: "young@email.com" },
];

// 모든 사용자 조회
app.get("/api/users", (req, res) => {
  res.json(사용자목록);
});

// 특정 사용자 조회
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const 사용자 = 사용자목록.find((u) => u.id === id);

  if (사용자) {
    res.json(사용자);
  } else {
    res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
  }
});

// 새 사용자 생성
app.post("/api/users", (req, res) => {
  const 새사용자 = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
  };

  사용자목록.push(새사용자);
  res.status(201).json(새사용자);
});

// 사용자 정보 수정
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const 사용자 = 사용자목록.find((u) => u.id === id);

  if (사용자) {
    사용자.name = req.body.name || 사용자.name;
    사용자.email = req.body.email || 사용자.email;
    res.json(사용자);
  } else {
    res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
  }
});

// 사용자 삭제
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const 인덱스 = 사용자목록.findIndex((u) => u.id === id);

  if (인덱스 > -1) {
    사용자목록.splice(인덱스, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
  }
});

app.listen(3000, () => {
  console.log("API 서버가 3000번 포트에서 실행 중!");
});
```

---

## 🔒 API 보안

### API 키 사용하기

```javascript
// 환경변수로 API 키 관리
const API_KEY = process.env.API_KEY;

app.get("/api/protected", (req, res) => {
  const 클라이언트키 = req.headers["x-api-key"];

  if (클라이언트키 !== API_KEY) {
    return res.status(401).json({ error: "인증이 필요합니다" });
  }

  res.json({ message: "보호된 데이터입니다" });
});
```

### CORS 설정

```javascript
// 다른 도메인에서 API 접근 허용
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] fetch()로 API 호출해보기
- [ ] 공개 API 사용해보기 (날씨, 뉴스 등)
- [ ] GET, POST 요청 연습하기
- [ ] JSON 데이터 다루기

### 🥈 2단계: 중급 (2-3주)

- [ ] Express로 REST API 만들기
- [ ] CRUD 기능 완성하기
- [ ] 에러 처리 추가하기
- [ ] 프론트엔드와 연동하기

### 🥇 3단계: 고급 (4주 이상)

- [ ] 인증/권한 시스템
- [ ] 데이터베이스 연동
- [ ] API 문서화
- [ ] 배포하고 실제 서비스하기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **상태 코드 제대로 사용** - 200, 201, 404, 500 등
- **에러 처리하기** - try-catch로 예외 상황 대비
- **API 문서 작성** - 다른 사람이 쓸 수 있게
- **테스트하기** - Postman으로 API 테스트

### ❌ 이건 피하세요

- 민감한 정보 URL에 넣기
- 에러 메시지에 시스템 정보 노출
- API 키를 코드에 직접 쓰기
- 무제한 요청 허용하기

---

## 🌟 마무리

**API & REST 핵심 3가지:**

1. 🌐 **HTTP 메서드** = GET, POST, PUT, DELETE
2. 📡 **fetch()** = JavaScript로 API 호출하기
3. 🔧 **Express** = Node.js로 API 서버 만들기

**기억하세요:**

- API는 **현대 웹 개발의 핵심**이에요
- 작은 API부터 차근차근 만들어보세요
- 공개 API로 연습하는 게 좋아요
- 보안도 항상 신경써야 해요!

**화이팅! 🚀✨**
