# 🌐 HTML 기초 정리

## 🎯 HTML이란?

**HTML = 웹페이지 만드는 블록!** 🧱

쉽게 말해서:

- 웹페이지의 **기본 틀**을 만드는 도구예요
- 글자, 그림, 버튼을 화면에 보여주는 방법이에요!

### 🏠 집으로 비유하면...

```html
<!DOCTYPE html>
<html>
  <head>
    <title>우리 집</title>
  </head>
  <body>
    <h1>우리 집에 오신 걸 환영해요!</h1>
    <p>여기는 거실이에요</p>
    <button>문 열기</button>
  </body>
</html>
```

HTML은 **집의 설계도**처럼 웹페이지 구조를 만들어요!

---

## 🧩 기본 구조 알아보기

### HTML 문서의 기본 틀

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 화면에 안 보이는 정보들 -->
    <title>브라우저 탭에 보이는 제목</title>
  </head>
  <body>
    <!-- 화면에 보이는 내용들 -->
    <h1>큰 제목</h1>
    <p>문단 내용</p>
  </body>
</html>
```

**기억하기:**

- `<head>` = 뒤에서 일하는 사람 👨‍💻
- `<body>` = 손님이 보는 부분 👀

---

## 📝 글자 쓰기

### 제목 만들기

```html
<h1>가장 큰 제목</h1>
<h2>두 번째 제목</h2>
<h3>세 번째 제목</h3>
<!-- h1이 제일 크고, h6까지 있어요 -->
```

### 문단 만들기

```html
<p>안녕하세요! 저는 웹 개발자입니다.</p>
<p>HTML을 배우고 있어요.</p>

<!-- 줄바꿈 -->
<br />

<!-- 굵은 글씨 -->
<strong>중요한 내용</strong>
<b>굵은 글씨</b>

<!-- 기울임 글씨 -->
<em>강조하고 싶은 내용</em>
<i>기울임 글씨</i>
```

---

## 🔗 링크 만들기

### 다른 사이트로 가기

```html
<a href="https://www.google.com">구글로 가기</a>
<a href="https://www.naver.com">네이버로 가기</a>

<!-- 새 탭에서 열기 -->
<a href="https://www.youtube.com" target="_blank">유튜브 (새 창)</a>
```

### 같은 페이지 안에서 이동

```html
<a href="#section1">첫 번째 섹션으로 가기</a>

<!-- 나중에 이 부분으로 이동됨 -->
<h2 id="section1">첫 번째 섹션</h2>
```

---

## 🖼️ 이미지 넣기

### 기본 이미지

```html
<img src="강아지.jpg" alt="귀여운 강아지" />
<img src="고양이.png" alt="고양이 사진" width="300" />
```

**중요한 점:**

- `src` = 이미지 파일 위치
- `alt` = 이미지가 안 보일 때 대신 보여줄 글

---

## 📋 목록 만들기

### 순서 없는 목록 (점으로 표시)

```html
<ul>
  <li>사과</li>
  <li>바나나</li>
  <li>오렌지</li>
</ul>
```

결과:
• 사과
• 바나나  
• 오렌지

### 순서 있는 목록 (숫자로 표시)

```html
<ol>
  <li>아침에 일어나기</li>
  <li>양치질하기</li>
  <li>아침밥 먹기</li>
</ol>
```

결과:

1. 아침에 일어나기
2. 양치질하기
3. 아침밥 먹기

---

## 📊 표 만들기

### 간단한 표

```html
<table>
  <tr>
    <th>이름</th>
    <th>나이</th>
    <th>직업</th>
  </tr>
  <tr>
    <td>철수</td>
    <td>25</td>
    <td>개발자</td>
  </tr>
  <tr>
    <td>영희</td>
    <td>23</td>
    <td>디자이너</td>
  </tr>
</table>
```

**기억하기:**

- `<table>` = 표 전체
- `<tr>` = 행 (가로줄)
- `<th>` = 제목 칸
- `<td>` = 내용 칸

---

## 📝 폼 만들기 (입력받기)

### 기본 입력 폼

```html
<form>
  <!-- 텍스트 입력 -->
  <label>이름:</label>
  <input type="text" name="name" placeholder="이름을 입력하세요" />

  <!-- 비밀번호 입력 -->
  <label>비밀번호:</label>
  <input type="password" name="password" />

  <!-- 이메일 입력 -->
  <label>이메일:</label>
  <input type="email" name="email" />

  <!-- 선택 버튼 -->
  <input type="radio" name="gender" value="male" /> 남자
  <input type="radio" name="gender" value="female" /> 여자

  <!-- 체크박스 -->
  <input type="checkbox" name="hobby" value="movie" /> 영화
  <input type="checkbox" name="hobby" value="music" /> 음악

  <!-- 제출 버튼 -->
  <button type="submit">보내기</button>
</form>
```

---

## 🏗️ 페이지 구조 만들기

### 의미 있는 구조

```html
<header>
  <h1>우리 웹사이트</h1>
  <nav>
    <a href="#home">홈</a>
    <a href="#about">소개</a>
    <a href="#contact">연락처</a>
  </nav>
</header>

<main>
  <section>
    <h2>메인 내용</h2>
    <p>여기에 중요한 내용을 써요</p>
  </section>

  <aside>
    <h3>사이드바</h3>
    <p>부가적인 정보</p>
  </aside>
</main>

<footer>
  <p>&copy; 2024 우리 웹사이트. 모든 권리 보유.</p>
</footer>
```

**각 부분의 역할:**

- `<header>` = 머리말 (제목, 메뉴)
- `<nav>` = 네비게이션 (메뉴)
- `<main>` = 주요 내용
- `<section>` = 내용 구역
- `<aside>` = 사이드바
- `<footer>` = 바닥글

---

## 🎯 첫 번째 웹페이지 만들기

```html
<!DOCTYPE html>
<html>
  <head>
    <title>내 첫 웹페이지</title>
  </head>
  <body>
    <header>
      <h1>🌟 내 소개</h1>
    </header>

    <main>
      <section>
        <h2>안녕하세요!</h2>
        <p>저는 <strong>홍길동</strong>입니다.</p>
        <p>웹 개발을 배우고 있어요! 🚀</p>

        <h3>내 취미</h3>
        <ul>
          <li>영화 보기 🎬</li>
          <li>음악 듣기 🎵</li>
          <li>코딩하기 💻</li>
        </ul>

        <h3>연락처</h3>
        <p>이메일: <a href="mailto:gildong@email.com">gildong@email.com</a></p>
      </section>
    </main>

    <footer>
      <p>© 2024 홍길동의 홈페이지</p>
    </footer>
  </body>
</html>
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1주)

- [ ] 기본 HTML 구조 이해하기
- [ ] 제목, 문단 만들기
- [ ] 링크, 이미지 넣기
- [ ] 목록 만들기

### 🥈 2단계: 중급 (1-2주)

- [ ] 표 만들기
- [ ] 폼으로 입력받기
- [ ] 페이지 구조 나누기
- [ ] 간단한 웹페이지 완성하기

### 🥇 3단계: 고급 (2-3주)

- [ ] CSS로 예쁘게 꾸미기
- [ ] JavaScript로 동작 추가하기
- [ ] 반응형 웹페이지 만들기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **들여쓰기 잘하기** - 코드 읽기 쉽게
- **태그 닫기** - `<p>`로 열면 `</p>`로 닫기
- **의미에 맞는 태그** - 제목은 `<h1>`, 문단은 `<p>`
- **alt 속성 쓰기** - 이미지에는 항상 설명 넣기

### ❌ 이건 피하세요

- 태그 닫는 걸 깜빡하기
- 모든 걸 `<div>`로만 만들기
- 의미 없는 태그 남발하기

---

## 🌟 마무리

**HTML 핵심 3가지:**

1. 🏗️ **구조** = head와 body로 나누기
2. 🏷️ **태그** = `<태그>`로 감싸기
3. 📝 **내용** = 의미에 맞는 태그 쓰기

**기억하세요:**

- HTML은 **웹페이지의 뼈대**예요
- 작은 것부터 차근차근 만들어보세요
- 에러가 나면 태그가 제대로 닫혔는지 확인하세요
- 재미있게 만드는 게 가장 중요해요!

**화이팅! 🚀✨**
