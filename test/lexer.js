const Lexer = require('../lexer');
const assert = require("assert");

describe("Lexer tokenize tests", function() {
	it("2+4-99 to 2 + 4 - 99", function() {
		assert.equal(Lexer.tokenize('2+4-99'), '2 + 4 - 99');
	});

	it("2.2*-3/11 to 2.2 * -3 / 11", function() {
		assert.equal(Lexer.tokenize('2.2*-3/11'), '2.2 * -3 / 11');
	});

	it("4--4 to 4 - -4", function() {
		assert.equal(Lexer.tokenize('4--4'), '4 - -4');
	});

	it("22222.12/-9999.9 to 22222.12 / -9999.9", function() {
		assert.equal(Lexer.tokenize('22222.12/-9999.9'), '22222.12 / -9999.9');
	});

	it("4+--4/2 to 4 + ( - ( -4 ) )", function() {
		assert.equal(Lexer.tokenize('4+--4'), '4 + ( - ( -4 ) )');
	});

	it("4+---4/2 to 4 + ( - ( - ( -4 ) ) ) / 2", function() {
		assert.equal(Lexer.tokenize('4+---4/2'), '4 + ( - ( - ( -4 ) ) ) / 2');
	});

	it("sqrt(15) to sqrt ( 15 )", function() {
		assert.equal(Lexer.tokenize('sqrt(15)'), 'sqrt ( 15 )');
	});

	it("PI+2/12 to PI + 2 / 12", function() {
		assert.equal(Lexer.tokenize('PI+2/12'), 'PI + 2 / 12');
	});
});