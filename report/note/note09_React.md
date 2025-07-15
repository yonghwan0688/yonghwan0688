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
