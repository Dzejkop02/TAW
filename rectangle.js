"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = exports.Rectangle = exports.Point = void 0;
class Point {
    constructor(x, y) {
        if (typeof x !== 'number' || isNaN(x)) {
            console.log(`Invalid coordinate for x: ${x}. Must be a number.`);
        }
        if (typeof y !== 'number' || isNaN(y)) {
            console.log(`Invalid coordinate for y: ${y}. Must be a number.`);
        }
        this.x = x;
        this.y = y;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    rotate(angle) {
        const radian = angle * (Math.PI / 180);
        const newX = this.x * Math.cos(radian) - this.y * Math.sin(radian);
        const newY = this.x * Math.sin(radian) + this.y * Math.cos(radian);
        this.x = newX;
        this.y = newY;
    }
}
exports.Point = Point;
class Rectangle {
    constructor(topLeft, topRight, bottomLeft, bottomRight) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
    move(dx, dy) {
        this.topLeft.move(dx, dy);
        this.topRight.move(dx, dy);
        this.bottomLeft.move(dx, dy);
        this.bottomRight.move(dx, dy);
    }
    getArea() {
        const width = Math.abs(this.topRight.x - this.topLeft.x);
        const height = Math.abs(this.topLeft.y - this.bottomLeft.y);
        return width * height;
    }
    rotate(angle) {
        this.topLeft.rotate(angle);
        this.topRight.rotate(angle);
        this.bottomLeft.rotate(angle);
        this.bottomRight.rotate(angle);
    }
    scale(factor) {
        const centerX = (this.topLeft.x + this.bottomRight.x) / 2;
        const centerY = (this.topLeft.y + this.bottomRight.y) / 2;
        this.topLeft.x = centerX + (this.topLeft.x - centerX) * factor;
        this.topLeft.y = centerY + (this.topLeft.y - centerY) * factor;
        this.topRight.x = centerX + (this.topRight.x - centerX) * factor;
        this.topRight.y = centerY + (this.topRight.y - centerY) * factor;
        this.bottomLeft.x = centerX + (this.bottomLeft.x - centerX) * factor;
        this.bottomLeft.y = centerY + (this.bottomLeft.y - centerY) * factor;
        this.bottomRight.x = centerX + (this.bottomRight.x - centerX) * factor;
        this.bottomRight.y = centerY + (this.bottomRight.y - centerY) * factor;
    }
    getPerimeter() {
        const width = Math.abs(this.topRight.x - this.topLeft.x);
        const height = Math.abs(this.topLeft.y - this.bottomLeft.y);
        return 2 * (width + height);
    }
}
exports.Rectangle = Rectangle;
class Square extends Rectangle {
    constructor(topLeft, sideLength) {
        if (sideLength <= 0 || isNaN(sideLength)) {
            console.log('Side length must be a positive number.');
        }
        const topRight = new Point(topLeft.x + sideLength, topLeft.y);
        const bottomLeft = new Point(topLeft.x, topLeft.y - sideLength);
        const bottomRight = new Point(topLeft.x + sideLength, topLeft.y - sideLength);
        super(topLeft, topRight, bottomLeft, bottomRight);
    }
    scale(factor) {
        const sideLength = Math.abs(this.topRight.x - this.topLeft.x) * factor;
        this.topRight.x = this.topLeft.x + sideLength;
        this.bottomLeft.y = this.topLeft.y - sideLength;
        this.bottomRight.x = this.topLeft.x + sideLength;
        this.bottomRight.y = this.topLeft.y - sideLength;
    }
}
exports.Square = Square;
const p1 = new Point(0, 10);
const p2 = new Point(10, 10);
const p3 = new Point(0, 0);
const p4 = new Point(10, 0);
const rectangle = new Rectangle(p1, p2, p3, p4);
console.log('Pole prostokąta:', rectangle.getArea());
rectangle.move(5, -5);
console.log('Nowa pozycja topLeft:', rectangle.topLeft);
rectangle.rotate(180);
console.log('Punkty po obrocie: ', rectangle.bottomLeft, rectangle.bottomRight);
console.log('Pole prostokąta:', rectangle.getArea());
rectangle.scale(2);
console.log('Pole prostokąta:', rectangle.getArea());
const p5 = new Point(100, NaN);
const p6 = new Point(10, 15);
const square = new Square(p6, 5);
console.log(square.getArea());
square.scale(2);
console.log(square.getArea());
console.log(rectangle.getPerimeter());
rectangle.scale(0.3);
console.log(rectangle.getPerimeter());
