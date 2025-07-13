# 🎓 개인 블로그 플랫폼 학습 가이드

## 📖 1단계: 코드 분석 및 이해 (1-2주)

### 🔍 프론트엔드 코드 분석하기

```bash
# 각 파일을 하나씩 열어보며 분석해보세요
client/src/
├── App.js              # 📌 라우팅 구조 이해
├── index.js            # 📌 React 앱 진입점, Context 설정
├── contexts/           # 📌 전역 상태 관리 (AuthContext)
├── components/         # 📌 재사용 컴포넌트들
├── pages/              # 📌 각 페이지 컴포넌트들
└── styles/             # 📌 스타일링 시스템
```

### 🔍 백엔드 코드 분석하기

```bash
server/
├── server.js           # 📌 Express 서버 설정
├── routes/             # 📌 API 라우트들
├── middleware/         # 📌 인증 미들웨어
├── models/             # 📌 데이터 모델
└── data/              # 📌 메모리 DB 구현
```

### 🎯 분석 체크리스트

#### ✅ React 컴포넌트 구조 이해

**위치**: `client/src/App.js`

```javascript
// 📌 메인 라우팅 구조
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/posts" element={<PostList />} />
  <Route path="/login" element={<Login />} />
  // 보호된 라우트 (ProtectedRoute 컴포넌트로 감싸짐)
  <Route
    path="/write"
    element={
      <ProtectedRoute>
        <WritePost />
      </ProtectedRoute>
    }
  />
</Routes>
```

- **핵심 컴포넌트**: `Header`, `Footer`, `ProtectedRoute`
- **페이지 컴포넌트**: `Home`, `PostList`, `Login`, `WritePost`

#### ✅ styled-components 사용법 파악

**위치**: `client/src/styles/theme.js`, `client/src/App.js`

```javascript
// 📌 테마 시스템 (theme.js)
const theme = {
  colors: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    // ... 색상 팔레트
  },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem" },
  breakpoints: { mobile: "768px", tablet: "1024px" },
};

// 📌 스타일 컴포넌트 사용 예시 (App.js)
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
```

#### ✅ React Context API 동작 원리

**위치**: `client/src/contexts/AuthContext.js`

```javascript
// 📌 인증 상태 관리
const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
};

// 📌 useReducer로 상태 관리
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
  }
};
```

#### ✅ Express.js 라우팅 구조

**위치**: `server/server.js`

```javascript
// 📌 메인 라우트 등록
app.use("/api/auth", require("./routes/auth")); // 인증 관련
app.use("/api/posts", require("./routes/posts")); // 포스트 관련
app.use("/api/users", require("./routes/users")); // 사용자 관련
app.use("/api/comments", require("./routes/comments")); // 댓글 관련
```

**세부 라우트 예시**: `server/routes/auth.js`

```javascript
// 📌 RESTful API 엔드포인트
router.post("/register", [...validation], async (req, res) => {});
router.post("/login", [...validation], async (req, res) => {});
router.get("/me", auth, async (req, res) => {});
```

#### ✅ JWT 인증 플로우

**위치**: `server/middleware/auth.js`

```javascript
// 📌 JWT 토큰 검증 미들웨어
const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다" });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = UserMemoryDB.findById(decoded.userId);

  req.user = user;
  next();
};
```

**로그인 처리**: `server/routes/auth.js`

```javascript
// 📌 로그인 시 JWT 토큰 생성
const token = jwt.sign(
  { userId: user.id, username: user.username },
  JWT_SECRET,
  { expiresIn: "7d" }
);
```

#### ✅ RESTful API 설계 패턴

**위치**: `server/routes/posts.js`

```javascript
// 📌 CRUD 패턴 구현
router.get("/", getAllPosts); // GET /api/posts - 전체 조회
router.get("/:id", getPostById); // GET /api/posts/:id - 개별 조회
router.post("/", auth, createPost); // POST /api/posts - 생성
router.put("/:id", auth, updatePost); // PUT /api/posts/:id - 수정
router.delete("/:id", auth, deletePost); // DELETE /api/posts/:id - 삭제
```

**HTTP 상태 코드 사용**:

- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 필요
- `404`: 찾을 수 없음
- `500`: 서버 오류

### 🔍 주요 파일 역할 정리

#### 프론트엔드 (client/src/)

- **App.js**: 메인 라우팅 및 레이아웃 구성
- **contexts/AuthContext.js**: 전역 인증 상태 관리
- **components/ProtectedRoute.js**: 인증이 필요한 라우트 보호
- **pages/**: 각 페이지별 컴포넌트 (Home, Login, PostList 등)
- **styles/theme.js**: 디자인 시스템 및 테마 설정

#### 백엔드 (server/)

- **server.js**: Express 서버 설정 및 라우트 등록
- **routes/**: API 엔드포인트 정의 (auth, posts, users, comments)
- **middleware/auth.js**: JWT 인증 미들웨어
- **data/memoryDB.js**: 임시 메모리 데이터베이스
- **models/**: 데이터 모델 정의

> 💡 **학습 팁**: 각 파일을 실제로 열어보고 코드를 따라가며 데이터 흐름을 파악해보세요!

## 🛠️ 2단계: 기능 확장 연습 (2-3주)

### A. 프론트엔드 기능 추가

1. **댓글 시스템 구현**

   - 댓글 작성/수정/삭제 컴포넌트
   - 대댓글 기능
   - 실시간 댓글 수 표시

2. **좋아요 기능**

   - 좋아요 버튼 컴포넌트
   - 좋아요 수 표시
   - 사용자별 좋아요 상태 관리

3. **카테고리 필터링**
   - 카테고리별 포스트 필터
   - 태그 클릭 시 관련 포스트 표시

### B. 백엔드 API 확장

1. **댓글 API**

   ```javascript
   // 추가할 라우트들
   POST /api/posts/:id/comments
   PUT /api/comments/:id
   DELETE /api/comments/:id
   ```

2. **좋아요 API**
   ```javascript
   POST /api/posts/:id/like
   DELETE /api/posts/:id/like
   ```

### C. 상태 관리 개선

1. **React Query 도입**

   - 서버 상태 관리 최적화
   - 캐싱 및 실시간 업데이트

2. **커스텀 훅 만들기**
   - usePost, useAuth, useComments 등

## 🎨 3단계: UI/UX 개선 (1-2주)

### A. 디자인 시스템 구축

1. **컴포넌트 라이브러리 구성**

   - Button, Input, Card 등 기본 컴포넌트
   - 일관된 디자인 토큰 적용

2. **애니메이션 추가**
   - 페이지 전환 애니메이션
   - 로딩 스피너
   - 호버 효과

### B. 반응형 개선

1. **모바일 최적화**

   - 터치 친화적 인터페이스
   - 스와이프 제스처

2. **다크 모드**
   - 테마 토글 기능
   - localStorage에 설정 저장

## 🚀 4단계: 고급 기능 구현 (2-3주)

### A. 실시간 기능

1. **Socket.io 도입**

   ```bash
   cd server && npm install socket.io
   cd client && npm install socket.io-client
   ```

2. **실시간 댓글**
   - 새 댓글 실시간 표시
   - 온라인 사용자 표시

### B. 파일 업로드

1. **이미지 업로드**

   - 프로필 사진 업로드
   - 포스트 이미지 첨부

2. **에디터 개선**
   - 마크다운 에디터
   - 실시간 미리보기

### C. 검색 고도화

1. **전문 검색**

   - 제목, 내용, 태그 별도 검색
   - 검색 결과 하이라이트

2. **필터링 옵션**
   - 날짜별 필터
   - 인기도별 정렬

## 💾 5단계: 데이터베이스 전환 (1주)

### MongoDB 연동

1. **MongoDB 설치 및 연결**

   ```bash
   # MongoDB 설치
   brew install mongodb-community

   # 연결 설정
   # server/.env 파일 수정
   MONGODB_URI=mongodb://localhost:27017/blog
   ```

2. **스키마 정의**
   - Mongoose 모델 활용
   - 인덱스 최적화

## 🔧 6단계: 성능 최적화 (1-2주)

### A. 프론트엔드 최적화

1. **코드 분할**

   ```javascript
   // 레이지 로딩 적용
   const PostList = lazy(() => import("./pages/PostList"));
   ```

2. **이미지 최적화**
   - 압축 및 리사이징
   - WebP 포맷 사용

### B. 백엔드 최적화

1. **캐싱 구현**

   - Redis 도입
   - API 응답 캐싱

2. **페이지네이션**
   - 무한 스크롤 또는 페이지 번호

## 🚀 7단계: 배포 및 운영 (1주)

### A. 배포 환경 구성

1. **Vercel/Netlify** (프론트엔드)
2. **Heroku/Railway** (백엔드)

### B. CI/CD 파이프라인

1. **GitHub Actions**
   - 자동 테스트
   - 자동 배포

## 📝 학습 팁

### 1. 일일 학습 루틴

```
09:00-10:00: 코드 분석 및 이해
10:00-12:00: 새 기능 구현
14:00-16:00: 디버깅 및 테스트
16:00-17:00: 코드 리뷰 및 리팩토링
```

### 2. 체크리스트 활용

- [ ] 오늘 새로 배운 개념 정리
- [ ] 구현한 기능 테스트
- [ ] 코드 품질 개선사항 확인
- [ ] 내일 할 일 계획

### 3. 실습 프로젝트

1. **개인 포트폴리오 사이트**
2. **간단한 쇼핑몰**
3. **실시간 채팅 앱**

### 4. 코드 리뷰 포인트

- 컴포넌트 재사용성
- 성능 최적화
- 에러 처리
- 코드 가독성

### 5. 참고 자료

- [React 공식 문서](https://react.dev/)
- [Node.js 가이드](https://nodejs.org/en/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### 6. 커뮤니티 참여

- Stack Overflow 질문/답변
- GitHub 오픈소스 기여
- 개발자 커뮤니티 참여

---

💡 **학습 성공의 핵심**: 매일 꾸준히, 실제로 코드를 작성하며 학습하세요!
