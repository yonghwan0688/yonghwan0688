# API & REST 완전 정복 가이드

## 목차

1. [API란 무엇인가?](#1-api란-무엇인가)
2. [REST API 기초](#2-rest-api-기초)
3. [HTTP 메서드와 상태 코드](#3-http-메서드와-상태-코드)
4. [API 설계 원칙](#4-api-설계-원칙)
5. [Express.js로 API 만들기](#5-expressjs로-api-만들기)
6. [데이터베이스 연동](#6-데이터베이스-연동)
7. [인증과 보안](#7-인증과-보안)
8. [API 테스팅](#8-api-테스팅)
9. [API 문서화](#9-api-문서화)
10. [실전 프로젝트](#10-실전-프로젝트)
11. [학습 로드맵](#11-학습-로드맵)

---

## 1. API란 무엇인가?

### 🎯 API의 정의

**API**(Application Programming Interface)는 서로 다른 프로그램들이 소통할 수 있게 해주는 규칙과 도구의 집합입니다.

### 📚 비유로 이해하기

```
API = 레스토랑의 웨이터

고객(클라이언트) ↔ 웨이터(API) ↔ 주방(서버)

- 고객이 메뉴(요청)를 주문
- 웨이터가 주방에 전달
- 주방에서 요리(데이터) 준비
- 웨이터가 고객에게 서빙(응답)
```

### ✨ API의 장점

- **분리된 개발**: 프론트엔드와 백엔드 독립 개발
- **재사용성**: 여러 클라이언트에서 동일한 API 사용
- **확장성**: 새로운 기능 쉽게 추가
- **유지보수**: 각 부분 독립적으로 수정 가능

---

## 2. REST API 기초

### 🏗️ REST란?

**REST**(Representational State Transfer)는 웹 API를 설계하는 아키텍처 스타일입니다.

### 📋 REST 원칙

```
1. Stateless (무상태)
   - 각 요청은 독립적
   - 서버는 클라이언트 상태를 저장하지 않음

2. Resource-based (리소스 기반)
   - URL로 리소스를 식별
   - /users, /posts, /comments

3. HTTP Methods (HTTP 메서드 사용)
   - GET, POST, PUT, DELETE

4. Representation (표현)
   - JSON, XML 등으로 데이터 표현

5. HATEOAS (하이퍼미디어)
   - 응답에 관련 링크 포함
```

### 🎯 RESTful URL 설계

```javascript
// 좋은 예시
GET    /api/users           // 모든 사용자 조회
GET    /api/users/123       // 특정 사용자 조회
POST   /api/users           // 새 사용자 생성
PUT    /api/users/123       // 사용자 정보 수정
DELETE /api/users/123       // 사용자 삭제

GET    /api/users/123/posts // 특정 사용자의 게시글들

// 나쁜 예시
GET    /api/getUsers
POST   /api/createUser
GET    /api/user-delete?id=123
```

---

## 3. HTTP 메서드와 상태 코드

### 🔧 주요 HTTP 메서드

```javascript
// GET - 데이터 조회
app.get("/api/users", (req, res) => {
  // 사용자 목록 반환
});

// POST - 데이터 생성
app.post("/api/users", (req, res) => {
  // 새 사용자 생성
});

// PUT - 데이터 전체 수정
app.put("/api/users/:id", (req, res) => {
  // 사용자 정보 전체 업데이트
});

// PATCH - 데이터 부분 수정
app.patch("/api/users/:id", (req, res) => {
  // 사용자 정보 부분 업데이트
});

// DELETE - 데이터 삭제
app.delete("/api/users/:id", (req, res) => {
  // 사용자 삭제
});
```

### 📊 HTTP 상태 코드

```javascript
// 성공 응답
200 OK          // 요청 성공
201 Created     // 리소스 생성 성공
204 No Content  // 성공하지만 반환할 내용 없음

// 클라이언트 오류
400 Bad Request     // 잘못된 요청
401 Unauthorized    // 인증 필요
403 Forbidden       // 권한 없음
404 Not Found       // 리소스 없음
409 Conflict        // 충돌 (중복 등)

// 서버 오류
500 Internal Server Error // 서버 내부 오류
502 Bad Gateway          // 게이트웨이 오류
503 Service Unavailable  // 서비스 이용 불가

// 사용 예시
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 4. API 설계 원칙

### 📝 일관된 응답 형식

```javascript
// 성공 응답 형식
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully"
}

// 오류 응답 형식
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 123 not found"
  }
}

// 페이지네이션 응답
{
  "success": true,
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 🔍 쿼리 파라미터 활용

```javascript
// 필터링
GET /api/users?role=admin&status=active

// 정렬
GET /api/users?sort=name&order=asc

// 페이지네이션
GET /api/users?page=1&limit=10

// 필드 선택
GET /api/users?fields=name,email

// 검색
GET /api/users?search=john

// 구현 예시
app.get('/api/users', async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc',
    search,
    role
  } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (role) {
    query.role = role;
  }

  const users = await User.find(query)
    .sort({ [sort]: order === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});
```

---

## 5. Express.js로 API 만들기

### 🚀 기본 설정

```javascript
// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// 미들웨어 설정
app.use(helmet()); // 보안 헤더
app.use(cors()); // CORS 설정
app.use(morgan("combined")); // 로깅
app.use(express.json({ limit: "10mb" })); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      posts: "/api/posts",
    },
  });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      message: "Something went wrong!",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

// 404 핸들링
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 📁 라우터 분리

```javascript
// routes/users.js
const express = require("express");
const router = express.Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message },
    });
  }
});

module.exports = router;

// app.js에서 사용
app.use("/api/users", require("./routes/users"));
```

---

## 6. 데이터베이스 연동

### 🗄️ MongoDB 연동

```javascript
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // 기본적으로 조회시 제외
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 비밀번호 해싱 미들웨어
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const bcrypt = require("bcrypt");
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 인스턴스 메서드
userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = require("bcrypt");
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

### 🔧 CRUD 컨트롤러

```javascript
// controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query;

    res.json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: { message: "Email already exists" },
      });
    }

    res.status(400).json({
      success: false,
      error: { message: error.message },
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // 업데이트된 문서 반환
      runValidators: true, // 유효성 검사 실행
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
    }

    res.json({
      success: true,
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
    }

    res.status(204).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
};
```

---

## 7. 인증과 보안

### 🔐 JWT 인증

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

exports.protect = async (req, res, next) => {
  try {
    // 1. 토큰 확인
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: "Access token required" },
      });
    }

    // 2. 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. 사용자 확인
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: "User no longer exists" },
      });
    }

    // 4. 사용자 정보를 req에 추가
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { message: "Invalid token" },
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { message: "Access denied" },
      });
    }
    next();
  };
};
```

### 🔑 로그인/회원가입

```javascript
// controllers/authController.js
const User = require("../models/User");
const { generateToken } = require("../middleware/auth");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 사용자 생성
    const user = await User.create({ name, email, password });

    // 토큰 생성
    const token = generateToken({ id: user._id });

    // 비밀번호 제거 후 응답
    user.password = undefined;

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. 이메일과 비밀번호 확인
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: "Please provide email and password" },
      });
    }

    // 2. 사용자 찾기 (비밀번호 포함)
    const user = await User.findOne({ email }).select("+password");

    // 3. 비밀번호 확인
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: { message: "Invalid email or password" },
      });
    }

    // 4. 토큰 생성
    const token = generateToken({ id: user._id });

    // 5. 비밀번호 제거 후 응답
    user.password = undefined;

    res.json({
      success: true,
      data: {
        user,
        token,
      },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
};
```

---

## 8. API 테스팅

### 🧪 Jest와 Supertest

```javascript
// tests/auth.test.js
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth Endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.token).toBeDefined();
    });

    it("should not create user with invalid email", async () => {
      const userData = {
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      // 먼저 사용자 생성
      const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "password123",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });
  });
});
```

### 📝 Postman 컬렉션

```json
{
  "info": {
    "name": "My API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/auth/signup",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "signup"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    }
  ]
}
```

---

## 9. API 문서화

### 📚 Swagger/OpenAPI

```javascript
// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // API 경로
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

// app.js에서 사용
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
```

```javascript
// routes/users.js에 JSDoc 주석 추가
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: User's role
 */
```

---

## 10. 실전 프로젝트

### 🎯 블로그 API 구현

```javascript
// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 가상 필드
postSchema.virtual("slug").get(function () {
  return this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
});

// 인덱스
postSchema.index({ title: "text", content: "text" });
postSchema.index({ author: 1, published: 1 });

module.exports = mongoose.model("Post", postSchema);
```

```javascript
// routes/posts.js
const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middleware/auth");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/postController");

// 공개 라우트
router.get("/", getAllPosts);
router.get("/:id", getPost);

// 인증 필요 라우트
router.use(protect);

router.get("/my/posts", getMyPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
```

---

## 11. 학습 로드맵

### 📚 단계별 학습

```
1주차: API 기초
- REST API 개념 이해
- HTTP 메서드와 상태 코드
- Express.js 기본 설정

2주차: 데이터베이스 연동
- MongoDB 연결
- 모델 설계
- CRUD 작업

3주차: 인증과 보안
- JWT 인증 구현
- 권한 관리
- 보안 미들웨어

4주차: 고급 기능
- 파일 업로드
- 이메일 발송
- API 문서화
- 테스팅
```

### 🎯 실습 프로젝트

1. **간단한 To-Do API**: 기본 CRUD
2. **사용자 관리 API**: 인증/권한
3. **블로그 API**: 관계형 데이터
4. **전자상거래 API**: 복잡한 비즈니스 로직

### 🔗 참고 자료

- [Express.js 문서](https://expressjs.com/)
- [MongoDB 문서](https://docs.mongodb.com/)
- [JWT 문서](https://jwt.io/)
- [Swagger 문서](https://swagger.io/)

---

## 마무리

API는 현대 웹 개발의 핵심입니다. 프론트엔드와 백엔드를 연결하고, 다양한 클라이언트에서 동일한 데이터와 기능을 사용할 수 있게 해줍니다.

**핵심은 일관성 있고 직관적인 API를 설계하는 것입니다!**

💡 **팁**: API 설계는 사용자(개발자) 경험을 고려해야 합니다. 명확한 문서화와 예측 가능한 동작이 좋은 API의 기준입니다!
