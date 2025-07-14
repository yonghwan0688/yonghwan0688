# 🎨 CSS 기초 정리

## 🎯 CSS란?

**CSS = 웹페이지를 예쁘게 꾸미는 마법사!** ✨

- Cascading Style Sheets의 줄임말
- HTML 구조에 디자인과 레이아웃을 입히는 언어
- 웹사이트의 시각적 표현을 담당

### 🏠 건축으로 비유하면...

```html
<!-- HTML: 집의 골격 🏗️ -->
<div class="house">
  <div class="roof">지붕</div>
  <div class="wall">벽</div>
  <div class="door">문</div>
</div>
```

```css
/* CSS: 집의 인테리어 🎨 */
.house {
  border: 2px solid #333;
  background-color: #f0f0f0;
}

.roof {
  background-color: #8b4513;
  color: white;
}

.door {
  background-color: #654321;
  width: 50px;
  height: 80px;
}
```

---

## 🎯 CSS 선택자 (Selectors)

### 1. **기본 선택자** 🎪

```css
/* 태그 선택자 */
h1 {
  color: blue;
  font-size: 24px;
}

/* 클래스 선택자 */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* ID 선택자 */
#header {
  background-color: #333;
  color: white;
}

/* 전체 선택자 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 2. **복합 선택자** 🎭

```css
/* 후손 선택자 (띄어쓰기) */
.container p {
  color: gray;
}

/* 자식 선택자 (>) */
.nav > li {
  display: inline-block;
}

/* 인접 형제 선택자 (+) */
h2 + p {
  margin-top: 0;
}

/* 일반 형제 선택자 (~) */
h2 ~ p {
  color: #666;
}

/* 그룹 선택자 (,) */
h1,
h2,
h3 {
  font-family: "Arial", sans-serif;
}
```

### 3. **속성 선택자** 📋

```css
/* 속성이 있는 요소 */
input[required] {
  border: 2px solid red;
}

/* 특정 속성값 */
input[type="email"] {
  background-color: #e6f3ff;
}

/* 속성값 포함 */
a[href*="example"] {
  color: green;
}

/* 속성값으로 시작 */
a[href^="https"] {
  padding-left: 20px;
}

/* 속성값으로 끝남 */
a[href$=".pdf"] {
  font-weight: bold;
}
```

### 4. **가상 클래스 (Pseudo-classes)** 👻

```css
/* 마우스 호버 */
button:hover {
  background-color: #007bff;
  transform: scale(1.05);
}

/* 클릭 상태 */
button:active {
  transform: scale(0.95);
}

/* 포커스 상태 */
input:focus {
  outline: 2px solid #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* 방문한 링크 */
a:visited {
  color: purple;
}

/* 첫 번째 자식 */
li:first-child {
  font-weight: bold;
}

/* 마지막 자식 */
li:last-child {
  border-bottom: none;
}

/* n번째 자식 */
li:nth-child(2n) {
  /* 짝수 번째 */
  background-color: #f9f9f9;
}

li:nth-child(odd) {
  /* 홀수 번째 */
  background-color: white;
}
```

### 5. **가상 요소 (Pseudo-elements)** 👻

```css
/* 첫 글자 스타일 */
p:first-letter {
  font-size: 3em;
  float: left;
  margin-right: 5px;
}

/* 첫 줄 스타일 */
p:first-line {
  font-weight: bold;
}

/* 요소 앞에 내용 추가 */
.quote:before {
  content: "" ";
  font-size: 2em;
  color: #ccc;
}

/* 요소 뒤에 내용 추가 */
.quote:after {
  content: " "";
  font-size: 2em;
  color: #ccc;
}

/* 선택된 텍스트 */
::selection {
  background-color: #007bff;
  color: white;
}
```

---

## 📏 박스 모델 (Box Model)

### 1. **박스 모델 구조** 📦

```css
.box {
  /* 내용 (Content) */
  width: 200px;
  height: 100px;

  /* 안쪽 여백 (Padding) */
  padding: 20px;
  /* padding: 10px 20px; (위아래 좌우) */
  /* padding: 10px 15px 20px 25px; (위 우 아래 좌) */

  /* 테두리 (Border) */
  border: 2px solid #333;
  border-radius: 10px;

  /* 바깥쪽 여백 (Margin) */
  margin: 30px;
  /* margin: 20px auto; (위아래 20px, 좌우 중앙정렬) */

  /* 박스 크기 계산 방식 */
  box-sizing: border-box; /* padding과 border 포함한 크기 */
}

/* 실제 요소 크기 계산 */
/*
기본 box-sizing: content-box
- 전체 너비 = width + padding-left + padding-right + border-left + border-right
- 200px + 40px + 4px = 244px

box-sizing: border-box
- 전체 너비 = width (padding과 border 포함)
- 200px (고정)
*/
```

### 2. **마진 상쇄 (Margin Collapse)** 🔄

```css
/* 세로 마진은 상쇄됨 */
.box1 {
  margin-bottom: 30px;
}

.box2 {
  margin-top: 20px;
}
/* 실제 간격: 30px (큰 값으로 상쇄) */

/* 해결 방법 */
.container {
  overflow: hidden; /* 또는 display: flex */
}
```

---

## 🎨 스타일링 속성들

### 1. **텍스트 스타일** 📝

```css
.text-styles {
  /* 폰트 관련 */
  font-family: "Arial", "Helvetica", sans-serif;
  font-size: 16px; /* 글자 크기 */
  font-weight: bold; /* normal, bold, 100-900 */
  font-style: italic; /* normal, italic, oblique */

  /* 텍스트 정렬 */
  text-align: center; /* left, right, center, justify */
  text-decoration: underline; /* none, underline, line-through */
  text-transform: uppercase; /* lowercase, uppercase, capitalize */

  /* 줄 간격 */
  line-height: 1.5; /* 줄 높이 */
  letter-spacing: 2px; /* 글자 간격 */
  word-spacing: 5px; /* 단어 간격 */

  /* 텍스트 넘침 처리 */
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘친 내용 숨김 */
  text-overflow: ellipsis; /* ... 표시 */
}
```

### 2. **색상과 배경** 🌈

```css
.colors-backgrounds {
  /* 텍스트 색상 */
  color: #333; /* 16진수 */
  color: rgb(255, 0, 0); /* RGB */
  color: rgba(255, 0, 0, 0.5); /* RGBA (투명도) */
  color: hsl(240, 100%, 50%); /* HSL */

  /* 배경 색상 */
  background-color: #f0f0f0;

  /* 배경 이미지 */
  background-image: url("image.jpg");
  background-size: cover; /* contain, cover, 100px 200px */
  background-position: center; /* top, bottom, left, right, center */
  background-repeat: no-repeat; /* repeat, repeat-x, repeat-y */
  background-attachment: fixed; /* scroll, fixed */

  /* 배경 축약 속성 */
  background: #fff url("bg.jpg") no-repeat center / cover;

  /* 그라디언트 */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}
```

### 3. **테두리와 그림자** 🎭

```css
.borders-shadows {
  /* 테두리 */
  border: 2px solid #333;
  border-top: 1px dashed red;
  border-radius: 10px; /* 모서리 둥글게 */
  border-radius: 10px 20px; /* 위아래 좌우 */
  border-radius: 5px 10px 15px 20px; /* 위 우 아래 좌 */

  /* 박스 그림자 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), /* 여러 그림자 */ 0 1px 2px rgba(0, 0, 0, 0.06);

  /* 텍스트 그림자 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  /* 내부 그림자 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

## 📐 레이아웃

### 1. **Display 속성** 👁️

```css
/* 블록 요소 */
.block {
  display: block; /* 한 줄 전체 차지 */
  width: 100%;
  margin: 10px 0;
}

/* 인라인 요소 */
.inline {
  display: inline; /* 내용만큼만 차지, width/height 무시 */
  padding: 5px;
}

/* 인라인 블록 */
.inline-block {
  display: inline-block; /* 인라인처럼 나란히, 블록처럼 크기 조절 */
  width: 100px;
  height: 50px;
}

/* 숨김 */
.hidden {
  display: none; /* 완전히 숨김 (공간도 차지 안함) */
}

.invisible {
  visibility: hidden; /* 보이지 않음 (공간은 차지함) */
}
```

### 2. **Position 속성** 📍

```css
/* 정적 위치 (기본값) */
.static {
  position: static; /* 문서 흐름대로 배치 */
}

/* 상대 위치 */
.relative {
  position: relative; /* 원래 위치 기준으로 이동 */
  top: 10px; /* 위에서 10px 아래로 */
  left: 20px; /* 왼쪽에서 20px 오른쪽으로 */
}

/* 절대 위치 */
.absolute {
  position: absolute; /* 가장 가까운 positioned 부모 기준 */
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
}

/* 고정 위치 */
.fixed {
  position: fixed; /* 브라우저 윈도우 기준 */
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  z-index: 1000; /* 레이어 순서 */
}

/* 끈끈한 위치 */
.sticky {
  position: sticky; /* 스크롤에 따라 relative -> fixed */
  top: 0; /* 상단에 도달하면 고정 */
}
```

### 3. **Float와 Clear** 🏊‍♂️

```css
/* Float (구식 방법) */
.float-left {
  float: left;
  width: 50%;
}

.float-right {
  float: right;
  width: 50%;
}

/* Clear */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 모던 대안: Flexbox 사용 권장 */
.modern-layout {
  display: flex;
}

.modern-layout > div {
  flex: 1; /* 동일한 크기로 분할 */
}
```

---

## 🌟 Flexbox

### 1. **Flex Container** 📦

```css
.flex-container {
  display: flex; /* 플렉스 컨테이너 활성화 */

  /* 주축 방향 */
  flex-direction: row; /* row, column, row-reverse, column-reverse */

  /* 줄바꿈 */
  flex-wrap: nowrap; /* nowrap, wrap, wrap-reverse */

  /* 축약 속성 */
  flex-flow: row wrap; /* flex-direction + flex-wrap */

  /* 주축 정렬 */
  justify-content: center; /* flex-start, flex-end, center, space-between, space-around, space-evenly */

  /* 교차축 정렬 */
  align-items: center; /* flex-start, flex-end, center, baseline, stretch */

  /* 여러 줄 정렬 */
  align-content: center; /* flex-start, flex-end, center, space-between, space-around, stretch */

  /* 간격 */
  gap: 20px; /* 아이템 간 간격 */
  row-gap: 20px; /* 행 간격 */
  column-gap: 10px; /* 열 간격 */
}
```

### 2. **Flex Items** 📋

```css
.flex-item {
  /* 성장 비율 */
  flex-grow: 1; /* 남은 공간을 차지하는 비율 */

  /* 축소 비율 */
  flex-shrink: 1; /* 공간이 부족할 때 축소 비율 */

  /* 기본 크기 */
  flex-basis: 200px; /* 초기 크기 */

  /* 축약 속성 */
  flex: 1 1 200px; /* grow shrink basis */
  flex: 1; /* grow만 지정 (1 1 0) */

  /* 개별 정렬 */
  align-self: flex-end; /* auto, flex-start, flex-end, center, baseline, stretch */

  /* 순서 */
  order: 2; /* 기본값 0, 낮을수록 앞에 */
}
```

### 3. **Flexbox 패턴** 🎨

```css
/* 중앙 정렬 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 사이드바 레이아웃 */
.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px; /* 고정 너비 */
  background: #f0f0f0;
}

.main-content {
  flex: 1; /* 나머지 공간 차지 */
  padding: 20px;
}

/* 카드 레이아웃 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* 최소 300px, 균등 분할 */
  min-height: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## 🎯 Grid Layout

### 1. **Grid Container** 🏗️

```css
.grid-container {
  display: grid;

  /* 열 정의 */
  grid-template-columns: 200px 1fr 100px; /* 고정-유동-고정 */
  grid-template-columns: repeat(3, 1fr); /* 3개 균등 분할 */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 반응형 */

  /* 행 정의 */
  grid-template-rows: 60px 1fr 40px; /* 헤더-메인-푸터 */
  grid-template-rows: repeat(4, 100px); /* 4개 행, 각 100px */

  /* 간격 */
  gap: 20px; /* 행과 열 간격 */
  row-gap: 20px; /* 행 간격 */
  column-gap: 10px; /* 열 간격 */

  /* 정렬 */
  justify-items: center; /* 개별 아이템 수평 정렬 */
  align-items: center; /* 개별 아이템 수직 정렬 */
  justify-content: center; /* 전체 그리드 수평 정렬 */
  align-content: center; /* 전체 그리드 수직 정렬 */
}
```

### 2. **Grid Items** 📌

```css
.grid-item {
  /* 열 위치 */
  grid-column-start: 1; /* 시작 열 */
  grid-column-end: 3; /* 끝 열 */
  grid-column: 1 / 3; /* 축약 형태 */
  grid-column: 1 / span 2; /* 1열부터 2개 열 차지 */

  /* 행 위치 */
  grid-row-start: 2;
  grid-row-end: 4;
  grid-row: 2 / 4;
  grid-row: 2 / span 2;

  /* 축약 속성 */
  grid-area: 2 / 1 / 4 / 3; /* row-start / col-start / row-end / col-end */

  /* 개별 정렬 */
  justify-self: end; /* start, end, center, stretch */
  align-self: start; /* start, end, center, stretch */
}
```

### 3. **Grid 템플릿 영역** 🗺️

```css
.grid-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

---

## 📱 반응형 디자인

### 1. **미디어 쿼리** 📺

```css
/* 기본 스타일 (모바일 우선) */
.container {
  width: 100%;
  padding: 10px;
}

/* 태블릿 (768px 이상) */
@media screen and (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
    padding: 20px;
  }
}

/* 데스크톱 (1024px 이상) */
@media screen and (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 30px;
  }
}

/* 큰 화면 (1200px 이상) */
@media screen and (min-width: 1200px) {
  .container {
    max-width: 1400px;
  }
}

/* 인쇄용 */
@media print {
  .no-print {
    display: none;
  }

  body {
    font-size: 12pt;
    color: black;
  }
}

/* 다크 모드 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}
```

### 2. **유연한 이미지** 🖼️

```css
/* 반응형 이미지 */
img {
  max-width: 100%;
  height: auto;
}

/* 배경 이미지 반응형 */
.hero {
  background-image: url("hero-mobile.jpg");
  background-size: cover;
  background-position: center;
  height: 300px;
}

@media (min-width: 768px) {
  .hero {
    background-image: url("hero-tablet.jpg");
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url("hero-desktop.jpg");
    height: 500px;
  }
}
```

### 3. **Viewport 단위** 📐

```css
/* Viewport 단위 활용 */
.full-height {
  height: 100vh; /* 뷰포트 높이의 100% */
}

.full-width {
  width: 100vw; /* 뷰포트 너비의 100% */
}

.responsive-text {
  font-size: 4vw; /* 뷰포트 너비의 4% */
  font-size: clamp(16px, 4vw, 32px); /* 최소 16px, 최대 32px */
}

/* CSS Custom Properties (변수) 활용 */
:root {
  --container-padding: 10px;
  --max-width: 1200px;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 20px;
  }
}

.container {
  padding: var(--container-padding);
  max-width: var(--max-width);
  margin: 0 auto;
}
```

---

## 🎭 애니메이션과 트랜지션

### 1. **트랜지션** 🌊

```css
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  /* 트랜지션 설정 */
  transition: all 0.3s ease;
  /* transition: background-color 0.3s ease, transform 0.2s ease; */
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 트랜지션 타이밍 함수 */
.ease {
  transition-timing-function: ease;
}
.linear {
  transition-timing-function: linear;
}
.ease-in {
  transition-timing-function: ease-in;
}
.ease-out {
  transition-timing-function: ease-out;
}
.ease-in-out {
  transition-timing-function: ease-in-out;
}
.custom {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 2. **Transform** 🔄

```css
.transform-examples {
  /* 이동 */
  transform: translate(50px, 100px); /* X, Y 이동 */
  transform: translateX(50px); /* X축 이동 */
  transform: translateY(100px); /* Y축 이동 */
  transform: translate3d(50px, 100px, 0); /* 3D 이동 */

  /* 회전 */
  transform: rotate(45deg); /* 2D 회전 */
  transform: rotateX(45deg); /* X축 회전 */
  transform: rotateY(45deg); /* Y축 회전 */
  transform: rotateZ(45deg); /* Z축 회전 */

  /* 크기 조절 */
  transform: scale(1.2); /* 1.2배 확대 */
  transform: scaleX(1.5); /* X축 1.5배 */
  transform: scaleY(0.8); /* Y축 0.8배 */

  /* 기울이기 */
  transform: skew(15deg, 0deg); /* X, Y축 기울이기 */
  transform: skewX(15deg); /* X축 기울이기 */

  /* 여러 변환 조합 */
  transform: translate(50px, 100px) rotate(45deg) scale(1.2);

  /* 변환 중심점 */
  transform-origin: center; /* center, top, bottom, left, right */
  transform-origin: 50% 50%; /* X, Y 좌표 */
}
```

### 3. **키프레임 애니메이션** 🎬

```css
/* 키프레임 정의 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* 애니메이션 적용 */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.bounce {
  animation: bounce 2s infinite;
}

.pulse {
  animation: pulse 1s ease-in-out infinite;
}

/* 애니메이션 상세 설정 */
.complex-animation {
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-play-state: running;

  /* 축약 형태 */
  animation: fadeIn 2s ease-in-out 0.5s infinite alternate forwards;
}
```

---

## 🔧 고급 기능

### 1. **CSS 변수 (Custom Properties)** 📊

```css
/* 전역 변수 정의 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 16px;
  --font-family-sans: "Arial", sans-serif;
  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* 다크 테마 */
[data-theme="dark"] {
  --primary-color: #4dabf7;
  --secondary-color: #adb5bd;
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

/* 변수 사용 */
.button {
  background-color: var(--primary-color);
  color: white;
  font-family: var(--font-family-sans);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.button:hover {
  background-color: var(--primary-color, #0056b3); /* fallback 값 */
}

/* JavaScript로 변수 조작 */
/* document.documentElement.style.setProperty('--primary-color', '#28a745'); */
```

### 2. **CSS Grid 고급** 🎯

```css
/* 복잡한 레이아웃 */
.advanced-grid {
  display: grid;
  grid-template-columns:
    [sidebar-start] 250px
    [sidebar-end main-start] 1fr
    [main-end aside-start] 200px
    [aside-end];
  grid-template-rows:
    [header-start] 60px
    [header-end content-start] 1fr
    [content-end footer-start] 40px
    [footer-end];

  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

/* 자동 배치 */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  gap: 20px;
}

/* 조건부 그리드 */
@supports (display: grid) {
  .grid-layout {
    display: grid;
    /* 그리드 지원하는 브라우저용 스타일 */
  }
}

@supports not (display: grid) {
  .grid-layout {
    display: flex;
    flex-wrap: wrap;
    /* 그리드 미지원 브라우저용 폴백 */
  }
}
```

### 3. **고급 선택자와 기능** 🔍

```css
/* :is() 선택자 */
:is(h1, h2, h3, h4, h5, h6) {
  margin-top: 0;
  margin-bottom: 0.5em;
}

/* :where() 선택자 (낮은 우선순위) */
:where(ul, ol) > li {
  margin-bottom: 0.5em;
}

/* :not() 선택자 */
p:not(.special) {
  color: #333;
}

/* :has() 선택자 (부모 선택) */
.card:has(img) {
  padding: 0;
}

/* 컨테이너 쿼리 */
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

/* Aspect Ratio */
.video-container {
  aspect-ratio: 16 / 9;
  background: #000;
}

/* Scroll Snap */
.scroll-container {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;
}

.scroll-item {
  scroll-snap-align: start;
  flex: 0 0 100%;
}
```

---

## 🎯 실전 예제

### 1. **카드 컴포넌트** 🃏

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-title {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.5;
}

.card-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background: #0056b3;
}
```

### 2. **네비게이션 바** 🧭

```css
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.navbar-item a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.navbar-item a:hover {
  color: #007bff;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.navbar-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .navbar-menu {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .navbar-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .navbar-item {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }

  .navbar-toggle {
    display: flex;
  }
}
```

### 3. **반응형 그리드 갤러리** 🖼️

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.gallery-item:hover .gallery-image {
  filter: brightness(0.8);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

.gallery-title {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.gallery-description {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 15px;
  }

  .gallery-overlay {
    position: static;
    transform: none;
    background: rgba(0, 0, 0, 0.8);
    padding: 15px;
  }
}
```

---

## 🎯 학습 로드맵

### 1단계: 기초 📚

- [ ] 선택자와 기본 속성
- [ ] 박스 모델과 레이아웃
- [ ] 텍스트와 색상 스타일링
- [ ] 기본 반응형 디자인

### 2단계: 레이아웃 🏗️

- [ ] Flexbox 마스터
- [ ] Grid Layout 이해
- [ ] Position 속성 활용
- [ ] 미디어 쿼리 작성

### 3단계: 고급 기능 ⭐

- [ ] 애니메이션과 트랜지션
- [ ] CSS 변수 활용
- [ ] 고급 선택자
- [ ] 성능 최적화

### 4단계: 실전 프로젝트 💪

- [ ] 컴포넌트 라이브러리 구축
- [ ] 복잡한 레이아웃 구현
- [ ] 접근성 고려
- [ ] 브라우저 호환성

---

## 💡 팁과 주의사항

### ✅ 좋은 습관

- **모바일 우선** 반응형 설계
- **semantic한 클래스명** 사용
- **CSS 변수**로 일관성 유지
- **성능**을 고려한 선택자 작성
- **접근성** 고려한 디자인

### ❌ 피해야 할 것들

- **!important** 남용
- **인라인 스타일** 과다 사용
- **ID 선택자** 과다 사용
- **magic number** (의미 없는 고정값)
- **브라우저별 접두사** 없는 새 속성

### 🔧 유용한 도구들

- **개발자 도구** - 브라우저 F12
- **Can I Use** - 브라우저 지원 확인
- **CSS Validator** - 문법 검사
- **Autoprefixer** - 브라우저 접두사 자동 추가
- **CSS Minifier** - 코드 압축

---

## 🌟 마무리

CSS는 **웹의 시각적 표현을 담당하는 핵심 기술**이며, **사용자 경험을 좌우하는 중요한 요소**입니다!

**핵심만 기억하세요:**

1. 🎯 **선택자** = 스타일을 적용할 요소 선택
2. 📦 **박스 모델** = 레이아웃의 기본 원리
3. 🌟 **Flexbox & Grid** = 모던 레이아웃 기법
4. 📱 **반응형** = 다양한 기기 대응
5. 🎭 **애니메이션** = 인터랙티브한 경험

**꾸준히 연습하면서 아름답고 사용자 친화적인 웹 디자인을 만들어보세요!** 🎨✨

**"좋은 디자인은 보이지 않는다"** - 사용자가 불편함을 느끼지 않는 자연스러운 인터페이스를 만드는 것이 목표입니다! 😊
