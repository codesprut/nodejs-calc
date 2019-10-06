'use strict';

const mathematics = require('./mathematics');

class Lexer {

	clearString(input){
		input = input.replace(/\s/g, '');
		input = input.split('.').join('.');

		return input;
	}

	tokenize(input){
		let tokens = [];
		let token = '';
		let prevChar = '';
		let char = '';

		let modLast = false;

		input = this.clearString(input);

		for( let x = 0; x < input.length; x++ ){
			prevChar = char;
			char = input.charAt(x);

			if( modLast ){
				token += tokens.pop();
				modLast = false;
			}

			token += char;

			if( mathematics.isOperator(char) ){

				// signDetected
				if( x === 0 || mathematics.isOperator(prevChar) || prevChar === '(' ) {
					modLast = true;
					continue;
				}
			}
			else if( mathematics.isNumber(char) ){

				// part of number
				if( mathematics.isNumber(prevChar) ) {
					modLast = true;
					continue;
				}
			}

			tokens.push(token);
			token = '';
		}

		if( token.length !== 0 )
			tokens.push( tokens.pop() + token );

		return tokens.join(' ');
	}
}

module.exports = new Lexer();