import React from 'react';
import Photo from './Photo';
import Comments from './Comments';

export default class Single extends React.Component {
	render() {
		const { postId } = this.props.params;
		const { posts } = this.props;
		const i = posts.findIndex((post) => post.code === postId);
		const post = posts[i];
		return (
			<div className="single-photo">
				<Photo i={i} post={post} {...this.props} />
				<Comments />
			</div>
		);
	}
}
