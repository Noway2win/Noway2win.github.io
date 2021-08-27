import React from 'react';

export default function Clock(props) {
	const { time, format } = props;
	let shownTime;
	switch (format) {
		case 'toSec': {
			shownTime = <p>Left {time.s}</p>;
			break;
		}
		case 'toMin': {
			shownTime = (
				<p>
					Left {time.m}:{time.s}
				</p>
			);
			break;
		}
		default: {
			shownTime = (
				<p>
					Left {time.h}:{time.m}:{time.s}
				</p>
			);
			break;
		}
	}
	return <div>{shownTime}</div>;
}
