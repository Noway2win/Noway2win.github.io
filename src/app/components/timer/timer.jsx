import React from 'react';
import Clock from './clock';
import InputForm from './inputForm';

export default class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalSeconds: 0,
			secondsLeft: 0,
			timeLeft: {},
		};
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
		this.onFormInputChange = this.onFormInputChange.bind(this);
	}

	componentDidMount() {
		const { format } = this.props;
		const { secondsLeft } = this.state;
		const timeLeft = timeConvertToFormat(secondsLeft, format);
		this.setState({ timeLeft });
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	onFormInputChange(e) {
		const { timeLeft } = this.state;
		timeLeft[e.target.name] = e.target.value;
		const secondsLeft = timeConvertToSeconds(timeLeft);
		const totalSeconds = secondsLeft;
		this.setState({ timeLeft, secondsLeft, totalSeconds });
	}

	startTimer(e) {
		e.target.reset();
		const { secondsLeft } = this.state;
		if (this.timer === 0 && secondsLeft > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}

	countDown() {
		const { format } = this.props;
		const secondsLeft = this.state.secondsLeft - 1;
		this.setState({
			timeLeft: timeConvertToFormat(secondsLeft, format),
			secondsLeft,
		});

		if (secondsLeft === 0) {
			clearInterval(this.timer);
			this.timer = 0;
		}
	}

	render() {
		const { timeLeft, totalSeconds, secondsLeft } = this.state;
		const { id, format } = this.props;
		return (
			<div id={id} style={{ paddingTop: '15px' }}>
				<Clock
					time={timeLeft}
					format={format}
					strokeWidth="10"
					sqSize="200"
					percentage={timePercentsLeft(totalSeconds, secondsLeft)}
				/>
				<InputForm
					onFormInputChange={this.onFormInputChange}
					buttonClick={this.startTimer}
					format={format}
				/>
			</div>
		);
	}
}

function timePercentsLeft(totalTime, timeLeft) {
	const res = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
	return res;
}

function timeConvertToFormat(timeInSec, format = 'toHrs') {
	const obj = {};
	switch (format) {
		case 'toSec': {
			const objSec = {
				s: timeInSec,
			};
			Object.assign(obj, objSec);
			break;
		}
		case 'toMin': {
			const minutes = Math.floor(timeInSec / 60);
			const seconds = Math.floor(timeInSec - minutes * 60);
			const objMin = { m: minutes, s: seconds };
			Object.assign(obj, objMin);
			break;
		}
		default: {
			const hours = Math.floor(timeInSec / (60 * 60));
			const minutes = Math.floor((timeInSec - hours * 60 * 60) / 60);
			const seconds = Math.floor(timeInSec - hours * 60 * 60 - minutes * 60);
			const objHrs = {
				h: hours,
				m: minutes,
				s: seconds,
			};
			Object.assign(obj, objHrs);
			break;
		}
	}
	return obj;
}

function timeConvertToSeconds(timeInHMS) {
	const hours = timeInHMS.h || 0;
	const minutes = timeInHMS.m || 0;
	const seconds = timeInHMS.s || 0;
	return hours * 60 * 60 + minutes * 60 + +seconds;
}
