class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  //   constructor(public name: string) {} *최근 추가된 문법

  greet() {
    console.log(`안녕하세요, 제 이름은 ${this.name}입니다.`);
  }
}

let user = new User("홍길동");
user.greet();
