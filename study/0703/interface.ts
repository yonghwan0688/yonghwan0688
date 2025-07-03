interface Movable {
  move(): void;
}

class Car3 implements Movable {
  move(): void {
    console.log("car");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("robot");
  }
}
