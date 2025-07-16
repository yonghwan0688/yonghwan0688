# 📚 React 기초 정리

## 🎯 React란?

**React = 웹사이트를 만드는 레고 블록!** 🧱

쉽게 말해서:

- 작은 조각들(컴포넌트)을 만들어서
- 큰 웹사이트를 조립하는 방법이에요!

### 🏠 간단한 예시

```jsx
// 버튼 하나 만들기
function Button() {
  return <button>클릭!</button>;
}

// 버튼 여러 개 사용하기
function App() {
  return (
    <div>
      <Button />
      <Button />
    </div>
  );
}
```

---

## 🧩 기본 개념 3가지만 알면 끝!

### 1. **컴포넌트** = 웹사이트 조각들

```jsx
// 인사말 컴포넌트
function Hello() {
  return <h1>안녕하세요!</h1>;
}

// 사용하기
<Hello />; // 화면에 "안녕하세요!" 나타남
```

### 2. **JSX** = HTML + JavaScript 섞기

```jsx
const name = "철수";
return <h1>안녕 {name}!</h1>; // 안녕 철수! 출력

// 조건 사용하기
const hungry = true;
return <div>{hungry ? <p>배고파요 🍕</p> : <p>배불러요 😊</p>}</div>;
```

### 3. **Props** = 정보 전달하기

```jsx
// 정보 받아서 사용하기
function Greeting(props) {
  return <h1>안녕, {props.name}!</h1>
}

// 정보 보내기
<Greeting name="영희" />  // 안녕, 영희!
<Greeting name="철수" />  // 안녕, 철수!
```

## 🧠 State - 변하는 값 기억하기

**State = 컴포넌트가 기억하는 값**

### 숫자 세기 예제

```jsx
import { useState } from "react";

function Counter() {
  const [숫자, 숫자바꾸기] = useState(0); // 처음엔 0

  return (
    <div>
      <p>현재 숫자: {숫자}</p>
      <button onClick={() => 숫자바꾸기(숫자 + 1)}>➕ 하나 더하기</button>
      <button onClick={() => 숫자바꾸기(숫자 - 1)}>➖ 하나 빼기</button>
    </div>
  );
}
```

### 간단한 입력창 예제

```jsx
function InputBox() {
  const [글자, 글자바꾸기] = useState("");

  return (
    <div>
      <input
        value={글자}
        onChange={(e) => 글자바꾸기(e.target.value)}
        placeholder="여기에 써보세요"
      />
      <p>당신이 쓴 글: {글자}</p>
    </div>
  );
}
```

## � 버튼 클릭하기

### 기본 버튼

```jsx
function MyButton() {
  const 버튼누르면 = () => {
    alert("버튼 눌렸어요!");
  };

  return <button onClick={버튼누르면}>눌러보세요!</button>;
}
```

### 좋아요 버튼 만들기

```jsx
function LikeButton() {
  const [좋아요수, 좋아요수바꾸기] = useState(0);

  const 좋아요누르기 = () => {
    좋아요수바꾸기(좋아요수 + 1);
  };

  return <button onClick={좋아요누르기}>❤️ 좋아요 {좋아요수}</button>;
}
```

## 📝 할 일 목록 만들기 (종합 예제)

```jsx
function TodoApp() {
  const [할일들, 할일들바꾸기] = useState([]);
  const [새할일, 새할일바꾸기] = useState("");

  // 할 일 추가하기
  const 할일추가 = () => {
    if (새할일 !== "") {
      할일들바꾸기([...할일들, 새할일]);
      새할일바꾸기(""); // 입력창 비우기
    }
  };

  // 할 일 삭제하기
  const 할일삭제 = (index) => {
    const 새로운할일들 = 할일들.filter((_, i) => i !== index);
    할일들바꾸기(새로운할일들);
  };

  return (
    <div>
      <h1>📝 내 할 일</h1>

      {/* 할 일 입력 */}
      <div>
        <input
          value={새할일}
          onChange={(e) => 새할일바꾸기(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={할일추가}>추가</button>
      </div>

      {/* 할 일 목록 */}
      <ul>
        {할일들.map((할일, index) => (
          <li key={index}>
            {할일}
            <button onClick={() => 할일삭제(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🚀 React 시작하기

### 새 프로젝트 만들기

```bash
# 컴퓨터에 React 설치하고 시작하기
npx create-react-app my-first-app
cd my-first-app
npm start
```

### 첫 번째 앱 만들어보기

```jsx
// src/App.js 파일
function App() {
  const [메시지, 메시지바꾸기] = useState("안녕하세요!");

  return (
    <div>
      <h1>{메시지}</h1>
      <button onClick={() => 메시지바꾸기("React 재밌어요! 🎉")}>
        메시지 바꾸기
      </button>
    </div>
  );
}

export default App;
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] JSX로 화면 만들기
- [ ] 컴포넌트 만들어보기
- [ ] 버튼 클릭 이벤트
- [ ] useState로 값 바꿔보기

### 🥈 2단계: 중급 (2-3주)

- [ ] 할 일 목록 앱 만들기
- [ ] 입력폼 다루기
- [ ] 목록 보여주기
- [ ] 데이터 추가/삭제하기

### 🥇 3단계: 고급 (1달 이상)

- [ ] 다른 컴포넌트와 데이터 공유
- [ ] 인터넷에서 데이터 가져오기
- [ ] 여러 페이지 만들기
- [ ] 예쁘게 스타일링하기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **작게 시작하기** - 큰 컴포넌트보다 작은 컴포넌트 여러 개
- **자주 저장하기** - 코드 바꿀 때마다 저장해서 확인
- **console.log() 활용** - 값이 제대로 나오는지 확인
- **에러 메시지 읽기** - 빨간 글씨가 나오면 천천히 읽어보기

### ❌ 이건 피하세요

- 너무 복잡하게 만들기
- 에러 무시하기
- 처음부터 완벽하게 하려고 하기

---

## 🌟 마무리

**React 핵심 3가지:**

1. 🧩 **컴포넌트** = 레고 블록처럼 조립
2. 📤 **Props** = 정보 전달하기
3. 🧠 **State** = 변하는 값 기억하기

**기억하세요:**

- 처음엔 어려워도 괜찮아요! 🤗
- 작은 것부터 차근차근 만들어보세요
- 에러가 나면 구글에서 검색해보세요
- 재미있게 코딩하는 게 가장 중요해요!

**화이팅! 🚀✨**

---

## 📁 React 프로젝트 폴더 구조

### 🏗️ 기본 프로젝트 구조

```
my-react-app/
├── 📁 public/                    # 정적 파일들 (변하지 않는 파일)
│   ├── 🌐 index.html            # 메인 HTML 파일
│   ├── 🖼️ favicon.ico           # 브라우저 탭 아이콘
│   ├── 🖼️ logo192.png           # 앱 로고
│   └── 📄 manifest.json         # 앱 설정 정보
│
├── 📁 src/                      # 소스 코드 (우리가 작성하는 코드)
│   ├── 📄 App.js                # 메인 컴포넌트
│   ├── 🎨 App.css               # App 스타일
│   ├── 📄 index.js              # 앱 시작점
│   ├── 🎨 index.css             # 전체 스타일
│   ├── 🖼️ logo.svg             # React 로고
│   └── 🧪 App.test.js           # 테스트 파일
│
├── 📁 node_modules/             # 설치된 라이브러리들 (건드리지 마세요!)
├── 📄 package.json              # 프로젝트 정보 & 의존성
├── 📄 package-lock.json         # 정확한 버전 정보
└── 📄 README.md                 # 프로젝트 설명서
```

### 🎯 실제 개발할 때 권장 구조

```
src/
├── 📁 components/               # 재사용 가능한 컴포넌트들
│   ├── 📄 Button.js            # 버튼 컴포넌트
│   ├── 📄 Header.js            # 헤더 컴포넌트
│   ├── 📄 Footer.js            # 푸터 컴포넌트
│   └── 📄 Card.js              # 카드 컴포넌트
│
├── 📁 pages/                   # 페이지별 컴포넌트
│   ├── 📄 Home.js              # 홈페이지
│   ├── 📄 About.js             # 소개페이지
│   └── 📄 Contact.js           # 연락처페이지
│
├── 📁 styles/                  # CSS 파일들
│   ├── 🎨 global.css           # 전체 스타일
│   └── 🎨 components.css       # 컴포넌트 스타일
│
├── 📁 images/                  # 이미지 파일들
│   ├── 🖼️ banner.jpg
│   └── 🖼️ profile.png
│
├── 📁 utils/                   # 유틸리티 함수들
│   └── 📄 helpers.js           # 도움 함수들
│
└── 📄 App.js                   # 메인 앱
```

### 📋 각 폴더의 역할

| 폴더            | 역할                 | 예시                   |
| --------------- | -------------------- | ---------------------- |
| **public/**     | 변하지 않는 파일들   | HTML, 아이콘, 이미지   |
| **src/**        | 우리가 작성하는 코드 | React 컴포넌트, CSS    |
| **components/** | 재사용 컴포넌트      | 버튼, 카드, 모달       |
| **pages/**      | 페이지 컴포넌트      | 홈, 로그인, 마이페이지 |
| **styles/**     | 스타일 파일들        | CSS, SCSS              |
| **images/**     | 이미지 파일들        | PNG, JPG, SVG          |

### 🔑 중요한 파일들

#### 1. **src/index.js** - 앱의 시작점

```jsx
// 앱을 시작하는 파일 (건드리지 마세요!)
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

#### 2. **src/App.js** - 메인 컴포넌트

```jsx
// 여기서 주로 작업해요!
function App() {
  return (
    <div>
      <h1>내 첫 React 앱!</h1>
    </div>
  );
}

export default App;
```

#### 3. **public/index.html** - 기본 HTML

```html
<!-- React가 여기에 들어가요 -->
<div id="root"></div>
```

### 💡 폴더 구조 팁

#### ✅ 초보자는 이것만 신경쓰세요

- **src/App.js** - 여기서 코딩해요
- **src/App.css** - 여기서 꾸며요
- **public/** 폴더에 이미지 넣어요

#### ❌ 건드리지 마세요

- **node_modules/** - 라이브러리 저장소
- **package-lock.json** - 자동 생성 파일
- **src/index.js** - 앱 시작점

#### 🚀 프로젝트가 커지면 이렇게 정리하세요

```
src/
├── components/
│   ├── common/        # 공통 컴포넌트
│   ├── forms/         # 폼 관련
│   └── layout/        # 레이아웃 관련
├── pages/
├── hooks/             # 커스텀 훅
├── context/           # 전역 상태
├── api/               # API 관련
└── constants/         # 상수들
```

**간단하게 시작하고 천천히 폴더를 늘려가세요! 🌱**
