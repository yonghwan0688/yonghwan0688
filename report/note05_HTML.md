# 🌐 HTML 기초 정리

## 🎯 HTML이란?

**HTML = 웹페이지의 뼈대를 만드는 마크업 언어!** 🦴

- HyperText Markup Language의 줄임말
- 웹페이지의 구조와 내용을 정의
- 브라우저가 이해할 수 있는 표준 언어

### 🏗️ 건축으로 비유하면...

```html
<!-- HTML: 집의 골격과 구조 -->
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>우리 집</title>
  </head>
  <body>
    <header>현관</header>
    <main>
      <section>거실</section>
      <section>부엌</section>
    </main>
    <footer>마당</footer>
  </body>
</html>
```

HTML은 **집의 설계도**처럼 웹페이지의 구조를 정의합니다!

---

## 🏗️ HTML 기본 구조

### 1. **HTML 문서의 기본 틀** 📋

```html
<!DOCTYPE html>
<!-- HTML5 문서 선언 -->
<html lang="ko">
  <!-- 문서 시작, 언어 설정 -->
  <head>
    <!-- 문서 정보 (브라우저가 보는 부분) -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>페이지 제목</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- 실제 내용 (사용자가 보는 부분) -->
    <h1>안녕하세요!</h1>
    <p>첫 번째 HTML 페이지입니다.</p>
    <script src="script.js"></script>
  </body>
</html>
```

### 2. **Head 영역의 주요 태그들** 🧠

```html
<head>
  <!-- 문서 메타 정보 -->
  <meta charset="UTF-8" />
  <!-- 문자 인코딩 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- 반응형 -->
  <meta name="description" content="웹페이지 설명" />
  <!-- SEO -->
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <!-- 키워드 -->
  <meta name="author" content="개발자 이름" />
  <!-- 작성자 -->

  <!-- 페이지 제목 -->
  <title>브라우저 탭에 보이는 제목</title>

  <!-- 파비콘 -->
  <link rel="icon" href="favicon.ico" type="image/x-icon" />

  <!-- 스타일시트 -->
  <link rel="stylesheet" href="styles.css" />

  <!-- Open Graph (SNS 공유용) -->
  <meta property="og:title" content="페이지 제목" />
  <meta property="og:description" content="페이지 설명" />
  <meta property="og:image" content="thumbnail.jpg" />
</head>
```

---

## 📝 텍스트 관련 태그

### 1. **제목 태그** 📰

```html
<h1>가장 중요한 제목 (페이지당 1개 권장)</h1>
<h2>두 번째 제목</h2>
<h3>세 번째 제목</h3>
<h4>네 번째 제목</h4>
<h5>다섯 번째 제목</h5>
<h6>여섯 번째 제목</h6>

<!-- 실제 사용 예시 -->
<h1>웹 개발 가이드</h1>
<h2>프론트엔드</h2>
<h3>HTML</h3>
<h3>CSS</h3>
<h3>JavaScript</h3>
<h2>백엔드</h2>
<h3>Node.js</h3>
<h3>데이터베이스</h3>
```

### 2. **문단과 텍스트** 📖

```html
<!-- 문단 -->
<p>이것은 하나의 문단입니다. 여러 문장으로 구성될 수 있습니다.</p>
<p>이것은 또 다른 문단입니다.</p>

<!-- 줄바꿈 -->
<p>첫 번째 줄<br />두 번째 줄</p>

<!-- 수평선 -->
<hr />

<!-- 인용구 -->
<blockquote>"훌륭한 웹사이트는 사용자의 필요를 먼저 생각한다."</blockquote>

<!-- 인라인 인용 -->
<p>스티브 잡스는 <q>단순함이 최고의 복잡함이다</q>라고 말했습니다.</p>

<!-- 미리 서식된 텍스트 -->
<pre>
function hello() {
  console.log("Hello, World!");
}
</pre>

<!-- 코드 -->
<p><code>console.log()</code>는 JavaScript의 출력 함수입니다.</p>

<pre><code>
function greet(name) {
  return `Hello, ${name}!`;
}
</code></pre>
```

### 3. **텍스트 강조와 의미** 🎭

```html
<!-- 강한 강조 (굵게) -->
<p><strong>중요한 내용</strong>입니다.</p>

<!-- 일반 강조 (기울임) -->
<p><em>강조하고 싶은 내용</em>입니다.</p>

<!-- 시각적 강조 (의미 없음) -->
<p><b>굵은 글씨</b>와 <i>기울임 글씨</i></p>

<!-- 밑줄 -->
<p><u>밑줄 있는 텍스트</u></p>

<!-- 취소선 -->
<p><s>더 이상 유효하지 않은 내용</s></p>

<!-- 작은 글씨 -->
<p><small>작은 글씨로 표시됩니다.</small></p>

<!-- 위첨자, 아래첨자 -->
<p>E = mc<sup>2</sup></p>
<p>H<sub>2</sub>O</p>

<!-- 하이라이트 -->
<p><mark>형광펜으로 칠한 것처럼</mark> 표시됩니다.</p>

<!-- 삭제와 추가 -->
<p><del>삭제된 내용</del></p>
<p><ins>새로 추가된 내용</ins></p>
```

---

## 📋 목록 태그

### 1. **순서 없는 목록** 🔸

```html
<ul>
  <li>첫 번째 항목</li>
  <li>두 번째 항목</li>
  <li>
    세 번째 항목
    <ul>
      <!-- 중첩 목록 -->
      <li>하위 항목 1</li>
      <li>하위 항목 2</li>
    </ul>
  </li>
</ul>

<!-- 실제 사용 예시 -->
<h3>쇼핑 목록</h3>
<ul>
  <li>우유</li>
  <li>빵</li>
  <li>
    과일
    <ul>
      <li>사과</li>
      <li>바나나</li>
      <li>오렌지</li>
    </ul>
  </li>
</ul>
```

### 2. **순서 있는 목록** 🔢

```html
<ol>
  <li>첫 번째 단계</li>
  <li>두 번째 단계</li>
  <li>세 번째 단계</li>
</ol>

<!-- 숫자 타입 지정 -->
<ol type="a">
  <!-- a, A, i, I, 1 -->
  <li>소문자 알파벳</li>
  <li>순서로 표시</li>
</ol>

<!-- 시작 번호 지정 -->
<ol start="5">
  <li>5번부터 시작</li>
  <li>6번</li>
  <li>7번</li>
</ol>

<!-- 실제 사용 예시 -->
<h3>라면 끓이는 방법</h3>
<ol>
  <li>물 550ml를 끓입니다</li>
  <li>면과 스프를 넣습니다</li>
  <li>4분간 끓입니다</li>
  <li>맛있게 드세요!</li>
</ol>
```

### 3. **정의 목록** 📚

```html
<dl>
  <dt>HTML</dt>
  <dd>웹페이지의 구조를 만드는 마크업 언어</dd>

  <dt>CSS</dt>
  <dd>웹페이지의 스타일을 정의하는 언어</dd>

  <dt>JavaScript</dt>
  <dd>웹페이지에 동적 기능을 추가하는 프로그래밍 언어</dd>
</dl>

<!-- 실제 사용 예시 -->
<h3>웹 개발 용어</h3>
<dl>
  <dt>반응형 디자인</dt>
  <dd>다양한 기기와 화면 크기에 맞춰 자동으로 조정되는 웹 디자인</dd>

  <dt>SEO</dt>
  <dd>Search Engine Optimization, 검색 엔진 최적화</dd>
</dl>
```

---

## 🔗 링크와 미디어

### 1. **링크 (Anchor)** 🔗

```html
<!-- 외부 링크 -->
<a href="https://www.google.com">구글로 이동</a>

<!-- 외부 링크 (새 탭) -->
<a href="https://www.google.com" target="_blank" rel="noopener">
  새 탭에서 구글 열기
</a>

<!-- 내부 링크 -->
<a href="about.html">회사 소개</a>
<a href="/contact">연락처</a>

<!-- 이메일 링크 -->
<a href="mailto:contact@example.com">이메일 보내기</a>

<!-- 전화 링크 -->
<a href="tel:+82-10-1234-5678">전화걸기</a>

<!-- 페이지 내 이동 -->
<a href="#section1">첫 번째 섹션으로 이동</a>

<!-- 앵커 포인트 -->
<h2 id="section1">첫 번째 섹션</h2>

<!-- 파일 다운로드 -->
<a href="document.pdf" download>PDF 다운로드</a>
<a href="image.jpg" download="새이름.jpg">이미지 다운로드</a>
```

### 2. **이미지** 🖼️

```html
<!-- 기본 이미지 -->
<img src="image.jpg" alt="이미지 설명" />

<!-- 상세 속성 -->
<img
  src="photo.jpg"
  alt="아름다운 풍경 사진"
  width="300"
  height="200"
  title="마우스 호버시 보이는 툴팁"
/>

<!-- 반응형 이미지 -->
<img
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 25vw"
  alt="반응형 이미지"
/>

<!-- Picture 요소 (다양한 포맷 지원) -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.avif" type="image/avif" />
  <img src="image.jpg" alt="폴백 이미지" />
</picture>

<!-- 이미지 맵 -->
<img src="map.jpg" alt="지도" usemap="#locations" />
<map name="locations">
  <area shape="rect" coords="0,0,100,100" href="seoul.html" alt="서울" />
  <area shape="circle" coords="200,200,50" href="busan.html" alt="부산" />
</map>
```

### 3. **오디오와 비디오** 🎵🎬

```html
<!-- 오디오 -->
<audio controls>
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.ogg" type="audio/ogg" />
  브라우저가 오디오를 지원하지 않습니다.
</audio>

<!-- 오디오 자동재생 (사용 주의) -->
<audio controls autoplay loop muted>
  <source src="background.mp3" type="audio/mpeg" />
</audio>

<!-- 비디오 -->
<video controls width="640" height="360">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles.vtt" srclang="ko" label="한국어" />
  브라우저가 비디오를 지원하지 않습니다.
</video>

<!-- 비디오 포스터 이미지 -->
<video controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4" />
</video>

<!-- 유튜브 임베드 -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameborder="0"
  allowfullscreen
>
</iframe>
```

---

## 📊 테이블

### 1. **기본 테이블** 📋

```html
<table>
  <caption>
    월별 매출 현황
  </caption>
  <thead>
    <tr>
      <th>월</th>
      <th>매출</th>
      <th>전년 대비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1월</td>
      <td>1,000만원</td>
      <td>+15%</td>
    </tr>
    <tr>
      <td>2월</td>
      <td>1,200만원</td>
      <td>+20%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>합계</td>
      <td>2,200만원</td>
      <td>+17.5%</td>
    </tr>
  </tfoot>
</table>
```

### 2. **셀 병합과 고급 기능** 🔄

```html
<table>
  <thead>
    <tr>
      <th rowspan="2">제품</th>
      <th colspan="2">분기별 매출</th>
    </tr>
    <tr>
      <th>1분기</th>
      <th>2분기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>스마트폰</td>
      <td>500만원</td>
      <td>600만원</td>
    </tr>
    <tr>
      <td>태블릿</td>
      <td>300만원</td>
      <td>350만원</td>
    </tr>
  </tbody>
</table>

<!-- 접근성을 위한 테이블 -->
<table>
  <thead>
    <tr>
      <th scope="col">이름</th>
      <th scope="col">나이</th>
      <th scope="col">직업</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">김철수</th>
      <td>25</td>
      <td>개발자</td>
    </tr>
    <tr>
      <th scope="row">이영희</th>
      <td>30</td>
      <td>디자이너</td>
    </tr>
  </tbody>
</table>
```

---

## 📝 폼 (Form)

### 1. **기본 폼 구조** 📮

```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <fieldset>
    <legend>개인정보</legend>

    <!-- 텍스트 입력 -->
    <label for="name">이름:</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder="이름을 입력하세요"
    />

    <!-- 이메일 -->
    <label for="email">이메일:</label>
    <input type="email" id="email" name="email" required />

    <!-- 비밀번호 -->
    <label for="password">비밀번호:</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
    />
  </fieldset>

  <fieldset>
    <legend>추가정보</legend>

    <!-- 숫자 입력 -->
    <label for="age">나이:</label>
    <input type="number" id="age" name="age" min="18" max="100" step="1" />

    <!-- 날짜 -->
    <label for="birthday">생년월일:</label>
    <input type="date" id="birthday" name="birthday" />

    <!-- 전화번호 -->
    <label for="phone">전화번호:</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
    />
  </fieldset>

  <button type="submit">제출</button>
  <button type="reset">초기화</button>
</form>
```

### 2. **다양한 입력 타입** 🎛️

```html
<form>
  <!-- 검색 -->
  <input type="search" placeholder="검색어를 입력하세요" />

  <!-- URL -->
  <input type="url" placeholder="https://example.com" />

  <!-- 색상 선택 -->
  <input type="color" value="#ff0000" />

  <!-- 범위 슬라이더 -->
  <input type="range" min="0" max="100" value="50" />

  <!-- 파일 업로드 -->
  <input type="file" accept="image/*" multiple />

  <!-- 숨겨진 입력 -->
  <input type="hidden" name="csrf_token" value="abc123" />

  <!-- 체크박스 -->
  <input type="checkbox" id="agree" name="agree" value="yes" />
  <label for="agree">이용약관에 동의합니다</label>

  <!-- 라디오 버튼 -->
  <fieldset>
    <legend>성별</legend>
    <input type="radio" id="male" name="gender" value="male" />
    <label for="male">남성</label>

    <input type="radio" id="female" name="gender" value="female" />
    <label for="female">여성</label>
  </fieldset>
</form>
```

### 3. **선택 요소와 텍스트 영역** 📝

```html
<form>
  <!-- 드롭다운 선택 -->
  <label for="country">국가:</label>
  <select id="country" name="country" required>
    <option value="">선택해주세요</option>
    <option value="kr">대한민국</option>
    <option value="us">미국</option>
    <option value="jp">일본</option>
  </select>

  <!-- 다중 선택 -->
  <label for="skills">기술 스택:</label>
  <select id="skills" name="skills" multiple size="4">
    <optgroup label="프론트엔드">
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="js">JavaScript</option>
    </optgroup>
    <optgroup label="백엔드">
      <option value="nodejs">Node.js</option>
      <option value="python">Python</option>
    </optgroup>
  </select>

  <!-- 데이터리스트 (자동완성) -->
  <label for="browser">브라우저:</label>
  <input list="browsers" id="browser" name="browser" />
  <datalist id="browsers">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Edge"></option>
  </datalist>

  <!-- 텍스트 영역 -->
  <label for="message">메시지:</label>
  <textarea
    id="message"
    name="message"
    rows="5"
    cols="40"
    placeholder="메시지를 입력하세요"
    maxlength="500"
  >
  </textarea>

  <!-- 진행률 표시 -->
  <label for="progress">진행률:</label>
  <progress id="progress" value="70" max="100">70%</progress>

  <!-- 측정값 표시 -->
  <label for="disk">디스크 사용량:</label>
  <meter id="disk" value="6" min="0" max="10">10분의 6</meter>
</form>
```

---

## 🏗️ 시맨틱 HTML

### 1. **문서 구조 태그** 🏠

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>시맨틱 HTML 예제</title>
  </head>
  <body>
    <!-- 헤더 영역 -->
    <header>
      <nav>
        <ul>
          <li><a href="#home">홈</a></li>
          <li><a href="#about">소개</a></li>
          <li><a href="#contact">연락처</a></li>
        </ul>
      </nav>
      <h1>웹사이트 제목</h1>
    </header>

    <!-- 메인 컨텐츠 -->
    <main>
      <!-- 섹션 1 -->
      <section id="home">
        <h2>홈 섹션</h2>
        <article>
          <header>
            <h3>첫 번째 글</h3>
            <time datetime="2023-12-25">2023년 12월 25일</time>
          </header>
          <p>글의 내용입니다...</p>
          <footer>
            <address>
              작성자: <a href="mailto:author@example.com">김개발</a>
            </address>
          </footer>
        </article>
      </section>

      <!-- 섹션 2 -->
      <section id="about">
        <h2>소개</h2>
        <aside>
          <h3>관련 링크</h3>
          <ul>
            <li><a href="#">링크 1</a></li>
            <li><a href="#">링크 2</a></li>
          </ul>
        </aside>
      </section>
    </main>

    <!-- 푸터 영역 -->
    <footer>
      <p>&copy; 2023 웹사이트. 모든 권리 보유.</p>
    </footer>
  </body>
</html>
```

### 2. **의미 있는 태그들** 📖

```html
<!-- 시간과 날짜 -->
<p>
  회의는 <time datetime="2023-12-25T14:00">12월 25일 오후 2시</time>에
  시작합니다.
</p>

<!-- 약어와 줄임말 -->
<p>
  <abbr title="HyperText Markup Language">HTML</abbr>은 웹의 기본 언어입니다.
</p>

<!-- 정의 -->
<p><dfn>API</dfn>는 Application Programming Interface의 줄임말입니다.</p>

<!-- 컴퓨터 코드 -->
<p><code>console.log()</code> 함수를 사용합니다.</p>
<pre><code>function hello() {
  console.log("Hello!");
}</code></pre>

<!-- 키보드 입력 -->
<p><kbd>Ctrl</kbd> + <kbd>C</kbd>를 눌러 복사하세요.</p>

<!-- 프로그램 출력 -->
<p>결과: <samp>Hello, World!</samp></p>

<!-- 변수 -->
<p><var>x</var> + <var>y</var> = <var>z</var></p>

<!-- 연락처 정보 -->
<address>
  <p>작성자: <a href="mailto:contact@example.com">김개발자</a></p>
  <p>주소: 서울시 강남구 테헤란로 123</p>
</address>

<!-- 인용과 출처 -->
<blockquote cite="https://example.com">
  <p>"코드는 시를 쓰는 것과 같다."</p>
  <footer>— <cite>유명한 개발자</cite></footer>
</blockquote>

<!-- 세부사항 (접을 수 있는 내용) -->
<details>
  <summary>더 자세한 정보</summary>
  <p>여기에 추가 정보가 표시됩니다.</p>
</details>

<!-- 그림과 캡션 -->
<figure>
  <img src="chart.png" alt="매출 차트" />
  <figcaption>2023년 월별 매출 현황</figcaption>
</figure>
```

---

## 🎯 접근성 (Accessibility)

### 1. **스크린 리더 지원** 👁️‍🗨️

```html
<!-- ARIA 라벨 -->
<button aria-label="검색" type="submit">
  <svg><!-- 검색 아이콘 --></svg>
</button>

<!-- ARIA 설명 -->
<input type="password" aria-describedby="pwd-help" placeholder="비밀번호" />
<div id="pwd-help">비밀번호는 8자 이상이어야 합니다.</div>

<!-- 랜드마크 역할 -->
<nav role="navigation" aria-label="메인 메뉴">
  <ul>
    <li><a href="#home">홈</a></li>
    <li><a href="#about">소개</a></li>
  </ul>
</nav>

<!-- 라이브 영역 -->
<div aria-live="polite" id="status">
  <!-- 동적으로 업데이트되는 상태 메시지 -->
</div>

<!-- 숨겨진 텍스트 (스크린 리더용) -->
<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>

<button>
  <span class="sr-only">닫기</span>
  <span aria-hidden="true">×</span>
</button>
```

### 2. **키보드 네비게이션** ⌨️

```html
<!-- 탭 인덱스 -->
<div tabindex="0">포커스 가능한 요소</div>
<div tabindex="-1">프로그래밍으로만 포커스 가능</div>

<!-- 스킵 링크 -->
<a href="#main-content" class="skip-link">메인 콘텐츠로 건너뛰기</a>

<main id="main-content">
  <!-- 메인 콘텐츠 -->
</main>

<!-- 접근 가능한 드롭다운 -->
<div class="dropdown">
  <button
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="dropdown-menu"
    id="dropdown-button"
  >
    메뉴
  </button>
  <ul id="dropdown-menu" role="menu" aria-labelledby="dropdown-button" hidden>
    <li role="menuitem"><a href="#">항목 1</a></li>
    <li role="menuitem"><a href="#">항목 2</a></li>
  </ul>
</div>
```

---

## 🌟 HTML5 고급 기능

### 1. **Canvas와 SVG** 🎨

```html
<!-- Canvas (JavaScript로 그리기) -->
<canvas id="myCanvas" width="300" height="200">
  Canvas를 지원하지 않는 브라우저입니다.
</canvas>

<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(10, 10, 100, 100);
</script>

<!-- SVG (벡터 그래픽) -->
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="blue" />
  <text x="100" y="105" text-anchor="middle" fill="white">SVG</text>
</svg>

<!-- 인라인 SVG 아이콘 -->
<button>
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <path
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
    />
  </svg>
  추가
</button>
```

### 2. **웹 컴포넌트** 🔧

```html
<!-- 커스텀 요소 -->
<template id="my-component-template">
  <style>
    .wrapper {
      border: 1px solid #ccc;
      padding: 20px;
    }
  </style>
  <div class="wrapper">
    <h3></h3>
    <p></p>
  </div>
</template>

<my-component title="제목" content="내용"></my-component>

<script>
  class MyComponent extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("my-component-template");
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
      const title = this.getAttribute("title");
      const content = this.getAttribute("content");

      this.shadowRoot.querySelector("h3").textContent = title;
      this.shadowRoot.querySelector("p").textContent = content;
    }
  }

  customElements.define("my-component", MyComponent);
</script>
```

### 3. **메타 태그와 SEO** 📈

```html
<head>
  <!-- 기본 메타 태그 -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="웹사이트에 대한 설명 (160자 이내)" />
  <meta name="keywords" content="키워드1, 키워드2, 키워드3" />
  <meta name="author" content="작성자 이름" />

  <!-- Open Graph (Facebook, LinkedIn 등) -->
  <meta property="og:title" content="페이지 제목" />
  <meta property="og:description" content="페이지 설명" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="사이트 이름" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="페이지 제목" />
  <meta name="twitter:description" content="페이지 설명" />
  <meta name="twitter:image" content="https://example.com/image.jpg" />
  <meta name="twitter:creator" content="@username" />

  <!-- 검색 엔진 -->
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />

  <!-- 구조화된 데이터 (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "기사 제목",
      "author": {
        "@type": "Person",
        "name": "작성자 이름"
      },
      "datePublished": "2023-12-25",
      "description": "기사 설명"
    }
  </script>
</head>
```

---

## 🎯 실전 예제

### 1. **블로그 게시글** 📝

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웹 개발 가이드 - 개발 블로그</title>
  <meta name="description" content="초보자를 위한 웹 개발 가이드를 소개합니다.">
</head>
<body>
  <header>
    <nav aria-label="메인 네비게이션">
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/blog">블로그</a></li>
        <li><a href="/about">소개</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h1>초보자를 위한 웹 개발 가이드</h1>
        <p>
          <time datetime="2023-12-25">2023년 12월 25일</time>
          <address>작성자: <a href="/author/kim">김개발자</a></address>
        </p>
      </header>

      <section>
        <h2>HTML 기초</h2>
        <p>HTML은 웹페이지의 구조를 만드는 언어입니다.</p>

        <figure>
          <img src="html-example.png" alt="HTML 코드 예제">
          <figcaption>HTML 기본 구조 예제</figcaption>
        </figure>

        <h3>주요 태그들</h3>
        <ul>
          <li><code>&lt;h1&gt;</code> - 주요 제목</li>
          <li><code>&lt;p&gt;</code> - 문단</li>
          <li><code>&lt;a&gt;</code> - 링크</li>
        </ul>
      </section>

      <section>
        <h2>CSS 기초</h2>
        <p>CSS는 웹페이지의 스타일을 정의합니다.</p>

        <details>
          <summary>CSS 예제 코드</summary>
          <pre><code>body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}</code></pre>
        </details>
      </section>

      <footer>
        <p>이 글이 도움이 되셨나요? <a href="#comments">댓글로 알려주세요!</a></p>
      </footer>
    </article>

    <aside>
      <h2>관련 글</h2>
      <ul>
        <li><a href="/css-guide">CSS 완벽 가이드</a></li>
        <li><a href="/js-basics">JavaScript 기초</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2023 개발 블로그. 모든 권리 보유.</p>
  </footer>
</body>
</html>
```

### 2. **회원가입 폼** 📋

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>회원가입 - 웹사이트</title>
  </head>
  <body>
    <main>
      <h1>회원가입</h1>

      <form action="/signup" method="POST" novalidate>
        <fieldset>
          <legend>기본 정보</legend>

          <div class="form-group">
            <label for="username">사용자명 *</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              minlength="3"
              maxlength="20"
              pattern="[a-zA-Z0-9]+"
              aria-describedby="username-help"
            />
            <div id="username-help" class="help-text">
              3-20자의 영문자와 숫자만 사용 가능합니다.
            </div>
          </div>

          <div class="form-group">
            <label for="email">이메일 *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label for="password">비밀번호 *</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minlength="8"
              autocomplete="new-password"
              aria-describedby="password-help"
            />
            <div id="password-help" class="help-text">
              최소 8자 이상, 대소문자, 숫자, 특수문자 포함
            </div>
          </div>

          <div class="form-group">
            <label for="confirm-password">비밀번호 확인 *</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              autocomplete="new-password"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>개인정보</legend>

          <div class="form-group">
            <label for="birth-date">생년월일</label>
            <input type="date" id="birth-date" name="birth-date" />
          </div>

          <fieldset class="radio-group">
            <legend>성별</legend>
            <div>
              <input type="radio" id="male" name="gender" value="male" />
              <label for="male">남성</label>
            </div>
            <div>
              <input type="radio" id="female" name="gender" value="female" />
              <label for="female">여성</label>
            </div>
            <div>
              <input type="radio" id="other" name="gender" value="other" />
              <label for="other">기타</label>
            </div>
          </fieldset>

          <div class="form-group">
            <label for="interests">관심사</label>
            <select id="interests" name="interests" multiple size="4">
              <optgroup label="기술">
                <option value="programming">프로그래밍</option>
                <option value="design">디자인</option>
                <option value="ai">인공지능</option>
              </optgroup>
              <optgroup label="취미">
                <option value="music">음악</option>
                <option value="sports">스포츠</option>
                <option value="reading">독서</option>
              </optgroup>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>약관 동의</legend>

          <div class="checkbox-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label for="terms">
              <a href="/terms" target="_blank">이용약관</a>에 동의합니다 *
            </label>
          </div>

          <div class="checkbox-group">
            <input type="checkbox" id="privacy" name="privacy" required />
            <label for="privacy">
              <a href="/privacy" target="_blank">개인정보처리방침</a>에
              동의합니다 *
            </label>
          </div>

          <div class="checkbox-group">
            <input type="checkbox" id="marketing" name="marketing" />
            <label for="marketing">마케팅 정보 수신에 동의합니다 (선택)</label>
          </div>
        </fieldset>

        <div class="form-actions">
          <button type="submit">회원가입</button>
          <button type="reset">초기화</button>
        </div>
      </form>

      <p>
        이미 계정이 있으신가요?
        <a href="/login">로그인하기</a>
      </p>
    </main>
  </body>
</html>
```

---

## 🎯 학습 로드맵

### 1단계: 기초 📚

- [ ] HTML 기본 구조 이해
- [ ] 텍스트와 링크 태그
- [ ] 목록과 테이블
- [ ] 기본 폼 요소

### 2단계: 구조화 🏗️

- [ ] 시맨틱 HTML 태그
- [ ] 올바른 문서 구조
- [ ] 메타 태그와 SEO
- [ ] 접근성 기본 원칙

### 3단계: 고급 기능 ⭐

- [ ] 복잡한 폼 요소
- [ ] 멀티미디어 태그
- [ ] Canvas와 SVG
- [ ] 웹 컴포넌트

### 4단계: 실전 적용 💪

- [ ] 완전한 웹페이지 구조
- [ ] SEO 최적화
- [ ] 웹 접근성 준수
- [ ] 성능 최적화

---

## 💡 팁과 주의사항

### ✅ 좋은 습관

- **시맨틱 태그** 적극 활용
- **접근성** 고려한 마크업
- **올바른 태그 중첩** 구조
- **의미 있는 속성값** 사용
- **SEO 최적화** 고려

### ❌ 피해야 할 것들

- **div와 span** 남용
- **테이블을 레이아웃**으로 사용
- **인라인 스타일** 과다 사용
- **alt 속성** 누락
- **form 라벨** 누락

### 🔧 유용한 도구들

- **HTML Validator** - W3C 마크업 검증
- **WAVE** - 웹 접근성 검사
- **Lighthouse** - 성능 및 SEO 검사
- **Screen Reader** - 접근성 테스트
- **Browser DevTools** - 개발자 도구

---

## 🌟 마무리

HTML은 **웹의 기초이자 모든 웹 개발의 출발점**입니다!

**핵심만 기억하세요:**

1. 🏗️ **구조** = 의미 있는 마크업으로 문서 구조화
2. 📝 **시맨틱** = 태그의 의미를 고려한 사용
3. 🎯 **접근성** = 모든 사용자를 고려한 마크업
4. 🔍 **SEO** = 검색 엔진 최적화
5. 📱 **반응형** = 다양한 기기 지원

**올바른 HTML은 아름다운 웹사이트의 첫걸음입니다!** 🌟✨

**"HTML은 집의 뼈대, CSS는 인테리어, JavaScript는 전기"** - 탄탄한 구조가 모든 것의 기반이 됩니다! 😊
