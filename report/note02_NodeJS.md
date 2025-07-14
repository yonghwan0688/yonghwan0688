# 🚀 Node.js 기초 정리

## 🎯 Node.js란?

**Node.js = JavaScript를 브라우저 밖에서도 실행할 수 있게 해주는 런타임!** 🌟

- Google의 V8 JavaScript 엔진 기반
- 서버 사이드 개발을 위한 플랫폼
- 비동기, 이벤트 기반 프로그래밍

### 🎭 JavaScript의 대변신!

#### Before Node.js 🌐

```
JavaScript = 아쿠아리움 속 물고기 🐠
- 웹 브라우저에서만 실행 가능
- HTML 조작, DOM 이벤트 처리만
- 클라이언트 사이드만
```

#### After Node.js 🖥️

```
JavaScript = 바다로 나간 물고기 🐟
- 서버에서 실행 가능
- 파일 시스템 접근
- 데이터베이스 연결
- API 서버 구축
- 데스크톱 앱 개발
```

---

## 🌟 Node.js의 특징

### 1. **단일 스레드 + 이벤트 루프** ⚡

```javascript
// 🚫 동기식 (블로킹) - 비추천
const fs = require("fs");
const data = fs.readFileSync("large-file.txt"); // 파일을 다 읽을 때까지 대기
console.log("파일 읽기 완료");

// ✅ 비동기식 (논블로킹) - 추천!
fs.readFile("large-file.txt", (err, data) => {
  if (err) throw err;
  console.log("파일 읽기 완료");
});
console.log("다른 작업 계속 진행"); // 파일 읽는 동안 다른 일 가능!
```

### 2. **NPM (Node Package Manager)** 📦

```bash
# 패키지 설치
npm install express
npm install mongoose
npm install axios

# 글로벌 설치
npm install -g nodemon

# 개발 의존성 설치
npm install --save-dev jest
```

### 3. **모듈 시스템** 📁

```javascript
// 모듈 내보내기 (CommonJS)
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// 모듈 가져오기
// app.js
const { add, subtract } = require("./math");
console.log(add(5, 3)); // 8

// ES6 모듈 (package.json에서 "type": "module" 설정)
// math.mjs
export function multiply(a, b) {
  return a * b;
}

// app.mjs
import { multiply } from "./math.mjs";
```

---

## 🛠️ 핵심 모듈들

### 1. **HTTP 모듈** - 웹서버 만들기 🌐

```javascript
const http = require("http");

// 간단한 웹서버
const server = http.createServer((req, res) => {
  // 요청 URL별 라우팅
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>안녕하세요! Node.js 서버입니다! 🚀</h1>");
  } else if (req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        { id: 1, name: "김철수" },
        { id: 2, name: "이영희" },
      ])
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 - 페이지를 찾을 수 없습니다 😞</h1>");
  }
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행중! 🎉");
});
```

### 2. **File System (fs) 모듈** - 파일 다루기 📁

```javascript
const fs = require("fs");
const path = require("path");

// 파일 읽기 (비동기)
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("파일 읽기 실패:", err);
    return;
  }
  console.log("파일 내용:", data);
});

// 파일 쓰기
const content = "안녕하세요! Node.js로 파일을 만들었어요! 📝";
fs.writeFile("output.txt", content, (err) => {
  if (err) {
    console.error("파일 쓰기 실패:", err);
    return;
  }
  console.log("파일 생성 완료! ✅");
});

// 디렉토리 읽기
fs.readdir("./", (err, files) => {
  if (err) throw err;
  console.log("현재 디렉토리 파일들:", files);
});

// 파일 존재 여부 확인
if (fs.existsSync("config.json")) {
  console.log("설정 파일이 존재합니다!");
} else {
  console.log("설정 파일이 없습니다.");
}
```

### 3. **Path 모듈** - 경로 다루기 🛣️

```javascript
const path = require("path");

// 경로 조합
const fullPath = path.join(__dirname, "data", "users.json");
console.log(fullPath); // /project/data/users.json

// 파일 확장자 추출
const ext = path.extname("document.pdf");
console.log(ext); // .pdf

// 파일명만 추출
const filename = path.basename("/path/to/file.txt");
console.log(filename); // file.txt

// 디렉토리명만 추출
const dirname = path.dirname("/path/to/file.txt");
console.log(dirname); // /path/to
```

### 4. **Events 모듈** - 이벤트 시스템 🎪

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// 이벤트 리스너 등록
myEmitter.on("message", (data) => {
  console.log("메시지 받음:", data);
});

myEmitter.on("error", (err) => {
  console.error("에러 발생:", err);
});

// 이벤트 발생
myEmitter.emit("message", "안녕하세요! 👋");
myEmitter.emit("error", new Error("테스트 에러"));
```

---

## 🌟 Express.js - 웹 프레임워크

### 1. **기본 설정** 🚀

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json()); // JSON 파싱
app.use(express.static("public")); // 정적 파일 서빙

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Express 서버에 오신 것을 환영합니다! 🎉");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중! 🚀`);
});
```

### 2. **라우팅** 🛣️

```javascript
// GET 요청
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "김철수", email: "kim@example.com" },
    { id: 2, name: "이영희", email: "lee@example.com" },
  ]);
});

// POST 요청
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    email,
  };

  // 실제로는 데이터베이스에 저장
  console.log("새 사용자 생성:", newUser);
  res.status(201).json(newUser);
});

// 파라미터 사용
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // 실제로는 데이터베이스에서 조회
  const user = { id: userId, name: "김철수", email: "kim@example.com" };

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
  }
});

// PUT 요청 (업데이트)
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  // 실제로는 데이터베이스에서 업데이트
  const updatedUser = { id: userId, name, email };
  res.json(updatedUser);
});

// DELETE 요청
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // 실제로는 데이터베이스에서 삭제
  res.json({ message: `사용자 ${userId}가 삭제되었습니다.` });
});
```

### 3. **미들웨어** 🔄

```javascript
// 로깅 미들웨어
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // 다음 미들웨어로 이동
}

// 인증 미들웨어
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "인증 토큰이 필요합니다." });
  }

  // 토큰 검증 로직 (실제로는 JWT 등 사용)
  if (token === "Bearer valid-token") {
    req.user = { id: 1, name: "김철수" }; // 사용자 정보 추가
    next();
  } else {
    res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
}

// 에러 처리 미들웨어
function errorHandler(err, req, res, next) {
  console.error("에러 발생:", err.stack);
  res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
}

// 미들웨어 사용
app.use(logger); // 모든 요청에 로깅
app.use("/api", authenticate); // /api로 시작하는 요청에 인증
app.use(errorHandler); // 에러 처리
```

---

## 📦 패키지 관리

### 1. **package.json** 📋

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "Node.js 연습 프로젝트",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.0.0",
    "axios": "^0.27.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^28.0.0"
  }
}
```

### 2. **NPM 스크립트** ⚡

```bash
# 개발 서버 시작 (nodemon 사용)
npm run dev

# 프로덕션 서버 시작
npm start

# 테스트 실행
npm test

# 패키지 업데이트
npm update

# 보안 취약점 확인
npm audit
npm audit fix
```

### 3. **환경 변수** 🌍

```javascript
// .env 파일
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=my-secret-key
NODE_ENV=development

// app.js
require('dotenv').config(); // dotenv 패키지 필요

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

console.log('환경:', process.env.NODE_ENV);
console.log('포트:', PORT);
```

---

## 🗄️ 데이터베이스 연동

### 1. **MongoDB (Mongoose)** 🍃

```javascript
const mongoose = require("mongoose");

// 데이터베이스 연결
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 스키마 정의
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// CRUD 작업
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log("사용자 생성:", savedUser);
    return savedUser;
  } catch (error) {
    console.error("사용자 생성 실패:", error);
  }
}

async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("사용자 조회 실패:", error);
  }
}

async function updateUser(id, updateData) {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    return user;
  } catch (error) {
    console.error("사용자 업데이트 실패:", error);
  }
}

async function deleteUser(id) {
  try {
    await User.findByIdAndDelete(id);
    console.log("사용자 삭제 완료");
  } catch (error) {
    console.error("사용자 삭제 실패:", error);
  }
}
```

### 2. **MySQL (mysql2)** 🐬

```javascript
const mysql = require("mysql2");

// 데이터베이스 연결
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "myapp",
});

// 연결 풀 사용 (추천)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "myapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promise 버전 사용
const promisePool = pool.promise();

async function getUsers() {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("데이터 조회 실패:", error);
  }
}

async function createUser(name, email) {
  try {
    const [result] = await promisePool.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    console.log("사용자 생성 완료:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("사용자 생성 실패:", error);
  }
}
```

---

## 🔒 보안

### 1. **기본 보안 설정** 🛡️

```javascript
const express = require("express");
const helmet = require("helmet"); // 보안 헤더 설정
const cors = require("cors"); // CORS 설정
const rateLimit = require("express-rate-limit"); // 요청 제한

const app = express();

// 보안 미들웨어
app.use(helmet()); // 기본 보안 헤더 설정

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "https://myapp.com"],
    credentials: true,
  })
);

// 요청 속도 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100개 요청
  message: "너무 많은 요청입니다. 잠시 후 다시 시도해주세요.",
});
app.use("/api", limiter);

// 입력값 검증
const { body, validationResult } = require("express-validator");

app.post(
  "/users",
  body("email").isEmail().withMessage("유효한 이메일을 입력하세요"),
  body("name").notEmpty().withMessage("이름을 입력하세요"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 사용자 생성 로직
  }
);
```

### 2. **JWT 인증** 🔐

```javascript
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 비밀번호 해싱
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// JWT 토큰 생성
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

// JWT 토큰 검증 미들웨어
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "토큰이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
}

// 로그인 라우트
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 사용자 조회
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // 비밀번호 확인
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ error: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // 토큰 생성
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
});

// 보호된 라우트
app.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
```

---

## 🧪 테스팅

### 1. **Jest 테스트** 🃏

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다");
  }
  return a / b;
}

module.exports = { add, divide };

// math.test.js
const { add, divide } = require("./math");

describe("Math Functions", () => {
  test("두 수를 더하면 올바른 결과가 나온다", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test("나눗셈이 올바르게 작동한다", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(7, 2)).toBe(3.5);
  });

  test("0으로 나누면 에러가 발생한다", () => {
    expect(() => divide(10, 0)).toThrow("0으로 나눌 수 없습니다");
  });
});
```

### 2. **API 테스트** 🔬

```javascript
const request = require("supertest");
const app = require("../app"); // Express 앱

describe("User API", () => {
  test("GET /users - 사용자 목록 조회", async () => {
    const response = await request(app).get("/users").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /users - 새 사용자 생성", async () => {
    const newUser = {
      name: "테스트 사용자",
      email: "test@example.com",
    };

    const response = await request(app)
      .post("/users")
      .send(newUser)
      .expect(201);

    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test("GET /users/:id - 존재하지 않는 사용자 조회", async () => {
    await request(app).get("/users/99999").expect(404);
  });
});
```

---

## 📁 프로젝트 구조

### 1. **기본 구조** 🏗️

```
my-node-app/
├── src/
│   ├── controllers/     🎮 컨트롤러 (비즈니스 로직)
│   │   ├── userController.js
│   │   └── authController.js
│   ├── models/         📊 데이터 모델
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/         🛣️ 라우트 정의
│   │   ├── users.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── middleware/     🔄 미들웨어
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/          🛠️ 유틸리티 함수
│   │   ├── database.js
│   │   └── helpers.js
│   └── config/         ⚙️ 설정 파일
│       ├── database.js
│       └── server.js
├── tests/              🧪 테스트 파일
├── public/             📁 정적 파일
├── .env                🌍 환경 변수
├── .gitignore          🙈 Git 무시 파일
├── package.json        📋 프로젝트 정보
└── app.js              🚀 메인 애플리케이션
```

### 2. **MVC 패턴 예시** 🏛️

```javascript
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("User", userSchema);

// controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;

// app.js
const express = require("express");
const userRoutes = require("./routes/users");

const app = express();

app.use("/api/users", userRoutes);

module.exports = app;
```

---

## ⚡ 성능 최적화

### 1. **캐싱** 💾

```javascript
const redis = require("redis");
const client = redis.createClient();

// 캐시 미들웨어
function cache(duration) {
  return async (req, res, next) => {
    const key = req.originalUrl;

    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // 원래 res.json을 래핑
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };

      next();
    } catch (error) {
      next();
    }
  };
}

// 사용법
app.get("/api/users", cache(300), userController.getAllUsers); // 5분 캐시
```

### 2. **클러스터링** 🏭

```javascript
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 ${process.pid} 시작`);

  // CPU 코어 수만큼 워커 프로세스 생성
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`워커 프로세스 ${worker.process.pid} 종료`);
    cluster.fork(); // 죽은 워커 재시작
  });
} else {
  // 워커 프로세스에서 Express 앱 실행
  const app = require("./app");
  app.listen(3000, () => {
    console.log(`워커 프로세스 ${process.pid} 시작`);
  });
}
```

### 3. **압축** 🗜️

```javascript
const compression = require("compression");

app.use(compression()); // 응답 압축
```

---

## 🚀 배포

### 1. **PM2 (Process Manager)** 👨‍💼

```bash
# PM2 글로벌 설치
npm install -g pm2

# 앱 시작
pm2 start app.js --name "my-app"

# 클러스터 모드로 시작
pm2 start app.js -i max --name "my-app-cluster"

# 상태 확인
pm2 status
pm2 logs
pm2 monit

# 재시작
pm2 restart my-app

# 중지
pm2 stop my-app
pm2 delete my-app
```

### 2. **Docker** 🐳

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

```bash
# Docker 이미지 빌드
docker build -t my-node-app .

# 컨테이너 실행
docker run -p 3000:3000 my-node-app
```

### 3. **환경별 설정** 🌍

```javascript
// config/index.js
const config = {
  development: {
    port: 3000,
    database: "mongodb://localhost:27017/myapp-dev",
    logLevel: "debug",
  },
  production: {
    port: process.env.PORT || 80,
    database: process.env.DATABASE_URL,
    logLevel: "error",
  },
};

module.exports = config[process.env.NODE_ENV || "development"];
```

---

## 🎯 학습 로드맵

### 1단계: 기초 📚

- [ ] Node.js 설치 및 기본 개념
- [ ] 모듈 시스템 (require/module.exports)
- [ ] 기본 내장 모듈 (fs, path, http)
- [ ] NPM 사용법

### 2단계: 웹 서버 🌐

- [ ] HTTP 모듈로 서버 만들기
- [ ] Express.js 기초
- [ ] 라우팅과 미들웨어
- [ ] 정적 파일 서빙

### 3단계: 데이터베이스 🗄️

- [ ] MongoDB/MySQL 연동
- [ ] CRUD 작업
- [ ] 데이터 모델링
- [ ] ORM/ODM 사용 (Mongoose, Sequelize)

### 4단계: 고급 기능 ⭐

- [ ] 인증과 인가 (JWT)
- [ ] 파일 업로드
- [ ] 실시간 통신 (Socket.io)
- [ ] 캐싱과 성능 최적화

### 5단계: 배포와 운영 🚀

- [ ] 환경 변수 관리
- [ ] 로깅과 모니터링
- [ ] 테스팅 (Jest, Supertest)
- [ ] CI/CD 파이프라인

---

## 💡 팁과 주의사항

### ✅ 좋은 습관

- **비동기 프로그래밍** 적극 활용
- **에러 처리** 필수 (try-catch, error 미들웨어)
- **환경 변수** 사용하여 설정 관리
- **모듈화**로 코드 분리
- **보안** 고려 (helmet, rate limiting 등)

### ❌ 피해야 할 것들

- 동기식 함수 과다 사용 (성능 저하)
- 콜백 지옥 (Promise/async-await 사용)
- 전역 변수 남용
- 에러 처리 누락
- 보안 취약점 방치

### 🔧 유용한 도구들

- **nodemon**: 개발 시 자동 재시작
- **eslint**: 코드 스타일 검사
- **prettier**: 코드 포맷팅
- **jest**: 테스팅 프레임워크
- **postman**: API 테스트 도구

---

## 🌟 마무리

Node.js는 **JavaScript로 서버 사이드 개발**을 가능하게 해주는 강력한 플랫폼입니다!

**핵심만 기억하세요:**

1. 🚀 **런타임** = JavaScript를 어디서든 실행
2. ⚡ **비동기** = 효율적인 I/O 처리
3. 📦 **NPM** = 풍부한 패키지 생태계
4. 🌐 **Express** = 웹 서버 개발의 표준
5. 🔄 **이벤트 기반** = 확장 가능한 아키텍처

**Netflix, Uber, NASA**도 사용하는 Node.js와 함께 **풀스택 개발자**가 되어보세요! 🚀✨

**한 번에 모든 걸 이해하려 하지 말고, 천천히 실습하면서 익혀가세요!** 😊
