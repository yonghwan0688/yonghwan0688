// 1번문제
// class Person {
//   name: string;
//   age: number;
//   introduce(): void {
//     console.log(`안녕하세요, 저는 20살의 Alice입니다.`);
//   }
// }

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
class Animal {
  sound: string;
  makeSound() {
    console.log(`${this.sound}!`);
  }
}

class Dog extends Animal {
  sound: string = "멍멍";
}

class Cat extends Animal {
  sound: string = "야옹";
}

const cat = new Cat();
const dog = new Dog();

cat.makeSound();
dog.makeSound();
