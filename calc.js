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

		exp = expression(exp);

		tokens = lexer.tokenize(exp);

		postfix = postfixer.convert(tokens);
		postfix = postfix.split(' ');

		postfix.forEach((token) => {
			if( mathematics.isNumber(token) ){
				operands.push(token);
			}
			else if( mathematics.isMathConst(token) ){
				operands.push( Math[token] )
			}
			else if( mathematics.isMathFunc(token) ){
				operands.push( Math[token]( operands.pop() ) );
			}
			else if( mathematics.isOperator(token) ){
				console.log( 'operator: ' + token );
				let popB = operands.pop();
				let popA = operands.pop();

				operands.push( mathematics.operation(token, popA, popB) );
			}
		});

		//if( operands.length > 1 )

		result = operands[0];

		if( result % 1 !== 0 )
			result = Number(result.toFixed(this.fixed));

		return result;
	}
}

module.exports = new Calculator();