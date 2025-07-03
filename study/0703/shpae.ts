abstract class Shape {
  size: number;
  //   calculateArea(): number {
  //     return 1;
  //   }
  abstract getAreaRectangle(widht:number, heightLnumber): number;
  abstract getAreaCircles(widht:number, heightLnumber): number;
}

class Rectangle extends Shape {
  getAreaRectangle(widht:number, heightLnumber): number {
    return width * height);
  }

  getAreacircle(radius: number): number {
    throw Error("Unimlemented method");
  }
}

class Circle extends Shape {
  getAreaCircle(radius: number, height: number): number {
    return radius * radius * Math.PI;
  }
}
