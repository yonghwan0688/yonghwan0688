const user = { id: 1, name: "kim", age: 20, address: "Seoul" };
const updated = { id: 2, ...user, name: "Lee" };

console.log(updated);

const userArr = [1, 2, 3, 4, 5];
const updatedArr = [1, 2, ...userArr, 6, 7];

console.log(updatedArr);

// 구조분해
const userSplit = {
  id: 1,
  name: "kim",
  age: 20,
  address: "Seoul",
};
// const { id, name, age, address } = userSplit;

const { id, name, ...rest } = userSplit;

// 구조 분해 할당을 이용해, title과 author를 추출하기
const book = { title: "The Great Gatsby", author: "Fitzerald" };
const { title: title2, author } = book;

console.log(title2);
console.log(author);

// 문제1
const arr = [1, 2, 2, 3, 4, 5, 5];
