# 📝 JavaScript 기초 정리

## 🎯 JavaScript란?

**JavaScript = 웹페이지에 움직임을 주는 도구!** ✨

쉽게 말해서:

- 버튼 클릭, 팝업 창, 계산 등을 할 수 있게 해줘요
- HTML과 CSS로 만든 웹페이지가 **살아 움직이게** 만들어요!

### 🎭 3형제의 역할

```html
<!-- HTML: 뼈대 -->
<button id="내버튼">클릭해봐!</button>
```

```css
/* CSS: 꾸미기 */
button {
  background-color: blue;
  color: white;
}
```

```javascript
// JavaScript: 동작하게 하기
document.getElementById("내버튼").onclick = function () {
  alert("안녕하세요! 🎉");
};
```

---

## 📦 변수 - 값 저장하기

### 변수 만들기

```javascript
let 이름 = "철수";
let 나이 = 25;
let 키 = 175.5;
let 학생인가 = true;

console.log(이름); // 콘솔에 "철수" 출력
```

### 변수 바꾸기

```javascript
let 점수 = 80;
console.log(점수); // 80

점수 = 90;
console.log(점수); // 90
```

### 상수 (바뀌지 않는 값)

```javascript
const 생일 = "1999-01-01";
const 파이 = 3.14;
// 생일 = "2000-01-01";  // 에러! 바꿀 수 없음
```

---

## 🔢 기본 계산하기

### 숫자 계산

```javascript
let a = 10;
let b = 3;

console.log(a + b); // 13 (더하기)
console.log(a - b); // 7  (빼기)
console.log(a * b); // 30 (곱하기)
console.log(a / b); // 3.33... (나누기)
console.log(a % b); // 1  (나머지)
```

### 문자 합치기

```javascript
let 성 = "김";
let 이름 = "철수";
let 전체이름 = 성 + 이름; // "김철수"

let 인사 = "안녕하세요, " + 전체이름 + "님!";
console.log(인사); // "안녕하세요, 김철수님!"
```

---

## 🤔 조건문 - 만약에...

### if문 기본

```javascript
let 날씨 = "비";

if (날씨 === "비") {
  console.log("우산을 가져가세요 ☔");
} else {
  console.log("좋은 하루 되세요 ☀️");
}
```

### 여러 조건 확인하기

```javascript
let 점수 = 85;

if (점수 >= 90) {
  console.log("A학점! 🏆");
} else if (점수 >= 80) {
  console.log("B학점! 👍");
} else if (점수 >= 70) {
  console.log("C학점! 📚");
} else {
  console.log("더 열심히 해요! 💪");
}
```

### 비교 연산자

```javascript
let a = 10;
let b = 20;

console.log(a === b); // false (같다)
console.log(a !== b); // true  (다르다)
console.log(a < b); // true  (작다)
console.log(a > b); // false (크다)
console.log(a <= b); // true  (작거나 같다)
console.log(a >= b); // false (크거나 같다)
```

---

## 🔄 반복문 - 계속 반복하기

### for문 - 정해진 횟수만큼

```javascript
// 1부터 5까지 출력
for (let i = 1; i <= 5; i++) {
  console.log(i + "번째 안녕!");
}

// 결과:
// 1번째 안녕!
// 2번째 안녕!
// 3번째 안녕!
// 4번째 안녕!
// 5번째 안녕!
```

### while문 - 조건이 참일 동안

```javascript
let 숫자 = 1;

while (숫자 <= 3) {
  console.log("숫자: " + 숫자);
  숫자++; // 숫자를 1 증가
}

// 결과:
// 숫자: 1
// 숫자: 2
// 숫자: 3
```

---

## 📋 배열 - 여러 값 저장하기

### 배열 만들기

```javascript
let 과일들 = ["사과", "바나나", "오렌지"];
let 숫자들 = [1, 2, 3, 4, 5];

console.log(과일들[0]); // "사과" (첫 번째)
console.log(과일들[1]); // "바나나" (두 번째)
```

### 배열에 추가/제거하기

```javascript
let 할일들 = ["공부하기", "운동하기"];

// 추가하기
할일들.push("책 읽기");
console.log(할일들); // ["공부하기", "운동하기", "책 읽기"]

// 마지막 것 제거하기
할일들.pop();
console.log(할일들); // ["공부하기", "운동하기"]
```

### 배열 반복하기

```javascript
let 동물들 = ["강아지", "고양이", "토끼"];

for (let i = 0; i < 동물들.length; i++) {
  console.log(i + 1 + "번째 동물: " + 동물들[i]);
}

// 더 쉬운 방법
동물들.forEach(function (동물, 순서) {
  console.log(순서 + 1 + "번째 동물: " + 동물);
});
```

---

## 🎯 함수 - 기능 만들기

### 기본 함수

```javascript
function 인사하기() {
  console.log("안녕하세요!");
}

인사하기(); // 함수 실행
인사하기(); // 또 실행 가능
```

### 값을 받는 함수

```javascript
function 인사하기(이름) {
  console.log("안녕하세요, " + 이름 + "님!");
}

인사하기("철수"); // "안녕하세요, 철수님!"
인사하기("영희"); // "안녕하세요, 영희님!"
```

### 값을 돌려주는 함수

```javascript
function 더하기(a, b) {
  return a + b;
}

let 결과 = 더하기(5, 3);
console.log(결과); // 8

// 바로 사용도 가능
console.log(더하기(10, 20)); // 30
```

---

## 🖱️ 웹페이지와 상호작용하기

### HTML 요소 찾기

```html
<h1 id="제목">안녕하세요!</h1>
<button class="버튼">클릭!</button>
```

```javascript
// ID로 찾기
let 제목 = document.getElementById("제목");

// 클래스로 찾기
let 버튼 = document.querySelector(".버튼");

// 태그로 찾기
let 모든제목 = document.querySelectorAll("h1");
```

### 내용 바꾸기

```javascript
// 글자 바꾸기
document.getElementById("제목").innerText = "새로운 제목!";

// HTML 바꾸기
document.getElementById("제목").innerHTML = "<strong>굵은 제목!</strong>";
```

### 스타일 바꾸기

```javascript
let 제목 = document.getElementById("제목");

제목.style.color = "red";
제목.style.fontSize = "30px";
제목.style.backgroundColor = "yellow";
```

---

## 🎪 이벤트 - 클릭, 입력 반응하기

### 버튼 클릭 이벤트

```html
<button id="내버튼">클릭해봐!</button>
```

```javascript
document.getElementById("내버튼").onclick = function () {
  alert("버튼이 클릭되었어요!");
};

// 또는 이렇게도 가능
document.getElementById("내버튼").addEventListener("click", function () {
  console.log("버튼 클릭됨!");
});
```

### 입력창 이벤트

```html
<input type="text" id="이름입력" placeholder="이름을 입력하세요" />
```

```javascript
document.getElementById("이름입력").oninput = function () {
  let 입력값 = this.value;
  console.log("입력한 값: " + 입력값);
};
```

---

## 🎮 실습 예제들

### 1. 간단한 계산기

```html
<input type="number" id="숫자1" placeholder="첫 번째 숫자" />
<input type="number" id="숫자2" placeholder="두 번째 숫자" />
<button onclick="계산하기()">계산하기</button>
<p id="결과"></p>
```

```javascript
function 계산하기() {
  let 숫자1 = document.getElementById("숫자1").value;
  let 숫자2 = document.getElementById("숫자2").value;

  let 결과 = Number(숫자1) + Number(숫자2);

  document.getElementById("결과").innerText = "결과: " + 결과;
}
```

### 2. 색깔 바꾸기

```html
<div
  id="색깔박스"
  style="width: 200px; height: 200px; background-color: red;"
></div>
<button onclick="색깔바꾸기()">색깔 바꾸기</button>
```

```javascript
function 색깔바꾸기() {
  let 색깔들 = ["red", "blue", "green", "yellow", "purple"];
  let 랜덤숫자 = Math.floor(Math.random() * 색깔들.length);
  let 선택된색깔 = 색깔들[랜덤숫자];

  document.getElementById("색깔박스").style.backgroundColor = 선택된색깔;
}
```

### 3. 할 일 목록

```html
<input type="text" id="할일입력" placeholder="할 일을 입력하세요" />
<button onclick="할일추가()">추가</button>
<ul id="할일목록"></ul>
```

```javascript
let 할일들 = [];

function 할일추가() {
  let 새할일 = document.getElementById("할일입력").value;

  if (새할일 !== "") {
    할일들.push(새할일);
    할일목록보여주기();
    document.getElementById("할일입력").value = ""; // 입력창 비우기
  }
}

function 할일목록보여주기() {
  let 목록HTML = "";

  for (let i = 0; i < 할일들.length; i++) {
    목록HTML +=
      "<li>" +
      할일들[i] +
      " <button onclick='할일삭제(" +
      i +
      ")'>삭제</button></li>";
  }

  document.getElementById("할일목록").innerHTML = 목록HTML;
}

function 할일삭제(순서) {
  할일들.splice(순서, 1); // 배열에서 제거
  할일목록보여주기();
}
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] 변수, 함수 만들어보기
- [ ] 조건문, 반복문 연습하기
- [ ] 배열 사용해보기
- [ ] 간단한 계산기 만들기

### 🥈 2단계: 중급 (2-3주)

- [ ] HTML 요소 조작하기
- [ ] 버튼 클릭 이벤트 만들기
- [ ] 입력값 받아서 처리하기
- [ ] 할 일 목록 앱 만들기

### 🥇 3단계: 고급 (4주 이상)

- [ ] 객체, 클래스 사용하기
- [ ] API로 데이터 가져오기
- [ ] 로컬 스토리지 사용하기
- [ ] 완성도 높은 웹앱 만들기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **console.log() 자주 사용** - 값이 제대로 나오는지 확인
- **작은 기능부터 만들기** - 한 번에 다 하려고 하지 말고
- **에러 메시지 읽기** - F12 눌러서 콘솔 확인하기
- **코드 정리하기** - 들여쓰기, 의미있는 변수명

### ❌ 이건 피하세요

- 세미콜론(;) 빼먹기
- 변수명을 a, b, c 같이 의미없게 짓기
- 에러 무시하고 넘어가기
- 너무 복잡하게 만들려고 하기

---

## 🌟 마무리

**JavaScript 핵심 3가지:**

1. 💾 **변수** = 값을 저장하는 상자
2. 🔄 **함수** = 기능을 만드는 방법
3. 🎪 **이벤트** = 클릭, 입력에 반응하기

**기억하세요:**

- JavaScript는 **웹페이지의 두뇌**예요
- 작은 것부터 차근차근 만들어보세요
- 에러가 나면 콘솔을 확인하세요
- 재미있는 기능을 만드는 게 최고예요!

**화이팅! 🚀✨**
