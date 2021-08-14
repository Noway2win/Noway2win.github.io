import nonce from 'nonce-generator';
import oauthSignature from 'oauth-signature';

export function getChannelsOAuth1(token, searchParams) {
	return new Promise((resolve, reject) => {
		const reqNonce = nonce(32);
		const reqTimestamp = Math.floor(Date.now() / 1000);
		const reqSignature = oauthSignature.generate('GET', 'https://api.twitter.com/1.1/users/search.json?q=soccer',
			{
				oauth_consumer_key: 'SVabVXQqOkzartJLxMVe694Dl',
				oauth_token: '1425835781604593666-rkOaHb8xshpFzdXk5ZQAZeWf7nSc7S',
				oauth_nonce: reqNonce,
				oauth_timestamp: reqTimestamp,
				oauth_signature_method: 'HMAC-SHA1',
				oauth_version: '1.0'
			},
			'nkVFxVXEgywU2LwJIa2Pl0QgOcA1pCFyMyirIifzwkqL1Boamk',
			'a9TRMBBmMFtnfBd3ONwD8g7yjcGP7PFQtDaY8y0EzcCz7')

		let twitterRequest = new XMLHttpRequest();
		twitterRequest.open('GET', `https://api.twitter.com/1.1/users/search.json?q=soccer`);
		twitterRequest.setRequestHeader('Authorization', `OAuth oauth_consumer_key="SVabVXQqOkzartJLxMVe694Dl",oauth_nonce="${reqNonce}",oauth_signature="${reqSignature}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${reqTimestamp}",oauth_token="1425835781604593666-rkOaHb8xshpFzdXk5ZQAZeWf7nSc7S",oauth_version="1.0"`)
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