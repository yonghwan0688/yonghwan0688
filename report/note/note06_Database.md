# 🗄️ 데이터베이스 기초 정리

## 🎯 데이터베이스란?

**데이터베이스 = 체계적으로 정리된 디지털 도서관!** 📚

- 데이터를 구조화하여 저장하고 관리하는 시스템
- 여러 사용자가 동시에 접근 가능
- 데이터의 무결성과 보안을 보장

### 🏛️ 도서관으로 비유하면...

```sql
-- 도서관 = 데이터베이스
-- 책장 = 테이블 (Table)
-- 책 = 레코드 (Record/Row)
-- 책의 정보 = 필드 (Field/Column)

도서관 (Library Database)
├── 📚 도서 테이블 (Books Table)
│   ├── 📖 해리포터 (ISBN: 123, 제목: 해리포터, 저자: J.K.롤링)
│   ├── 📖 반지의 제왕 (ISBN: 456, 제목: 반지의 제왕, 저자: 톨킨)
│   └── 📖 ...
├── 👥 회원 테이블 (Members Table)
│   ├── 👤 김철수 (ID: 001, 이름: 김철수, 나이: 25)
│   ├── 👤 이영희 (ID: 002, 이름: 이영희, 나이: 30)
│   └── 👤 ...
└── 📋 대출 테이블 (Loans Table)
    ├── 📄 대출기록1 (회원ID: 001, 도서ISBN: 123, 대출일: 2023-12-01)
    └── 📄 ...
```

---

## 🏗️ 데이터베이스 기본 개념

### 1. **DBMS의 종류** 🗂️

#### 관계형 데이터베이스 (RDBMS) 📊

```sql
-- 테이블 형태로 데이터 저장
-- 행(Row)과 열(Column)으로 구성

-- 사용자 테이블
+----+---------+----------------------+-----+
| ID | 이름    | 이메일               | 나이 |
+----+---------+----------------------+-----+
| 1  | 김철수  | kim@example.com      | 25  |
| 2  | 이영희  | lee@example.com      | 30  |
| 3  | 박민수  | park@example.com     | 28  |
+----+---------+----------------------+-----+

-- 주요 RDBMS
-- MySQL, PostgreSQL, SQLite, Oracle, SQL Server
```

#### NoSQL 데이터베이스 📄

```javascript
// 문서형 (Document) - MongoDB
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "김철수",
  "email": "kim@example.com",
  "age": 25,
  "hobbies": ["독서", "영화감상"],
  "address": {
    "city": "서울",
    "district": "강남구"
  }
}

// 키-값 (Key-Value) - Redis
user:1 = "김철수"
email:1 = "kim@example.com"
age:1 = 25

// 그래프 (Graph) - Neo4j
(김철수)-[:친구]->(이영희)
(김철수)-[:좋아함]->(JavaScript)
```

### 2. **기본 용어 정리** 📖

```sql
-- 테이블 (Table) = 데이터가 저장되는 구조
-- 행(Row/Record) = 하나의 데이터 항목
-- 열(Column/Field) = 데이터의 속성
-- 기본키(Primary Key) = 각 행을 유일하게 식별하는 값
-- 외래키(Foreign Key) = 다른 테이블을 참조하는 키

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- 기본키
    name VARCHAR(50) NOT NULL,            -- 필수 필드
    email VARCHAR(100) UNIQUE,            -- 고유 필드
    age INT DEFAULT 0,                    -- 기본값
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔍 SQL 기초

### 1. **데이터 조회 (SELECT)** 🔎

```sql
-- 기본 조회
SELECT * FROM users;                     -- 모든 컬럼 조회
SELECT name, email FROM users;          -- 특정 컬럼만 조회

-- 조건부 조회
SELECT * FROM users WHERE age >= 25;    -- 나이가 25 이상
SELECT * FROM users WHERE name = '김철수';  -- 이름이 김철수
SELECT * FROM users WHERE age BETWEEN 20 AND 30;  -- 20~30세

-- 복합 조건
SELECT * FROM users
WHERE age >= 25 AND email LIKE '%gmail.com';

SELECT * FROM users
WHERE age < 20 OR age > 65;

-- 패턴 매칭
SELECT * FROM users WHERE name LIKE '김%';     -- 김으로 시작
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- gmail로 끝남
SELECT * FROM users WHERE name LIKE '_철_';    -- 가운데 글자가 철

-- 정렬
SELECT * FROM users ORDER BY age ASC;       -- 나이 오름차순
SELECT * FROM users ORDER BY age DESC;      -- 나이 내림차순
SELECT * FROM users ORDER BY age DESC, name ASC;  -- 복합 정렬

-- 제한
SELECT * FROM users LIMIT 10;              -- 상위 10개
SELECT * FROM users LIMIT 10 OFFSET 20;    -- 21~30번째 (페이징)

-- 중복 제거
SELECT DISTINCT city FROM users;            -- 중복 없는 도시 목록
```

### 2. **데이터 삽입 (INSERT)** ➕

```sql
-- 기본 삽입
INSERT INTO users (name, email, age)
VALUES ('김철수', 'kim@example.com', 25);

-- 여러 행 동시 삽입
INSERT INTO users (name, email, age) VALUES
    ('이영희', 'lee@example.com', 30),
    ('박민수', 'park@example.com', 28),
    ('최지영', 'choi@example.com', 26);

-- 일부 컬럼만 삽입 (나머지는 기본값)
INSERT INTO users (name, email)
VALUES ('홍길동', 'hong@example.com');

-- 다른 테이블에서 데이터 복사
INSERT INTO users_backup
SELECT * FROM users WHERE age >= 30;
```

### 3. **데이터 수정 (UPDATE)** ✏️

```sql
-- 기본 수정
UPDATE users
SET age = 26
WHERE name = '김철수';

-- 여러 컬럼 동시 수정
UPDATE users
SET age = 27, email = 'kim_new@example.com'
WHERE id = 1;

-- 조건부 수정
UPDATE users
SET age = age + 1
WHERE age < 30;

-- 다른 테이블 값 참조하여 수정
UPDATE users u
JOIN orders o ON u.id = o.user_id
SET u.last_order_date = o.order_date
WHERE o.order_date = (
    SELECT MAX(order_date)
    FROM orders
    WHERE user_id = u.id
);
```

### 4. **데이터 삭제 (DELETE)** 🗑️

```sql
-- 기본 삭제
DELETE FROM users WHERE id = 1;

-- 조건부 삭제
DELETE FROM users WHERE age < 18;

-- 모든 데이터 삭제 (구조는 유지)
DELETE FROM users;

-- 테이블 완전 삭제 후 재생성 (더 빠름)
TRUNCATE TABLE users;
```

---

## 🔗 관계형 데이터베이스 설계

### 1. **테이블 관계** 🔄

```sql
-- 일대다 관계 (1:N)
-- 한 사용자가 여러 주문을 할 수 있음

-- 사용자 테이블 (1)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- 주문 테이블 (N)
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,                           -- 외래키
    product_name VARCHAR(100),
    price DECIMAL(10, 2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 다대다 관계 (M:N)
-- 학생은 여러 과목을 수강하고, 과목은 여러 학생이 수강

-- 학생 테이블
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- 과목 테이블
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL
);

-- 수강 테이블 (중간 테이블)
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id),   -- 복합 기본키
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

### 2. **JOIN 연산** 🤝

```sql
-- INNER JOIN (교집합)
-- 두 테이블에 모두 존재하는 데이터만 조회
SELECT u.name, o.product_name, o.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN (왼쪽 테이블 기준)
-- 사용자 정보와 주문 정보 (주문이 없어도 사용자는 표시)
SELECT u.name, o.product_name, o.price
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN (오른쪽 테이블 기준)
SELECT u.name, o.product_name, o.price
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN (합집합)
-- MySQL에서는 UNION 사용
SELECT u.name, o.product_name
FROM users u LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT u.name, o.product_name
FROM users u RIGHT JOIN orders o ON u.id = o.user_id;

-- 복잡한 JOIN 예제
SELECT
    u.name AS 사용자이름,
    COUNT(o.id) AS 주문횟수,
    SUM(o.price) AS 총구매금액
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY 총구매금액 DESC;
```

### 3. **집계 함수와 그룹화** 📊

```sql
-- 기본 집계 함수
SELECT COUNT(*) FROM users;              -- 전체 행 수
SELECT COUNT(email) FROM users;          -- NULL 제외한 이메일 수
SELECT AVG(age) FROM users;              -- 평균 나이
SELECT SUM(price) FROM orders;           -- 총 주문 금액
SELECT MIN(age), MAX(age) FROM users;    -- 최소/최대 나이

-- 그룹화
SELECT age, COUNT(*) AS 인원수
FROM users
GROUP BY age
ORDER BY age;

-- 조건부 그룹화
SELECT
    CASE
        WHEN age < 20 THEN '10대'
        WHEN age < 30 THEN '20대'
        WHEN age < 40 THEN '30대'
        ELSE '40대 이상'
    END AS 연령대,
    COUNT(*) AS 인원수
FROM users
GROUP BY 연령대
ORDER BY 연령대;

-- HAVING (그룹 조건)
SELECT user_id, COUNT(*) AS 주문횟수
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 3;                    -- 3회 이상 주문한 사용자

-- 월별 매출 통계
SELECT
    YEAR(order_date) AS 연도,
    MONTH(order_date) AS 월,
    COUNT(*) AS 주문수,
    SUM(price) AS 매출
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY 연도, 월;
```

---

## 🛠️ 데이터베이스 설계 원칙

### 1. **정규화 (Normalization)** 📐

```sql
-- 비정규화된 테이블 (문제점 많음)
CREATE TABLE bad_orders (
    order_id INT,
    customer_name VARCHAR(50),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2),
    order_date DATE
);

-- 문제점:
-- 1. 데이터 중복 (고객 정보가 주문마다 반복)
-- 2. 수정 이상 (고객 정보 변경시 모든 주문 수정 필요)
-- 3. 삭제 이상 (주문 삭제시 고객 정보도 사라짐)

-- 정규화된 테이블들
-- 1차 정규화: 원자값만 저장
-- 2차 정규화: 부분 함수 종속 제거
-- 3차 정규화: 이행적 함수 종속 제거

-- 고객 테이블 (1NF, 2NF, 3NF)
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

-- 상품 테이블 (1NF, 2NF, 3NF)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 주문 테이블 (1NF, 2NF, 3NF)
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 주문 상세 테이블 (M:N 관계 해결)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 2. **인덱스 (Index)** ⚡

```sql
-- 인덱스 = 책의 색인과 같은 개념
-- 데이터 검색 속도를 높이는 데이터 구조

-- 기본 인덱스 생성
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_date ON orders(order_date);

-- 복합 인덱스 (여러 컬럼)
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);

-- 유니크 인덱스
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- 인덱스 조회
SHOW INDEX FROM users;

-- 인덱스 삭제
DROP INDEX idx_users_email ON users;

-- 실행 계획 확인 (쿼리 최적화)
EXPLAIN SELECT * FROM users WHERE email = 'kim@example.com';

-- 인덱스 사용 예시
-- 빠른 검색 (인덱스 있음)
SELECT * FROM users WHERE email = 'kim@example.com';

-- 느린 검색 (인덱스 없음)
SELECT * FROM users WHERE phone = '010-1234-5678';

-- 범위 검색에 효과적
SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
```

### 3. **제약조건 (Constraints)** 🔒

```sql
-- 테이블 생성시 제약조건 정의
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,     -- 기본키 제약
    name VARCHAR(50) NOT NULL,             -- NOT NULL 제약
    email VARCHAR(100) UNIQUE NOT NULL,    -- 유니크 제약
    age INT CHECK (age >= 0 AND age <= 150), -- 체크 제약
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) CHECK (amount > 0),  -- 양수만 허용
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE                       -- 사용자 삭제시 주문도 삭제
        ON UPDATE CASCADE                       -- 사용자 ID 변경시 주문도 변경
);

-- 제약조건 추가/삭제
ALTER TABLE users ADD CONSTRAINT check_age CHECK (age >= 18);
ALTER TABLE users DROP CONSTRAINT check_age;

-- 외래키 제약조건 추가
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id) REFERENCES users(id);
```

---

## 🗂️ MongoDB (NoSQL) 기초

### 1. **MongoDB 기본 개념** 📄

```javascript
// MongoDB 구조
// Database → Collections → Documents

// 관계형 DB vs MongoDB
// Database  → Database
// Table     → Collection
// Row       → Document
// Column    → Field

// 문서(Document) 예시 - JSON과 유사한 BSON 형태
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "김철수",
  "email": "kim@example.com",
  "age": 25,
  "hobbies": ["독서", "영화감상", "프로그래밍"],
  "address": {
    "city": "서울",
    "district": "강남구",
    "zipcode": "12345"
  },
  "orders": [
    {
      "orderId": "ORD001",
      "product": "노트북",
      "price": 1500000,
      "orderDate": ISODate("2023-12-25T10:00:00Z")
    }
  ],
  "createdAt": ISODate("2023-01-01T00:00:00Z"),
  "isActive": true
}
```

### 2. **MongoDB 기본 조작** 🔧

```javascript
// 데이터베이스 선택
use myapp;

// 컬렉션에 문서 삽입
db.users.insertOne({
  name: "김철수",
  email: "kim@example.com",
  age: 25,
  hobbies: ["독서", "영화감상"]
});

// 여러 문서 동시 삽입
db.users.insertMany([
  { name: "이영희", email: "lee@example.com", age: 30 },
  { name: "박민수", email: "park@example.com", age: 28 }
]);

// 문서 조회
db.users.find();                           // 모든 문서
db.users.find({ age: 25 });                // 나이가 25인 문서
db.users.find({ age: { $gte: 25 } });      // 나이가 25 이상
db.users.findOne({ email: "kim@example.com" }); // 첫 번째 일치 문서

// 조건부 조회
db.users.find({
  $and: [
    { age: { $gte: 20 } },
    { age: { $lt: 30 } }
  ]
});

db.users.find({
  $or: [
    { age: { $lt: 20 } },
    { age: { $gt: 60 } }
  ]
});

// 정규표현식 사용
db.users.find({ name: /^김/ });            // 김으로 시작하는 이름

// 배열 요소 검색
db.users.find({ hobbies: "독서" });         // 취미에 독서가 있는 사용자
db.users.find({ hobbies: { $in: ["독서", "영화감상"] } });

// 중첩 객체 검색
db.users.find({ "address.city": "서울" });

// 특정 필드만 조회 (projection)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// 정렬과 제한
db.users.find().sort({ age: 1 });          // 나이 오름차순
db.users.find().sort({ age: -1 });         // 나이 내림차순
db.users.find().limit(5);                  // 상위 5개
db.users.find().skip(10).limit(5);         // 11~15번째 (페이징)
```

### 3. **MongoDB 업데이트와 삭제** ✏️

```javascript
// 문서 업데이트
db.users.updateOne(
  { email: "kim@example.com" }, // 조건
  { $set: { age: 26 } } // 업데이트 내용
);

// 여러 필드 업데이트
db.users.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439011") },
  {
    $set: {
      age: 26,
      "address.city": "부산",
    },
    $push: { hobbies: "등산" }, // 배열에 요소 추가
    $inc: { loginCount: 1 }, // 숫자 증가
  }
);

// 여러 문서 업데이트
db.users.updateMany(
  { age: { $lt: 18 } }, // 18세 미만
  { $set: { isAdult: false } }
);

// Upsert (없으면 생성, 있으면 업데이트)
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "신규사용자", age: 25 } },
  { upsert: true }
);

// 배열 업데이트
db.users.updateOne(
  { email: "kim@example.com" },
  { $pull: { hobbies: "독서" } } // 배열에서 요소 제거
);

// 문서 삭제
db.users.deleteOne({ email: "kim@example.com" });

// 여러 문서 삭제
db.users.deleteMany({ age: { $lt: 18 } });

// 컬렉션의 모든 문서 삭제
db.users.deleteMany({});
```

### 4. **MongoDB 집계 (Aggregation)** 📊

```javascript
// 집계 파이프라인
db.orders.aggregate([
  // 1단계: 필터링
  { $match: { status: "completed" } },

  // 2단계: 그룹화 및 집계
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 },
      avgAmount: { $avg: "$amount" },
    },
  },

  // 3단계: 정렬
  { $sort: { totalAmount: -1 } },

  // 4단계: 제한
  { $limit: 10 },
]);

// 복잡한 집계 예시
db.orders.aggregate([
  // 날짜별 매출 통계
  {
    $group: {
      _id: {
        year: { $year: "$orderDate" },
        month: { $month: "$orderDate" },
        day: { $dayOfMonth: "$orderDate" },
      },
      dailySales: { $sum: "$amount" },
      orderCount: { $sum: 1 },
    },
  },

  // 날짜 형태로 재구성
  {
    $project: {
      date: {
        $dateFromParts: {
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
        },
      },
      dailySales: 1,
      orderCount: 1,
      _id: 0,
    },
  },

  { $sort: { date: 1 } },
]);

// Lookup (JOIN과 유사)
db.orders.aggregate([
  {
    $lookup: {
      from: "customers", // 조인할 컬렉션
      localField: "customerId", // 현재 컬렉션의 필드
      foreignField: "_id", // 대상 컬렉션의 필드
      as: "customerInfo", // 결과 필드명
    },
  },
  {
    $unwind: "$customerInfo", // 배열을 객체로 변환
  },
  {
    $project: {
      orderDate: 1,
      amount: 1,
      "customerInfo.name": 1,
      "customerInfo.email": 1,
    },
  },
]);
```

---

## 🔧 Node.js와 데이터베이스 연동

### 1. **MySQL 연동** 🐬

```javascript
// mysql2 패키지 사용
const mysql = require("mysql2/promise");

// 연결 설정
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "myapp",
  charset: "utf8mb4",
};

// 단일 연결
async function singleConnection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // 사용자 조회
    const [users] = await connection.execute(
      "SELECT * FROM users WHERE age >= ?",
      [25]
    );
    console.log("사용자 목록:", users);

    // 사용자 생성
    const [result] = await connection.execute(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
      ["김철수", "kim@example.com", 25]
    );
    console.log("생성된 사용자 ID:", result.insertId);
  } finally {
    await connection.end();
  }
}

// 연결 풀 사용 (권장)
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 사용자 관리 클래스
class UserService {
  // 모든 사용자 조회
  async getAllUsers() {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows;
  }

  // 사용자 생성
  async createUser(userData) {
    const { name, email, age } = userData;
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );
    return { id: result.insertId, ...userData };
  }

  // 사용자 조회
  async getUserById(id) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // 사용자 업데이트
  async updateUser(id, userData) {
    const { name, email, age } = userData;
    await pool.execute(
      "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );
    return this.getUserById(id);
  }

  // 사용자 삭제
  async deleteUser(id) {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  }

  // 트랜잭션 예시
  async transferMoney(fromUserId, toUserId, amount) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // 출금
      await connection.execute(
        "UPDATE accounts SET balance = balance - ? WHERE user_id = ?",
        [amount, fromUserId]
      );

      // 입금
      await connection.execute(
        "UPDATE accounts SET balance = balance + ? WHERE user_id = ?",
        [amount, toUserId]
      );

      await connection.commit();
      console.log("이체 완료");
    } catch (error) {
      await connection.rollback();
      console.error("이체 실패, 롤백:", error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

// 사용 예시
async function example() {
  const userService = new UserService();

  // 사용자 생성
  const newUser = await userService.createUser({
    name: "김철수",
    email: "kim@example.com",
    age: 25,
  });

  console.log("생성된 사용자:", newUser);

  // 모든 사용자 조회
  const allUsers = await userService.getAllUsers();
  console.log("모든 사용자:", allUsers);
}
```

### 2. **MongoDB 연동 (Mongoose)** 🍃

```javascript
const mongoose = require("mongoose");

// MongoDB 연결
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB 연결 성공");
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    process.exit(1);
  }
}

// 스키마 정의
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "이름은 필수입니다"],
      trim: true,
      maxlength: [50, "이름은 50자 이내로 입력하세요"],
    },
    email: {
      type: String,
      required: [true, "이메일은 필수입니다"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "올바른 이메일 형식이 아닙니다",
      },
    },
    age: {
      type: Number,
      min: [0, "나이는 0 이상이어야 합니다"],
      max: [150, "나이는 150 이하여야 합니다"],
    },
    hobbies: [String],
    address: {
      city: String,
      district: String,
      zipcode: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 인덱스 설정
userSchema.index({ email: 1 });
userSchema.index({ "address.city": 1 });

// 가상 필드 (Virtual)
userSchema.virtual("fullAddress").get(function () {
  return `${this.address.city} ${this.address.district}`;
});

// 미들웨어 (Middleware)
userSchema.pre("save", function (next) {
  console.log("사용자 저장 전 실행");
  next();
});

userSchema.post("save", function (doc) {
  console.log("사용자 저장 후 실행:", doc.name);
});

// 모델 생성
const User = mongoose.model("User", userSchema);

// 사용자 서비스 클래스
class UserService {
  // 사용자 생성
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`사용자 생성 실패: ${error.message}`);
    }
  }

  // 모든 사용자 조회 (페이징)
  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const users = await User.find({ isActive: true })
      .select("-__v") // __v 필드 제외
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ isActive: true });

    return {
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    };
  }

  // 사용자 검색
  async searchUsers(searchTerm) {
    return await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
      isActive: true,
    });
  }

  // 사용자 업데이트
  async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true, // 업데이트된 문서 반환
      runValidators: true, // 검증 실행
    });

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다");
    }

    return user;
  }

  // 사용자 삭제 (소프트 삭제)
  async deleteUser(id) {
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다");
    }

    return user;
  }

  // 집계 쿼리 예시
  async getUserStats() {
    return await User.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$address.city",
          count: { $sum: 1 },
          avgAge: { $avg: "$age" },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }
}

// 사용 예시
async function example() {
  await connectDB();

  const userService = new UserService();

  try {
    // 사용자 생성
    const newUser = await userService.createUser({
      name: "김철수",
      email: "kim@example.com",
      age: 25,
      hobbies: ["독서", "영화감상"],
      address: {
        city: "서울",
        district: "강남구",
        zipcode: "12345",
      },
    });

    console.log("생성된 사용자:", newUser);

    // 사용자 목록 조회
    const result = await userService.getAllUsers(1, 5);
    console.log("사용자 목록:", result);

    // 사용자 검색
    const searchResult = await userService.searchUsers("김");
    console.log("검색 결과:", searchResult);

    // 통계 조회
    const stats = await userService.getUserStats();
    console.log("사용자 통계:", stats);
  } catch (error) {
    console.error("오류:", error.message);
  }
}
```

---

## 🎯 실전 예제

### 1. **블로그 시스템 설계** 📝

```sql
-- MySQL 기반 블로그 시스템

-- 사용자 테이블
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 카테고리 테이블
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 포스트 테이블
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    author_id INT NOT NULL,
    category_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_posts_status (status),
    INDEX idx_posts_published (published_at),
    FULLTEXT(title, content)  -- 전문 검색을 위한 인덱스
);

-- 태그 테이블
CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 포스트-태그 관계 테이블 (다대다)
CREATE TABLE post_tags (
    post_id INT,
    tag_id INT,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 댓글 테이블
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    author_id INT,
    parent_id INT,  -- 대댓글을 위한 자기참조
    content TEXT NOT NULL,
    author_name VARCHAR(100),  -- 비회원 댓글용
    author_email VARCHAR(100), -- 비회원 댓글용
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 유용한 쿼리들
-- 1. 최근 게시글 조회 (댓글 수 포함)
SELECT
    p.*,
    u.display_name AS author_name,
    c.name AS category_name,
    COUNT(cm.id) AS comment_count
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN comments cm ON p.id = cm.post_id AND cm.is_approved = TRUE
WHERE p.status = 'published'
GROUP BY p.id
ORDER BY p.published_at DESC
LIMIT 10;

-- 2. 태그별 게시글 수
SELECT
    t.name,
    COUNT(pt.post_id) AS post_count
FROM tags t
LEFT JOIN post_tags pt ON t.id = pt.tag_id
LEFT JOIN posts p ON pt.post_id = p.id AND p.status = 'published'
GROUP BY t.id, t.name
ORDER BY post_count DESC;

-- 3. 전문 검색
SELECT *
FROM posts
WHERE MATCH(title, content) AGAINST('검색어' IN NATURAL LANGUAGE MODE)
AND status = 'published';
```

### 2. **전자상거래 시스템** 🛒

```sql
-- MySQL 기반 쇼핑몰 시스템

-- 카테고리 테이블 (계층구조)
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INT,
    level INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- 상품 테이블
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    sku VARCHAR(100) UNIQUE NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    brand VARCHAR(100),
    weight DECIMAL(8, 2),
    dimensions VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_products_category (category_id),
    INDEX idx_products_price (price),
    INDEX idx_products_featured (featured)
);

-- 상품 이미지 테이블
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 고객 테이블
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    birth_date DATE,
    gender ENUM('M', 'F', 'Other'),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 주소 테이블
CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    type ENUM('billing', 'shipping') NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    company VARCHAR(100),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 주문 테이블
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KRW',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    billing_address JSON,
    shipping_address JSON,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_date (created_at)
);

-- 주문 상품 테이블
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,  -- 주문 시점의 상품명
    product_price DECIMAL(10, 2) NOT NULL,  -- 주문 시점의 가격
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 장바구니 테이블
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (customer_id, product_id)
);

-- 유용한 쿼리들
-- 1. 베스트셀러 상품 (최근 30일)
SELECT
    p.id,
    p.name,
    p.price,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.subtotal) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status IN ('shipped', 'delivered')
    AND o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY p.id, p.name, p.price
ORDER BY total_sold DESC
LIMIT 10;

-- 2. 고객별 총 주문 금액
SELECT
    c.id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.status != 'cancelled'
GROUP BY c.id, customer_name
ORDER BY total_spent DESC;

-- 3. 재고 부족 상품
SELECT
    p.id,
    p.name,
    p.stock_quantity,
    COALESCE(SUM(ci.quantity), 0) AS cart_quantity
FROM products p
LEFT JOIN cart_items ci ON p.id = ci.product_id
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.stock_quantity
HAVING p.stock_quantity <= 10
ORDER BY p.stock_quantity ASC;
```

---

## 🎯 학습 로드맵

### 1단계: 기초 개념 📚

- [ ] 데이터베이스 기본 개념 이해
- [ ] SQL 기본 문법 (SELECT, INSERT, UPDATE, DELETE)
- [ ] 관계형 데이터베이스 구조
- [ ] 기본 데이터 타입

### 2단계: 설계와 정규화 🏗️

- [ ] 데이터베이스 설계 원칙
- [ ] 정규화와 비정규화
- [ ] 관계 설정 (1:1, 1:N, M:N)
- [ ] 인덱스와 성능 최적화

### 3단계: 고급 SQL 📊

- [ ] 복잡한 JOIN 연산
- [ ] 집계 함수와 그룹화
- [ ] 서브쿼리와 CTE
- [ ] 윈도우 함수

### 4단계: NoSQL과 실전 🚀

- [ ] MongoDB 기본 조작
- [ ] 집계 파이프라인
- [ ] Node.js 연동
- [ ] 실전 프로젝트 구현

---

## 💡 팁과 주의사항

### ✅ 좋은 습관

- **정규화된 설계**로 데이터 중복 최소화
- **적절한 인덱스** 생성으로 성능 향상
- **외래키 제약조건** 사용으로 데이터 무결성 보장
- **트랜잭션** 사용으로 데이터 일관성 유지
- **백업과 복구** 계획 수립

### ❌ 피해야 할 것들

- **SELECT \*** 남용 (필요한 컬럼만 조회)
- **인덱스 없는 WHERE 절** 사용
- **문자열로 날짜 저장** (DATE 타입 사용)
- **너무 많은 JOIN** (성능 저하)
- **SQL 인젝션** 취약점 방치

### 🔧 유용한 도구들

- **MySQL Workbench** - MySQL GUI 도구
- **MongoDB Compass** - MongoDB GUI 도구
- **DBeaver** - 다중 DB 지원 도구
- **Sequel Pro** - macOS용 MySQL 클라이언트
- **Studio 3T** - MongoDB 전용 도구

---

## 🌟 마무리

데이터베이스는 **모든 웹 애플리케이션의 심장**과 같은 존재입니다!

**핵심만 기억하세요:**

1. 🏗️ **설계** = 정규화된 구조로 견고한 기반 구축
2. 🔍 **SQL** = 데이터 조작의 표준 언어
3. ⚡ **성능** = 인덱스와 쿼리 최적화
4. 🔒 **무결성** = 제약조건으로 데이터 품질 보장
5. 🔄 **트랜잭션** = 데이터 일관성 유지

**올바른 데이터베이스 설계는 확장 가능한 애플리케이션의 기초입니다!** 🗄️✨

**"데이터는 새로운 석유다"** - 데이터를 잘 관리하고 활용하는 것이 성공의 열쇠입니다! 😊
