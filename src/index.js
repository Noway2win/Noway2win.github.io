import './css/style.css';
import { requestToWeb, TwitterApiDialog } from './app/services/twitterApiRequests';
import { bearerToken } from './keys/twitterKeys';
import { inputHandler } from './app/services/inputHandler';
import { ChannelsList } from './app/services/channelsList';
const channelsList = new ChannelsList();

channelsList.create('post 1');
channelsList.create('post 2');
channelsList.create('post 3');
channelsList.create('post 4');
inputHandler(".search-pannel__form", "#search-pannel__form__input");
// requestToWeb(bearerToken);

// const channelsGetter = new TwitterApiDialog('1.1/users/lookup.json');
// channelsGetter.requestToWeb(bearerToken, 'TwitterDev');
