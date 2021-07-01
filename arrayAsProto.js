function MyArray() {
	var array = Array.apply(this, arguments);
	for (var num in array) {
		this[num] = array[num];
		this.length += 1;
	}
}

MyArray.prototype = Object.create(Array.prototype, {
	increaseByTwo: {
		value: function () {
			for (var val = 0; val < this.length; val++) {
				var newValue = this[val];
				newValue *= 2;
				this[val] = newValue;
			}
		}
	}
});

var array = new MyArray(1, 2, 3);

var secondArray = new MyArray('a', 'b', 'c', 5);

secondArray.push(5);

var mapAndChainingCheck = array.map(a => a * 2).filter(a => a > 2);

console.dir(array);
console.dir(secondArray);
console.log(mapAndChainingCheck);
console.log(array.indexOf(2));


