var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b) {
        console.log(a + b);
    };
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    return Calculator;
}());
var calculator = new Calculator();
calculator.add(1, 2);
