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
			'+': 5,
			'-': 5,
			'/': 10,
			'*': 10,
			'%': 15
		};
	}

	operation(op, a, b){
		if( !this.operators.hasOwnProperty(op) )
			throw 'Undefined operator: ' + op;

		return this.operators[op](a, b);
	}

	getPriority(operator){
		if( operator.match(/[\(\)]/) )
			return 1;

		if( !this.priorities.hasOwnProperty(operator) )
			throw 'Undefined operator: ' + operator;

		return this.priorities[operator];
	}

	isOperator(token) {
		return this.operators.hasOwnProperty(token);
	}

	isNumber(num) {
		if( num.length === 0 )
			return false;

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