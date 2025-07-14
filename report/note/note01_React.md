# 📚 React 기초 정리

## 🎯 React란?

**React = 웹사이트를 만드는 레고 블록!** 🧱
- Facebook(Meta)에서 만든 JavaScript 라이브러리
- 재사용 가능한 컴포넌트로 UI를 구성
- 가상 DOM을 통한 효율적인 렌더링

### 🏠 레고 블록 개념
```jsx
// 작은 블록(컴포넌트)들을 만들고
function Button() {
  return <button>클릭하세요!</button>
}

// 조립해서 큰 웹사이트를 완성!
function App() {
  return (
    <div>
      <Button />
      <Button />
    </div>
  )
}
```

---

## 🧩 핵심 개념들

### 1. **컴포넌트 (Components)**
재사용 가능한 UI 조각들

#### 함수형 컴포넌트 (추천!)
```jsx
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>
}

// 사용법
<Welcome name="철수" />
```

#### 클래스형 컴포넌트 (구버전)
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>안녕하세요, {this.props.name}님!</h1>
  }
}
```

### 2. **JSX (JavaScript XML)**
HTML + JavaScript의 합체! 🤖

```jsx
const name = "철수"
const element = <h1>안녕하세요, {name}님!</h1>  // JavaScript 변수를 HTML에!

// 조건부 렌더링
const isLoggedIn = true
return (
  <div>
    {isLoggedIn ? <h1>환영합니다!</h1> : <h1>로그인하세요!</h1>}
  </div>
)

// 리스트 렌더링
const fruits = ['사과', '바나나', '오렌지']
return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
)
```

### 3. **Props (Properties)**
부모에서 자식으로 데이터 전달 📤

```jsx
// 부모 컴포넌트
function App() {
  return (
    <UserCard 
      name="김철수" 
      age={25} 
      email="kim@example.com" 
    />
  )
}

// 자식 컴포넌트
function UserCard({ name, age, email }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
    </div>
  )
}
```

### 4. **State (상태)**
컴포넌트의 기억 능력! 🧠

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // 초기값: 0

  return (
    <div>
      <p>현재 숫자: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가! 🚀
      </button>
      <button onClick={() => setCount(count - 1)}>
        감소! ⬇️
      </button>
    </div>
  )
}
```

---

## 🎣 React Hooks

### 1. **useState** - 상태 관리
```jsx
const [상태값, 상태변경함수] = useState(초기값)

// 예시들
const [name, setName] = useState('')
const [isVisible, setIsVisible] = useState(false)
const [todos, setTodos] = useState([])
```

### 2. **useEffect** - 부작용 처리
```jsx
import { useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])  // userId가 변경될 때마다 재실행

  return <div>{user ? user.name : '로딩중...'}</div>
}
```

### 3. **useContext** - 전역 상태
```jsx
import { createContext, useContext } from 'react'

// Context 생성
const ThemeContext = createContext()

// Provider로 감싸기
function App() {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  )
}

// 어디서든 사용하기
function Header() {
  const { theme, setTheme } = useContext(ThemeContext)
  
  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        테마 변경
      </button>
    </header>
  )
}
```

---

## 🎪 이벤트 처리

### 기본 이벤트
```jsx
function Button() {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!')
  }

  const handleMouseOver = () => {
    console.log('마우스가 올라왔어요!')
  }

  return (
    <button 
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      클릭하세요!
    </button>
  )
}
```

### 폼 처리
```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()  // 기본 폼 제출 방지
    console.log('로그인:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  )
}
```

---

## 🏗️ 컴포넌트 구성 패턴

### 1. **컨테이너/프레젠테이션 분리**
```jsx
// 📦 Container: 로직 담당
function TodoContainer() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <TodoPresentation 
      todos={todos} 
      onAdd={addTodo} 
      onToggle={toggleTodo} 
    />
  )
}

// 🎨 Presentation: UI만 담당
function TodoPresentation({ todos, onAdd, onToggle }) {
  return (
    <div>
      <TodoForm onSubmit={onAdd} />
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  )
}
```

### 2. **커스텀 훅**
```jsx
// 🎣 재사용 가능한 로직
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialValue)

  return { count, increment, decrement, reset }
}

// 🎯 사용하기
function CounterApp() {
  const { count, increment, decrement, reset } = useCounter(10)

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>리셋</button>
    </div>
  )
}
```

---

## 📁 폴더 구조

### 기본 구조
```
src/
├── components/          🧩 재사용 컴포넌트
│   ├── Button.js
│   ├── Input.js
│   └── Modal.js
├── pages/              📄 페이지 컴포넌트
│   ├── Home.js
│   ├── About.js
│   └── Contact.js
├── hooks/              🎣 커스텀 훅
│   ├── useAuth.js
│   └── useApi.js
├── utils/              🛠️ 유틸리티 함수
├── styles/             🎨 CSS 파일
└── App.js              🏠 메인 앱
```

### 컴포넌트 파일 예시
```jsx
// components/Button.js
import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick,
  disabled = false 
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
```

---

## 🎨 스타일링

### 1. **CSS 클래스**
```jsx
// CSS 파일
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
}

// JSX에서 사용
<div className="user-card">
  <h2>{name}</h2>
</div>
```

### 2. **인라인 스타일**
```jsx
const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px'
}

<button style={buttonStyle}>클릭하세요</button>
```

### 3. **조건부 스타일**
```jsx
<div className={`card ${isActive ? 'active' : 'inactive'}`}>
  내용
</div>

// 또는
<button 
  style={{
    backgroundColor: isPressed ? '#0056b3' : '#007bff'
  }}
>
  버튼
</button>
```

---

## ⚡ 성능 최적화 기초

### 1. **React.memo**
```jsx
// 불필요한 리렌더링 방지
const UserCard = React.memo(function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
})
```

### 2. **useCallback**
```jsx
function TodoList({ todos }) {
  // 함수 재생성 방지
  const handleToggle = useCallback((id) => {
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }, [])

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle} 
        />
      ))}
    </div>
  )
}
```

---

## 🚀 시작하기

### 1. **Create React App**
```bash
# 새 프로젝트 생성
npx create-react-app my-app
cd my-app

# 개발 서버 시작
npm start
```

### 2. **기본 파일 구조**
```
my-app/
├── public/
│   └── index.html      🏠 HTML 템플릿
├── src/
│   ├── App.js          🎯 메인 컴포넌트
│   ├── App.css         🎨 스타일
│   └── index.js        🔌 앱 시작점
└── package.json        📋 설정 파일
```

### 3. **첫 번째 컴포넌트**
```jsx
// src/App.js
function App() {
  const [message, setMessage] = useState('안녕하세요!')

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <button onClick={() => setMessage('React 재미있어요! 🎉')}>
          메시지 변경
        </button>
      </header>
    </div>
  )
}

export default App
```

---

## 🎯 학습 로드맵

### 1단계: 기초 📚
- [ ] JSX 문법
- [ ] 컴포넌트 만들기
- [ ] Props 전달하기
- [ ] useState 사용하기

### 2단계: 중급 🚀
- [ ] useEffect 사용하기
- [ ] 이벤트 처리
- [ ] 폼 다루기
- [ ] 조건부 렌더링

### 3단계: 고급 ⭐
- [ ] Context API
- [ ] 커스텀 훅
- [ ] 성능 최적화
- [ ] 라우팅 (React Router)

### 4단계: 실전 💪
- [ ] 상태 관리 (Redux/Zustand)
- [ ] API 연동
- [ ] 테스팅
- [ ] 배포

---

## 💡 팁과 주의사항

### ✅ 좋은 습관
- 컴포넌트명은 **대문자**로 시작
- **작고 재사용 가능한** 컴포넌트 만들기
- **props는 읽기 전용**으로 취급
- **key 속성** 사용하여 리스트 렌더링

### ❌ 피해야 할 것들
- state를 직접 수정하지 말기
- 무한 루프 useEffect
- 너무 복잡한 컴포넌트
- 과도한 props drilling

### 🔧 디버깅 도구
- **React Developer Tools** (브라우저 확장)
- **console.log()** 적극 활용
- **React Strict Mode** 사용

---

## 🌟 마무리

React는 **컴포넌트 기반**의 선언적 프로그래밍을 통해 **재사용 가능하고 유지보수하기 쉬운** 웹 애플리케이션을 만들 수 있게 해주는 강력한 도구입니다!

**핵심만 기억하세요:**
1. 🧩 **컴포넌트** = 재사용 가능한 UI 조각
2. 🎭 **JSX** = HTML + JavaScript
3. 📤 **Props** = 데이터 전달
4. 🧠 **State** = 컴포넌트의 기억
5. 🎣 **Hooks** = 함수형 컴포넌트의 슈퍼파워

**천천히, 하나씩 익혀가면서 재미있게 React를 배워보세요!** 🚀✨