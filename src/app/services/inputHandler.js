import { bearerToken } from '../keys/twitterKeys';
import { getChannels, getTweets } from './twitterApiRequests';
import { addChannelToList } from './channelsList';

export function inputHandler(formSelector, inputSelector) {
	const form = document.querySelector(formSelector);
	const input = document.querySelector(inputSelector);
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		try {
			const gettedChannel = await getChannels(bearerToken, input.value);
			console.log(gettedChannel);
			addChannelToList(gettedChannel[0].screen_name);
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