import $ from 'jquery';
import { bearerToken } from '../keys/twitterKeys';
import { getTweets, getChannel } from './twitterApiRequests';
import { addChannelToList } from './channelsList';


export function inputHandler(formSelector, inputSelector) {
	const form = $(formSelector);
	const input = $(inputSelector);
	form.on('submit', (e) => {
		e.preventDefault();
		processData(bearerToken, input);
	});
}

async function processData(token, source) {
	try {
		const channelObject = await getChannel(token, source.val());
		const channelTweetsArray = await getTweets(token, source.val());
		addChannelToList(channelObject, channelTweetsArray);
	}
	catch (err) {
		alert(err);
	}
	finally {
		source.val('');
	}
}