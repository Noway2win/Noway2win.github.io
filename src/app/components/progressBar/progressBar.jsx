import React from 'react';
import ProgressBarRound from './progressBarRound';
import ProgressBarInput from './progressBarInput';

export default class RoundProgressBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
		};

		this.handleChangeEvent = this.handleChangeEvent.bind(this);
	}

	handleChangeEvent(event) {
		this.setState({
			percentage: event.target.value,
		});
	}

	render() {
		const { percentage } = this.state;
		return (
			<div style={{ paddingTop: '20px' }}>
				<ProgressBarRound
					strokeWidth="10"
					sqSize="200"
					percentage={percentage}
				/>
				<ProgressBarInput
					value={percentage}
					onChange={this.handleChangeEvent}
				/>
			</div>
		);
	}
}
