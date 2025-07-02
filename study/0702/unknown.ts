let value2: unknown = 10;
value2 = "hello";
// console.log(value);

value2 = new Array(); // [], Array(), new Array, new Array(10)
if (value2 instanceof Array) {
  value2.push(33);
}

console.log(value2);
