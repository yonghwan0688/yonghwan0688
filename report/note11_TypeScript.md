# TypeScript 완전 정복 가이드

## 목차

1. [TypeScript란 무엇인가?](#1-typescript란-무엇인가)
2. [개발 환경 설정](#2-개발-환경-설정)
3. [기본 타입 시스템](#3-기본-타입-시스템)
4. [고급 타입](#4-고급-타입)
5. [클래스와 인터페이스](#5-클래스와-인터페이스)
6. [제네릭](#6-제네릭)
7. [모듈과 네임스페이스](#7-모듈과-네임스페이스)
8. [유틸리티 타입](#8-유틸리티-타입)
9. [실전 활용](#9-실전-활용)
10. [마이그레이션 전략](#10-마이그레이션-전략)
11. [학습 로드맵](#11-학습-로드맵)

---

## 1. TypeScript란 무엇인가?

### 🎯 TypeScript의 정의

**TypeScript**는 Microsoft에서 개발한 JavaScript의 슈퍼셋으로, 정적 타입 검사 기능을 추가한 프로그래밍 언어입니다.

### 📚 비유로 이해하기

```
TypeScript = JavaScript + 타입 안전성

JavaScript (자유로운 언어) + TypeScript (규칙과 검증) = 안전하고 예측 가능한 코드
```

### ✨ TypeScript의 장점

- **타입 안전성**: 컴파일 시간에 오류 발견
- **개발 생산성**: 자동완성, 리팩토링 지원
- **코드 가독성**: 의도가 명확한 코드
- **유지보수성**: 대규모 프로젝트에 적합
- **JavaScript 호환성**: 기존 JS 코드와 완벽 호환

---

## 2. 개발 환경 설정

### 🛠️ TypeScript 설치

```bash
# 전역 설치
npm install -g typescript

# 프로젝트별 설치
npm install --save-dev typescript

# 타입 정의 설치
npm install --save-dev @types/node
```

### ⚙️ tsconfig.json 설정

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 🚀 개발 스크립트

```json
// package.json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "watch": "tsc -w",
    "clean": "rimraf dist"
  },
  "devDependencies": {
    "typescript": "^4.x.x",
    "ts-node": "^10.x.x",
    "@types/node": "^18.x.x"
  }
}
```

---

## 3. 기본 타입 시스템

### 🔤 기본 타입들

```typescript
// 기본 타입
let isComplete: boolean = false;
let count: number = 42;
let message: string = "Hello TypeScript";
let data: any = { name: "John" };
let nothing: void = undefined;
let nullable: null = null;
let undefinedValue: undefined = undefined;

// 배열 타입
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
let matrix: number[][] = [
  [1, 2],
  [3, 4],
];

// 튜플 타입
let point: [number, number] = [10, 20];
let person: [string, number, boolean] = ["John", 30, true];

// 열거형 (Enum)
enum Color {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
}

enum Status {
  Pending, // 0
  Approved, // 1
  Rejected, // 2
}

const userStatus: Status = Status.Pending;
```

### 🎯 타입 어노테이션

```typescript
// 함수 타입 어노테이션
function add(a: number, b: number): number {
  return a + b;
}

// 화살표 함수
const multiply = (x: number, y: number): number => x * y;

// 선택적 매개변수
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, you are ${age} years old`;
  }
  return `Hello ${name}`;
}

// 기본값 매개변수
function createUser(name: string, isActive: boolean = true): object {
  return { name, isActive };
}

// 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### 🔧 타입 추론

```typescript
// TypeScript가 자동으로 타입을 추론
let count = 0; // number로 추론
let message = "Hello"; // string으로 추론
let isActive = true; // boolean으로 추론

// 배열 타입 추론
let fruits = ["apple", "banana"]; // string[]로 추론
let mixed = [1, "hello", true]; // (string | number | boolean)[]로 추론

// 함수 반환 타입 추론
function double(x: number) {
  return x * 2; // number 반환으로 추론
}
```

---

## 4. 고급 타입

### 🔀 유니온과 인터섹션 타입

```typescript
// 유니온 타입 (OR)
type StringOrNumber = string | number;
type Status = "pending" | "approved" | "rejected";

function formatValue(value: StringOrNumber): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}

// 인터섹션 타입 (AND)
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

type Staff = Person & Employee;

const john: Staff = {
  name: "John",
  age: 30,
  employeeId: "EMP001",
  department: "IT",
};
```

### 🏷️ 리터럴 타입

```typescript
// 문자열 리터럴 타입
type Theme = "light" | "dark" | "auto";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 숫자 리터럴 타입
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// 템플릿 리터럴 타입
type EventName = `on${Capitalize<string>}`;
type CSSUnit = `${number}px` | `${number}%` | `${number}em`;

// 사용 예시
function setTheme(theme: Theme): void {
  document.body.className = theme;
}

function makeRequest(method: HttpMethod, url: string): void {
  // HTTP 요청 구현
}
```

### 🔍 타입 가드

```typescript
// typeof 타입 가드
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // string 메서드 사용 가능
  }
  return value.toFixed(2); // number 메서드 사용 가능
}

// instanceof 타입 가드
class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // Dog 메서드 사용 가능
  } else {
    animal.meow(); // Cat 메서드 사용 가능
  }
}

// 사용자 정의 타입 가드
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // Fish로 타입 좁혀짐
  } else {
    pet.fly(); // Bird로 타입 좁혀짐
  }
}
```

---

## 5. 클래스와 인터페이스

### 🏗️ 클래스

```typescript
// 기본 클래스
class User {
  // 접근 제한자
  public name: string;
  private password: string;
  protected email: string;
  readonly id: number;

  // 생성자
  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // 메서드
  public getProfile(): { id: number; name: string } {
    return { id: this.id, name: this.name };
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  protected sendEmail(message: string): void {
    console.log(`Sending email to ${this.email}: ${message}`);
  }
}

// 상속
class AdminUser extends User {
  private permissions: string[];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    permissions: string[]
  ) {
    super(id, name, email, password);
    this.permissions = permissions;
  }

  public addPermission(permission: string): void {
    this.permissions.push(permission);
    this.sendEmail(`New permission added: ${permission}`);
  }

  public getPermissions(): string[] {
    return [...this.permissions]; // 복사본 반환
  }
}

// 추상 클래스
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

### 📋 인터페이스

```typescript
// 기본 인터페이스
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // 선택적 속성
}

// 메서드가 있는 인터페이스
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// 인덱스 시그니처
interface Dictionary {
  [key: string]: string;
}

// 함수 인터페이스
interface SearchFunction {
  (source: string, subString: string): boolean;
}

// 클래스 구현
class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

// 인터페이스 확장
interface Vehicle {
  brand: string;
  start(): void;
}

interface Car extends Vehicle {
  doors: number;
  drive(): void;
}

class Sedan implements Car {
  brand: string;
  doors: number;

  constructor(brand: string, doors: number) {
    this.brand = brand;
    this.doors = doors;
  }

  start(): void {
    console.log("Engine started");
  }

  drive(): void {
    console.log("Driving...");
  }
}
```

---

## 6. 제네릭

### 🔧 기본 제네릭

```typescript
// 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}

const numberResult = identity<number>(42);
const stringResult = identity<string>("hello");
const booleanResult = identity(true); // 타입 추론

// 제네릭 배열 함수
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // number | undefined
const firstName = getFirstElement(["a", "b", "c"]); // string | undefined

// 여러 타입 매개변수
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const numberStringPair = pair(1, "hello"); // [number, string]
```

### 📦 제네릭 클래스와 인터페이스

```typescript
// 제네릭 클래스
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }

  size(): number {
    return this.items.length;
  }
}

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);

const stringContainer = new Container<string>();
stringContainer.add("hello");
stringContainer.add("world");

// 제네릭 인터페이스
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success",
};

const usersResponse: ApiResponse<User[]> = {
  data: [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ],
  status: 200,
  message: "Success",
};
```

### 🎯 제네릭 제약조건

```typescript
// extends 키워드로 제약
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // length 속성에 접근 가능
  return arg;
}

logLength("hello"); // 문자열은 length 속성이 있음
logLength([1, 2, 3]); // 배열도 length 속성이 있음
// logLength(123); // 오류: number에는 length 속성이 없음

// keyof 연산자 사용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30, email: "john@example.com" };

const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// const invalid = getProperty(person, "invalid"); // 오류: 존재하지 않는 키

// 조건부 타입
type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNumber = NonNullable<string | number | null>; // string | number
```

---

## 7. 모듈과 네임스페이스

### 📦 모듈 시스템

```typescript
// math.ts - 모듈 내보내기
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// 기본 내보내기
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// user.ts - 타입 내보내기
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// main.ts - 모듈 가져오기
import Calculator, { add, subtract, PI } from "./math";
import { User, UserRole } from "./user";

const calc = new Calculator();
const result = add(5, 3);
console.log(`Result: ${result}`);

// 전체 모듈 가져오기
import * as MathUtils from "./math";
const sum = MathUtils.add(10, 20);
```

### 🏢 네임스페이스

```typescript
// 네임스페이스 정의
namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export namespace Circle {
    export function area(radius: number): number {
      return Math.PI * radius * radius;
    }

    export function circumference(radius: number): number {
      return 2 * Math.PI * radius;
    }
  }

  export namespace Rectangle {
    export function area(width: number, height: number): number {
      return width * height;
    }

    export function perimeter(width: number, height: number): number {
      return 2 * (width + height);
    }
  }
}

// 네임스페이스 사용
const point: Geometry.Point = { x: 10, y: 20 };
const circleArea = Geometry.Circle.area(5);
const rectArea = Geometry.Rectangle.area(10, 15);

// 별칭 사용
import Circle = Geometry.Circle;
const area = Circle.area(3);
```

---

## 8. 유틸리티 타입

### 🛠️ 내장 유틸리티 타입

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

// Partial<T> - 모든 속성을 선택적으로 만듦
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string; isActive?: boolean; }

function updateUser(id: number, updates: Partial<User>): void {
  // 부분 업데이트 가능
}

// Required<T> - 모든 속성을 필수로 만듦
type RequiredUser = Required<Partial<User>>;

// Pick<T, K> - 특정 속성만 선택
type UserPublicInfo = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string; }

// Omit<T, K> - 특정 속성 제외
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; isActive: boolean; }

// Record<K, T> - 키-값 쌍의 타입 생성
type UserRoles = Record<string, string[]>;
const roles: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  guest: ["read"],
};

// Exclude<T, U> - T에서 U에 할당 가능한 타입 제외
type NonBooleanUser = Exclude<keyof User, "isActive">;
// "id" | "name" | "email" | "password"

// Extract<T, U> - T에서 U에 할당 가능한 타입만 추출
type StringKeys = Extract<keyof User, string>;

// ReturnType<T> - 함수의 반환 타입 추출
function getUser(): User {
  return {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "secret",
    isActive: true,
  };
}

type UserReturnType = ReturnType<typeof getUser>; // User
```

### 🎨 커스텀 유틸리티 타입

```typescript
// 깊은 Partial 타입
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Address {
  street: string;
  city: string;
  country: string;
}

interface UserWithAddress {
  id: number;
  name: string;
  address: Address;
}

type PartialUserWithAddress = DeepPartial<UserWithAddress>;
// {
//   id?: number;
//   name?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     country?: string;
//   };
// }

// 함수 속성만 추출하는 타입
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

class MyClass {
  name: string = "";
  age: number = 0;

  getName(): string {
    return this.name;
  }

  setAge(age: number): void {
    this.age = age;
  }
}

type MyClassMethods = FunctionProperties<MyClass>;
// { getName(): string; setAge(age: number): void; }
```

---

## 9. 실전 활용

### 🌐 React와 TypeScript

```typescript
// React 컴포넌트 타입
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

// 함수형 컴포넌트
const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserClick = (user: User): void => {
    setSelectedUserId(user.id);
    onUserSelect(user);
  };

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => handleUserClick(user)}
          className={selectedUserId === user.id ? "selected" : ""}
        >
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

// 커스텀 훅
function useApi<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// 사용 예시
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, loading, error } = useApi<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

### 🚀 Express.js와 TypeScript

```typescript
// types/express.d.ts - Express 타입 확장
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

// controllers/userController.ts
import { Request, Response, NextFunction } from "express";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export const createUser = async (
  req: Request<{}, UserResponse, CreateUserRequest>,
  res: Response<UserResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 사용자 생성 로직
    const user = await User.create({ name, email, password });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user as JwtPayload;
    next();
  });
};
```

---

## 10. 마이그레이션 전략

### 🔄 JavaScript에서 TypeScript로

```typescript
// 1단계: .js 파일을 .ts로 변경
// user.js → user.ts

// 2단계: 타입 어노테이션 추가
// Before (JavaScript)
function createUser(name, email, age) {
  return {
    id: Math.random(),
    name: name,
    email: email,
    age: age,
    createdAt: new Date()
  };
}

// After (TypeScript)
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

function createUser(name: string, email: string, age: number): User {
  return {
    id: Math.random(),
    name,
    email,
    age,
    createdAt: new Date()
  };
}

// 3단계: 점진적 마이그레이션을 위한 설정
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,        // JS 파일 허용
    "checkJs": true,        // JS 파일도 타입 검사
    "noImplicitAny": false, // 초기에는 any 타입 허용
    "strict": false         // 엄격 모드 비활성화
  }
}

// 4단계: 외부 라이브러리 타입 추가
// npm install --save-dev @types/lodash
// npm install --save-dev @types/express
```

### 📈 단계별 마이그레이션

```typescript
// Phase 1: 기본 타입 추가
let userName: string;
let userAge: number;
let isActive: boolean;

// Phase 2: 인터페이스 정의
interface ApiResponse {
  success: boolean;
  data: any; // 나중에 더 구체적인 타입으로 변경
  message?: string;
}

// Phase 3: 제네릭 도입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Phase 4: 유틸리티 타입 활용
type CreateUserRequest = Omit<User, "id" | "createdAt">;
type UpdateUserRequest = Partial<CreateUserRequest>;
```

---

## 11. 학습 로드맵

### 📚 단계별 학습

```
1주차: TypeScript 기초
- 개발 환경 설정
- 기본 타입 시스템
- 함수와 인터페이스

2주차: 고급 타입
- 유니온/인터섹션 타입
- 타입 가드
- 리터럴 타입

3주차: 클래스와 제네릭
- 클래스 상속
- 제네릭 활용
- 유틸리티 타입

4주차: 실전 프로젝트
- React + TypeScript
- Express + TypeScript
- 타입 안전한 API 개발
```

### 🎯 실습 프로젝트

1. **타입 안전한 Todo 앱**: 기본 타입 시스템
2. **사용자 관리 시스템**: 인터페이스와 클래스
3. **API 클라이언트**: 제네릭과 유틸리티 타입
4. **풀스택 앱**: React + Express + TypeScript

### 🔧 개발 도구

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true
}

// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn'
  }
};
```

### 🔗 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

## 마무리

TypeScript는 JavaScript 개발의 생산성과 안정성을 크게 향상시켜주는 도구입니다. 처음에는 학습 곡선이 있지만, 대규모 프로젝트에서는 필수적인 기술이 되었습니다.

**핵심은 점진적으로 도입하고, 타입 안전성의 이점을 체감하는 것입니다!**

💡 **팁**: TypeScript를 배우는 가장 좋은 방법은 기존 JavaScript 프로젝트를 TypeScript로 마이그레이션해보는 것입니다. 실제 문제를 해결하면서 타입 시스템의 가치를 이해할 수 있습니다!
