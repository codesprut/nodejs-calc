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
		let prevChar = '';
		let char = '';
		let negaPrefix = '';

		input = this.clearString(input);

		for( let x = 0; x < input.length; x++ ){
			prevChar = char;
			char = input.charAt(x);

			if( mathematics.isOperator(char) ){

				// signDetected
				if( x === 0 || mathematics.isOperator(prevChar) || prevChar === '(' ) {
					negaPrefix = '-';
					continue;
				}
			}
			else if( mathematics.isNumber(char) || char === '.' ){
				// part of number
				if( mathematics.isNumber(prevChar) || prevChar === '.' ) {
					tokens.push( negaPrefix + tokens.pop() + char );
					negaPrefix = '';
					continue;
				}
			}

			tokens.push( negaPrefix + char );
			negaPrefix = '';
		}

		return tokens.join(' ');
	}
}

module.exports = new Lexer();