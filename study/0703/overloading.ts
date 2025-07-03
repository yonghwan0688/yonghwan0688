class Calculator {
  add(a: number, b: number): void {
    console.log(a + b);
  }

  add(a: string, b: string): void {
    return a + b;
  }
}

let calculator = new Calculator();
calculator.add(1, 2);
