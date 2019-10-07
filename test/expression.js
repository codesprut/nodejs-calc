const Expression = require('../expression');
const assert = require("assert");

describe("Expression tests", function() {

	it("Positive sign removed from 2.2*+3/11", function() {
		assert.equal(Expression('2.2*+3/11'), '2.2*3/11');
	});

	it("sqrt(12)", function() {
		assert.equal(Expression('sqrt(12)'), 'sqrt(12)');
	});

	it("pow(2,3)", function() {
		assert.equal(Expression('pow(2,3)'), 'pow(2,3)');
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

	it("2.2^4 should fails", function() {
		let test;
		try{
			test = Expression('2.2^4');
		}
		catch(ex){
			test = ex;
		}

		assert.equal(test, 'Invalid expression: 2.2^4');
	});
});