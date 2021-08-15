import { getChannels, getTweets } from './services/twitterApiRequests';
import { inputHandler } from './services/inputHandler';
import { addChannelToList } from './services/channelsList';

export default function startApp() {
	inputHandler(".search-pannel__form", "#search-pannel__form__input");
	// getTweets(bearerToken, 'TwitterDev');
}
