'use strict';

class mathematics {
	constructor(){
		this.operators = {
			'+': (a, b) => +a + +b,
			'-': (a, b) => a - b,
			'/': (a, b) => a / b,
			'*': (a, b) => a * b,
			'^': (a, b) => a ** b,
			'%': (a, b) => a % b
		};

		this.unaryOperators = {
			'--': (a) => a * -1
		};

		this.priorities = {
			'+': 5,
			'-': 5,
			'/': 10,
			'*': 10,
			'^': 10,
			'%': 15
		};
	}

	operation(op, a, b){
		if( this.operators.hasOwnProperty(op) )
			return this.operators[op](a, b);
		else if( this.unaryOperators.hasOwnProperty(op) )
			return this.unaryOperators[op](a);

		throw 'Undefined operator: ' + op;
	}

	getPriority(operator){
		if( this.isMathFunc(operator) )
			return 20;

		if( !this.priorities.hasOwnProperty(operator) )
			return 0;

		return this.priorities[operator];
	}

	isOperator(token) {
		return this.operators.hasOwnProperty(token);
	}

	isUnaryOperator(token){
		return this.unaryOperators.hasOwnProperty(token);
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