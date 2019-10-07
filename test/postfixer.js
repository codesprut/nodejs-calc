const Postfixer = require('../postfixer');
const assert = require("assert");

describe("Postfixer tests", function() {
	it("Simple expression with brackets", function() {
		assert.equal(Postfixer.convert('2 + ( 4 - 99 ) / 2'), '2 4 99 - 2 / +');
	});

	it("Many signs in a row", function() {
		assert.equal(Postfixer.convert('4 + ( - ( - ( -4 ) ) ) / 2'), '4 -4 -- -- 2 / +');
	});

	it("Negative to negative", function() {
		assert.equal(Postfixer.convert('-4 - 4'), '-4 4 -');
	});

	it("Math function", function() {
		assert.equal(Postfixer.convert('sqrt ( 5 )'), '. 5 sqrt');
	});

	it("Math function with another operand", function() {
		assert.equal(Postfixer.convert('sqrt ( 4 ) * 5'), '. 4 sqrt 5 *');
	});

	it("Math function with multiple params", function() {
		assert.equal(Postfixer.convert('pow ( 2 , 3 )'), '. 2 3 pow');
	});

	it("Nested functions and operations in commas", function() {
		assert.equal(Postfixer.convert('max ( 10 , 20 + 5 , 30 - 40 , min ( 40 , 100 ) )'), '. 10 20 5 + 30 40 - . 40 100 min max');
	});
});