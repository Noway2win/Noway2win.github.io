import { bearerToken } from '../keys/twitterKeys';
import { getTweets, getChannel } from './twitterApiRequests';
import { addChannelToList } from './channelsList';


export function inputHandler(formSelector, inputSelector) {
	const form = document.querySelector(formSelector);
	const input = document.querySelector(inputSelector);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		processData(bearerToken, input);
	});
}

async function processData(token, source) {
	try {
		const channelObject = await getChannel(token, source.value);
		const channelTweetsArray = await getTweets(token, source.value);
		addChannelToList(channelObject, channelTweetsArray);
	}
	catch (err) {
		alert(err);
	}
	finally {
		source.value = '';
	}
}