function arrayLib() {

	var passedArray;

	var returnedObg = this || {};

	returnedObg.chain = function (array) {

		if (!arrayCheck(array)) {
			return;
		}


		passedArray = array;
		return returnedObg;
	};

	returnedObg.take = function () {

		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			n = valuesObject.serviceVar;

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];
		for (var i = 0; i < n; i++) {
			newArr.push(array[i]);
		}
		passedArray = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};

	returnedObg.skip = function () {

		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			n = valuesObject.serviceVar;

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];

		for (var i = n; i < array.length; i++) {
			newArr.push(array[i]);
		}

		passedArray = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};

	returnedObg.map = function () {

		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			callback = valuesObject.serviceVar;

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		var newArr = [];

		for (var i = 0; i < array.length; i++) {
			var newValue = callback(array[i]);
			newArr.push(newValue);
		}

		passedArray = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};

	returnedObg.reduce = function () {
		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			callback = valuesObject.serviceVar,
			initialValue = valuesObject.additionalValue || 0;

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		for (var i = 0; i < array.length; i++) {
			initialValue = callback(initialValue, array[i]);
		}

		return initialValue;
	};

	returnedObg.filter = function () {

		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			callback = valuesObject.serviceVar;

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

		passedArray = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};


	returnedObg.forEach = function () {

		var valuesObject = argumentsCheck(arguments);
		var array = valuesObject.array,
			callback = valuesObject.serviceVar;

		if (!arrayCheck(array) || !functionCheck(callback)) {
			console.log('error');
			return;
		}

		for (var i = 0; i < array.length; i++) {
			callback(array[i]);
		}

		return (arguments.length == 1) ? returnedObg : null;
	};

	returnedObg.value =
		function () {
			return passedArray || [];
		};

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

	function argumentsCheck(args) {

		var array, serviceVar, additionalValue;

		switch (args.length) {
			case 1: serviceVar = args[0];
				array = passedArray;
				break;
			case 2:
				array = args[0];
				serviceVar = args[1];
				break;
			case 3: array = args[0];
				serviceVar = args[1];
				additionalValue = args[2];
				break;
			default: array = [];
				serviceVar = 0;
				additionalValue = 0;
				break;
		}


		return {
			array: array,
			serviceVar: serviceVar,
			additionalValue: additionalValue
		};

	}

	return returnedObg;
}

var lib = new arrayLib();
console.log(lib.chain([5, 3, 7]).value());

console.log(lib.take([1, 2, 3, 4, 5, 6], 5));

console.log(lib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).forEach(a => { console.log(a); }));

console.log(lib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).value());

console.log(lib.skip([1, 2, 3, 4, 5, 6], 5));

console.log(lib.map([1, 2, 3, 4, 5, 6], a => a * 2));

console.log(lib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).reduce((a, b) => a + b));

console.log(lib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b));

console.log(lib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b, 5));

console.log(lib.reduce([1, 2, 3, 4, 5, 6], 55));

console.log(lib.filter([1, 2, 3, 4, 5, 6], a => a > 3));

console.log(lib.forEach([1, 2, 3, 4, 5, 6], a => { console.log(a); }));

var anotherLib = new arrayLib();

console.log(anotherLib.chain([1, 2, 3, 4, 5]).value());

var returnFromThirdLib = new arrayLib().chain([1, 2, 3, 4, 5, 6]).value();

console.log(returnFromThirdLib);