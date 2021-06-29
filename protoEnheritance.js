function Figure() {
	this.position = 'static';
	this.color = 'black';
	this.borderColor = 'transparent';
	this.borderRadius = 0;
}

Figure.prototype = Object.create({}, {
	setPosition: function (pos) {
		this.position = pos;
	},
	setColor: {
		value: function (color) {
			this.color = color;
		}
	},
	setBorder: {
		value: function (borderSize, borderColor) {
			this.borderColor = borderColor;
			this.borderSize = borderSize;
		}
	}
});

function Rectangle() {
	Figure.call(this);
	this.height = 0;
	this.width = 0;
}

Rectangle.prototype = Object.create(Figure.prototype, {
	setSize: {
		value: function (height, width) {
			this.height = height;
			this.width = width;
		}
	}
});
Rectangle.prototype.constructor = Rectangle;

function Square() {
	Rectangle.call(this);
	this.height = 0;
	this.width = 0;
}

Square.prototype = Object.create(Figure.prototype, {
	setSize: {
		value: function (size) {
			this.height = size;
			this.width = size;
		}
	}
});
Square.prototype.constructor = Square;

function Circle() {
	Figure.call(this);
	this.radius = 0;
}

Circle.prototype = Object.create(Figure.prototype, {
	setSize: {
		value: function (radius) {
			this.radius = radius;
		}
	}
});
Circle.prototype.constructor = Circle;

var myRectangle = new Rectangle();

var mySquare = new Square();

var myCircle = new Circle();

console.dir(mySquare);