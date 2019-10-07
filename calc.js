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
		let result;
		let tokens;
		let notation;

		try {
			exp = expression(exp);

			tokens = lexer.tokenize(exp);

			notation = postfixer.convert(tokens);
		}
		catch(ex) {
			return ex;
		}

		result = this.calcPostfix(notation);

		if( mathematics.isNumber(result) && result % 1 !== 0 )
			result = Number(result.toFixed(this.fixed));

		return result;
	}

	calcPostfix(postfix){
		let operands = [];

		postfix = postfix.split(' ');

		postfix.forEach((token) => {
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

		return operands[0];
	}
}

module.exports = new Calculator();