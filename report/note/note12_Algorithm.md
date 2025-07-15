# 🧮 알고리즘 기초 정리

## 🎯 알고리즘이란?

**알고리즘 = 문제를 해결하는 단계별 방법!** 🔍

쉽게 말해서:

- **문제를 푸는 순서**를 정리한 것
- **컴퓨터가 이해할 수 있는** 해결 방법
- **효율적으로 답을 찾는** 기술

### 🍳 요리로 비유하면...

```
문제: 라면 끓이기
알고리즘:
1. 물 500ml를 끓인다
2. 면과 스프를 넣는다
3. 3분간 끓인다
4. 완성!
```

---

## 🔢 기본 개념들

### 시간복잡도 (얼마나 빠른가?)

```javascript
// O(1) - 상수시간 (가장 빠름)
function 첫번째요소(배열) {
  return 배열[0]; // 항상 같은 시간
}

// O(n) - 선형시간 (보통)
function 모든요소출력(배열) {
  for (let i = 0; i < 배열.length; i++) {
    console.log(배열[i]); // 배열 크기만큼 시간
  }
}

// O(n²) - 제곱시간 (느림)
function 모든조합출력(배열) {
  for (let i = 0; i < 배열.length; i++) {
    for (let j = 0; j < 배열.length; j++) {
      console.log(배열[i], 배열[j]); // 배열 크기의 제곱만큼
    }
  }
}
```

### 공간복잡도 (메모리를 얼마나 쓰는가?)

```javascript
// O(1) - 고정된 메모리
function 더하기(a, b) {
  return a + b; // 변수 2개만 사용
}

// O(n) - 입력 크기만큼 메모리
function 배열복사(원본배열) {
  let 새배열 = [];
  for (let 요소 of 원본배열) {
    새배열.push(요소); // 원본 크기만큼 새 배열
  }
  return 새배열;
}
```

---

## 🔍 검색 알고리즘

### 선형 검색 (하나씩 찾기)

```javascript
function 선형검색(배열, 찾는값) {
  for (let i = 0; i < 배열.length; i++) {
    if (배열[i] === 찾는값) {
      return i; // 찾은 위치 반환
    }
  }
  return -1; // 못 찾으면 -1
}

// 사용 예시
let 숫자들 = [3, 1, 4, 1, 5, 9];
console.log(선형검색(숫자들, 4)); // 2 (인덱스)
console.log(선형검색(숫자들, 7)); // -1 (없음)
```

### 이진 검색 (반씩 나누어 찾기) - 정렬된 배열에서만 가능!

```javascript
function 이진검색(정렬된배열, 찾는값) {
  let 시작 = 0;
  let 끝 = 정렬된배열.length - 1;

  while (시작 <= 끝) {
    let 중간 = Math.floor((시작 + 끝) / 2);

    if (정렬된배열[중간] === 찾는값) {
      return 중간; // 찾았다!
    } else if (정렬된배열[중간] < 찾는값) {
      시작 = 중간 + 1; // 오른쪽 반 검색
    } else {
      끝 = 중간 - 1; // 왼쪽 반 검색
    }
  }

  return -1; // 못 찾음
}

// 사용 예시 (정렬된 배열에서만!)
let 정렬된숫자 = [1, 3, 5, 7, 9, 11];
console.log(이진검색(정렬된숫자, 7)); // 3
```

---

## 📊 정렬 알고리즘

### 버블 정렬 (인접한 것끼리 비교)

```javascript
function 버블정렬(배열) {
  let 결과 = [...배열]; // 원본 보호

  for (let i = 0; i < 결과.length; i++) {
    for (let j = 0; j < 결과.length - 1 - i; j++) {
      // 앞이 뒤보다 크면 교환
      if (결과[j] > 결과[j + 1]) {
        [결과[j], 결과[j + 1]] = [결과[j + 1], 결과[j]];
      }
    }
  }

  return 결과;
}

// 사용 예시
let 무작위숫자 = [64, 34, 25, 12, 22, 11, 90];
console.log(버블정렬(무작위숫자)); // [11, 12, 22, 25, 34, 64, 90]
```

### 선택 정렬 (가장 작은 것을 찾아서 앞으로)

```javascript
function 선택정렬(배열) {
  let 결과 = [...배열];

  for (let i = 0; i < 결과.length; i++) {
    let 최소인덱스 = i;

    // i부터 끝까지 중에서 가장 작은 값 찾기
    for (let j = i + 1; j < 결과.length; j++) {
      if (결과[j] < 결과[최소인덱스]) {
        최소인덱스 = j;
      }
    }

    // 가장 작은 값을 맨 앞으로 교환
    [결과[i], 결과[최소인덱스]] = [결과[최소인덱스], 결과[i]];
  }

  return 결과;
}
```

---

## 📚 자료구조 기초

### 배열 (Array)

```javascript
// 장점: 인덱스로 빠른 접근 O(1)
// 단점: 중간 삽입/삭제 느림 O(n)
let 과일들 = ["사과", "바나나", "오렌지"];
console.log(과일들[1]); // '바나나' - 빠른 접근

과일들.push("포도"); // 끝에 추가 - 빠름
과일들.splice(1, 0, "딸기"); // 중간에 삽입 - 느림
```

### 스택 (Stack) - 후입선출 (LIFO)

```javascript
class 스택 {
  constructor() {
    this.items = [];
  }

  push(요소) {
    this.items.push(요소);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// 사용 예시 - 함수 호출 스택
let 함수스택 = new 스택();
함수스택.push("main()");
함수스택.push("calculateSum()");
함수스택.push("addNumbers()");

console.log(함수스택.pop()); // 'addNumbers()' - 마지막에 들어간 것이 먼저 나옴
```

### 큐 (Queue) - 선입선출 (FIFO)

```javascript
class 큐 {
  constructor() {
    this.items = [];
  }

  enqueue(요소) {
    this.items.push(요소); // 뒤에 추가
  }

  dequeue() {
    return this.items.shift(); // 앞에서 제거
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// 사용 예시 - 대기 줄
let 대기줄 = new 큐();
대기줄.enqueue("철수");
대기줄.enqueue("영희");
대기줄.enqueue("민수");

console.log(대기줄.dequeue()); // '철수' - 먼저 온 사람이 먼저 나감
```

---

## 🌳 트리와 그래프 기초

### 이진 트리

```javascript
class 노드 {
  constructor(값) {
    this.값 = 값;
    this.왼쪽 = null;
    this.오른쪽 = null;
  }
}

class 이진트리 {
  constructor() {
    this.루트 = null;
  }

  // 중위 순회 (왼쪽 → 루트 → 오른쪽)
  중위순회(노드 = this.루트) {
    if (노드 !== null) {
      this.중위순회(노드.왼쪽);
      console.log(노드.값);
      this.중위순회(노드.오른쪽);
    }
  }
}

// 사용 예시
let 트리 = new 이진트리();
트리.루트 = new 노드("A");
트리.루트.왼쪽 = new 노드("B");
트리.루트.오른쪽 = new 노드("C");
```

---

## 🎯 실전 문제 해결

### 1. 두 수의 합 찾기

```javascript
// 문제: 배열에서 합이 target이 되는 두 수의 인덱스 찾기
function 두수의합(숫자배열, 목표값) {
  for (let i = 0; i < 숫자배열.length; i++) {
    for (let j = i + 1; j < 숫자배열.length; j++) {
      if (숫자배열[i] + 숫자배열[j] === 목표값) {
        return [i, j];
      }
    }
  }
  return [];
}

// 테스트
console.log(두수의합([2, 7, 11, 15], 9)); // [0, 1] (2 + 7 = 9)
```

### 2. 문자열 뒤집기

```javascript
function 문자열뒤집기(문자열) {
  let 결과 = "";
  for (let i = 문자열.length - 1; i >= 0; i--) {
    결과 += 문자열[i];
  }
  return 결과;
}

// 더 쉬운 방법
function 문자열뒤집기쉬운방법(문자열) {
  return 문자열.split("").reverse().join("");
}

console.log(문자열뒤집기("hello")); // 'olleh'
```

### 3. 팩토리얼 계산

```javascript
// 반복문 버전
function 팩토리얼반복(n) {
  let 결과 = 1;
  for (let i = 1; i <= n; i++) {
    결과 *= i;
  }
  return 결과;
}

// 재귀 버전
function 팩토리얼재귀(n) {
  if (n <= 1) return 1;
  return n * 팩토리얼재귀(n - 1);
}

console.log(팩토리얼반복(5)); // 120
console.log(팩토리얼재귀(5)); // 120
```

### 4. 중복 제거

```javascript
function 중복제거(배열) {
  return [...new Set(배열)];
}

// 또는 전통적인 방법
function 중복제거전통방법(배열) {
  let 결과 = [];
  for (let 요소 of 배열) {
    if (!결과.includes(요소)) {
      결과.push(요소);
    }
  }
  return 결과;
}

console.log(중복제거([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (2-3주)

- [ ] 시간복잡도 개념 이해하기
- [ ] 선형검색, 버블정렬 구현하기
- [ ] 배열, 스택, 큐 사용해보기
- [ ] 간단한 문제 해결하기

### 🥈 2단계: 중급 (4-6주)

- [ ] 이진검색, 병합정렬 구현하기
- [ ] 재귀 함수 이해하기
- [ ] 트리 기본 개념 학습하기
- [ ] 동적 프로그래밍 입문

### 🥇 3단계: 고급 (8주 이상)

- [ ] 그래프 알고리즘 (BFS, DFS)
- [ ] 고급 정렬 알고리즘
- [ ] 해시 테이블 활용
- [ ] 코딩테스트 문제 풀기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **작은 문제부터** - 간단한 것부터 차근차근
- **직접 구현해보기** - 라이브러리 쓰기 전에 직접 만들어보기
- **시간 측정하기** - console.time()으로 성능 비교
- **그림 그리며 이해** - 복잡한 알고리즘은 그림으로 표현

### ❌ 이건 피하세요

- 암기만 하려고 하기
- 너무 어려운 문제부터 시작하기
- 효율성 무시하고 동작만 하게 만들기
- 한 번에 완벽하게 하려고 하기

---

## 🔥 연습 사이트들

### 온라인 저지

- **백준 Online Judge** - 한국어 문제 많음
- **프로그래머스** - 한국 기업 코딩테스트 스타일
- **LeetCode** - 전 세계적으로 인기
- **HackerRank** - 영어, 다양한 난이도

### 추천 학습 순서

```
1. 프로그래머스 Level 1 (기초)
2. 백준 브론즈/실버 (기본기)
3. 프로그래머스 Level 2 (중급)
4. LeetCode Easy/Medium (실전)
```

---

## 🌟 마무리

**알고리즘 핵심 3가지:**

1. 🧠 **문제 해결** = 단계별로 나누어 생각하기
2. ⚡ **효율성** = 시간과 메모리를 고려하기
3. 🔄 **연습** = 많은 문제를 풀어보기

**기억하세요:**

- 알고리즘은 **논리적 사고력**을 기르는 도구예요
- 처음엔 어려워도 계속 하다 보면 패턴이 보여요
- **코딩테스트 통과**와 **실무 능력 향상**에 도움돼요
- **포기하지 말고 꾸준히** 하는 게 가장 중요해요!

**화이팅! 🚀✨**
