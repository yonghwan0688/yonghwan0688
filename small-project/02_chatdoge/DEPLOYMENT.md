# 배포 스크립트

## 프론트엔드 배포 (Cloudflare Pages)

### 1. Cloudflare Pages 설정

1. Cloudflare 계정에서 Pages 생성
2. GitHub 리포지토리 연결
3. 빌드 설정:
   - Build command: (없음 - 정적 파일)
   - Build output directory: `/frontend`

### 2. 환경 변수 설정

Cloudflare Pages에서 환경 변수 설정:

- `NODE_ENV`: `production`

## 백엔드 배포 (AWS Lambda)

### 1. AWS 계정 설정

```bash
npm install -g serverless
serverless config credentials --provider aws --key YOUR_AWS_KEY --secret YOUR_AWS_SECRET
```

### 2. 환경 변수 설정

```bash
# .env 파일 생성
OPENAI_API_KEY=your_openai_api_key
```

### 3. 배포 실행

```bash
cd backend
npm install
serverless deploy --stage prod
```

## 도메인 설정

### 1. 커스텀 도메인 설정

- 프론트엔드: Cloudflare Pages에서 커스텀 도메인 연결
- 백엔드: API Gateway에서 커스텀 도메인 설정

### 2. HTTPS 설정

- 자동으로 SSL 인증서 발급됨

## 환경별 배포

### 개발 환경

```bash
serverless deploy --stage dev
```

### 프로덕션 환경

```bash
serverless deploy --stage prod
```

## 모니터링 설정

### 1. AWS CloudWatch

- 자동으로 로그 및 메트릭 수집
- 대시보드에서 모니터링

### 2. 알림 설정

- 에러 발생시 이메일 알림
- 사용량 임계치 알림

## 백업 및 보안

### 1. 정기 백업

- 코드: GitHub 자동 백업
- 설정: AWS Parameter Store 사용

### 2. 보안 설정

- API 키 환경 변수로 관리
- CORS 설정
- Rate limiting 적용
