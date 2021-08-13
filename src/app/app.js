import { getChannels, getTweets } from './services/twitterApiRequests';
import { inputHandler } from './services/inputHandler';
import { addChannelToList } from './services/channelsList';

export default function startApp() {
	addChannelToList('test channel 1');
	addChannelToList('test channel 2');
	addChannelToList('test channel 3');
	inputHandler(".search-pannel__form", "#search-pannel__form__input");
	// getTweets(bearerToken, 'TwitterDev');
}
