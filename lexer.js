'use strict';

const mathematics = require('./mathematics');

class Lexer {

	tokenize(exp){
		let tokens = [];
		let prevChar = '';
		let char = '';
		let negaPrefix = '';

		let negaTimes = 0;

		for( let x = 0; x < exp.length; x++ ){
			prevChar = char;
			char = exp.charAt(x);

			if( mathematics.isOperator(char) ){
				// signDetected
				if( char === '-' && ( x === 0 || mathematics.isOperator(prevChar) || prevChar === '(' || prevChar === ',' ) ) {
					negaPrefix = char;

					if( mathematics.isOperator(prevChar) )
						negaTimes++;

					if( negaTimes > 1 ) {
						tokens.push('(');
						tokens.push('-');
					}

					continue;
				}

				if( negaTimes > 1 ){
					for( let i = 0; i < negaTimes; i++ )
						tokens.push(')');
				}

				negaTimes = 0;
			}
			else if( mathematics.isNumber(char) || char === '.' ){
				// part of number
				if( mathematics.isNumber(prevChar) || prevChar === '.' ) {
					if( negaTimes > 1 && negaPrefix.length !== 0 )
						tokens.push('(');

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
			else if( char === '(' && negaPrefix.length > 0 ){
				tokens.push('-');
				negaPrefix = '';
			}

			if( negaTimes > 1 )
				tokens.push('(');

			tokens.push( negaPrefix + char );
			negaPrefix = '';

			// if it's last iteration and signs parens not closed
			if( negaTimes > 1 && (x + 1) === exp.length ){
				for( let i = 0; i < negaTimes; i++ )
					tokens.push(')');

				negaTimes = 0;
			}
		}

		return tokens.join(' ');
	}
}

module.exports = new Lexer();