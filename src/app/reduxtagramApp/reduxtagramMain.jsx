import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

export default function ReduxTagram(props) {
	return (
		<Main>
			<Switch>
				<Route exact path="/" component={PhotoGrid} />
				<Route path="/view/:postId" component={Single} />
			</Switch>
		</Main>
	);
}
