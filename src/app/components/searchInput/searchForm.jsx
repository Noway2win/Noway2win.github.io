import React from 'react';

export default class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
		};
		this.searchInput = React.createRef();
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	onKeyUp(e) {
		const { mode } = this.props;
		if (mode === 'Immediate') {
			const searchQuery = this.searchInput.current.value;
			this.setState({ searchQuery });
		} else if (mode === 'onEnterClick') {
			if (e.keyCode === 13) {
				const searchQuery = this.searchInput.current.value;
				this.setState({ searchQuery });
			}
		} else if (mode === 'onStopTyping') {
			const doneTyping = () => {
				const searchQuery = this.searchInput.current.value;
				this.setState({ searchQuery });
			};
			let typingTimer;
			if (typingTimer) {
				clearTimeout(typingTimer);
			}
			if (this.searchInput.current.value) {
				typingTimer = setTimeout(doneTyping, 1000);
			}
		}
	}

	render() {
		const { mode } = this.props;
		const { searchQuery } = this.state;
		return (
			<>
				<input
					type="text"
					placeholder="Search"
					ref={this.searchInput}
					onKeyUp={this.onKeyUp}
				/>
				<p>
					Your looking for:{' '}
					<span style={{ color: 'red', fontWeight: 'bold' }}>
						{searchQuery}
					</span>
					with {mode} search mode
				</p>
			</>
		);
	}
}
