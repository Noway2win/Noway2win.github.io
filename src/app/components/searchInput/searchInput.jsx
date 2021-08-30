import React from 'react';

export default class SearchInput extends React.Component {
	getValue(e) {
		return e.target.value;
	}

	render() {
		const { mode, onChange } = this.props;
		return (
			<input
				mode={mode}
				type="text"
				placeholder="Search"
				onChange={(e) => getValue(e)}
			/>
		);
	}
}
