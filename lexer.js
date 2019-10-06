'use strict';

const mathematics = require('./mathematics');

class Lexer {

	tokenize(exp){
		let tokens = [];
		let prevChar = '';
		let char = '';
		let negaPrefix = '';

		let preparedExp = this.prepareExp(exp);

		for( let x = 0; x < preparedExp.length; x++ ){
			prevChar = char;
			char = preparedExp.charAt(x);

			if( mathematics.isOperator(char) ){
				// signDetected
				if( char === '-' && ( x === 0 || mathematics.isOperator(prevChar) || prevChar === '(' ) ) {
					negaPrefix = char;
					continue;
				}
				else if( mathematics.isOperator(prevChar) )
					throw 'Invalid expression: ' + exp;
			}
			else if( mathematics.isNumber(char) || char === '.' ){
				// part of number
				if( mathematics.isNumber(prevChar) || prevChar === '.' ) {
					tokens.push( negaPrefix + tokens.pop() + char );
					negaPrefix = '';
					continue;
				}
			}
			else if( char.match(/[a-z]/i) ){
				// part of math const|func
				if( prevChar.match(/[a-z]/i) ) {
					tokens.push(tokens.pop() + char);
					continue;
				}
			}

			tokens.push( negaPrefix + char );
			negaPrefix = '';
		}

		return this.prepareTokens( tokens );
	}

	prepareExp(exp){
		exp = exp.replace(/\s/g, '');
		exp = exp.split('.').join('.');

		let opsStr = '\\' + Object.keys(mathematics.operators).join('\\');

		if( exp.match(new RegExp('[^\.\(\)' + opsStr + 'a-z0-9]', 'i')) )
			throw 'Invalid expression: ' + exp;

		return exp;
	}

	prepareTokens(tokens){
		tokens.forEach((token) => {
			if( token.match(/[a-z]+/i) ){
				if( !mathematics.isMathConst(token) && !mathematics.isMathFunc(token) )
					throw 'Math const|func not found: ' + token;
			}
		});

		return tokens.join(' ');
	}

}

module.exports = new Lexer();