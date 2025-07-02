class Person {
  constructor(public name: string, private age: number) {}

  introduce(): string {
    return `Hi, I'm ${this.name}`;
  }
}

class Car implements Vehicle {
  carModel: string;
  carOwner: string;
  carWeight: number;
  buyYear: number;
  isSunk: boolean;
  distancde: number;

  drive() {
    console.log("Go");
  }

  alarm() {
    console.log("Beep Beep");
  }

  back() {
    console.log("Back");
  }

  wipe() {
    console.log("Wipe");
  }

  break() {
    console.log("Break");
  }

  accelerate() {
    console.log("accelerate");
  }
}

class DumpTruck extends Car {
  storage: number;
  operate() {
    console.log("Operate");
  }
  spread() {
    console.log("Spread");
  }
}

class Bus extends Car {
  passenger: number;
  busNumber: number;

  constructor(passenger: number, busNumber: number) {
    super();
    console.log("");
  }

  openDoor() {
    console.log("Open Door");
  }

  trunk() {
    console.log("");
  }
}

interface Vehicle {
  break(): void;
  accelerate(): void;
  trunk(): void;
}
