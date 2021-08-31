import React from 'react';
import StepsList from './listOfMovesComponent';
import Board from './boardComponent';
import calculateWinner from '../../../services/calculateWinner';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
				},
			],
			stepNumber: 0,
			xIsNext: true,
			isAscendingOrder: true,
		};
		this.jumpTo = this.jumpTo.bind(this);
	}

	handleClick(i) {
		const { history, stepNumber, xIsNext } = this.state;
		history.slice(0, stepNumber + 1);

		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = xIsNext ? 'X' : 'O';

		this.setState({
			history: history.concat([
				{
					squares,
					prevCheckedSquare: i,
				},
			]),
			stepNumber: history.length,
			xIsNext: !xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
	}

	orderChangeHandler() {
		const { isAscendingOrder } = this.state;
		this.setState({
			isAscendingOrder: !isAscendingOrder,
		});
	}

	render() {
		const { history, stepNumber, isAscendingOrder, xIsNext } = this.state;
		const current = history[stepNumber];
		const winnerInfo = calculateWinner(current.squares);
		let status;

		if (winnerInfo) {
			status = winnerInfo.winnerText;
		} else {
			status = `Next player:${xIsNext ? 'X' : 'O'}`;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winLine={winnerInfo ? winnerInfo.winningLine : null}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<button type="button" onClick={() => this.orderChangeHandler()}>
						Change Order
					</button>
					<StepsList
						history={history}
						jumpTo={this.jumpTo}
						stepNumber={stepNumber}
						order={isAscendingOrder}
					/>
				</div>
			</div>
		);
	}
}
