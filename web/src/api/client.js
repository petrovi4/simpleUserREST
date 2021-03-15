import fetch from 'cross-fetch';
import queryString from 'query-string';


class ClientError extends Error {
	constructor(args = {}) {
		super();
		if (!args.message) args.message = 'Dummy Error';
		Object.assign(this, args);
	}
}

export class Client {

	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}


	// GET / POST Configs
	getConfig(method, data) {
		const config = {
			method,
			headers: { 'Content-Type': 'application/json' },
		};
		if (data) config.body = JSON.stringify(data);
		return config;
	}


	postFormDataConfig(formData) {
		const config = {
			method: 'post',
			body: formData,
			headers: {},
		};
		return config;
	}


	// Methods
	get(endpoint, filter) {
		let url = `${this.baseUrl}${endpoint}`;
		if (filter) url += `?${queryString.stringify(filter)}`;

		const config = this.getConfig('GET');

		return this.processResponse({ url, config });
	}


	post(endpoint, data) {
		let url = this.baseUrl + endpoint;

		const config = this.getConfig('POST', data);

		return this.processResponse({ url, config });
	}


	patch(endpoint, data) {
		let url = this.baseUrl + endpoint;

		const config = this.getConfig('PATCH', data);

		return this.processResponse({ url, config });
	}


	postFormData(endpoint, formData) {
		let url = this.baseUrl + endpoint;

		const config = this.postFormDataConfig(formData);

		return this.processResponse({ url, config });
	}


	put(endpoint, data) {
		let url = this.baseUrl + endpoint;

		const config = this.getConfig('put', data);

		return this.processResponse({ url, config });
	}


	delete(endpoint, data) {
		let url = this.baseUrl + endpoint;

		const config = this.getConfig('delete', data);

		return this.processResponse({ url, config });
	}


	// Helper
	processResponse({ url, config }) {
		config.headers['X-XSRF-TOKEN-user'] = localStorage.getItem('xsrfToken-user');
		config.headers['logToken'] = localStorage.getItem('logToken');

		return fetch(url, config)
			.then(res => {
				if (res.status == 404) throw new ClientError({ message: 'Wrong request url', code: 'ERROR_CODE.SERVER.NETWORK_ERROR', status: res.status });
				return res;
			})
			.then(res => {
				let xsrfToken = res.headers.map && res.headers.map['x-xsrf-token-user'];
				if (xsrfToken) localStorage.setItem('xsrfToken-user', xsrfToken);
				return res.json();
			})
			.catch(err => {
				if (err instanceof ClientError) throw err;
				else throw new ClientError({ message: 'Wrong server response', code: 'ERROR_CODE.SERVER.NOT_JSON_IN_RESPONSE', raw: err });
			})
			.then(json => {
				if (json.status == 'success') return json.data;
				else if (json.status == 'error' && json.error) throw new ClientError(json.error);
				else throw new ClientError({ message: 'Wrong server response', code: 'ERROR_CODE.SERVER.WRONG_RESPONSE_STRUCTURE', raw: json });
			});
	}
}
