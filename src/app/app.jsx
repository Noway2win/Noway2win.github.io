import React from 'react';
import Game from './components/ticTacToeGame/gameComponent';
import Timer from './components/timer/timer';

export default function App(props) {
	return (
		<div>
			<Game />
			<Timer id="timer-1" format="toHrs" />
			<Timer id="timer-2" format="toMin" />
			<Timer id="timer-3" format="toSec" />
			<Timer id="timer-1" format="toErr" />
		</div>
	);
}
