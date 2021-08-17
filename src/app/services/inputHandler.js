import { bearerToken } from '../keys/twitterKeys';
import { getChannel, getTweets } from './twitterApiRequests';
import { addChannelToList } from './channelsList';
import { getChannelsOAuth1 } from './search';


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
		// const gettedChannel = await getChannelsOAuth1();
		const channelObject = await getChannel(token, source.value);
		const channelTweetsArray = await getTweets(token, source.value);
		addChannelToList(channelObject, channelTweetsArray);
	}
	catch (err) {
		console.log(err);
	}
	finally {
		source.value = '';
	}
}