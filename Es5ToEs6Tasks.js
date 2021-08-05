//Exercise 1//
// function greetings (name) {
//     return 'hello ' + name;
// }

let Es6Greeting = name => `hello ${name}`;

//Exercise 2//

//Part 1//
// var obj1 = { a: 1, b: 2 };
// var obj2 = { a: 2, c: 3, d: 4};
// var obj3 = Object.assign(obj1, obj2);

const es6Obj1 = { a: 1, b: 2 },
	es6Obj2 = { a: 2, c: 3, d: 4 };
const es6Obj3 = { ...es6Obj1, ...es6Obj2 };

//Part 2//
// var obj21 = { a: 1, b: 2, c: 3, d: 4 };
// var a = obj21.a;
// var b = obj21.b;
// var c = obj21.c;
// var d = obj21.d;

const es6Obj21 = { a: 1, b: 2, c: 3, d: 4 };
let { a, b, c, d } = { ...es6Obj21 };
console.log(a, b, c, d);

//Part 3//
// var a = 1
// var b = 2
// var c = 3
// var d = 4
// var obj1 = { a: a, b: b, c: c, d: d }

{
	let a = 1, b = 2, c = 3, d = 4;
	const obj = { a, b, c, d };
}

//Exercise 3//

// function isGreater(a, b, cb) {
// 	var greater = false;
// 	if (a > b) {
// 		greater = true;
// 	}
// 	cb(greater);
// }

// isGreater(1, 2, function (result) {
// 	if (result) {
// 		console.log('greater');
// 	} else {
// 		console.log('smaller');
// 	}
// });

function promiseIsGreater(a, b) {
	return new Promise((resolve, reject) => {
		if (a > b) {
			resolve('greater');
		} else {
			reject('smaller');
		}
	});
}
const isGreaterEs6 = promiseIsGreater(2, 4).then(text => (console.log(`resolved: ${text}`)),
	text => (console.log(`rejected: ${text}`)));



