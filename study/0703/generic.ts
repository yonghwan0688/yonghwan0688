function identity<T>(value: T): T {
  return value;
}

let output = identity<string>("hello");
console.log(output);

let output2 = identity<number>(10);
console.log(output2);

function getValue<k extends string, v>(obj: Record<k, v>, key: k): v {
  return obj[key];
}

let objects = [
  { name: "john", age: 20 },
  { name: "jane", age: 21 },
];

let result2 = getValue(objects, "name");
console.log(result2);
