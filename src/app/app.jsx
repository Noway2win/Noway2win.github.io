import React from 'react';
import Game from './components/ticTacToeGame/gameComponent';
import Timer from './components/timer/timer';
import RoundProgressBar from './components/progressBar/progressBar';
import SearchForm from './components/searchInput/searchForm';

export default function App(props) {
	const SearchInputModes = {
		Immediate: 'Immediate',
		OnEnterClick: 'onEnterClick',
		OnStopTyping: 'onStopTyping',
	};
	return (
		<>
			<Game />
			<Timer id="timer-1" format="toHrs" />
			<Timer id="timer-2" format="toMin" />
			<Timer id="timer-3" format="toSec" />
			<Timer id="timer-1" format="toErr" />
			<RoundProgressBar />
			<SearchForm mode={SearchInputModes.OnEnterClick} />
		</>
	);
}
