import React from 'react';

export default class InputForm extends React.Component {
	render() {
		const { onFormInputChange, buttonClick, format } = this.props;
		const inputs = [];
		switch (format) {
			case 'toSec': {
				inputs.push(
					<input
						className="time-input"
						key="s"
						type="number"
						name="s"
						onChange={onFormInputChange}
					/>
				);
				break;
			}
			case 'toMin': {
				inputs.push(
					<input
						className="time-input"
						key="m"
						type="number"
						name="m"
						onChange={onFormInputChange}
					/>,
					<input
						className="time-input"
						key="s"
						type="number"
						name="s"
						onChange={onFormInputChange}
					/>
				);
				break;
			}
			default: {
				inputs.push(
					<input
						className="time-input"
						key="h"
						type="number"
						name="h"
						onChange={onFormInputChange}
					/>,
					<input
						className="time-input"
						key="m"
						type="number"
						name="m"
						onChange={onFormInputChange}
					/>,
					<input
						className="time-input"
						key="s"
						type="number"
						name="s"
						onChange={onFormInputChange}
					/>
				);
				break;
			}
		}

		return (
			<form
				className="input-form"
				onSubmit={(e) => {
					e.preventDefault();
					onFormInputChange(e);
					buttonClick(e);
				}}
			>
				{inputs}
				<button type="submit">Start Timer</button>
			</form>
		);
	}
}
