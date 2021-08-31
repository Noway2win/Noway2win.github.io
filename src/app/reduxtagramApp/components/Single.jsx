import React from 'react';
import Photo from './Photo';
import Comments from './Comments';

export default class Single extends React.Component {
	render() {
		const { postId } = this.props.params;
		const { posts, addComment, removeComment } = this.props;
		const i = posts.findIndex((post) => post.code === postId);
		const post = posts[i];
		const postComments = this.props.comments[postId] || [];
		return (
			<div className="single-photo">
				<Photo i={i} post={post} {...this.props} />
				<Comments
					postComments={postComments}
					postId={postId}
					addComment={addComment}
					removeComment={removeComment}
				/>
			</div>
		);
	}
}
