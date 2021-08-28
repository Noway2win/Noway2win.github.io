import React from 'react';

export default function ProgressBarInput(props) {
	const { value, onChange } = props;
	return (
		<div>
			<input
				id="progressInput"
				type="range"
				min="0"
				max="100"
				step="1"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
