'use strict';

class mathematics {
	constructor(){
		this.operators = {
			'+': (a, b) => +a + +b,
			'-': (a, b) => a - b,
			'/': (a, b) => a / b,
			'*': (a, b) => a * b,
			'%': (a, b) => a % b
		};

		this.priorities = {
			'+': 1,
			'-': 1,
			'/': 2,
			'*': 2,
			'%': 3
		};
	}

	getPriority(operator){
		if( !this.priorities.hasOwnProperty(operator) )
			throw 'Undefined operator: ' + operator;

		return this.priorities[operator];
	}

	isOperator(token) {
		return this.operators.hasOwnProperty(token);
	}

	isNumber(num) {
		return !isNaN(num);
	}

	isMathConst(token) {
		return Math.hasOwnProperty(token) && this.isNumber(Math[token])
	}

	isMathFunc(token){
		return Math.hasOwnProperty(token) && !this.isNumber(Math[token])
	}
}

module.exports = new mathematics();