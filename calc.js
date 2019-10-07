'use strict';

const mathematics = require('./mathematics');
const lexer = require('./lexer');
const postfixer = require('./postfixer');
const expression = require('./expression');

class Calculator {

	constructor( fixed ){
		this.fixed = fixed || 2;
	}

	calculate(exp){
		let operands = [];
		let result;
		let tokens;
		let postfix;

		try {
			exp = expression(exp);
		}
		catch(ex) {
			return ex;
		}

		tokens = lexer.tokenize(exp);

		postfix = postfixer.convert(tokens);
		postfix = postfix.split(' ');

		postfix.forEach((token, index) => {
			if( mathematics.isNumber(token) ){
				operands.push(token);
			}
			else if( mathematics.isMathConst(token) ){
				operands.push( Math[token] );
			}
			else if( token === '.' )
				operands.push('.');
			else if( mathematics.isMathFunc(token) ){
				let mathOps = [];
				let topOp   = operands.pop();

				while( topOp !== '.' ) {
					mathOps.push(topOp);
					topOp = operands.pop();
				}

				operands.push( Math[token].apply(null, mathOps.reverse()) );
			}
			else if( mathematics.isOperator(token) ){
				let popB = operands.pop();
				let popA = operands.pop();

				operands.push( mathematics.operation(token, popA, popB) );
			}
		});

		result = operands[0];

		if( result % 1 !== 0 )
			result = Number(result.toFixed(this.fixed));

		return result;
	}
}

module.exports = new Calculator();