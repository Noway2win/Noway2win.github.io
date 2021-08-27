import React from 'react';

export default class InputForm extends React.Component {
	render() {
		const { onFormInputChange, buttonClick, format } = this.props;
		const inputs = [];
		switch (format) {
			case 'toSec': {
				inputs.push(
					<input key="s" type="number" name="s" onChange={onFormInputChange} />
				);
				break;
			}
			case 'toMin': {
				inputs.push(
					<input key="m" type="number" name="m" onChange={onFormInputChange} />,
					<input key="s" type="number" name="s" onChange={onFormInputChange} />
				);
				break;
			}
			default: {
				inputs.push(
					<input key="h" type="number" name="h" onChange={onFormInputChange} />,
					<input key="m" type="number" name="m" onChange={onFormInputChange} />,
					<input key="s" type="number" name="s" onChange={onFormInputChange} />
				);
				break;
			}
		}

		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onFormInputChange(e);
					buttonClick();
				}}
			>
				{inputs}
				<button type="submit">Start Timer</button>
			</form>
		);
	}
}
