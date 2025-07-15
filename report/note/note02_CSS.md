# 🎨 CSS 기초 정리

## 🎯 CSS란?

**CSS = 웹페이지 꾸미는 도구!** ✨

쉽게 말해서:

- HTML로 만든 뼈대를 **예쁘게 꾸미는** 방법이에요
- 색깔, 크기, 위치를 바꿀 수 있어요!

### 🏠 집으로 비유하면...

```html
<!-- HTML: 집의 골격 -->
<div class="집">
  <div class="지붕">지붕</div>
  <div class="벽">벽</div>
</div>
```

```css
/* CSS: 집 꾸미기 */
.집 {
  border: 2px solid black;
  background-color: lightblue;
}

.지붕 {
  background-color: red;
  color: white;
}
```

---

## 🎯 CSS 사용하는 3가지 방법

### 1. 파일로 분리하기 (추천!)

```html
<!-- HTML 파일 -->
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

```css
/* style.css 파일 */
h1 {
  color: blue;
}
```

### 2. HTML 안에 쓰기

```html
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
```

### 3. 태그에 직접 쓰기

```html
<h1 style="color: blue;">파란색 제목</h1>
```

---

## 🎯 기본 선택하기

### 태그 이름으로 선택

```css
h1 {
  color: red; /* 모든 h1을 빨간색으로 */
}

p {
  font-size: 16px; /* 모든 p를 16px 크기로 */
}
```

### 클래스로 선택 (점 사용)

```html
<p class="특별한글">이 글은 특별해요</p>
```

```css
.특별한글 {
  color: purple;
  font-weight: bold;
}
```

### ID로 선택 (# 사용)

```html
<h1 id="메인제목">메인 제목</h1>
```

```css
#메인제목 {
  color: green;
  text-align: center;
}
```

---

## 🌈 색깔 바꾸기

### 글자 색깔

```css
h1 {
  color: red; /* 색깔 이름 */
  color: #ff0000; /* 색깔 코드 */
  color: rgb(255, 0, 0); /* RGB 값 */
}
```

### 배경 색깔

```css
.박스 {
  background-color: yellow;
  background-color: #ffff00;
}
```

### 인기 색깔들

```css
.빨강 {
  color: red;
}
.파랑 {
  color: blue;
}
.초록 {
  color: green;
}
.노랑 {
  color: yellow;
}
.보라 {
  color: purple;
}
.주황 {
  color: orange;
}
.분홍 {
  color: pink;
}
```

---

## 📝 글자 꾸미기

### 글자 크기

```css
.작은글 {
  font-size: 12px;
}
.보통글 {
  font-size: 16px;
}
.큰글 {
  font-size: 24px;
}
.매우큰글 {
  font-size: 36px;
}
```

### 글자 굵기

```css
.가는글 {
  font-weight: normal;
}
.굵은글 {
  font-weight: bold;
}
.매우굵은글 {
  font-weight: 900;
}
```

### 글자 정렬

```css
.왼쪽정렬 {
  text-align: left;
}
.가운데정렬 {
  text-align: center;
}
.오른쪽정렬 {
  text-align: right;
}
```

### 글자 스타일

```css
.기울임글 {
  font-style: italic;
}
.밑줄글 {
  text-decoration: underline;
}
.취소선글 {
  text-decoration: line-through;
}
```

---

## 📦 박스 꾸미기

### 박스 크기

```css
.박스 {
  width: 200px; /* 가로 크기 */
  height: 100px; /* 세로 크기 */
}
```

### 박스 테두리

```css
.테두리박스 {
  border: 2px solid black; /* 검은 실선 */
  border: 3px dashed red; /* 빨간 점선 */
  border-radius: 10px; /* 둥근 모서리 */
}
```

### 박스 안쪽 여백 (padding)

```css
.여백박스 {
  padding: 20px; /* 모든 방향 20px */
  padding-top: 10px; /* 위쪽만 10px */
  padding-left: 15px; /* 왼쪽만 15px */
}
```

### 박스 바깥쪽 여백 (margin)

```css
.간격박스 {
  margin: 20px; /* 모든 방향 20px */
  margin-bottom: 30px; /* 아래쪽만 30px */
}
```

---

## 🎯 박스 배치하기

### 기본 배치

```css
.왼쪽으로 {
  float: left;
}
.오른쪽으로 {
  float: right;
}
.가운데로 {
  margin: 0 auto;
  width: 300px; /* 가로 크기 필요 */
}
```

### Flexbox (쉬운 배치)

```css
.부모박스 {
  display: flex;
  justify-content: center; /* 가로 가운데 */
  align-items: center; /* 세로 가운데 */
}
```

### 위치 정하기

```css
.고정위치 {
  position: fixed;
  top: 10px;
  right: 10px;
}

.상대위치 {
  position: relative;
  top: 20px;
  left: 30px;
}
```

---

## 🎪 실습해보기

### 간단한 카드 만들기

```html
<div class="카드">
  <h2>내 프로필</h2>
  <p>안녕하세요! 웹 개발자입니다.</p>
  <button class="버튼">연락하기</button>
</div>
```

```css
.카드 {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.버튼 {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.버튼:hover {
  background-color: darkblue; /* 마우스 올렸을 때 */
}
```

### 네비게이션 메뉴 만들기

```html
<nav class="메뉴">
  <a href="#" class="메뉴항목">홈</a>
  <a href="#" class="메뉴항목">소개</a>
  <a href="#" class="메뉴항목">연락처</a>
</nav>
```

```css
.메뉴 {
  background-color: #333;
  padding: 0;
}

.메뉴항목 {
  display: inline-block;
  color: white;
  padding: 15px 20px;
  text-decoration: none;
}

.메뉴항목:hover {
  background-color: #555;
}
```

---

## 📱 반응형 웹 (모바일 대응)

### 기본 설정

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 화면 크기별 CSS

```css
/* 컴퓨터용 */
.박스 {
  width: 800px;
}

/* 태블릿용 */
@media (max-width: 768px) {
  .박스 {
    width: 100%;
    padding: 10px;
  }
}

/* 모바일용 */
@media (max-width: 480px) {
  .박스 {
    font-size: 14px;
  }
}
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1주)

- [ ] CSS 파일 만들고 연결하기
- [ ] 색깔, 글자 크기 바꿔보기
- [ ] 클래스, ID 사용해보기
- [ ] 박스 테두리, 여백 주기

### 🥈 2단계: 중급 (2주)

- [ ] 박스 배치하기 (float, flexbox)
- [ ] 버튼, 카드 만들어보기
- [ ] 간단한 웹페이지 꾸미기
- [ ] 호버 효과 추가하기

### 🥇 3단계: 고급 (3주)

- [ ] 반응형 웹 만들기
- [ ] 애니메이션 효과
- [ ] CSS Grid 사용하기
- [ ] 예쁜 웹사이트 완성하기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **클래스 이름 의미있게** - `.빨간버튼` 보다 `.주요버튼`
- **코드 정리하기** - 들여쓰기, 줄바꿈 잘하기
- **브라우저에서 확인** - F12 눌러서 개발자 도구 사용
- **작은 것부터 시작** - 간단한 것부터 차근차근

### ❌ 이건 피하세요

- 모든 걸 인라인 스타일로 쓰기
- 의미 없는 클래스명 (`.a`, `.box1`)
- 너무 복잡하게 만들기
- 스타일 중복해서 쓰기

---

## 🌟 마무리

**CSS 핵심 3가지:**

1. 🎯 **선택하기** = 태그, 클래스, ID로 골라내기
2. 🎨 **꾸미기** = 색깔, 크기, 모양 바꾸기
3. 📦 **배치하기** = 원하는 위치에 놓기

**기억하세요:**

- CSS는 **웹페이지의 화장**이에요
- 작은 변화부터 시작해보세요
- 브라우저에서 바로바로 확인하세요
- 예쁘게 만드는 게 재미있어요!

**화이팅! 🚀✨**
