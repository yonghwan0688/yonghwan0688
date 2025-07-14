# 웹 배포 & DevOps 완전 가이드

## 목차

1. [웹 배포란 무엇인가?](#1-웹-배포란-무엇인가)
2. [배포 환경의 이해](#2-배포-환경의-이해)
3. [정적 사이트 배포](#3-정적-사이트-배포)
4. [동적 사이트 배포](#4-동적-사이트-배포)
5. [데이터베이스 배포](#5-데이터베이스-배포)
6. [CI/CD 파이프라인](#6-cicd-파이프라인)
7. [도메인과 SSL](#7-도메인과-ssl)
8. [성능 최적화](#8-성능-최적화)
9. [모니터링과 로깅](#9-모니터링과-로깅)
10. [보안 고려사항](#10-보안-고려사항)
11. [학습 로드맵](#11-학습-로드맵)

---

## 1. 웹 배포란 무엇인가?

### 🎯 배포의 정의

**웹 배포**는 개발한 웹 애플리케이션을 인터넷에서 접근 가능하도록 서버에 올리는 과정입니다.

### 📚 비유로 이해하기

```
배포 = 집에서 만든 요리를 식당에서 판매하는 것

개발 (집에서 요리) → 테스트 (맛보기) → 배포 (식당에서 판매)
```

### ✨ 배포의 중요성

- **접근성**: 전 세계 누구나 접근 가능
- **확장성**: 많은 사용자 처리 가능
- **안정성**: 24시간 서비스 제공
- **성능**: 빠른 로딩 속도

---

## 2. 배포 환경의 이해

### 🏗️ 환경 구분

```
Development (개발)
    ↓
Staging (스테이징)
    ↓
Production (운영)
```

### 📋 각 환경의 특징

```javascript
// 환경별 설정 예시
const config = {
  development: {
    database: "mongodb://localhost:27017/myapp-dev",
    port: 3000,
    debug: true,
  },
  staging: {
    database: "mongodb://staging-db:27017/myapp-staging",
    port: 3000,
    debug: true,
  },
  production: {
    database: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
    debug: false,
  },
};
```

---

## 3. 정적 사이트 배포

### 🌐 정적 사이트 특징

- HTML, CSS, JavaScript만 사용
- 서버 처리 없음
- 빠르고 안전함

### 🚀 주요 배포 플랫폼

#### Netlify 배포

```bash
# 1. 빌드 준비
npm run build

# 2. Netlify에 배포
# 방법 1: 드래그 앤 드롭
# dist 폴더를 netlify.com에 드래그

# 방법 2: Git 연결
# GitHub 저장소 연결 후 자동 배포
```

#### Vercel 배포

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

#### GitHub Pages 배포

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 4. 동적 사이트 배포

### ⚙️ 서버 필요 기능

- 데이터베이스 연결
- API 처리
- 사용자 인증
- 실시간 기능

### 🌐 주요 배포 플랫폼

#### Heroku 배포

```json
// package.json
{
  "scripts": {
    "start": "node server.js",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "16.x"
  }
}
```

```javascript
// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

```bash
# Heroku 배포 과정
heroku login
heroku create myapp-name
git push heroku main
heroku open
```

#### Railway 배포

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인 및 배포
railway login
railway init
railway up
```

#### DigitalOcean App Platform

```yaml
# .do/app.yaml
name: my-web-app
services:
  - name: web
    source_dir: /
    github:
      repo: username/repository
      branch: main
    run_command: npm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
```

---

## 5. 데이터베이스 배포

### 🗄️ 데이터베이스 옵션

#### MongoDB Atlas

```javascript
// MongoDB 연결
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
```

#### PostgreSQL (Heroku)

```javascript
// PostgreSQL 연결
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
```

#### Firebase

```javascript
// Firebase 설정
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

## 6. CI/CD 파이프라인

### 🔄 CI/CD 개념

```
CI (Continuous Integration): 지속적 통합
CD (Continuous Deployment): 지속적 배포

코드 푸시 → 자동 테스트 → 자동 빌드 → 자동 배포
```

### ⚙️ GitHub Actions 설정

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v2

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

### 🔧 환경 변수 관리

```bash
# .env 파일 예시
NODE_ENV=production
DATABASE_URL=mongodb://...
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

---

## 7. 도메인과 SSL

### 🌐 도메인 연결

```bash
# DNS 설정 예시
A 레코드: @ → 서버 IP 주소
CNAME: www → your-app.herokuapp.com
```

### 🔒 SSL 인증서

```javascript
// Express.js SSL 설정
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem"),
};

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
```

### 🆓 무료 SSL (Let's Encrypt)

```bash
# Certbot 설치 및 사용
sudo apt-get install certbot
sudo certbot --nginx -d yourdomain.com
```

---

## 8. 성능 최적화

### ⚡ 프론트엔드 최적화

```javascript
// 코드 스플리팅 (React)
import React, { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

```javascript
// 이미지 최적화
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 🚀 백엔드 최적화

```javascript
// Redis 캐싱
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

app.get("/api/data", async (req, res) => {
  const cacheKey = "api_data";

  try {
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const data = await fetchDataFromDB();
    await client.setex(cacheKey, 3600, JSON.stringify(data));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 9. 모니터링과 로깅

### 📊 모니터링 도구

```javascript
// 헬스 체크 엔드포인트
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

### 📝 로깅 설정

```javascript
// Winston 로거
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// 사용 예시
logger.info("User logged in", { userId: 123 });
logger.error("Database connection failed", { error: err.message });
```

---

## 10. 보안 고려사항

### 🔒 기본 보안 설정

```javascript
// 보안 헤더 설정
const helmet = require("helmet");
app.use(helmet());

// CORS 설정
const cors = require("cors");
app.use(
  cors({
    origin: ["https://yourfrontend.com"],
    credentials: true,
  })
);

// Rate limiting
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100개 요청
});
app.use(limiter);
```

### 🔐 환경 변수 보안

```javascript
// 환경 변수 검증
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is required`);
  }
});
```

---

## 11. 학습 로드맵

### 📚 단계별 학습

```
1주차: 정적 사이트 배포
- Netlify, Vercel 사용해보기
- 도메인 연결
- 기본 설정

2주차: 동적 사이트 배포
- Heroku, Railway 사용해보기
- 데이터베이스 연결
- 환경 변수 설정

3주차: CI/CD 파이프라인
- GitHub Actions 설정
- 자동 테스트 및 배포
- 환경별 배포

4주차: 최적화 및 모니터링
- 성능 최적화
- 모니터링 설정
- 보안 강화
```

### 🎯 실습 프로젝트

1. **정적 포트폴리오**: Netlify로 배포
2. **To-Do API**: Heroku + MongoDB Atlas
3. **풀스택 앱**: CI/CD 파이프라인 구축
4. **프로덕션 앱**: 모니터링과 보안 적용

### 📋 배포 체크리스트

```markdown
배포 전 체크리스트:

- [ ] 모든 테스트 통과
- [ ] 환경 변수 설정
- [ ] 데이터베이스 준비
- [ ] 도메인 및 SSL 설정
- [ ] 성능 최적화
- [ ] 보안 설정
- [ ] 모니터링 설정
- [ ] 백업 계획
```

### 🔗 참고 자료

- [Netlify 문서](https://docs.netlify.com/)
- [Heroku 문서](https://devcenter.heroku.com/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Let's Encrypt](https://letsencrypt.org/)

---

## 마무리

웹 배포는 개발의 마지막 단계이면서 가장 중요한 과정입니다. 사용자가 실제로 서비스를 이용할 수 있게 만드는 단계이기 때문입니다.

**핵심은 안정적이고 빠르며 안전한 서비스를 제공하는 것입니다!**

💡 **팁**: 배포는 한 번에 완벽하게 하기 어렵습니다. 작은 프로젝트부터 시작해서 점진적으로 복잡한 배포 환경을 익혀나가세요!
