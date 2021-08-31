import React from 'react';
import Square from './squareComponent';

export default class Board extends React.Component {
	renderBoard() {
		const board = [];
		for (let i = 0; i < 3; i += 1) {
			const row = [];
			for (let j = 0; j < 3; j += 1) {
				row.push(this.renderSquare(i * 3 + j));
			}
			board.push(
				<div key={i} className="board-row">
					{row}
				</div>
			);
		}
		return <div>{board}</div>;
	}

	renderSquare(i) {
		const { onClick, squares, winLine } = this.props;
		return (
			<Square
				key={i}
				value={squares[i]}
				onClick={() => onClick(i)}
				isHightlighted={winLine && winLine.includes(i)}
			/>
		);
	}

	render() {
		return this.renderBoard();
	}
}
