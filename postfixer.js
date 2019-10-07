'use strict';

const mathematics = require('./mathematics');

class postfixer {

	convert(string){
		let postfix = [];
		let opStack = [];
		let tokens  = string.split(' ');

		tokens.forEach((token) => {
			if( mathematics.isNumber(token) || mathematics.isMathConst(token) ){
				postfix.push(token)
			}
			else if( token === '(' ){
				opStack.push(token);
			}
			else if( token === ')' ){
				let topToken = opStack.pop();
				while( topToken !== '(' ){
					postfix.push(topToken);
					topToken = opStack.pop();
				}
			}
			else if( token === ',' ){
				if( opStack.length > 0 && opStack[opStack.length - 1] !== '('  )
					postfix.push(opStack.pop());

				return;
			}
			else {
				while (
					opStack.length > 0
					&&
					mathematics.getPriority(opStack[opStack.length - 1]) >= mathematics.getPriority(token)
					) {
					postfix.push(opStack.pop());
				}

				opStack.push(token);
			}
		});

		while( opStack.length > 0 )
			postfix.push(opStack.pop());

		return postfix.join(' ');
	}

}



module.exports = new postfixer();