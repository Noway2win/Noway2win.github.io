import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

export default function ReduxTagram() {
	return (
		<Switch>
			<Route
				exact
				path="/"
				render={() => (
					<App>
						<PhotoGrid />
					</App>
				)}
			/>
			<Route
				path="/view/:postId"
				render={({ match }) => (
					<App>
						<Single params={match.params} />
					</App>
				)}
			/>
		</Switch>
	);
}
