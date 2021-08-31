import React from 'react';

export default function Clock(props) {
	const { time, format, sqSize, strokeWidth, percentage } = props;
	let stroke = 'green';
	if (percentage < 50) {
		stroke = 'yellow';
	}
	if (percentage < 25) {
		stroke = 'red';
	}
	let shownTime;
	switch (format) {
		case 'toSec': {
			shownTime = `${time.s}`;
			break;
		}
		case 'toMin': {
			shownTime = `${time.m}:${time.s}`;
			break;
		}
		default: {
			shownTime = `${time.h}:${time.m}:${time.s}`;
			break;
		}
	}
	const radius = (sqSize - strokeWidth) / 2;
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * percentage) / 100;
	return (
		<>
			<svg width={sqSize} height={sqSize} viewBox={viewBox}>
				<circle
					className="circle-background"
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius}
					strokeWidth={`${strokeWidth}px`}
				/>
				<circle
					className="circle-progress"
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius}
					strokeWidth={`${strokeWidth}px`}
					transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
					style={{
						strokeDasharray: dashArray,
						strokeDashoffset: dashOffset,
						stroke,
					}}
				/>
				<text className="circle-text" x="50%" y="50%" dy=".3em">
					{shownTime}
				</text>
			</svg>
		</>
	);
}
