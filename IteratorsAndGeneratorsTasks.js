//TASK 1//
let message = 'simple string';
let messageIterator = message[Symbol.iterator]();
console.log(messageIterator);
messageIterator.next();
for (let item of messageIterator) {
	console.log(item);
}

//Task 2//

let getCountdownIterator = function* countdownIterator() {
	for (let i = 9; i >= 1; i--) {
		yield i;
	}
};
console.log([...getCountdownIterator()]);

//Task 3//

let todoList = {
	todoItems: [],
	addItem(description) {
		this.todoItems.push({ description, done: false });
		return this;
	},
	crossOutItem(index) {
		if (index < this.todoItems.length) {
			this.todoItems[index].done = true;
		}
		return this;
	}
};

todoList.addItem('task 1').addItem('task 2').addItem('task 3').crossOutItem(0);

let iterableTodoList = Object.assign({
	*[Symbol.iterator]() {
		for (let value = 0; value <= this.todoItems.length - 1; value++) {
			yield this.todoItems[value];
		}
	}
}, todoList);

for (let item of iterableTodoList) {
	console.log(item);
}

//Task 4//

//Task 5//

function* fibGenerator() {
	let smallerNumber = 1, biggerNumber = 1, showingNumber = 1;
	yield 0;
	yield 1;
	while (true) {
		showingNumber = biggerNumber;

		yield showingNumber;

		biggerNumber += smallerNumber;
		smallerNumber = showingNumber;
	}
}

let infiniteSequence = fibGenerator();

//Task 6//

function filterEvens(value) {
	if (value % 2 != 0) {
		return false;
	}
	return true;
}

function* filter(iterable, filterFunction) {
	while (true) {
		let testValue = iterable.next().value;
		if (filterFunction(testValue)) {
			yield testValue;
		}
	}
}

let fibTest = filter(infiniteSequence, filterEvens);

//Task 7//

function sequence(start = 0, step = 1) {
	let numbertoShow = start;
	function* generator() {
		while (true) {
			yield numbertoShow;
			numbertoShow += step;
		}
	}
	let genForReturn = generator();
	return function () {
		return genForReturn.next().value;
	};
}

var generator = sequence(10, 3);
var generator2 = sequence(7, 1);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8