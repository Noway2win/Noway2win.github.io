export async function getChannel(token, searchParam) {
	const responseData = await sendGetRequest('channel', searchParam, token);
	const channelData = responseData.data[0];
	return channelData;
}
export async function getTweets(token, channelName) {
	const tweetsData = await sendGetRequest('tweets', channelName, token);
	const tweetsArray = handlerForTweetsData(tweetsData.data, tweetsData?.includes?.media);
	return tweetsArray;
}

async function sendGetRequest(typeOfData, searchParam, token) {
	let url;
	switch (typeOfData) {
		case 'tweets': url = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from:${searchParam}&expansions=attachments.media_keys&media.fields=url`; break;
		case 'channel': url = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by?usernames=${searchParam}&user.fields=description,name,profile_image_url,username,public_metrics`; break;
	}
	let response = await fetch(url, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	if (response.ok) {
		let data = await response.json();
		return data;
	}
	else {
		throw new Error(`status: ${response.status}, statusText: ${response.statusText}`);
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
