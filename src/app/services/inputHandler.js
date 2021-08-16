import { bearerToken } from '../keys/twitterKeys';
import { getChannel, getTweets } from './twitterApiRequests';
import { addChannelToList } from './channelsList';
// import { getChannelsOAuth1 } from './search';


export function inputHandler(formSelector, inputSelector) {
	const form = document.querySelector(formSelector);
	const input = document.querySelector(inputSelector);
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		try {
			// const gettedChannel = await getChannelsOAuth1();
			const channelObject = await getChannel(bearerToken, input.value);
			const channelTweetsArray = await getTweets(bearerToken, input.value);
			addChannelToList(channelObject, channelTweetsArray);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			input.value = '';
		}
	});
}