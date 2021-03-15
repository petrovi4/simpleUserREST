
export class RestUser {

	constructor(client) {
		this.client = client;
		this.resourceUrl = '/users';
	}


	getCurrent() {
		return this.client.get(this.resourceUrl + '/').then(json => {
			if (!json) throw new Error('Empty response');
			return json;
		});
	}


	register(name, email, password) {
		return this.client.post(this.resourceUrl, { name, email, password }).then(json => {
			if (!json) throw new Error('Empty response');
			return json;
		});
	}


	authorize(email, password) {
		return this.client.post(this.resourceUrl + '/login', { email, password }).then(json => {
			if (!json) throw new Error('Empty response');
			return json;
		});
	}


	logout() {
		return this.client.post(this.resourceUrl + '/logout', {}).then(json => {
			delete this.xsrfToken;
			localStorage.removeItem('xsrfToken-user');
			return json;
		});
	}

}

