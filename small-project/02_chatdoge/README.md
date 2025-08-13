# 챗도지 - 전문 운세 상담 서비스

![챗도지 로고](frontend/doge.png)

## 📋 프로젝트 개요

챗도지는 AI 기반의 전문 운세 상담 서비스입니다. 사용자의 생년월일과 출생시간을 바탕으로 개인 맞춤 운세를 제공합니다.

## ✨ 주요 기능

### 무료 기능

- 일일 5회 무료 운세 상담
- 기본 운세 분석 (종합운, 애정운, 직업운, 건강운)
- 빠른 질문 기능
- 대화형 인터페이스

### 프리미엄 기능 (출시 예정)

- 무제한 운세 상담
- 상세한 사주 분석
- 개인 맞춤 조언
- 광고 없는 이용
- 운세 히스토리 저장

## 🛠 기술 스택

### Backend

- Node.js + Express.js
- OpenAI GPT API
- Serverless Framework
- CORS, Rate Limiting

### Frontend

- Vanilla JavaScript
- CSS3 (Flexbox, Grid)
- 반응형 디자인
- Progressive Web App 지원

### 배포

- Frontend: Cloudflare Pages
- Backend: AWS Lambda (Serverless)

## 🚀 로컬 개발 환경 설정

### 1. 환경 변수 설정

```bash
# backend/.env 파일 생성
OPENAI_API_KEY=your_openai_api_key
PORT=3000
NODE_ENV=development
```

### 2. 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

### 3. 프론트엔드 실행

프론트엔드는 정적 파일이므로 Live Server나 로컬 웹서버로 실행:

```bash
cd frontend
# Live Server 확장으로 index.html 실행
# 또는 Python으로: python -m http.server 8000
```
