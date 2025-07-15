# 💙 TypeScript 기초 정리

## 🎯 TypeScript란?

**TypeScript = JavaScript에 타입을 추가한 언어!** 💪

쉽게 말해서:

- **JavaScript + 타입 체크**
- 에러를 **미리 찾을 수** 있어요
- 코드가 더 **안전하고 읽기 쉬워져요**

### 🏷️ 타입이 왜 필요할까요?

#### JavaScript (타입 없음)

```javascript
function 더하기(a, b) {
  return a + b;
}

더하기(5, 3); // 8 (숫자)
더하기("5", "3"); // "53" (문자!) - 예상과 다름
더하기(5, "3"); // "53" (문자!) - 에러 가능성
```

#### TypeScript (타입 있음)

```typescript
function 더하기(a: number, b: number): number {
  return a + b;
}

더하기(5, 3); // 8 (정상)
더하기("5", "3"); // 에러! 미리 알려줌
더하기(5, "3"); // 에러! 미리 알려줌
```

---

## 🚀 TypeScript 시작하기

### 설치하기

```bash
# 전역 설치
npm install -g typescript

# 프로젝트에 설치
npm install --save-dev typescript
```

### 첫 번째 TypeScript 파일

```typescript
// hello.ts
function 인사하기(이름: string): string {
  return `안녕하세요, ${이름}님!`;
}

console.log(인사하기("철수"));
```

### 컴파일하고 실행하기

```bash
# TypeScript를 JavaScript로 변환
tsc hello.ts

# 생성된 JavaScript 파일 실행
node hello.js
```

---

## 🏷️ 기본 타입들

### 기본 타입

```typescript
// 숫자
let 나이: number = 25;
let 점수: number = 95.5;

// 문자
let 이름: string = "철수";
let 메시지: string = `안녕하세요, ${이름}님!`;

// 불린 (참/거짓)
let 학생인가: boolean = true;
let 졸업했나: boolean = false;

// 배열
let 숫자들: number[] = [1, 2, 3, 4, 5];
let 이름들: string[] = ["철수", "영희", "민수"];

// 또는 이렇게도 가능
let 과일들: Array<string> = ["사과", "바나나", "오렌지"];
```

### 여러 타입 허용하기 (Union)

```typescript
let 아이디: string | number;
아이디 = "user123"; // 문자 가능
아이디 = 12345; // 숫자도 가능

function 출력하기(값: string | number): void {
  console.log(값);
}
```

### any (모든 타입) - 가급적 피하세요!

```typescript
let 뭐든지: any = "문자";
뭐든지 = 123;
뭐든지 = true;
// any는 TypeScript의 장점을 없애므로 피하는 게 좋아요
```

---

## 🏗️ 객체와 인터페이스

### 객체 타입

```typescript
// 객체의 구조 정의
let 사용자: {
  이름: string;
  나이: number;
  이메일: string;
} = {
  이름: "철수",
  나이: 25,
  이메일: "cheol@email.com",
};
```

### 인터페이스 (Interface)

```typescript
// 재사용 가능한 타입 정의
interface 사용자타입 {
  이름: string;
  나이: number;
  이메일: string;
  취미?: string[]; // ?는 선택적 속성
}

let 철수: 사용자타입 = {
  이름: "철수",
  나이: 25,
  이메일: "cheol@email.com",
  // 취미는 없어도 됨 (선택적)
};

let 영희: 사용자타입 = {
  이름: "영희",
  나이: 23,
  이메일: "young@email.com",
  취미: ["영화", "독서"],
};
```

---

## 🎯 함수 타입

### 함수 매개변수와 반환값

```typescript
// 기본 함수
function 더하기(a: number, b: number): number {
  return a + b;
}

// 반환값이 없는 함수
function 로그출력(메시지: string): void {
  console.log(메시지);
}

// 선택적 매개변수
function 인사하기(이름: string, 나이?: number): string {
  if (나이) {
    return `안녕하세요, ${나이}살 ${이름}님!`;
  }
  return `안녕하세요, ${이름}님!`;
}

// 기본값 있는 매개변수
function 곱하기(a: number, b: number = 1): number {
  return a * b;
}
```

### 화살표 함수

```typescript
// 화살표 함수도 타입 지정 가능
const 빼기 = (a: number, b: number): number => {
  return a - b;
};

// 간단한 화살표 함수
const 제곱 = (x: number): number => x * x;
```

---

## 📊 클래스

### 기본 클래스

```typescript
class 사람 {
  이름: string;
  나이: number;

  constructor(이름: string, 나이: number) {
    this.이름 = 이름;
    this.나이 = 나이;
  }

  인사하기(): string {
    return `안녕하세요, 저는 ${this.나이}살 ${this.이름}입니다.`;
  }

  생일지나기(): void {
    this.나이++;
  }
}

// 클래스 사용하기
let 철수 = new 사람("철수", 25);
console.log(철수.인사하기()); // "안녕하세요, 저는 25살 철수입니다."
철수.생일지나기();
console.log(철수.나이); // 26
```

### 접근 제한자

```typescript
class 은행계좌 {
  public 소유자: string; // 외부에서 접근 가능
  private 잔액: number; // 클래스 내부에서만 접근
  protected 계좌번호: string; // 상속받은 클래스에서도 접근

  constructor(소유자: string, 초기금액: number) {
    this.소유자 = 소유자;
    this.잔액 = 초기금액;
    this.계좌번호 = this.계좌번호생성();
  }

  입금(금액: number): void {
    this.잔액 += 금액;
  }

  출금(금액: number): boolean {
    if (this.잔액 >= 금액) {
      this.잔액 -= 금액;
      return true;
    }
    return false;
  }

  잔액조회(): number {
    return this.잔액;
  }

  private 계좌번호생성(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

---

## 🛠️ 실용적인 TypeScript

### 타입 별칭 (Type Alias)

```typescript
// 자주 사용하는 타입에 이름 붙이기
type 아이디 = string | number;
type 상태 = "대기중" | "진행중" | "완료";

let 사용자아이디: 아이디 = "user123";
let 작업상태: 상태 = "진행중";
```

### 제네릭 (Generic)

```typescript
// 여러 타입에서 사용할 수 있는 함수
function 배열첫번째<T>(배열: T[]): T {
  return 배열[0];
}

let 첫숫자 = 배열첫번째([1, 2, 3]); // number 타입
let 첫문자 = 배열첫번째(["a", "b", "c"]); // string 타입
```

---

## 🎯 실습 프로젝트

### 간단한 할 일 관리자

```typescript
// 할 일 타입 정의
interface 할일 {
  id: number;
  내용: string;
  완료여부: boolean;
  생성일: Date;
}

class 할일관리자 {
  private 할일목록: 할일[] = [];
  private 다음아이디: number = 1;

  할일추가(내용: string): 할일 {
    const 새할일: 할일 = {
      id: this.다음아이디++,
      내용: 내용,
      완료여부: false,
      생성일: new Date(),
    };

    this.할일목록.push(새할일);
    return 새할일;
  }

  할일완료(id: number): boolean {
    const 할일 = this.할일목록.find((item) => item.id === id);
    if (할일) {
      할일.완료여부 = true;
      return true;
    }
    return false;
  }

  할일삭제(id: number): boolean {
    const 인덱스 = this.할일목록.findIndex((item) => item.id === id);
    if (인덱스 > -1) {
      this.할일목록.splice(인덱스, 1);
      return true;
    }
    return false;
  }

  할일목록조회(): 할일[] {
    return this.할일목록;
  }

  완료된할일조회(): 할일[] {
    return this.할일목록.filter((item) => item.완료여부);
  }
}

// 사용하기
const 관리자 = new 할일관리자();
관리자.할일추가("TypeScript 공부하기");
관리자.할일추가("운동하기");
console.log(관리자.할일목록조회());
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1-2주)

- [ ] TypeScript 설치하고 컴파일하기
- [ ] 기본 타입들 사용해보기
- [ ] 함수에 타입 추가하기
- [ ] 간단한 인터페이스 만들기

### 🥈 2단계: 중급 (2-3주)

- [ ] 클래스 만들어보기
- [ ] 제네릭 사용하기
- [ ] 기존 JavaScript 프로젝트를 TypeScript로 변환
- [ ] React와 TypeScript 함께 사용하기

### 🥇 3단계: 고급 (4주 이상)

- [ ] 복잡한 타입 시스템 이해하기
- [ ] Node.js + TypeScript 프로젝트
- [ ] 타입 정의 파일 만들기
- [ ] 고급 타입 기능 활용하기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **strict 모드 사용** - tsconfig.json에서 strict: true
- **의미있는 타입명** - UserType, TodoItem 같이 명확하게
- **타입 추론 활용** - 명확한 경우 타입 생략 가능
- **에러 메시지 잘 읽기** - TypeScript 에러는 도움이 됨

### ❌ 이건 피하세요

- any 타입 남발하기
- 타입 체크 무시하기 (@ts-ignore 남용)
- 너무 복잡한 타입 만들기
- JavaScript처럼 쓰고 TypeScript 장점 안 살리기

---

## 🌟 마무리

**TypeScript 핵심 3가지:**

1. 🏷️ **타입** = 변수와 함수에 타입 지정하기
2. 🛡️ **안전성** = 에러를 미리 찾아내기
3. 📖 **가독성** = 코드가 더 명확하고 이해하기 쉬워짐

**기억하세요:**

- TypeScript는 **더 안전한 JavaScript**예요
- 처음엔 번거로워도 나중에 큰 도움이 돼요
- 큰 프로젝트일수록 TypeScript의 장점이 커져요
- React, Node.js와 함께 쓰면 더욱 강력해져요!

**화이팅! 🚀✨**
