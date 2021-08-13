export function getChannels(token, searchParams) {
	return new Promise((resolve, reject) => {
		let twitterRequest = new XMLHttpRequest();
		twitterRequest.open('GET', `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/users/lookup.json?screen_name=${searchParams}`);
		twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
		twitterRequest.send();
		twitterRequest.onload = function () {
			if (twitterRequest.status != 200) {
				reject({
					code: twitterRequest.status,
					status: twitterRequest.statusText
				});
			} else {
				const res = JSON.parse(twitterRequest.responseText);
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
		twitterRequest.open('GET', `https://api.twitter.com/1.1/search/tweets.json?q=%40${channelName}`);
		twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
		twitterRequest.send();
		twitterRequest.onload = function () {
			if (twitterRequest.status != 200) {
				reject({
					code: twitterRequest.status,
					status: twitterRequest.statusText
				});
			} else {
				const res = JSON.parse(twitterRequest.responseText);
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

