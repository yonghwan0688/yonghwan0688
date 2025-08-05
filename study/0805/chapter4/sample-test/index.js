const calc = require("../../sample-package");

const a = 17;
const b = 3;

console.log("a + b =", calc.add(a, b));
console.log("a - b =", calc.subtract(a, b));
console.log("a * b =", calc.multiply(a, b));
console.log("a / b =", calc.divide(a, b));
