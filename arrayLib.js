var arrayLib = {
	take: function (array, n) {
		if (!this._arrayCheck(array) || !this._lengthCheck(array, n)) {
			console.log('error');
			return;
		}
		var newArr = [];
		for (var i = 0; i < n; i++) {
			newArr.push(array[i]);
		}
		return newArr;
	},
	skip: function (array, n) {
		if (!this._arrayCheck(array) || !this._lengthCheck(array, n)) {
			console.log('error');
			return;
		}
		var newArr = [];
		for (var i = n; i < array.length; i++) {
			newArr.push(array[i]);
		}
		return newArr;
	},
	map: function (array, callback) {
		if (!this._arrayCheck(array) || !this._functionCheck(callback)) {
			console.log('error');
			return;
		}
		var newArr = [];
		for (var i = 0; i < array.length; i++) {
			newArr.push(callback(array[i]));
		}
		return newArr;
	},
	reduce: function (array, callback, initialValue) {
		if (!this._arrayCheck(array) || !this._functionCheck(callback)) {
			console.log('error');
			return;
		}
		initialValue = initialValue || 0;
		for (var i = 0; i < array.length; i++) {
			initialValue = callback(initialValue, array[i]);
		}
		return initialValue;
	},
	filter: function (array, callback) {
		if (!this._arrayCheck(array) || !this._functionCheck(callback)) {
			console.log('error');
			return;
		}
		var newArr = [];
		for (var i = 0; i < array.length; i++) {
			if (callback(array[i])) {
				newArr.push(array[i]);
			}
		}
		return newArr;
	},
	forEach: function (array, callback) {
		if (!this._arrayCheck(array) || !this._functionCheck(callback)) {
			console.log('error');
			return;
		}
		for (var i = 0; i < array.length; i++) {
			callback(array[i]);
		}
	},
	_arrayCheck: function (array) {
		if (array.constructor != Array) {
			return false;
		}
		return true;
	},
	_lengthCheck: function (array, n) {
		if (array.length != undefined && n > array.length) {
			return false;
		}
		return true;
	},
	_functionCheck: function (func) {
		if (func.constructor != Function) {
			return false;
		}
		return true;
	}
};


console.log(arrayLib.take([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.skip([1, 2, 3, 4, 5, 6], 5));

console.log(arrayLib.map([1, 2, 3, 4, 5, 6], a => a * 2));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], (a, b) => a + b, 5));

console.log(arrayLib.reduce([1, 2, 3, 4, 5, 6], 55));

console.log(arrayLib.filter([1, 2, 3, 4, 5, 6], a => a > 3));

console.log(arrayLib.forEach([1, 2, 3, 4, 5, 6], a => { console.log(a); }));
