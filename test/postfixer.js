const Postfixer = require('../postfixer');
const assert = require("assert");

describe("Postfixer tests", function() {
	it("2 + ( 4 - 99 ) / 2 to 2 4 + 99 -", function() {
		assert.equal(Postfixer.convert('2 + ( 4 - 99 ) / 2'), '2 4 99 - 2 / +');
	});
});