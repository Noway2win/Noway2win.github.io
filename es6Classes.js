// Exercise 4.1 CLASSES //

// var Person = function(name) {
//     this.name = name;
//     this.canTalk = true;
//     this.greet = function() {
//         if (this.canTalk) {
//             console.log('Hello, I ' + this.name);
//         }
//     };
// };

// var Employee = function(name, title) {
//     this.name = name;
//     this.title = title;
//     this.greet = function() {
//         if (this.canTalk) {
//             console.log('Hello, I ' + this.name + ', ' + this.title);
//         }
//     };
// };
// Employee.prototype = new Person();

// var Customer = function(name) {
//     this.name = name;
// };
// Customer.prototype = new Person();

// var Mime = function(name) {
//     this.name = name;
//     this.canTalk = false;
// };
// Mime.prototype = new Person();

class Person {
	constructor(name) {
		this.name = name;
		this.canTalk = true;
	}
	greet() {
		if (this.canTalk == true) {
			console.log('Hello, I ' + this.name);
		}
	}
}

class Employee extends Person {
	constructor(name, title) {
		super(name);
		this.title = title;
	}
	greet() {
		if (this.canTalk == true) {
			console.log('Hello, I ' + this.name + ', ' + this.title);
		}
	}
}

class Customer extends Person {
	constructor(name) {
		super(name);
	}
}

class Mime extends Person {
	constructor(name) {
		super(name);
		this.canTalk = false;
	}
}

const newCustomer = new Customer('Dzmitry');
const newEmployee = new Employee('Sergey', 'Manager');
const newMime = new Mime('Anton');
// console.log(newCustomer);
// console.log(newEmployee);
// console.log(newMime);

// Exercise 4.2 CALCULATOR//

class Calculator {
	#history;
	constructor() {
		this.#history = [];
	}
	#addingToHistory(val) {
		if (this.#history.length >= 10) {
			this.#history = this.#history.slice(1);
			this.#history.push(val);
		}
		else {
			this.#history.push(val);
		}
	}
	add(a, b) {
		let result = a + b;
		this.#addingToHistory(result);
		return result;
	}
	substract(a, b) {
		let result = a - b;
		this.#addingToHistory(result);
		return result;
	}
	multiply(a, b) {
		let result = a * b;
		this.#addingToHistory(result);
		return result;
	}
	divide(a, b) {
		let result = a / b;
		this.#addingToHistory(result);
		return result;
	}
	cancel() {
		this.#history.pop();
		return this.#history[this.#history.length - 1];
	}
	get AllResults() {
		if (this.#history.length == 0) {
			return 'No results yet';
		}
		return this.#history.toString();
	}
}

let calc = new Calculator();
calc.add(2, 3);
calc.multiply(2, 3);
calc.substract(10, 5);
calc.divide(14, 7);
calc.add(2, 8);
calc.add(2, 4);
calc.add(2, 3);
calc.add(2, 2);
calc.add(2, 1);
calc.add(2, 66);
calc.add(2, 0);
calc.add(2, 3);
calc.add(1, 7);
calc.cancel();
calc.cancel();
calc.cancel();
console.log(calc.AllResults);