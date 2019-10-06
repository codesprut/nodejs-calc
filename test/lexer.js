const Lexer = require('../lexer');
const assert = require("assert");

describe("Lexer tokenize tests", function() {
	it("2+4-99 to 2 + 4 - 99", function() {
		assert.equal(Lexer.tokenize('2+4-99'), '2 + 4 - 99');
	});

	it("2.2*-3/11 to 2.2 * -3 / 11", function() {
		assert.equal(Lexer.tokenize('2.2*-3/11'), '2.2 * -3 / 11');
	});

	it("sqrt(15) to sqrt ( 15 )", function() {
		assert.equal(Lexer.tokenize('sqrt(15)'), 'sqrt ( 15 )');
	});

	it("PI+2/12 to PI + 2 / 12", function() {
		assert.equal(Lexer.tokenize('PI+2/12'), 'PI + 2 / 12');
	});

	it("VAR/2 should fails", function() {
		try{
			Lexer.tokenize('VAR/2');
		}
		catch(ex){
			assert.equal(ex, 'Math const|func not found: VAR');
		}
	});

	it("2.2^4 should fails", function() {
		try{
			Lexer.tokenize('2.2^4');
		}
		catch(ex){
			assert.equal(ex, 'Invalid expression: 2.2^4');
		}
	});

	it("2.2*+3/11 should fails", function() {
		try{
			Lexer.tokenize('2.2*+3/11');
		}
		catch(ex){
			assert.equal(ex, 'Invalid expression: 2.2*+3/11');
		}
	});
});