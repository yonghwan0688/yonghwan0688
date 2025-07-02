// type Run = (miles: number) => boolean;
// let runner: Run = function (miles: number): boolean {
//   if (miles > 10) {
//     return true;
//   }
//   return false;
// };
// console.log(runner(9));
// type Greet = (name: string) => string;
// const greet2: Greet = (name) => `Hello, ${name}`;
// console.log(greet2("John"));
function log(message, user) {
    console.log("".concat(user !== null && user !== void 0 ? user : "system", ": ").concat(message));
}
log("Hello");
log("Hello", "John");
