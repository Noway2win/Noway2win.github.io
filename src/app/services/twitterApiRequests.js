export function getChannel(token, searchParam) {
	return new Promise((resolve, reject) => {
		const twitterData = sendGetRequest('channel', searchParam, token);

		twitterData.onload = function () {
			testResponse(twitterData, (response) => {
				const channelData = JSON.parse(response.responseText).data[0];
				resolve(channelData);
			})
		}

		twitterData.onerror = function () {
			reject({
				code: twitterData.status,
				status: twitterData.statusText
			});
		}
	}
	)
}

export function getTweets(token, channelName) {
	return new Promise((resolve, reject) => {
		const twitterData = sendGetRequest('tweets', channelName, token);

		twitterData.onload = function () {
			testResponse(twitterData, (response) => {
				const tweetsData = JSON.parse(response.responseText);
				const tweetsArray = handlerForTweetsData(tweetsData.data, tweetsData?.includes?.media);
				resolve(tweetsArray);
			})
		}

		twitterData.onerror = function () {
			reject({
				code: twitterData.status,
				status: twitterData.statusText
			});
		}
	})
}

function sendGetRequest(typeOfData, searchParam, token) {
	let url;
	switch (typeOfData) {
		case 'tweets': url = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from:${searchParam}&expansions=attachments.media_keys&media.fields=url`; break;
		case 'channel': url = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by?usernames=${searchParam}&user.fields=description,name,profile_image_url,username,public_metrics`; break;
	}
	let getRequest = new XMLHttpRequest();
	getRequest.open('GET', url);
	getRequest.setRequestHeader('Authorization', `Bearer ${token}`);
	getRequest.send();
	return getRequest;
}

function testResponse(response, callback) {
	if (response.status != 200) {
		reject({
			code: response.status,
			status: response.statusText
		})
	} else {
		callback(response);
	}
}

function handlerForTweetsData(tweetsArray, mediaArray) {
	console.log(tweetsArray);
	console.log(mediaArray);
	tweetsArray.forEach(tweet => {
		mediaArray.forEach(mediaItem => {
			if (tweet.attachments?.media_keys.includes(mediaItem.media_key)) {
				tweet.imgUrl = mediaItem.url;
			}
		})
	})
	return tweetsArray;
}
