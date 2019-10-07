'use strict';

const mathematics = require('./mathematics');

function Expression( exp ) {
	let opsStr = '\\' + Object.keys(mathematics.operators).join('\\');

	exp = exp.replace(/\s/g, '');

	// remove positive signs
	exp = exp.replace(new RegExp('([' + opsStr + ']|^|\\()(\\+)([0-9])', 'g'), '$1$3');

	// two operators in a row and second not negative sign
	if( exp.match(new RegExp('[' + opsStr + '][' + opsStr.replace('\-', '') + ']')) )
		throw 'Invalid expression: ' + exp;

	// match chars which not expected
	if( exp.match(new RegExp('[^\,\.\(\)' + opsStr + 'a-z0-9]', 'i')) )
		throw 'Invalid expression: ' + exp;

	let mathProps = exp.match(/[a-z]+/i);

	if( mathProps === null )
		return exp;

	mathProps.forEach((token) => {
		if( token.match(/[a-z]+/i) ){
			if( !mathematics.isMathConst(token) && !mathematics.isMathFunc(token) )
				throw 'Math const|func not found: ' + token;
		}
	});

	return exp;
}

module.exports = Expression;