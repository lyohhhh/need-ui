import Cookie from 'js-cookie';

const AUTHKEY = 'AUTH_KEY';
const EXPIRES: number = 12 * 60 * 60 * 1000;

export function getAccessToken(): undefined | string {
	return Cookie.get(AUTHKEY);
}

export function setAccessToken(token: string) {
	Cookie.set(AUTHKEY, token, {
		expires: EXPIRES,
	});
}

export function removeToken() {
	Cookie.remove(AUTHKEY);
}
