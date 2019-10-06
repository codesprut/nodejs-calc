'use strict';

const mathematics = require('./mathematics');

class Lexer {

	clearString(str){
		str = str.replace(/\s/g, '');
		str = str.split('.').join('.');

		return str;
	}

	tokenize(exp){
		let tokens = [];
		let prevChar = '';
		let char = '';
		let negaPrefix = '';

		let clearedStr = this.clearString(exp);

		for( let x = 0; x < clearedStr.length; x++ ){
			prevChar = char;
			char = clearedStr.charAt(x);

			if( mathematics.isOperator(char) ){

				// signDetected
				if( char === '-' && ( x === 0 || mathematics.isOperator(prevChar) || prevChar === '(' ) ) {
					negaPrefix = char;
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

		return tokens.join(' ');
	}
}

module.exports = new Lexer();