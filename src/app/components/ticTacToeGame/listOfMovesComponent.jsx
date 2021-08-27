import React from 'react';

export default function StepsList(props) {
	const { history, jumpTo, stepNumber, order } = props;

	let moves = history.map((step, move) => {
		const { prevCheckedSquare } = step;
		const col = (prevCheckedSquare % 3) + 1;
		const row = Math.floor(prevCheckedSquare / 3) + 1;
		const desc = move
			? `Go to move # ${move} which is Col:${col} Row: ${row}`
			: 'Go to game start';

		return (
			<li key={move}>
				<button
					type="button"
					className={move === stepNumber ? 'bolded' : ''}
					onClick={() => jumpTo(move)}
				>
					{desc}
				</button>
			</li>
		);
	});

	if (!order) {
		moves = moves.reverse();
	}

	return <ol>{moves}</ol>;
}
