const Lexer = require('../lexer');
const assert = require("assert");

describe("Lexer tokenize tests", function() {
	it("2+4-99 to 2 + 4 - 99", function() {
		assert.equal(Lexer.tokenize('2+4-99'), '2 + 4 - 99');
	});

	it("2.2*-3/11 to 2.2 * -3 / 11", function() {
		assert.equal(Lexer.tokenize('2.2*-3/11'), '2.2 * -3 / 11');
	});
});