const Expression = require('../expression');
const assert = require("assert");

describe("Expression tests", function() {

	it("Positive sign removed from 2.2*+3/11", function() {
		assert.equal(Expression('2.2*+3/11'), '2.2*3/11');
	});

	it("Math function", function() {
		assert.equal(Expression('sqrt(12)'), 'sqrt(12)');
	});

	it("Many signs in a row", function() {
		assert.equal(Expression('4+(-(-(-4)))/2'), '4+(-(-(-4)))/2');
	});

	it("Math function with multiple params", function() {
		assert.equal(Expression('max(2,3, -140)'), 'max(2,3,-140)');
	});

	it("Input dataType check", function() {
		let test;
		try{
			test = Expression({test: 'case'});
		}
		catch(ex){
			test = ex;
		}

		assert.equal(test, 'Invalid expression');
	});

	it("2-+-+--2 should fails", function() {
		let test;
		try{
			test = Expression('2-+-+--2');
		}
		catch(ex){
			test = ex;
		}

		assert.equal(test, 'Invalid expression: 2-+-+--2');
	});

	it("VAR/2 should fails", function() {
		let test;
		try{
			test = Expression('VAR/2');
		}
		catch(ex){
			test = ex;
		}

		assert.equal(test, 'Math const|func not found: VAR');
	});
});