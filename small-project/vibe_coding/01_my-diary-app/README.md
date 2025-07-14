# 🚀 개인 블로그 플랫폼

React + Node.js + MongoDB로 만든 현대적인 풀스택 블로그 플랫폼입니다.

## 📍 프로젝트 위치

이 프로젝트는 개인 포트폴리오 레포지토리(`yonghwan0688/yonghwan0688`)의 하위 디렉토리에 위치합니다:

```
yonghwan0688/                    # 메인 포트폴리오 레포지토리
└── small-project/
    └── vibe_coding/
        └── my-diary-app/        # 이 프로젝트
            ├── client/          # React 프론트엔드
            ├── server/          # Node.js 백엔드
            └── README.md
```

**장점:**

- 📁 **체계적인 프로젝트 관리** - 여러 프로젝트를 하나의 레포지토리에서 관리
- 🔄 **학습 기록 추적** - 모든 학습 과정을 한 곳에서 확인
- 🎯 **포트폴리오 통합** - 다양한 프로젝트를 효과적으로 보여주기

## 📋 프로젝트 개요

이 프로젝트는 웹개발 실력 향상을 위한 실무형 학습 프로젝트입니다.

### 🎯 학습 목표

- **React Hooks**와 함수형 컴포넌트 마스터
- **Node.js + Express**로 RESTful API 구축
- **MongoDB**를 이용한 데이터베이스 설계
- **JWT 인증** 시스템 구현
- **반응형 웹 디자인** 적용
- **현대적인 개발 도구** 활용

## 🛠️ 기술 스택

### 프론트엔드

- **React 18** - 사용자 인터페이스
- **React Router** - 페이지 라우팅
- **Styled Components** - CSS-in-JS 스타일링
- **React Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트
- **React Hook Form** - 폼 관리

### 백엔드

- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **MongoDB + Mongoose** - 데이터베이스
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 암호화
- **express-validator** - 입력값 검증

## ✨ 주요 기능

### 📝 블로그 기능

- 게시글 작성, 수정, 삭제
- 마크다운 지원
- 카테고리 및 태그 시스템
- 검색 기능
- 좋아요 및 댓글 시스템

### 👤 사용자 관리

- 회원가입 및 로그인
- JWT 토큰 기반 인증
- 프로필 관리
- 개인 대시보드

### 🎨 UI/UX

- 반응형 디자인
- 다크/라이트 테마
- 부드러운 애니메이션
- 모바일 최적화

## 🚀 시작하기

### 사전 요구사항

- Node.js (v16 이상)
- MongoDB (로컬 또는 MongoDB Atlas)
- Git

### 설치 및 실행

1. **프로젝트 디렉토리 이동**

```bash
cd my-diary-app
```

2. **의존성 일괄 설치 (권장)**

```bash
npm run install-all
```

또는 **개별 설치**:

```bash
# 백엔드 설정
cd server
npm install

# 프론트엔드 설정
cd ../client
npm install
```

3. **MongoDB 설정**

- 로컬 MongoDB 실행 또는
- MongoDB Atlas 연결 URL 설정

4. **환경변수 설정**

```bash
# server/.env 파일 확인 및 수정
cd server  # 또는 루트에서 cd server
cp .env.example .env
# .env 파일에서 MongoDB URL과 JWT 시크릿 수정
```

5. **개발 서버 실행**

```bash
# 루트 디렉토리에서 (권장)
npm run dev

# 또는 개별 실행
npm run server  # 백엔드만 실행 (포트 5000)
npm run client  # 프론트엔드만 실행 (포트 3000)
```

## 📁 프로젝트 구조

```
my-diary-app/
├── server/                # 백엔드 (Node.js + Express)
│   ├── models/            # MongoDB 스키마
│   ├── routes/            # API 라우트
│   ├── middleware/        # 미들웨어 (인증 등)
│   ├── server.js          # 서버 진입점
│   └── package.json
│
├── client/                # 프론트엔드 (React)
│   ├── public/            # 정적 파일
│   ├── src/
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── contexts/      # React Context
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── services/      # API 호출
│   │   ├── styles/        # 스타일 관련
│   │   └── utils/         # 유틸리티 함수
│   └── package.json
│
└── README.md
```

## 🎓 학습 포인트

### 1. **React 고급 개념**

```javascript
// 커스텀 훅 사용
const { data, loading, error } = useQuery("posts", fetchPosts);

// Context API로 전역 상태 관리
const { user, login, logout } = useAuth();

// styled-components로 동적 스타일링
const Button = styled.button`
  background: ${(props) =>
    props.primary ? theme.colors.primary : "transparent"};
`;
```

### 2. **Node.js API 설계**

```javascript
// RESTful API 설계
router.get("/posts", getAllPosts);
router.post("/posts", auth, createPost);
router.put("/posts/:id", auth, updatePost);
router.delete("/posts/:id", auth, deletePost);

// 미들웨어 체이닝
router.post("/auth/login", [validation, rateLimiting], login);
```

### 3. **MongoDB 모델링**

```javascript
// Mongoose 스키마 설계
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: ObjectId, ref: "User" },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});
```

## 🔧 확장 아이디어

### 초급자용 확장

1. **테마 변경** - 다크/라이트 모드 토글
2. **이미지 업로드** - 포스트에 이미지 첨부
3. **소셜 로그인** - Google/GitHub 로그인 연동

### 중급자용 확장

1. **실시간 댓글** - Socket.io로 실시간 기능
2. **이메일 알림** - 새 댓글/좋아요 알림
3. **SEO 최적화** - 메타 태그, 사이트맵

### 고급자용 확장

1. **PWA 변환** - 앱스토어 배포 가능한 웹앱
2. **마이크로서비스** - 서비스 분리 및 API Gateway
3. **CI/CD 파이프라인** - 자동 배포 시스템

## 📚 추가 학습 자료

- [React 공식 문서](https://react.dev/)
- [Node.js 가이드](https://nodejs.org/en/docs/)
- [MongoDB 튜토리얼](https://docs.mongodb.com/)
- [Express.js 가이드](https://expressjs.com/)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

**Happy Coding! 🎉**

이 프로젝트를 통해 실무에서 바로 활용할 수 있는 웹개발 실력을 기르세요!
