import React from 'react';

export default function Square(props) {
	const { onClick, value, isHightlighted } = props;
	const className = isHightlighted ? 'square winning-hightlight' : 'square';
	return (
		<button type="button" className={className} onClick={onClick}>
			{value}
		</button>
	);
}
