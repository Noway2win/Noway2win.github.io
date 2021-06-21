var arrayLib = (function () {


	function chain(array) {

		if (!arrayCheck(array)) {
			return;
		}

		this.array = array;
		return this;
	}


	function takeNArrayVal() {
		var array, n;

		if (arguments.length == 1) {
			array = this.array;
			n = arguments[0];
		}

		if (arguments.length == 2) {
			array = arguments[0];
			n = arguments[1];
		}

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];
		for (var i = 0; i < n; i++) {
			newArr.push(array[i]);
		}
		this.array = newArr;

		return (arguments.length == 1) ? this : newArr;
	}


	function skipNArrayVal() {
		var array, n;

		if (arguments.length == 1) {
			array = this.array;
			n = arguments[0];
		}

		if (arguments.length == 2) {
			array = arguments[0];
			n = arguments[1];
		}

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];

		for (var i = n; i < array.length; i++) {
			newArr.push(array[i]);
		}

		this.array = newArr;

		return (arguments.length == 1) ? this : newArr;
	}


	function mapArray() {
		var array, callback;

		if (arguments.length == 1) {
			array = this.array;
			callback = arguments[0];
		}

		if (arguments.length == 2) {
			array = arguments[0];
			callback = arguments[1];
		}

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		var newArr = [];

		for (var i = 0; i < array.length; i++) {
			var newValue = callback(array[i]);
			newArr.push(newValue);
		}

		this.array = newArr;

		return (arguments.length == 1) ? this : newArr;
	}


	function reduceArray() {
		var array, callback, initialValue;

		switch (arguments.length) {
			case 1: array = this.array;
				callback = arguments[0];
				initialValue = 0;
				break;
			case 2: array = arguments[0];
				callback = arguments[1];
				initialValue = 0;
				break;
			case 3: array = arguments[0];
				callback = arguments[1];
				initialValue = arguments[2];
				break;
		}

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		for (var i = 0; i < array.length; i++) {
			initialValue = callback(initialValue, array[i]);
		}

		return initialValue;
	}


	function filterArray() {
		var array, callback;

		if (arguments.length == 1) {
			array = this.array;
			callback = arguments[0];
		}

		if (arguments.length == 2) {
			array = arguments[0];
			callback = arguments[1];
		}

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}
		var newArr = [];

		for (var i = 0; i < array.length; i++) {
			if (callback(array[i])) {
				newArr.push(array[i]);
			}
		}

		this.array = newArr;

		return (arguments.length == 1) ? this : newArr;
	}


	function arrayForEach() {
		var array, callback;

		if (arguments.length == 1) {
			array = this.array;
			callback = arguments[0];
		}

		if (arguments.length == 2) {
			array = arguments[0];
			callback = arguments[1];
		}

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		for (var i = 0; i < array.length; i++) {
			callback(array[i]);
		}

		return (arguments.length == 1) ? this : null;
	}


	function value() {
		return this.array || [];
	}


	function arrayCheck(array) {
		if (array.constructor != Array || array.length == 0) {
			return false;
		}
		return true;
	}

	function lengthCheck(array, n) {
		if (array.length != undefined && n > array.length) {
			return false;
		}
		return true;
	}

	function functionCheck(func) {
		if (func.constructor != Function) {
			return false;
		}
		return true;
	}

	return {
		chain: chain,
		take: takeNArrayVal,
		skip: skipNArrayVal,
		map: mapArray,
		reduce: reduceArray,
		filter: filterArray,
		forEach: arrayForEach,
		value: value
	};
})();



console.log(arrayLib.take([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).forEach(a => { console.log(a); }));

console.log(arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).value());

console.log(arrayLib.skip([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.map([1, 2, 3, 4, 5, 6], a => a * 2));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b, 5));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], 55));

console.log(arrayLib.filter([1, 2, 3, 4, 5, 6], a => a > 3));

console.log(arrayLib.forEach([1, 2, 3, 4, 5, 6], a => { console.log(a); }));

var test = arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).value();

console.log(test);

var test2 = new arrayLib.value();

console.log(test2);
