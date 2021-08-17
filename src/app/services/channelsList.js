export function addChannelToList(channelObject, tweetsArray) {
	const root = document.querySelector('.channels-list');
	const listItemDiv = createElement({ selector: 'div', elemClasses: ['channels-list-item'] });
	const shortInfoSection = addShortInfo(channelObject.profile_image_url, channelObject.name)
	const detailedInfoSection = addDetailedInfo(channelObject);
	const tweetsSection = addTweets(tweetsArray);
	const showTweetsBtn = createElement({ selector: 'button', innerText: 'Show channel tweets' });

	appendElemsTo(listItemDiv, shortInfoSection, detailedInfoSection, showTweetsBtn);

	root.prepend(listItemDiv);
	root.append(tweetsSection);

	shortInfoSection.addEventListener('click', () => {
		detailedInfoSection.classList.toggle('hidden');
	});
	showTweetsBtn.addEventListener('click', () => {
		tweetsSection.classList.remove('hidden');
	});
}

function addShortInfo(imgSrc, name) {
	const shortInfoSection = createElement({ selector: 'section', elemClasses: ['channels-list-item_short'] });
	const listItemImg = createElement({ selector: 'img', elemClasses: ['channels-list-item_short__image'], src: imgSrc });
	const listItemName = createElement({ selector: 'h4', elemClasses: ['channels-list-item_name'], innerText: name });
	const listItemDelBtn = createElement({ selector: 'button', elemClasses: ['channels-list-item_delete-button'], innerText: '🗑️' });

	appendElemsTo(shortInfoSection, listItemImg, listItemName, listItemDelBtn);

	listItemDelBtn.addEventListener('click', function () {
		this.parentNode.parentNode.remove();
	})
	return shortInfoSection;
}

function addDetailedInfo(descrObj) {
	const detailedInfoSection = createElement({ selector: 'section', elemClasses: ['channels-list-item_detailed', 'hidden'] });
	const description = createElement({ selector: 'p', elemClasses: ['channels-list-item_detailed__info-p'], innerText: `Description: ${descrObj.description}` });
	const numberOfFollowers = createElement({
		selector: 'p', elemClasses: ['channels-list-item_detailed__info-p'],
		innerText: `Number of followers: ${descrObj.public_metrics.followers_count}`
	});
	const numberOfTweets = createElement({
		selector: 'p', elemClasses: ['channels-list-item_detailed__info-p'],
		innerText: `Number of tweets: ${descrObj.public_metrics.tweet_count}`
	});

	appendElemsTo(detailedInfoSection, description, numberOfFollowers, numberOfTweets);

	return detailedInfoSection;
}

function addTweets(tweetsArray) {
	const tweetsSection = createElement({ selector: 'section', elemClasses: ['tweets-list', 'hidden'] });
	const closeTweetsBtn = createElement({ selector: 'button', elemClasses: ['tweets-list_close-btn'], innerText: 'Close' });

	appendElemsTo(tweetsSection, closeTweetsBtn);

	tweetsArray.forEach(tweet => {
		const tweetDiv = createTweet(tweet);
		tweetsSection.append(tweetDiv);
	})

	closeTweetsBtn.addEventListener('click', () => {
		tweetsSection.classList.add('hidden');
	})
	return tweetsSection;
}

function createElement({ selector, elemClasses = [], innerText = '', src = '' }) {
	const elem = document.createElement(selector);
	if (elemClasses.length > 0) {
		elem.classList.add(...elemClasses);
	}
	if (src) {
		elem.src = src;
	}
	elem.innerText = innerText;
	return elem;
}

function appendElemsTo(parent, ...elems) {
	elems.forEach(elem => {
		parent.append(elem);
	})
}

function createTweet(tweet) {
	const tweetDiv = createElement({ selector: 'div', elemClasses: ['tweets-list-item'] });
	const tweetText = createElement({ selector: 'p', elemClasses: ['tweets-list-item_text'], innerText: tweet.text });

	tweetDiv.append(tweetText);

	if ('imgUrl' in tweet) {
		const tweetImg = createElement({ selector: 'img', elemClasses: ['tweets-list-item_img'], src: tweet.imgUrl });
		tweetDiv.append(tweetImg);
	}

	return tweetDiv;

}