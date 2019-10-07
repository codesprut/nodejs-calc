const Lexer = require('../lexer');
const assert = require("assert");

describe("Lexer tokenize tests", function() {
	it("Simple expression with big number", function() {
		assert.equal(Lexer.tokenize('2+4-9999'), '2 + 4 - 9999');
	});

	it("Negative sign and mul,div operators", function() {
		assert.equal(Lexer.tokenize('2.2*-3/11'), '2.2 * -3 / 11');
	});

	it("Negative before operator", function() {
		assert.equal(Lexer.tokenize('-4-4'), '-4 - 4');
	});

	it("Negative after operator", function() {
		assert.equal(Lexer.tokenize('4--4'), '4 - -4');
	});

	it("Double numbers", function() {
		assert.equal(Lexer.tokenize('22222.12/-9999.9'), '22222.12 / -9999.9');
	});

	it("Add parens on negative row", function() {
		assert.equal(Lexer.tokenize('4+--4'), '4 + ( - ( -4 ) )');
	});

	it("Many signs in a row, add parens", function() {
		assert.equal(Lexer.tokenize('4+---4/2'), '4 + ( - ( - ( -4 ) ) ) / 2');
	});

	it("Many signs in a row with parens already", function() {
		assert.equal(Lexer.tokenize('4+(-(-(-4)))/2'), '4 + ( - ( - ( -4 ) ) ) / 2');
	});

	it("Math constant", function() {
		assert.equal(Lexer.tokenize('PI+2/12'), 'PI + 2 / 12');
	});

	it("Math function", function() {
		assert.equal(Lexer.tokenize('sqrt(15)'), 'sqrt ( 15 )');
	});

	it("Math functions with multiple parameters", function() {
		assert.equal(Lexer.tokenize('min(-2,2,-3,-4)'), 'min ( -2 , 2 , -3 , -4 )');
	});
});