import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class Photo extends React.Component {
	render() {
		const { post, i, comments, increment } = this.props;
		return (
			<figure className="grid-figure">
				<div className="grid-photo-wrap">
					<Link to={`/view/${post.code}`}>
						<img
							src={post.display_src}
							alt={post.caption}
							className="grid-photo"
						/>
					</Link>
					<TransitionGroup>
						<CSSTransition classNames="like" key={post.likes} timeout={500}>
							<span className="likes-heart">{post.likes}</span>
						</CSSTransition>
					</TransitionGroup>
				</div>
				<figcaption>
					<p>{post.caption}</p>
					<div className="control-buttons">
						<button
							type="button"
							onClick={increment.bind(null, i)}
							className="likes"
						>
							&hearts;{post.likes}
						</button>
						<Link to={`/view/${post.code}`} className="button">
							<span className="comment-count">
								<span className="speech-bubble" />
								{comments[post.code] ? comments[post.code].length : 0}
							</span>
						</Link>
					</div>
				</figcaption>
			</figure>
		);
	}
}
