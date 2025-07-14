# 웹 보안 완전 가이드

## 목차

1. [웹 보안이란?](#1-웹-보안이란)
2. [주요 보안 위협](#2-주요-보안-위협)
3. [OWASP Top 10](#3-owasp-top-10)
4. [인증과 인가](#4-인증과-인가)
5. [데이터 보호](#5-데이터-보호)
6. [프론트엔드 보안](#6-프론트엔드-보안)
7. [백엔드 보안](#7-백엔드-보안)
8. [네트워크 보안](#8-네트워크-보안)
9. [보안 테스팅](#9-보안-테스팅)
10. [보안 모범 사례](#10-보안-모범-사례)
11. [학습 로드맵](#11-학습-로드맵)

---

## 1. 웹 보안이란?

### 🎯 웹 보안의 정의

**웹 보안**은 웹 애플리케이션과 사용자 데이터를 다양한 사이버 위협으로부터 보호하는 방법들의 집합입니다.

### 📚 비유로 이해하기

```
웹 보안 = 은행의 보안 시스템

- 출입 통제 (인증)
- 권한 관리 (인가)
- 금고 보안 (데이터 암호화)
- CCTV 감시 (로깅/모니터링)
- 경비원 순찰 (보안 테스팅)
```

### ✨ 보안의 3요소 (CIA)

- **기밀성(Confidentiality)**: 허가된 사용자만 접근
- **무결성(Integrity)**: 데이터 변조 방지
- **가용성(Availability)**: 서비스 중단 방지

---

## 2. 주요 보안 위협

### 🔍 일반적인 공격 유형

#### SQL Injection

```javascript
// 취약한 코드
const query = `SELECT * FROM users WHERE id = ${userId}`;

// 공격 예시: userId = "1; DROP TABLE users; --"

// 안전한 코드
const query = "SELECT * FROM users WHERE id = ?";
db.execute(query, [userId]);

// Mongoose ORM 사용 (안전함)
const user = await User.findById(userId);
```

#### Cross-Site Scripting (XSS)

```javascript
// 취약한 코드
document.getElementById("output").innerHTML = userInput;

// 공격 예시: userInput = "<script>alert('XSS')</script>"

// 안전한 코드
document.getElementById("output").textContent = userInput;

// React에서는 기본적으로 안전함
function Component({ userInput }) {
  return <div>{userInput}</div>; // 자동으로 이스케이프됨
}

// 의도적으로 HTML 렌더링할 때만 주의
function UnsafeComponent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```

#### Cross-Site Request Forgery (CSRF)

```javascript
// CSRF 보호 미들웨어
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get("/form", (req, res) => {
  res.render("form", { csrfToken: req.csrfToken() });
});

// HTML 폼에 토큰 포함
// <input type="hidden" name="_csrf" value="{{csrfToken}}">
```

---

## 3. OWASP Top 10

### 🏆 2021년 OWASP Top 10

#### 1. Broken Access Control

```javascript
// 취약한 코드
app.get('/admin/users/:id', (req, res) => {
  // 권한 확인 없음
  const user = await User.findById(req.params.id);
  res.json(user);
});

// 안전한 코드
app.get('/admin/users/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
}
```

#### 2. Cryptographic Failures

```javascript
// 취약한 코드
const password = userInput; // 평문 저장

// 안전한 코드
const bcrypt = require("bcrypt");
const saltRounds = 12;

// 비밀번호 해싱
const hashedPassword = await bcrypt.hash(password, saltRounds);

// 비밀번호 검증
const isValid = await bcrypt.compare(password, hashedPassword);

// 환경 변수로 민감한 정보 관리
const jwtSecret = process.env.JWT_SECRET; // .env 파일에 저장
```

#### 3. Injection

```javascript
// NoSQL Injection 방지
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 취약함: req.body를 직접 사용
  // const user = await User.findOne(req.body);

  // 안전함: 명시적으로 필드 지정
  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // 로그인 성공
  }
});

// 입력 유효성 검사
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const { error, value } = loginSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
```

---

## 4. 인증과 인가

### 🔐 JWT 보안 구현

```javascript
// JWT 토큰 생성
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 강력한 시크릿 키 생성
const jwtSecret = crypto.randomBytes(64).toString("hex");

const generateTokens = (payload) => {
  // Access Token (짧은 만료시간)
  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });

  // Refresh Token (긴 만료시간)
  const refreshToken = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

// 토큰 검증 미들웨어
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};
```

### 🚪 다중 인증 (2FA)

```javascript
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

// 2FA 설정
app.post("/setup-2fa", verifyToken, async (req, res) => {
  const secret = speakeasy.generateSecret({
    issuer: "MyApp",
    name: req.user.email,
    length: 20,
  });

  // QR 코드 생성
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

  // 사용자에게 임시 시크릿 저장
  await User.findByIdAndUpdate(req.user.id, {
    tempTwoFactorSecret: secret.base32,
  });

  res.json({
    qrCode: qrCodeUrl,
    secret: secret.base32,
  });
});

// 2FA 검증
app.post("/verify-2fa", verifyToken, async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token: token,
    window: 2,
  });

  if (verified) {
    user.twoFactorEnabled = true;
    user.tempTwoFactorSecret = undefined;
    await user.save();

    res.json({ message: "2FA enabled successfully" });
  } else {
    res.status(400).json({ error: "Invalid token" });
  }
});
```

---

## 5. 데이터 보호

### 🔒 데이터 암호화

```javascript
const crypto = require("crypto");

class DataEncryption {
  constructor() {
    this.algorithm = "aes-256-gcm";
    this.secretKey = process.env.ENCRYPTION_KEY; // 32바이트 키
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.secretKey, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
    };
  }

  decrypt(encryptedData) {
    const { encrypted, iv, authTag } = encryptedData;

    const decipher = crypto.createDecipher(
      this.algorithm,
      this.secretKey,
      Buffer.from(iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

// 사용 예시
const encryption = new DataEncryption();

// 민감한 데이터 저장 전 암호화
userSchema.pre("save", function (next) {
  if (this.isModified("socialSecurityNumber")) {
    this.socialSecurityNumber = encryption.encrypt(this.socialSecurityNumber);
  }
  next();
});
```

### 🗄️ 데이터베이스 보안

```javascript
// MongoDB 연결 보안 설정
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // SSL 연결 강제
      sslValidate: true,
      authSource: "admin", // 인증 데이터베이스
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 민감한 필드 자동 제외
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.socialSecurityNumber;
  delete userObject.__v;
  return userObject;
};
```

---

## 6. 프론트엔드 보안

### 🌐 Content Security Policy (CSP)

```javascript
// Express CSP 설정
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.example.com;"
  );
  next();
});
```

### 🍪 쿠키 보안

```javascript
// 안전한 쿠키 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS에서만
      httpOnly: true, // JavaScript 접근 차단
      maxAge: 24 * 60 * 60 * 1000, // 24시간
      sameSite: "strict", // CSRF 보호
    },
    store: new MongoStore({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// JWT를 httpOnly 쿠키로 저장
app.post("/login", async (req, res) => {
  // 로그인 검증...

  const token = generateAccessToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15분
  });

  res.json({ message: "Login successful" });
});
```

### 🔍 입력 유효성 검사

```javascript
// React 폼 보안
import DOMPurify from "dompurify";

function SecureForm() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 살균
    const cleanInput = DOMPurify.sanitize(input);

    // 유효성 검사
    if (cleanInput.length < 1 || cleanInput.length > 100) {
      setError("Input must be between 1 and 100 characters");
      return;
    }

    // 서버로 전송
    submitData(cleanInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={100}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 7. 백엔드 보안

### 🛡️ 보안 헤더

```javascript
const helmet = require("helmet");

// 기본 보안 헤더 설정
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// 추가 보안 헤더
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
```

### 🚫 Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

// 기본 요청 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100개 요청
  message: {
    error: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 로그인 시도 제한
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts, please try again later",
  },
  skipSuccessfulRequests: true,
});

// 속도 제한 (점진적 지연)
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 2,
  delayMs: 500,
});

app.use("/api", limiter);
app.use("/api/auth/login", loginLimiter);
app.use("/api", speedLimiter);
```

### 📝 로깅과 모니터링

```javascript
const winston = require("winston");

// 보안 이벤트 로깅
const securityLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "security.log" }),
    new winston.transports.Console(),
  ],
});

// 보안 이벤트 미들웨어
const logSecurityEvent = (eventType) => {
  return (req, res, next) => {
    securityLogger.warn("Security Event", {
      type: eventType,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      url: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
    next();
  };
};

// 실패한 로그인 시도 로깅
app.post("/api/auth/login", async (req, res) => {
  try {
    // 로그인 로직...
  } catch (error) {
    logSecurityEvent("FAILED_LOGIN")(req, res, () => {});
    res.status(401).json({ error: "Invalid credentials" });
  }
});
```

---

## 8. 네트워크 보안

### 🔒 HTTPS 설정

```javascript
// SSL/TLS 설정
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("path/to/private-key.pem"),
  cert: fs.readFileSync("path/to/certificate.pem"),
  // 강력한 암호화 설정
  ciphers: [
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES128-SHA256",
    "ECDHE-RSA-AES256-SHA384",
  ].join(":"),
  honorCipherOrder: true,
};

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

// HTTP에서 HTTPS로 리다이렉트
const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(80);
```

### 🌐 CORS 보안 설정

```javascript
const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["https://myapp.com", "https://admin.myapp.com"];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
```

---

## 9. 보안 테스팅

### 🧪 보안 테스트 도구

```javascript
// 자동화된 보안 테스트
const request = require("supertest");
const app = require("../app");

describe("Security Tests", () => {
  test("should prevent SQL injection", async () => {
    const maliciousInput = "'; DROP TABLE users; --";

    const response = await request(app)
      .post("/api/users")
      .send({ name: maliciousInput })
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  test("should prevent XSS", async () => {
    const xssPayload = "<script>alert('xss')</script>";

    const response = await request(app)
      .post("/api/comments")
      .send({ content: xssPayload })
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  test("should enforce rate limiting", async () => {
    const requests = Array(101)
      .fill()
      .map(() => request(app).get("/api/data"));

    const responses = await Promise.all(requests);
    const tooManyRequests = responses.filter((res) => res.status === 429);

    expect(tooManyRequests.length).toBeGreaterThan(0);
  });
});
```

### 🔍 취약점 스캐닝

```bash
# npm audit으로 의존성 취약점 검사
npm audit

# 자동 수정
npm audit fix

# 보안 업데이트 강제
npm audit fix --force

# Snyk으로 더 자세한 분석
npx snyk test
npx snyk monitor
```

---

## 10. 보안 모범 사례

### ✅ 개발 단계별 보안 체크리스트

#### 개발 초기

```markdown
- [ ] 보안 요구사항 정의
- [ ] 위협 모델링 수행
- [ ] 안전한 코딩 가이드라인 수립
- [ ] 의존성 보안 검사 자동화
```

#### 개발 중

```markdown
- [ ] 입력 유효성 검사 구현
- [ ] 출력 인코딩 적용
- [ ] 인증/인가 메커니즘 구현
- [ ] 보안 헤더 설정
- [ ] 에러 처리 보안 고려
```

#### 배포 전

```markdown
- [ ] 보안 테스팅 수행
- [ ] 취약점 스캐닝
- [ ] 보안 설정 검토
- [ ] 로깅/모니터링 설정
```

### 🛠️ 보안 도구 활용

```json
// package.json 보안 스크립트
{
  "scripts": {
    "security:audit": "npm audit",
    "security:check": "snyk test",
    "security:monitor": "snyk monitor",
    "security:test": "jest --config=security.jest.config.js"
  },
  "devDependencies": {
    "snyk": "^1.x.x",
    "eslint-plugin-security": "^1.x.x"
  }
}
```

---

## 11. 학습 로드맵

### 📚 단계별 학습

```
1주차: 기본 개념
- 웹 보안 기초
- OWASP Top 10 이해
- 기본 취약점 유형

2주차: 인증/인가
- JWT 구현
- 세션 관리
- 2FA 구현

3주차: 데이터 보호
- 암호화 기법
- 안전한 저장
- 전송 보안

4주차: 실전 적용
- 보안 테스팅
- 모니터링 설정
- 인시던트 대응
```

### 🎯 실습 프로젝트

1. **보안 강화 To-Do 앱**: 기본 보안 기능
2. **인증 시스템**: JWT + 2FA
3. **보안 API**: 종합 보안 적용
4. **보안 감사**: 기존 앱 보안 검토

### 🔗 참고 자료

- [OWASP](https://owasp.org/)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Web Security Academy](https://portswigger.net/web-security)

---

## 마무리

웹 보안은 개발자가 반드시 알아야 할 필수 지식입니다. 보안은 한 번 설정하고 끝나는 것이 아니라, 지속적으로 관리하고 개선해야 하는 프로세스입니다.

**핵심은 보안을 개발 초기부터 고려하는 것입니다!**

💡 **팁**: 완벽한 보안은 불가능하지만, 기본적인 보안 원칙을 지키면 대부분의 공격을 방어할 수 있습니다. 보안은 투자이지 비용이 아닙니다!
