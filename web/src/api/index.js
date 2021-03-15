import { Client } from './client';

import { RestUser } from './user';

// This approach allows us to place combinations of several transports in one class to interact with the server.
// For example, user management can be via the REST api, and chat using web sockets
class Api {

	constructor() {
		this.user = {};
	}

	addHttpTransport(restUrl) {
		const client = new Client(restUrl);

		this.user.rest = new RestUser(client);
	}
}

const api = new Api();
export default api;
