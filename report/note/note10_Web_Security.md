# 🔒 웹 보안 기초 정리

## 🎯 웹 보안이란?

**웹 보안 = 나쁜 사람들로부터 웹사이트 지키기!** 🛡️

쉽게 말해서:

- **해커들의 공격**으로부터 보호하기
- **사용자 정보**를 안전하게 지키기
- **웹사이트가 정상 작동**하도록 하기

### 🏰 성 지키기로 비유하면...

```
성벽 = 방화벽 (Firewall)
성문 = 인증 (Authentication)
경비병 = 권한 검사 (Authorization)
비밀 통로 = HTTPS 암호화
```

---

## 🚨 주요 보안 위협들

### 1. SQL 인젝션

**나쁜 SQL 코드를 주입하는 공격**

```javascript
// ❌ 위험한 코드
const query = `SELECT * FROM users WHERE id = ${userId}`;
// 공격자가 userId에 "1 OR 1=1"을 넣으면 모든 데이터 노출!

// ✅ 안전한 코드
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]); // 파라미터 바인딩 사용
```

### 2. XSS (Cross-Site Scripting)

**악성 스크립트를 주입하는 공격**

```javascript
// ❌ 위험한 코드
document.getElementById("content").innerHTML = userInput;
// 공격자가 <script>alert('해킹!')</script> 입력하면 실행됨!

// ✅ 안전한 코드
document.getElementById("content").textContent = userInput;
// 또는 HTML 이스케이프 처리
```

### 3. CSRF (Cross-Site Request Forgery)

**다른 사이트에서 요청을 위조하는 공격**

```javascript
// ✅ CSRF 토큰으로 보호
app.use(csrf());
app.post("/transfer", (req, res) => {
  if (req.body._csrf !== req.session.csrfToken) {
    return res.status(403).send("CSRF 토큰 불일치");
  }
  // 실제 처리...
});
```

---

## 🔐 기본 보안 수칙

### 1. 비밀번호 안전하게 저장하기

```javascript
const bcrypt = require("bcrypt");

// 비밀번호 해싱
async function 비밀번호해싱(평문비밀번호) {
  const saltRounds = 10;
  const 해시된비밀번호 = await bcrypt.hash(평문비밀번호, saltRounds);
  return 해시된비밀번호;
}

// 비밀번호 확인
async function 비밀번호확인(평문비밀번호, 해시된비밀번호) {
  return await bcrypt.compare(평문비밀번호, 해시된비밀번호);
}
```

### 2. HTTPS 사용하기

```javascript
// HTTP를 HTTPS로 리다이렉트
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});
```

### 3. 입력값 검증하기

```javascript
// 이메일 형식 검사
function 이메일검증(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 문자열 길이 제한
function 입력값검증(input, maxLength = 100) {
  if (!input || input.length > maxLength) {
    throw new Error("입력값이 유효하지 않습니다");
  }
  return input.trim();
}
```

---

## 🔑 인증과 권한

### 1. 간단한 로그인 시스템

```javascript
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // HTTPS에서는 true
  })
);

// 로그인
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 사용자 찾기
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "사용자를 찾을 수 없습니다" });
  }

  // 비밀번호 확인
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "비밀번호가 틀렸습니다" });
  }

  // 세션에 사용자 정보 저장
  req.session.userId = user.id;
  res.json({ success: true, user: { id: user.id, email: user.email } });
});

// 로그아웃
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});
```

### 2. 로그인 확인 미들웨어

```javascript
function 로그인확인(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "로그인이 필요합니다" });
  }
  next();
}

// 보호된 라우트
app.get("/profile", 로그인확인, (req, res) => {
  res.json({ message: "프로필 페이지입니다" });
});
```

---

## 🛡️ 보안 헤더 설정

### Helmet 사용하기

```javascript
const helmet = require("helmet");

// 기본 보안 헤더 설정
app.use(helmet());

// 또는 개별 설정
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
  })
);
```

### 수동으로 보안 헤더 설정

```javascript
app.use((req, res, next) => {
  // XSS 보호
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // 콘텐츠 타입 스니핑 방지
  res.setHeader("X-Content-Type-Options", "nosniff");

  // 클릭재킹 방지
  res.setHeader("X-Frame-Options", "DENY");

  // HTTPS 강제
  res.setHeader("Strict-Transport-Security", "max-age=31536000");

  next();
});
```

---

## 🔧 실용적인 보안 팁

### 1. 환경변수 사용하기

```javascript
// .env 파일
DATABASE_URL=postgresql://user:pass@localhost/mydb
JWT_SECRET=super-secret-key-here
API_KEY=your-api-key

// 코드에서 사용
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

### 2. 요청 제한하기

```javascript
const rateLimit = require("express-rate-limit");

// API 요청 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100번 요청
  message: "너무 많은 요청입니다. 나중에 시도해주세요.",
});

app.use("/api/", limiter);
```

### 3. 파일 업로드 보안

```javascript
const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 가능합니다"));
    }
  },
});
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] HTTPS 사용하기
- [ ] 비밀번호 해싱하기
- [ ] 입력값 검증하기
- [ ] 기본 보안 헤더 설정

### 🥈 2단계: 중급 (2-3주)

- [ ] 로그인/로그아웃 시스템
- [ ] CSRF 보호하기
- [ ] 파일 업로드 보안
- [ ] 요청 제한하기

### 🥇 3단계: 고급 (4주 이상)

- [ ] JWT 토큰 사용하기
- [ ] 2단계 인증 (2FA)
- [ ] 보안 테스트하기
- [ ] 보안 모니터링

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **최소 권한 원칙** - 필요한 권한만 부여
- **정기적 업데이트** - 라이브러리, 프레임워크 최신 버전 유지
- **로그 남기기** - 의심스러운 활동 추적
- **백업하기** - 중요한 데이터는 정기적으로 백업

### ❌ 이건 피하세요

- 비밀번호를 평문으로 저장하기
- 에러 메시지에 시스템 정보 노출
- HTTP로 민감한 정보 전송
- 사용자 입력을 그대로 신뢰하기

---

## 🌟 마무리

**웹 보안 핵심 3가지:**

1. 🔐 **암호화** = HTTPS, 비밀번호 해싱
2. 🛡️ **입력 검증** = 모든 사용자 입력 검사하기
3. 🔑 **인증/권한** = 로그인 시스템, 권한 관리

**기억하세요:**

- 보안은 **한 번 설정하고 끝이 아니에요**
- **사용자를 믿지 말고 검증하세요**
- **최신 보안 동향**을 계속 학습하세요
- **완벽한 보안은 없으니** 다층 방어하세요!

**화이팅! 🚀✨**
