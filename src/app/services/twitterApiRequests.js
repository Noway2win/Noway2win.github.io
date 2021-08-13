// export function requestToWeb(token) {
// 	let twitterRequest = new XMLHttpRequest();
// 	twitterRequest.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets?ids=1263150595717730305');
// 	twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
// 	twitterRequest.send();
// 	twitterRequest.onload = function () {
// 		if (twitterRequest.status != 200) {
// 			alert(`Error ${twitterRequest.status}: ${twitterRequest.statusText}`);
// 		} else {
// 			console.log(twitterRequest.response);
// 		}
// 	}
// }

export class TwitterApiDialog {
	constructor(url) {
		this.url = url
	}
	requestToWeb(token, searchParams) {
		const twitterRequest = new XMLHttpRequest();
		twitterRequest.open('GET', `https://cors-anywhere.herokuapp.com/https://api.twitter.com/${this.url}?screen_name=${searchParams}`);
		twitterRequest.setRequestHeader('Authorization', `Bearer ${token}`);
		twitterRequest.send();
		twitterRequest.onload = function () {
			if (twitterRequest.status != 200) {
				alert(`Error ${twitterRequest.status}: ${twitterRequest.statusText}`);
			} else {
				console.log(JSON.parse(twitterRequest.response));
			}
		}
	}
}

