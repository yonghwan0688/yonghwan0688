<h1>RESTful API의 개념과 설계</h1>

RESTful API(Representational State Transfer API)는 자원을 HTTP 프로토콜 기반으로 정의하고, 해당 자원에 접근하거나 조작하기 위한 방식입니다.
다음은 RESTful API에 대한 핵심 개념 및 설계 방법, 그리고 Express와 MongoDB를 활용한 예제를 포함한 설명입니다.

---

## ✅ 1. REST 원칙 및 HTTP 메서드

### ▶ REST란?

REST(Representational State Transfer)는 자원을 URI로 표현하고, HTTP 메서드를 통해 자원에 대한 행위를 정의하는 아키텍처 스타일입니다.

### ▶ REST의 기본 원칙

1. **클라이언트-서버 구조**: 클라이언트와 서버는 역할이 분리됨.
2. **무상태성 (Stateless)**: 각 요청은 독립적이며, 서버는 이전 요청 정보를 저장하지 않음.
3. **캐시 처리 가능 (Cacheable)**: 응답은 캐시 가능해야 함.
4. **계층 구조 (Layered System)**: 클라이언트는 중간 서버를 통해 요청 가능.
5. **인터페이스 일관성 (Uniform Interface)**: 모든 API는 일관된 방식으로 접근 가능해야 함.
6. **자원 기반 (Resource-Oriented)**: 모든 것은 "자원"으로 표현됨. URI는 자원의 고유 식별자 역할을 함.

---

### ▶ HTTP 메서드와 역할

| 메서드 | 의미      | 설명                  |
| ------ | --------- | --------------------- |
| GET    | 조회      | 자원 정보 요청        |
| POST   | 생성      | 자원 생성 요청        |
| PUT    | 전체 수정 | 자원의 전체 정보 수정 |
| PATCH  | 부분 수정 | 자원의 일부 정보 수정 |
| DELETE | 삭제      | 자원 삭제 요청        |

---

## ✅ 2. RESTful 엔드포인트 설계 방법

RESTful한 API는 명확하고 일관된 URI 패턴을 사용합니다.

### ▶ URI 설계 원칙

- **명사 사용**: 동사가 아닌 자원을 나타내는 명사 사용
  예: `/users` (O), `/getUsers` (X)
- **계층 구조 표현**:
  예: `/users/123/posts` → 사용자 123의 게시글
- **복수형 사용**: `/users`, `/products`

### ▶ 예시: 사용자 관련 API 설계

| 기능             | HTTP 메서드 | URI         |
| ---------------- | ----------- | ----------- |
| 사용자 목록 조회 | GET         | /users      |
| 특정 사용자 조회 | GET         | /users/\:id |
| 사용자 생성      | POST        | /users      |
| 사용자 정보 수정 | PUT/PATCH   | /users/\:id |
| 사용자 삭제      | DELETE      | /users/\:id |

---

## ✅ 3. Express + MongoDB 기반 RESTful API 예제

### ▶ 프로젝트 구조

```
project/
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── server.js
└── .env
```

### ▶ 설치 패키지

```bash
npm init -y
npm install express mongoose dotenv
```

---

### ▶ `models/User.js`

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model("User", userSchema);
```

---

### ▶ `routes/userRoutes.js`

```js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST /users
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
```

---

### ▶ `server.js`

```js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### ▶ `.env` 파일 예시

```
MONGO_URI=mongodb://localhost:27017/restapi
PORT=5000
```

---

필요하다면 Postman 또는 curl을 통해 API 테스트를 진행할 수 있습니다.

---

필요 시 `async/await` 오류 처리를 위한 try/catch 블록이나 `express-async-handler`, `Joi`를 통한 유효성 검사도 추가할 수 있습니다. 추가 예제가 필요하신가요?
