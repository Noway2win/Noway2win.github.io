export function getChannels(token, searchParams) {
	return new Promise((resolve, reject) => {
		let twitterRequest = new XMLHttpRequest();
		// twitterRequest.open('GET', `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/users/lookup.json?screen_name=${searchParams}&user.fields=description,name,profile_image_url,followers_count,statuses_count`);
		twitterRequest.open('GET', `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by?usernames=${searchParams}&user.fields=description,name,profile_image_url,username,public_metrics`);
		// https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by?usernames=twitter,twitterdev,twitterapi,twitternyc,twittersf&user.fields=description,name,profile_image_url_https,followers_count,statuses_count
		twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
		twitterRequest.send();
		twitterRequest.onload = function () {
			if (twitterRequest.status != 200) {
				reject({
					code: twitterRequest.status,
					status: twitterRequest.statusText
				});
			} else {
				const res = JSON.parse(twitterRequest.responseText).data[0];
				resolve(res);
			}
		}
		twitterRequest.onerror = function () {
			reject({
				code: twitterRequest.status,
				status: twitterRequest.statusText
			});
		}
	}
	)
}

export function getTweets(token, channelName) {
	return new Promise((resolve, reject) => {
		let twitterRequest = new XMLHttpRequest();
		twitterRequest.open('GET', `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from:${channelName}&expansions=attachments.media_keys&media.fields=url`);
		twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
		twitterRequest.send();
		twitterRequest.onload = function () {
			if (twitterRequest.status != 200) {
				reject({
					code: twitterRequest.status,
					status: twitterRequest.statusText
				});
			} else {
				const responce = JSON.parse(twitterRequest.responseText);
				const res = handlerForTweetsData(responce.data, responce?.includes?.media);
				resolve(res);
			}
		}
		twitterRequest.onerror = function () {
			reject({
				code: twitterRequest.status,
				status: twitterRequest.statusText
			});
		}
	})
}

function handlerForTweetsData(tweetsArray, mediaArray) {
	tweetsArray.forEach(tweet => {
		mediaArray.forEach(mediaItem => {
			if (tweet.attachments?.media_keys.includes(mediaItem.media_key)) {
				tweet.imgUrl = mediaItem.url;
			}
		})
	})
	return tweetsArray;
}
