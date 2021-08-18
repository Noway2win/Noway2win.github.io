import $ from 'jquery';
require('jsrender')($);

export function addChannelToList(channelObject, tweetsArray) {
	const root = $('.channels-list');
	const listItemDiv = $('<div class="channels-list-item"></div>');
	const shortInfoSection = addShortInfo(channelObject.profile_image_url, channelObject.name)
	const detailedInfoSection = addDetailedInfo(channelObject);
	const tweetsSection = addTweets(tweetsArray);
	const showTweetsBtn = $('<button>Show channel tweets</button>');
	appendElemsTo(listItemDiv, shortInfoSection, detailedInfoSection, showTweetsBtn);

	root.prepend(listItemDiv);
	root.append(tweetsSection);

	shortInfoSection.on('click', () => {
		detailedInfoSection.toggleClass('hidden');
	});
	showTweetsBtn.on('click', () => {
		tweetsSection.removeClass('hidden');
	});
}

function addShortInfo(imgSrc, name) {
	const shortInfoSection = $('<section class="channels-list-item_short"></section>');
	const shortInfoSectionItemTemplate = $.templates(`
	<img class="channels-list-item_short__image"src="{{:imgSrc}}">
	<h4 class="channels-list-item_name">'{{:name}}'</h4>
	`).render({ imgSrc, name })
	const listItemDelBtn = $('<button class="channels-list-item_delete-button">🗑️</button>');

	appendElemsTo(shortInfoSection, shortInfoSectionItemTemplate, listItemDelBtn);

	listItemDelBtn.on('click', function () {
		this.parent().parent().remove();
	})
	return shortInfoSection;
}

function addDetailedInfo(descrObj) {
	const detailedInfoSection = $('<section class="channels-list-item_detailed hidden"></section>');
	const detailedInfoSectionItemTemplate = $.templates(`
	<p class="channels-list-item_detailed__info-p">Description: {{:description}}</p>
	<p class="channels-list-item_detailed__info-p">Number of followers: {{:public_metrics.followers_count}}</p>
	<p class="channels-list-item_detailed__info-p">Number of tweets: {{:public_metrics.tweet_count}}</p>
	`
	).render(descrObj);

	appendElemsTo(detailedInfoSection, detailedInfoSectionItemTemplate);
	return detailedInfoSection;
}

function addTweets(tweetsArray) {
	const tweetsSection = $('<section class="tweets-list hidden"></section>');
	const closeTweetsBtn = $(`<button class="tweets-list_close-btn">Close</button>`);
	console.log(tweetsArray);
	const tweetsListTemplate = $.templates(`
		<div class="tweets-list-item">
		<p class="tweets-list-item_text">{{:text}}</p>
		{{if imgUrl}}
		<img class="tweets-list-item_img" src="{{:imgUrl}}">
		{{/if}}
		</div>`);
	const tweetsList = tweetsListTemplate.render(tweetsArray);
	appendElemsTo(tweetsSection, closeTweetsBtn, tweetsList);

	closeTweetsBtn.on('click', () => {
		tweetsSection.addClass('hidden');
	})
	return tweetsSection;
}


function appendElemsTo(parent, ...elems) {
	elems.forEach(elem => {
		parent.append(elem);
	})
}