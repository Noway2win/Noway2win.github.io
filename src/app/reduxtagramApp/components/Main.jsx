import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<div>
				<h1>
					<Link to="/">Reduxstagram</Link>
				</h1>
				{React.cloneElement(children, this.props)}
			</div>
		);
	}
}
