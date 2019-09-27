'use strict';

class Calculator {
	constructor() {
		this.ops = [];
		this.nums = [];

		this.methods = {
			'+': (a, b) => +a + +b,
			'-': (a, b) => a - b,
			'/': (a, b) => a / b,
			'*': (a, b) => a * b
		};

		this.priorities = {
			'+': 5,
			'-': 5,
			'/': 10,
			'*': 10
		};
	}

	addMethod(name, action, priority){
		priority = priority || 5;

		this.methods[name] = action;

		this.priorities[name] = priority;
	}

	opTop(){
		return this.ops[this.ops.length - 1];
	}

	operate(){
		let popB = this.nums.pop();
		let popA = this.nums.pop();

		this.nums.push( this.methods[this.ops.pop()](popA, popB) );
	}

	matchString(str){
		let opsString = '\\' + Object.keys(this.methods).join('\\');

		let matcher = new RegExp('([\\-\\+]{1})?[0-9]{1,9}(\\.[0-9]{1,9})?|[\\(\\)' + opsString + ']', 'g');
		let matches;

		// prevent incorrect decimal
		str = str.split(',').join('.');

		// remove unused characters
		str = str.replace( new RegExp('[^0-9\\(\\)\\.' + opsString + ']', 'g'), '' );

		// set a positive sign because matching is not exact
		str = str.replace(/([0-9])([\\+\\-])([0-9])/g, '$1$2+$3')
				.replace(/([0-9])([\\+\\-])([0-9])/g, '$1$2+$3');

		matches = str.match(matcher);

		if( !matches )
			return [0];

		return matches;
	}

	calculate(input){
		let result;
		let matches = this.matchString(input);

		if( typeof matches === 'string' )
			return matches;

		this.ops = [];
		this.nums = [];

		matches.forEach((curr) => {
			if( curr === '(' )
				this.ops.push('(');
			else if( this.methods[curr] !== undefined ){
				if( this.ops.length !== 0 && ( this.priorities[this.opTop()] > this.priorities[curr] ) )
					this.operate();

				// left to right order for equal priorities
				while( this.priorities[this.opTop()] === this.priorities[curr] )
					this.operate();

				this.ops.push(curr);
			}
			else if( curr === ')' ){
				while(true){
					if( this.opTop() === '(' ) {
						this.ops.pop();
						break;
					}

					this.operate();
				}
			}
			else {
				this.nums.push(curr);
			}
		});

		while(this.nums.length > 1)
			this.operate();

		result = this.nums[0];

		if( result % 1 !== 0 )
			result = Number(result.toFixed(3));

		return result;
	}
}

module.exports = new Calculator();