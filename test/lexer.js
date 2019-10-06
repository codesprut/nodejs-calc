const Lexer = require('../lexer');
const assert = require("assert");

describe("Lexer tests", function() {
	it("Tokenize str 2+4-99 to 2 + 4 - 99", function() {
		assert.equal(Lexer.tokenize('2+4-99'), '2 + 4 - 99');
	});
});