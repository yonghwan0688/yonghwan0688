// 고차배열 메서드
const nums = [1, 2, 3, 4, 5];

// map
const squares = nums.map((n) => n ** 2);

for (const val of squares) {
  console.log(`val => ${val}`);
}

for (let i = 0; i < nums.length; i++) {
  console.log(`nums[${i}] => ${nums[i]}, squares[${i}] => ${squares[i]} `);
}

const evens = nums.filter((n) => n % 2 === 0);

for (const val of evens) {
  console.log(`val => ${val}`);
}

const sum = nums.reduce((acc, cur) => {
  acc += cur;
  console.log(`acc => ${acc}, cur => ${cur}`);
  return acc;
}, 0);
console.log(`sum => ${sum}`);

// find
const found = nums.find((n) => n > 2);
console.log(`found => ${found}`);

const hasNegative = nums.some((n) => n < 0);
console.log(hasNegative);

const allPositive = nums.every((n) => n > 1);
console.log(allPositive);

const nested = [1, 2, 3];
const duplicated = nested.flatMap((n) => [n, n]);

for (let nest of duplicated) {
  console.log(`nest => ${nest}`);
}
