const mathematics = require('../mathematics');
const assert = require("assert");

describe("isOperator method", function() {
	it("'+' it's true", function() {
		assert.equal(mathematics.isOperator('+'), true);
	});

	it("'%' it's true", function() {
		assert.equal(mathematics.isOperator('%'), true);
	});

	it("'' it's false", function() {
		assert.equal(mathematics.isOperator(''), false);
	});

	it("'s' it's false", function() {
		assert.equal(mathematics.isOperator('s'), false);
	});
});

describe("isNumber method", function() {
	it("'-2' it's true", function() {
		assert.equal(mathematics.isNumber('-2'), true);
	});

	it("'' it's false", function() {
		assert.equal(mathematics.isNumber(''), false);
	});
});

describe("isMathConst", function() {
	it("'PI' it's true", function() {
		assert.equal(mathematics.isMathConst('PI'), true);
	});

	it("'sqrt' it's false", function() {
		assert.equal(mathematics.isMathConst('sqrt'), false);
	});

	it("'' it's false", function() {
		assert.equal(mathematics.isMathConst(''), false);
	});
});

describe("isMathFunc", function() {
	it("'PI' it's false", function() {
		assert.equal(mathematics.isMathFunc('PI'), false);
	});

	it("'sqrt' it's true", function() {
		assert.equal(mathematics.isMathFunc('sqrt'), true);
	});

	it("'' it's false", function() {
		assert.equal(mathematics.isMathFunc(''), false);
	});
});