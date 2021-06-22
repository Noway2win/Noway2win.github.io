var arrayLib = (function () {

	var returnedObg = this || {};

	returnedObg.chain = function (array) {

		if (!arrayCheck(array)) {
			return;
		}

		this.array = array;

		returnedObg.array = this.array;
		return returnedObg;
	};

	returnedObg.take = function () {
		var array, n;

		var valuesObject = argumentsCheck(arguments);
		array = valuesObject.array;
		n = valuesObject.serviceVar;

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];
		for (var i = 0; i < n; i++) {
			newArr.push(array[i]);
		}
		returnedObg.array = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};

	returnedObg.skip = function () {
		var array, n;

		var valuesObject = argumentsCheck(arguments);
		array = valuesObject.array;
		n = valuesObject.serviceVar;

		if (!arrayCheck(array) || !lengthCheck(array, n)) {
			console.log('error');
			return;
		}

		var newArr = [];

		for (var i = n; i < array.length; i++) {
			newArr.push(array[i]);
		}

		returnedObg.array = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};

	returnedObg.map = function () {
		var array, callback;

		var valuesObject = argumentsCheck(arguments);
		array = valuesObject.array;
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

		returnedObg.array = newArr;

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
		var array, callback;

		var valuesObject = argumentsCheck(arguments);
		array = valuesObject.array;
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

		returnedObg.array = newArr;

		return (arguments.length == 1) ? returnedObg : newArr;
	};


	returnedObg.forEach = function () {
		var array, callback;

		var valuesObject = argumentsCheck(arguments);
		array = valuesObject.array;
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
			return this.array || [];
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
				array = returnedObg.array;
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
})();


console.log(arrayLib.take([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).forEach(a => { console.log(a); }));

console.log(arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).value());

console.log(arrayLib.skip([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.map([1, 2, 3, 4, 5, 6], a => a * 2));

console.log(arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).reduce((a, b) => a + b));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b, 5));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], 55));

console.log(arrayLib.filter([1, 2, 3, 4, 5, 6], a => a > 3));

console.log(arrayLib.forEach([1, 2, 3, 4, 5, 6], a => { console.log(a); }));

var test = arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).map(a => a * 2).filter(a => a > 3).value();

console.log(test);

var test2 = new arrayLib.value();

console.log(test2);

var test3 = new arrayLib.chain([1, 2, 3, 4, 5, 6]).take(5).skip(1).value();

console.log(test3);