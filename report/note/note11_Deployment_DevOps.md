# 🚀 배포 & DevOps 기초 정리

## 🎯 배포란?

**배포 = 내가 만든 웹사이트를 인터넷에 올리기!** 🌐

쉽게 말해서:

- **다른 사람들도 볼 수 있게** 인터넷에 올리는 것
- **24시간 언제든지 접근**할 수 있게 하는 것
- **실제 서비스**로 만드는 과정

### 🏠 집 비유로 설명하면...

```
개발 = 집 설계하고 짓기 (로컬 컴퓨터)
배포 = 집 주소 정하고 이사하기 (서버)
도메인 = 집 주소 (www.mysite.com)
호스팅 = 땅 임대 (서버 공간 빌리기)
```

---

## 🌐 정적 사이트 배포 (쉬운 방법)

### 1. Netlify로 배포하기

**HTML, CSS, JavaScript만 있는 사이트**

```bash
# 1. 프로젝트 폴더 준비
my-website/
├── index.html
├── style.css
└── script.js

# 2. Netlify.com 가입
# 3. 폴더를 드래그 앤 드롭
# 4. 끝! 자동으로 URL 생성됨
```

### 2. GitHub Pages로 배포하기

```bash
# 1. GitHub 저장소 만들기
git init
git add .
git commit -m "첫 번째 커밋"
git remote add origin https://github.com/내아이디/내사이트.git
git push origin main

# 2. GitHub에서 Settings → Pages
# 3. Source를 "Deploy from a branch" 선택
# 4. Branch를 "main" 선택
# 5. 끝! https://내아이디.github.io/내사이트 로 접속 가능
```

### 3. Vercel로 배포하기

```bash
# 1. Vercel.com 가입
# 2. GitHub 연결
# 3. 저장소 선택
# 4. Deploy 버튼 클릭
# 5. 끝! 자동 배포 완료
```

---

## 🖥️ 서버 앱 배포 (Node.js)

### 1. Heroku로 배포하기

```bash
# package.json에 scripts 추가
{
  "scripts": {
    "start": "node app.js"
  }
}

# Procfile 파일 생성 (확장자 없음)
web: node app.js

# Heroku CLI 설치 후
heroku login
heroku create 내앱이름
git push heroku main
```

### 2. Railway로 배포하기 (Heroku 대안)

```bash
# 1. Railway.app 가입
# 2. GitHub 저장소 연결
# 3. 자동으로 배포됨
# 4. 환경변수는 웹 대시보드에서 설정
```

### 3. 환경변수 설정

```javascript
// .env 파일 (로컬용)
PORT=3000
DATABASE_URL=postgresql://localhost/mydb
JWT_SECRET=my-secret-key

// 코드에서 사용
const port = process.env.PORT || 3000;

// 배포할 때는 플랫폼에서 환경변수 설정
// Heroku: heroku config:set JWT_SECRET=my-secret-key
// Vercel: 웹 대시보드에서 설정
```

---

## 🏗️ 배포 자동화 (CI/CD)

### GitHub Actions로 자동 배포

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

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

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: "./dist"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 🌍 도메인과 DNS

### 도메인 구매하고 연결하기

```bash
# 1. 도메인 구매 (가비아, 후이즈, GoDaddy 등)
# 예: myawesomesite.com

# 2. DNS 설정
# A 레코드: myawesomesite.com → 서버 IP 주소
# CNAME 레코드: www.myawesomesite.com → myawesomesite.com

# 3. 배포 플랫폼에서 도메인 연결
# Netlify: Domain settings → Add custom domain
# Vercel: Project settings → Domains
```

### 무료 도메인 사용하기

```bash
# GitHub Pages: 자동으로 제공
https://username.github.io/repository-name

# Netlify: 임의 도메인 제공
https://amazing-euler-12345.netlify.app

# Vercel: 프로젝트명 기반 도메인
https://my-project.vercel.app
```

---

## 🔧 배포 체크리스트

### 배포 전 확인사항

```javascript
// ✅ 환경변수 확인
console.log("환경:", process.env.NODE_ENV);
console.log("포트:", process.env.PORT);

// ✅ 에러 처리
process.on("uncaughtException", (err) => {
  console.error("예상치 못한 에러:", err);
  process.exit(1);
});

// ✅ 정적 파일 서빙
app.use(express.static("public"));

// ✅ CORS 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ 헬스 체크 엔드포인트
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
```

### 성능 최적화

```javascript
// 이미지 압축
const sharp = require('sharp');

// CSS/JS 압축
const uglifyJS = require('uglify-js');
const cleanCSS = require('clean-css');

// CDN 사용
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">

// 캐싱 헤더
app.use(express.static('public', {
  maxAge: '1d' // 1일 캐싱
}));
```

---

## 📊 모니터링

### 간단한 로그 시스템

```javascript
// 요청 로깅
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 에러 로깅
app.use((err, req, res, next) => {
  console.error("에러 발생:", err);
  res.status(500).json({ error: "서버 오류" });
});

// 외부 모니터링 서비스
// - Sentry (에러 추적)
// - Google Analytics (사용자 분석)
// - Uptime Robot (서버 상태 모니터링)
```

---

## 🔄 배포 전략

### 1. 블루-그린 배포

```bash
# 두 개의 환경을 번갈아 사용
Production (Blue) ← 사용자 접속
Staging (Green) ← 새 버전 배포 후 테스트
# 테스트 완료되면 트래픽을 Green으로 전환
```

### 2. 점진적 배포 (Canary)

```bash
# 일부 사용자에게만 새 버전 제공
90% 사용자 → 기존 버전
10% 사용자 → 새 버전
# 문제없으면 점진적으로 비율 증가
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1주)

- [ ] GitHub Pages로 정적 사이트 배포
- [ ] Netlify로 프론트엔드 배포
- [ ] 도메인 연결해보기
- [ ] 환경변수 사용하기

### 🥈 2단계: 중급 (2-3주)

- [ ] Node.js 앱 Heroku/Railway 배포
- [ ] 데이터베이스 연결하기
- [ ] GitHub Actions 자동 배포
- [ ] 모니터링 설정하기

### 🥇 3단계: 고급 (4주 이상)

- [ ] Docker 컨테이너 배포
- [ ] AWS/GCP 클라우드 배포
- [ ] 로드 밸런싱, 스케일링
- [ ] 마이크로서비스 배포

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **작은 것부터 배포** - 완벽하지 않아도 일단 올려보기
- **백업하기** - 배포 전에 항상 백업
- **테스트 환경** - 실제 배포 전에 테스트 환경에서 확인
- **모니터링** - 배포 후 에러나 성능 문제 확인

### ❌ 이건 피하세요

- 프로덕션에서 직접 테스트하기
- 민감한 정보 (API 키, 비밀번호) 코드에 넣기
- 백업 없이 배포하기
- 롤백 계획 없이 배포하기

---

## 🌟 마무리

**배포 & DevOps 핵심 3가지:**

1. 🌐 **정적 배포** = Netlify, GitHub Pages로 시작
2. 🖥️ **서버 배포** = Heroku, Railway로 백엔드 올리기
3. 🔄 **자동화** = GitHub Actions로 자동 배포

**기억하세요:**

- 배포는 **개발의 마지막이 아니라 시작**이에요
- **작고 자주 배포**하는 게 좋아요
- **모니터링과 로그**를 꼭 확인하세요
- **사용자 피드백**을 빠르게 반영하세요!

**당신의 프로젝트가 세상에 나오길 응원해요! 🚀✨**
