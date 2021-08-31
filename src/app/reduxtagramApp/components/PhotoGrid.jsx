import React from 'react';
import Photo from './Photo';

export default class PhotoGrid extends React.Component {
	render() {
		const { props } = this;
		const { posts } = props;
		return (
			<div className="photo-grid">
				{posts.map((post, i) => (
					<Photo {...props} key={i} i={i} post={post} />
				))}
			</div>
		);
	}
}
