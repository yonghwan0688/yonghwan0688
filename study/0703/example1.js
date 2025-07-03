// 1번문제
// class Person {
//   name: string;
//   age: number;
//   introduce(): void {
//     console.log(`안녕하세요, 저는 20살의 Alice입니다.`);
//   }
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 2번문제
// class Product {
//   name: string;
//   price: number;
//   constructor(name: string, price: number) {
//     this.name = name;
//     this.price = price;
//   }
//   display() {
//     console.log(`제품명: ${this.name}, 가격: ${this.price}만원`);
//   }
// }
// const product1 = new Product("MackBook", 150);
// console.log(product1);
// 3번문제
// class BankAccount {
//   #balance: number = 0;
//   deposit(amount: number) {
//     this.#balance += amount;
//   }
//   getBalance() {
//     console.log(this.#balance);
//   }
//   setBalance(amount: number) {
//     amount = amount * 1.1;
//     this.#balance = amount;
//   }
// }
// let account = new BankAccount();
// account.setBalance(1000);
// account.getBalance();
// 4번문제
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.makeSound = function () {
        console.log("".concat(this.sound, "!"));
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sound = "멍멍";
        return _this;
    }
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sound = "야옹";
        return _this;
    }
    return Cat;
}(Animal));
var cat = new Cat();
var dog = new Dog();
cat.makeSound();
dog.makeSound();
