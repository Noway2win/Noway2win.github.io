import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/header';
import Game from './components/ticTacToeGame/gameComponent';
import Timer from './components/timer/timer';
import RoundProgressBar from './components/progressBar/progressBar';
import SearchForm from './components/searchInput/searchForm';
import ReduxTagram from './reduxtagramApp/reduxtagramMain';

export default function App(props) {
	const SearchInputModes = {
		Immediate: 'Immediate',
		OnEnterClick: 'onEnterClick',
		OnStopTyping: 'onStopTyping',
	};
	return (
		<Router>
			<div>
				<Header />
				<Route path="/TicTacGame" component={Game} />
				<Route
					path="/HoursTimer"
					render={() => <Timer id="timer-1" format="toHrs" />}
				/>
				<Route
					path="/MinutesTimer"
					render={() => <Timer id="timer-2" format="toMin" />}
				/>
				<Route
					path="/SecondsTimer"
					render={() => <Timer id="timer-3" format="toSec" />}
				/>
				<Route
					path="/DefaultTimer"
					render={() => <Timer id="timer-1" format="toErr" />}
				/>
				<Route path="/RoundProgress" component={RoundProgressBar} />
				<Route
					path="/SearchInputOnEnter"
					render={() => <SearchForm mode={SearchInputModes.OnEnterClick} />}
				/>
				<Route
					path="/SearchInputImmediate"
					render={() => <SearchForm mode={SearchInputModes.Immediate} />}
				/>
				<Route
					path="/SearchInputOnStopTyping"
					render={() => <SearchForm mode={SearchInputModes.OnStopTyping} />}
				/>
				<ReduxTagram />
			</div>
		</Router>
	);
}
