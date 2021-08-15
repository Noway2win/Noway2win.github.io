import { bearerToken } from '../keys/twitterKeys';
import { getChannels, getTweets } from './twitterApiRequests';
import { addChannelToList } from './channelsList';
// import { getChannelsOAuth1 } from './search';


export function inputHandler(formSelector, inputSelector) {
	const form = document.querySelector(formSelector);
	const input = document.querySelector(inputSelector);
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		try {
			// const gettedChannel = await getChannelsOAuth1();
			const channelObject = await getChannels(bearerToken, input.value);
			const tweetsArray = await getTweets(bearerToken, input.value);
			addChannelToList(channelObject, tweetsArray);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			input.value = '';
		}
		// addChannelToList()
	});
}