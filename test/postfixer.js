const Postfixer = require('../postfixer');
const assert = require("assert");

describe("Postfixer tests", function() {
	it("2 + ( 4 - 99 ) / 2 to 2 4 + 99 -", function() {
		assert.equal(Postfixer.convert('2 + ( 4 - 99 ) / 2'), '2 4 99 - 2 / +');
	});

	it("4 + ( - ( - ( -4 ) ) ) / 2 to 4 4 - - - 2 / +", function() {
		assert.equal(Postfixer.convert('4 + ( - ( - ( -4 ) ) ) / 2'), '4 -4 - - 2 / +');
	});

	it("sqrt ( 5 ) to 5 sqrt", function() {
		assert.equal(Postfixer.convert('sqrt ( 5 )'), '5 sqrt');
	});

	it("sqrt ( 4 ) * 5 to 5 sqrt", function() {
		assert.equal(Postfixer.convert('sqrt ( 4 ) * 5'), '4 sqrt 5 *');
	});

	it("-4 - 4 to -4 4 -", function() {
		assert.equal(Postfixer.convert('-4 - 4'), '-4 4 -');
	});

	it("pow ( 2 , 3 ) to 2 3 pow", function() {
		assert.equal(Postfixer.convert('pow ( 2 , 3 )'), '2 3 pow');
	});

	it("-1 + pow ( 2 , 3 ) to 2 3 pow -1 +", function() {
		assert.equal(Postfixer.convert('-1 + pow ( 2 , 3 )'), '2 3 pow -1 +');
	});
});