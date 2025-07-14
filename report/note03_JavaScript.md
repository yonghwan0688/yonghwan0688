# 📝 JavaScript 기초 정리

## 🎯 JavaScript란?

**JavaScript = 웹페이지에 생명을 불어넣는 마법사!** ✨

- 브라우저에서 실행되는 프로그래밍 언어
- 동적인 웹페이지 제작의 핵심
- 프론트엔드와 백엔드 모두에서 사용 가능

### 🎭 JavaScript의 역할

```javascript
// HTML: 골격 🦴
<button id="myButton">클릭하세요!</button>

// CSS: 꾸미기 🎨
button { color: blue; }

// JavaScript: 동작 💫
document.getElementById('myButton').onclick = function() {
  alert('안녕하세요! 🎉');
}
```

---

## 🔤 기본 문법

### 1. **변수 선언** 📦

```javascript
// var (구버전, 사용 비추천)
var oldStyle = "구식 방법";

// let (변수, 재할당 가능)
let userName = "김철수";
userName = "이영희"; // 변경 가능

// const (상수, 재할당 불가)
const PI = 3.14159;
// PI = 3.14; // 에러 발생!

// 객체와 배열은 const로 선언해도 내용 변경 가능
const user = { name: "김철수" };
user.name = "이영희"; // 가능!

const numbers = [1, 2, 3];
numbers.push(4); // 가능!
```

### 2. **데이터 타입** 🔢

```javascript
// 기본 타입 (Primitive Types)
let text = "문자열"; // String
let number = 42; // Number
let isTrue = true; // Boolean
let nothing = null; // Null
let notDefined = undefined; // Undefined
let symbol = Symbol("id"); // Symbol

// 참조 타입 (Reference Types)
let person = {
  // Object
  name: "김철수",
  age: 25,
};

let fruits = ["사과", "바나나"]; // Array
let sayHello = function () {
  // Function
  console.log("안녕하세요!");
};

// 타입 확인
console.log(typeof text); // "string"
console.log(typeof number); // "number"
console.log(typeof isTrue); // "boolean"
console.log(typeof person); // "object"
console.log(typeof fruits); // "object"
console.log(typeof sayHello); // "function"
```

### 3. **연산자** ➕

```javascript
// 산술 연산자
let a = 10,
  b = 3;
console.log(a + b); // 13 (덧셈)
console.log(a - b); // 7  (뺄셈)
console.log(a * b); // 30 (곱셈)
console.log(a / b); // 3.333... (나눗셈)
console.log(a % b); // 1  (나머지)
console.log(a ** b); // 1000 (거듭제곱)

// 비교 연산자
console.log(5 == "5"); // true  (값만 비교)
console.log(5 === "5"); // false (값과 타입 모두 비교)
console.log(5 != "5"); // false
console.log(5 !== "5"); // true
console.log(10 > 5); // true
console.log(10 <= 10); // true

// 논리 연산자
console.log(true && false); // false (AND)
console.log(true || false); // true  (OR)
console.log(!true); // false (NOT)

// 할당 연산자
let x = 10;
x += 5; // x = x + 5;  결과: 15
x -= 3; // x = x - 3;  결과: 12
x *= 2; // x = x * 2;  결과: 24
x /= 4; // x = x / 4;  결과: 6
```

---

## 🏗️ 제어문

### 1. **조건문** 🤔

```javascript
// if 문
let score = 85;

if (score >= 90) {
  console.log("A 등급");
} else if (score >= 80) {
  console.log("B 등급");
} else if (score >= 70) {
  console.log("C 등급");
} else {
  console.log("D 등급");
}

// 삼항 연산자
let result = score >= 80 ? "합격" : "불합격";
console.log(result); // '합격'

// switch 문
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("월요일입니다");
    break;
  case "Tuesday":
    console.log("화요일입니다");
    break;
  case "Wednesday":
    console.log("수요일입니다");
    break;
  default:
    console.log("다른 요일입니다");
}
```

### 2. **반복문** 🔄

```javascript
// for 문
for (let i = 0; i < 5; i++) {
  console.log(`숫자: ${i}`);
}

// while 문
let count = 0;
while (count < 3) {
  console.log(`카운트: ${count}`);
  count++;
}

// do-while 문
let num = 0;
do {
  console.log(`번호: ${num}`);
  num++;
} while (num < 3);

// for...of (배열 순회)
let colors = ["빨강", "녹색", "파랑"];
for (let color of colors) {
  console.log(color);
}

// for...in (객체 속성 순회)
let person = { name: "김철수", age: 25, city: "서울" };
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

---

## 🎯 함수

### 1. **함수 선언** 📢

```javascript
// 함수 선언문
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

// 함수 표현식
const greet2 = function (name) {
  return `안녕하세요, ${name}님!`;
};

// 화살표 함수 (ES6)
const greet3 = (name) => {
  return `안녕하세요, ${name}님!`;
};

// 화살표 함수 (간단한 형태)
const greet4 = (name) => `안녕하세요, ${name}님!`;

// 사용법
console.log(greet("철수")); // "안녕하세요, 철수님!"
console.log(greet2("영희")); // "안녕하세요, 영희님!"
console.log(greet3("민수")); // "안녕하세요, 민수님!"
console.log(greet4("지영")); // "안녕하세요, 지영님!"
```

### 2. **함수 매개변수** 📥

```javascript
// 기본 매개변수
function introduce(name = "익명", age = 0) {
  return `이름: ${name}, 나이: ${age}세`;
}

console.log(introduce()); // "이름: 익명, 나이: 0세"
console.log(introduce("김철수")); // "이름: 김철수, 나이: 0세"
console.log(introduce("김철수", 25)); // "이름: 김철수, 나이: 25세"

// 나머지 매개변수 (Rest Parameters)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// 구조 분해 할당
function printUser({ name, age, city = "미정" }) {
  console.log(`이름: ${name}, 나이: ${age}, 도시: ${city}`);
}

printUser({ name: "김철수", age: 25 });
// "이름: 김철수, 나이: 25, 도시: 미정"
```

---

## 📚 배열 (Array)

### 1. **배열 기본** 📋

```javascript
// 배열 생성
let fruits = ["사과", "바나나", "오렌지"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["문자", 123, true, null];

// 배열 접근
console.log(fruits[0]); // '사과'
console.log(fruits.length); // 3

// 배열 수정
fruits[1] = "포도";
console.log(fruits); // ['사과', '포도', '오렌지']
```

### 2. **배열 메서드** 🛠️

```javascript
let numbers = [1, 2, 3, 4, 5];

// 추가/제거
numbers.push(6); // 끝에 추가: [1,2,3,4,5,6]
numbers.pop(); // 끝에서 제거: [1,2,3,4,5]
numbers.unshift(0); // 앞에 추가: [0,1,2,3,4,5]
numbers.shift(); // 앞에서 제거: [1,2,3,4,5]

// 검색
console.log(numbers.indexOf(3)); // 2 (인덱스)
console.log(numbers.includes(4)); // true
console.log(numbers.find((n) => n > 3)); // 4 (첫 번째 찾은 값)

// 변환
let doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2,4,6,8,10]

let evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2,4]

let sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

// 정렬
let words = ["banana", "apple", "cherry"];
words.sort(); // ['apple', 'banana', 'cherry']

numbers.sort((a, b) => b - a); // 내림차순: [5,4,3,2,1]
```

---

## 🏠 객체 (Object)

### 1. **객체 기본** 🔑

```javascript
// 객체 생성
let person = {
  name: "김철수",
  age: 25,
  city: "서울",
  hobbies: ["독서", "영화감상"],

  // 메서드
  introduce: function () {
    return `안녕하세요! 저는 ${this.name}입니다.`;
  },

  // ES6 메서드 축약 문법
  sayAge() {
    return `저는 ${this.age}세입니다.`;
  },
};

// 객체 접근
console.log(person.name); // '김철수'
console.log(person["age"]); // 25
console.log(person.introduce()); // "안녕하세요! 저는 김철수입니다."

// 객체 수정
person.age = 26;
person.job = "개발자"; // 새 속성 추가
delete person.city; // 속성 삭제
```

### 2. **객체 고급 기능** ⚡

```javascript
// 구조 분해 할당
let { name, age, city = "미정" } = person;
console.log(name, age, city);

// 객체 병합
let contact = { phone: "010-1234-5678", email: "kim@example.com" };
let fullPerson = { ...person, ...contact };

// 객체 메서드들
let keys = Object.keys(person); // 키 배열
let values = Object.values(person); // 값 배열
let entries = Object.entries(person); // [키, 값] 배열

// 객체 복사
let shallowCopy = { ...person }; // 얕은 복사
let deepCopy = JSON.parse(JSON.stringify(person)); // 깊은 복사 (간단한 경우)
```

---

## ⚡ ES6+ 주요 기능

### 1. **템플릿 리터럴** 📝

```javascript
let name = "김철수";
let age = 25;

// 기존 방식
let message1 = "안녕하세요! 저는 " + name + "이고, " + age + "세입니다.";

// 템플릿 리터럴
let message2 = `안녕하세요! 저는 ${name}이고, ${age}세입니다.`;

// 여러 줄 문자열
let multiLine = `
  첫 번째 줄
  두 번째 줄
  세 번째 줄
`;
```

### 2. **구조 분해 할당** 📦

```javascript
// 배열 구조 분해
let [first, second, third] = ["사과", "바나나", "오렌지"];
console.log(first); // '사과'

// 나머지 요소
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// 객체 구조 분해
let user = { name: "김철수", age: 25, city: "서울" };
let { name, age } = user;

// 이름 변경
let { name: userName, age: userAge } = user;
```

### 3. **스프레드 연산자** 🌟

```javascript
// 배열 스프레드
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// 객체 스프레드
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let merged = { ...obj1, ...obj2 }; // {a:1, b:2, c:3, d:4}

// 함수 인수
function sum(a, b, c) {
  return a + b + c;
}
let numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6
```

---

## 🔄 비동기 프로그래밍

### 1. **콜백 함수** 📞

```javascript
// 타이머 함수
setTimeout(() => {
  console.log("3초 후 실행!");
}, 3000);

// 이벤트 리스너
document.getElementById("button").addEventListener("click", function () {
  console.log("버튼이 클릭되었습니다!");
});

// 콜백 지옥 예시 (피해야 할 패턴)
getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      // 콜백 지옥...
    });
  });
});
```

### 2. **Promise** 🤝

```javascript
// Promise 생성
let myPromise = new Promise((resolve, reject) => {
  let success = true;

  setTimeout(() => {
    if (success) {
      resolve("성공적으로 완료되었습니다!");
    } else {
      reject("오류가 발생했습니다!");
    }
  }, 2000);
});

// Promise 사용
myPromise
  .then((result) => {
    console.log(result); // 성공 시
  })
  .catch((error) => {
    console.error(error); // 실패 시
  })
  .finally(() => {
    console.log("완료!"); // 항상 실행
  });

// Promise 체이닝
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => {
    console.log("사용자 정보:", user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then((response) => response.json())
  .then((posts) => {
    console.log("게시글:", posts);
  })
  .catch((error) => {
    console.error("에러:", error);
  });
```

### 3. **async/await** ⏰

```javascript
// async 함수 선언
async function fetchUserData() {
  try {
    // await로 Promise 기다리기
    let response = await fetch("/api/user");
    let user = await response.json();

    console.log("사용자:", user);

    // 순차적 실행
    let postsResponse = await fetch(`/api/posts/${user.id}`);
    let posts = await postsResponse.json();

    console.log("게시글:", posts);

    return { user, posts };
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}

// 사용법
fetchUserData()
  .then((data) => console.log("완료:", data))
  .catch((error) => console.error("실패:", error));

// 병렬 실행
async function fetchMultipleData() {
  try {
    // 동시에 여러 요청 실행
    let [users, posts, comments] = await Promise.all([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/comments").then((r) => r.json()),
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error("에러:", error);
  }
}
```

---

## 🌐 DOM 조작

### 1. **DOM 선택** 🎯

```javascript
// ID로 선택
let element = document.getElementById("myElement");

// 클래스로 선택
let elements = document.getElementsByClassName("myClass");
let element2 = document.querySelector(".myClass"); // 첫 번째
let allElements = document.querySelectorAll(".myClass"); // 모든 것

// 태그로 선택
let paragraphs = document.getElementsByTagName("p");
let firstP = document.querySelector("p");

// 복잡한 선택자
let specific = document.querySelector("#container .item:first-child");
```

### 2. **DOM 조작** ✏️

```javascript
// 텍스트 변경
element.textContent = "새로운 텍스트";
element.innerHTML = "<strong>HTML 포함</strong>";

// 속성 조작
element.setAttribute("class", "newClass");
element.getAttribute("id");
element.removeAttribute("class");

// 스타일 변경
element.style.color = "red";
element.style.fontSize = "20px";
element.style.backgroundColor = "#f0f0f0";

// 클래스 조작
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("visible");
element.classList.contains("active"); // true/false

// 요소 생성 및 추가
let newDiv = document.createElement("div");
newDiv.textContent = "새로 만든 요소";
newDiv.className = "new-element";

document.body.appendChild(newDiv);
element.insertBefore(newDiv, element.firstChild);

// 요소 제거
element.remove();
parent.removeChild(child);
```

### 3. **이벤트 처리** 🎪

```javascript
// 이벤트 리스너 추가
button.addEventListener("click", function (event) {
  console.log("버튼이 클릭되었습니다!");
  console.log("이벤트 객체:", event);
});

// 화살표 함수로
button.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 동작 방지
  e.stopPropagation(); // 이벤트 버블링 중지
});

// 여러 이벤트 처리
input.addEventListener("focus", () => console.log("포커스"));
input.addEventListener("blur", () => console.log("포커스 해제"));
input.addEventListener("input", (e) => console.log("입력:", e.target.value));

// 키보드 이벤트
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("엔터 키 눌림");
  }
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Ctrl+S 눌림");
  }
});

// 마우스 이벤트
element.addEventListener("mouseenter", () => console.log("마우스 진입"));
element.addEventListener("mouseleave", () => console.log("마우스 떠남"));
```

---

## 🛠️ 유용한 내장 함수들

### 1. **문자열 메서드** 📝

```javascript
let text = "  Hello, World!  ";

// 기본 조작
console.log(text.length); // 길이
console.log(text.toUpperCase()); // 대문자
console.log(text.toLowerCase()); // 소문자
console.log(text.trim()); // 공백 제거

// 검색
console.log(text.indexOf("World")); // 9 (위치)
console.log(text.includes("Hello")); // true
console.log(text.startsWith("  Hello")); // true
console.log(text.endsWith("!  ")); // true

// 변환
console.log(text.replace("World", "JavaScript")); // 치환
console.log(text.split(",")); // 배열로 분할
console.log(text.slice(2, 7)); // 부분 문자열

// 패턴 매칭
let email = "user@example.com";
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailPattern.test(email)); // true
```

### 2. **숫자 메서드** 🔢

```javascript
let num = 3.14159;

// 반올림
console.log(Math.round(num)); // 3
console.log(Math.ceil(num)); // 4 (올림)
console.log(Math.floor(num)); // 3 (내림)
console.log(num.toFixed(2)); // "3.14" (소수점 자릿수)

// 기타 Math 메서드
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.min(1, 5, 3)); // 1
console.log(Math.random()); // 0~1 랜덤
console.log(Math.abs(-5)); // 5 (절댓값)
console.log(Math.pow(2, 3)); // 8 (2의 3제곱)

// 숫자 변환
console.log(parseInt("123px")); // 123
console.log(parseFloat("3.14")); // 3.14
console.log(Number("42")); // 42
console.log(isNaN("abc")); // true
```

### 3. **날짜와 시간** 📅

```javascript
// 현재 날짜/시간
let now = new Date();
console.log(now);

// 특정 날짜 생성
let birthday = new Date("1995-05-15");
let specificDate = new Date(2023, 11, 25); // 월은 0부터 시작 (11 = 12월)

// 날짜 정보 가져오기
console.log(now.getFullYear()); // 연도
console.log(now.getMonth()); // 월 (0~11)
console.log(now.getDate()); // 일
console.log(now.getDay()); // 요일 (0=일요일)
console.log(now.getHours()); // 시간
console.log(now.getMinutes()); // 분

// 날짜 포맷팅
console.log(now.toDateString()); // "Mon Dec 25 2023"
console.log(now.toLocaleDateString()); // 로컬 날짜 형식
console.log(now.toISOString()); // ISO 형식
```

---

## 🎯 실전 예제

### 1. **간단한 계산기** 🧮

```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this;
  }

  subtract(num) {
    this.result -= num;
    return this;
  }

  multiply(num) {
    this.result *= num;
    return this;
  }

  divide(num) {
    if (num !== 0) {
      this.result /= num;
    } else {
      throw new Error("0으로 나눌 수 없습니다!");
    }
    return this;
  }

  clear() {
    this.result = 0;
    return this;
  }

  getResult() {
    return this.result;
  }
}

// 사용법
let calc = new Calculator();
let result = calc.add(10).multiply(2).subtract(5).getResult();
console.log(result); // 15
```

### 2. **TODO 리스트** ✅

```javascript
class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    const todo = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  getActiveTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getAllTodos() {
    return this.todos;
  }
}

// 사용법
let todoList = new TodoList();
todoList.addTodo("JavaScript 공부하기");
todoList.addTodo("프로젝트 완성하기");
todoList.toggleTodo(1);

console.log("활성 할일:", todoList.getActiveTodos());
console.log("완료 할일:", todoList.getCompletedTodos());
```

---

## 🎯 학습 로드맵

### 1단계: 기초 📚

- [ ] 변수와 데이터 타입
- [ ] 연산자와 조건문
- [ ] 반복문과 함수
- [ ] 배열과 객체

### 2단계: 중급 🚀

- [ ] DOM 조작
- [ ] 이벤트 처리
- [ ] ES6+ 문법
- [ ] 비동기 프로그래밍

### 3단계: 고급 ⭐

- [ ] 클래스와 모듈
- [ ] 에러 처리
- [ ] 정규표현식
- [ ] 브라우저 API

### 4단계: 실전 💪

- [ ] 프로젝트 만들기
- [ ] 라이브러리 사용
- [ ] 성능 최적화
- [ ] 디버깅 기법

---

## 💡 팁과 주의사항

### ✅ 좋은 습관

- **const** 우선, 필요시 **let** 사용
- **함수는 작고 명확하게** 작성
- **의미 있는 변수명** 사용
- **주석**으로 복잡한 로직 설명
- **에러 처리** 반드시 포함

### ❌ 피해야 할 것들

- **var** 사용 (스코프 문제)
- **전역 변수** 남용
- **콜백 지옥** (Promise/async-await 사용)
- **== 연산자** (=== 사용 권장)
- **익명 함수** 과다 사용

### 🔧 디버깅 도구

- **console.log()** - 기본 로깅
- **console.table()** - 배열/객체 표 형태로 출력
- **console.error()** - 에러 메시지
- **debugger** - 브레이크포인트 설정
- **브라우저 개발자 도구** - F12

---

## 🌟 마무리

JavaScript는 **웹 개발의 필수 언어**이자 **프론트엔드와 백엔드를 아우르는 강력한 도구**입니다!

**핵심만 기억하세요:**

1. 🔤 **기본 문법** = 변수, 함수, 제어문
2. 📚 **데이터 구조** = 배열, 객체
3. ⚡ **ES6+** = 모던 JavaScript 문법
4. 🔄 **비동기** = Promise, async/await
5. 🌐 **DOM** = 웹페이지 조작

**매일 조금씩 실습하면서 JavaScript 마스터가 되어보세요!** 🚀✨

**"코드는 읽히기 위해 쓰여진다"**는 것을 항상 기억하세요! 😊
