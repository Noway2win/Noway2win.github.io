export function addChannelToList(channelObject, tweetsArray) {
	const root = document.querySelector('.channels-list');
	const listItemDiv = document.createElement('div');
	const shortInfoSection = addShortInfo(channelObject.profile_image_url, channelObject.name)
	const detailedInfoSection = addDetailedInfo(channelObject);
	const tweetsSection = addTweets(tweetsArray);
	root.append(tweetsSection);
	listItemDiv.append(shortInfoSection);
	listItemDiv.append(detailedInfoSection);
	listItemDiv.classList.add('channels-list-item');
	root.prepend(listItemDiv);
	shortInfoSection.addEventListener('click', () => {
		detailedInfoSection.classList.toggle('hidden');
	});
	detailedInfoSection.addEventListener('click', () => {
		tweetsSection.classList.remove('hidden');
	})
	document.body.addEventListener('click', (e) => {
		if (e.target != tweetsSection && !tweetsSection.contains(e.target) && e.target != detailedInfoSection && !detailedInfoSection.contains(e.target)) {
			tweetsSection.classList.add('hidden');
		}
	});
}

function addShortInfo(imgSrc, name) {
	const shortInfoSection = document.createElement('section');
	const listItemImg = document.createElement('img');
	const listItemName = document.createElement('a');
	const listItemDelBtn = document.createElement('button');
	shortInfoSection.append(listItemImg);
	shortInfoSection.append(listItemName);
	shortInfoSection.append(listItemDelBtn);
	shortInfoSection.classList.add('channels-list-item_short');
	listItemName.classList.add('channels-list-item_name');
	listItemDelBtn.classList.add('channels-list-item_delete-button');
	listItemImg.classList.add('channels-list-item_short__image');
	listItemImg.src = imgSrc;
	listItemName.innerText = name;
	listItemDelBtn.innerText = '🗑️';
	listItemDelBtn.addEventListener('click', function () {
		this.parentNode.parentNode.remove();
	})
	return shortInfoSection;
}

function addDetailedInfo(descrObj) {
	const section = document.createElement('section');
	const description = document.createElement('p');
	const numberOfFollowers = document.createElement('p');
	const numberOfTweets = document.createElement('p');
	description.classList.add('channels-list-item_detailed__info-p');
	numberOfFollowers.classList.add('channels-list-item_detailed__info-p');
	numberOfTweets.classList.add('channels-list-item_detailed__info-p');
	description.append(`Description: ${descrObj.description}`);
	numberOfFollowers.append(`Number of followers: ${descrObj.public_metrics.followers_count}`);
	numberOfTweets.append(`Number of tweets: ${descrObj.public_metrics.tweet_count}`);
	section.append(description);
	section.append(numberOfFollowers);
	section.append(numberOfTweets);
	section.classList.add('hidden', 'channels-list-item_detailed');
	return section;
}

function addTweets(tweetsArray) {
	const tweetsSection = document.createElement('section');
	tweetsSection.classList.add('tweets-list', 'hidden');
	tweetsArray.forEach(tweet => {
		const tweetDiv = document.createElement('div');
		const tweetText = document.createElement('p');
		tweetDiv.classList.add('tweets-list-item');
		tweetText.classList.add('tweets-list-item_text');
		tweetText.innerText = tweet.text;
		tweetDiv.append(tweetText);
		if ('imgUrl' in tweet) {
			const tweetImg = document.createElement('img');
			tweetImg.classList.add('tweets-list-item_img');
			tweetImg.src = tweet.imgUrl;
			tweetDiv.append(tweetImg);
		}
		tweetsSection.append(tweetDiv);
	})
	return tweetsSection;
}
