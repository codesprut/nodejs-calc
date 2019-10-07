const Calc = require('../calc');
const assert = require("assert");

describe("Calculator tests", function() {
	it("Operation order: 2 + 2 * 2 = 6", function() {
		assert.equal(Calc.calculate('2+2*2'), 6);
	});

	it("Negative operands: -4-4 = -8", function() {
		assert.equal(Calc.calculate('-4-4'), -8);
	});

	it("Min to min: 4--4 = 8", function() {
		assert.equal(Calc.calculate('4--4'), 8);
	});

	it("Prime numbers & left to right order: 4 - 5 + 9 = 8", function() {
		assert.equal(Calc.calculate('4-5+9'), 8);
	});

	it("Brackets: 12 + 5 * ((12 + 4) / 2) = 52", function() {
		assert.equal(Calc.calculate('12+5*((12+4)/2)'), 52);
	});

	it("Decimal: 2.20 + 3.14 = 5.34", function() {
		assert.equal(Calc.calculate('2.20+3.14'), 5.34);
	});

	it("Math constants", function() {
		assert.equal(Calc.calculate('PI + 2'), 5.14);
	});

	it("Math function", function() {
		assert.equal(Calc.calculate('sqrt(4)*5'), 10);
	});

	it("Math function, another order", function() {
		assert.equal(Calc.calculate('-1+pow(2,3)'), 7);
	});

	it("Math function with multiple params and functions as params", function() {
		assert.equal(Calc.calculate('max(10, 20 + 5, 30 - 40, pow(2,3), min ( 35, 70))'), 35);
	});
});