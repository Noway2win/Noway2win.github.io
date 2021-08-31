import React from 'react';

export default class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.commentForm = React.createRef();
		this.authorInput = React.createRef();
		this.commentInput = React.createRef();
		this.renderComment = this.renderComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { postId, addComment } = this.props;
		const author = this.authorInput.current.value;
		const comment = this.commentInput.current.value;
		addComment(postId, author, comment);
		this.commentForm.current.reset();
	}

	renderComment(comment, i) {
		const { removeComment, postId } = this.props;
		return (
			<div className="comment" key={i}>
				<p>
					<strong>{comment.user}</strong>
					{comment.text}
					<button
						type="button"
						className="remove-comment"
						onClick={() => removeComment({ postId, i })}
					>
						&times;
					</button>
				</p>
			</div>
		);
	}

	render() {
		const { postComments } = this.props;
		return (
			<div className="comments">
				{postComments.map(this.renderComment)}
				<form
					ref={this.commentForm}
					className="comment-form"
					onSubmit={this.handleSubmit}
				>
					<input type="text" placeholder="author" ref={this.authorInput} />
					<input type="text" placeholder="comment" ref={this.commentInput} />
					<input type="submit" hidden />
				</form>
			</div>
		);
	}
}
