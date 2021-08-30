import request from 'supertest';

import app from '../../src/app';

import { User } from '../../src/dto';
import initDB from '../initDB';


beforeAll(async () => {
	await initDB();
});


let id;
const email = 'user@server.com';


describe('initial state', () => {

	test('the user should not be logged in immediately after a fresh start', async () => {
		let res = await request(app).get('/api/v1.0/users');

		expect(res.statusCode).toBe(500);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('error');
	});

});


describe('web registration with errors', () => {

	const name = 'User Foo Bar'
	const email = 'user@server.com'
	const password = '123qweasdzxc!'


	test('wrong name', async () => {
		let wrongNameParams = [
			{ email, password },
			{ name: '', email, password },
			{ name: 'shrt', email, password },
			{ name: 'shrt     ', email, password },
		]

		for (var wrongNameUserParams in wrongNameParams) {
			let res = await request(app)
				.post('/api/v1.0/users')
				.send(wrongNameUserParams);

			expect(res.statusCode).toBe(500);
			expect(res.type).toMatch(/json/);
			expect(res.body?.status).toBe('error');
		}
	});


	test('wrong email', async () => {
		let wrongEmailParams = [
			{ name, password },
			{ name, email: 'bad@email', password },
			{ name, email: 'bademail', password },
		]

		for (var wrongEmailUserParams in wrongEmailParams) {
			let res = await request(app)
				.post('/api/v1.0/users')
				.send(wrongEmailUserParams);

			expect(res.statusCode).toBe(500);
			expect(res.type).toMatch(/json/);
			expect(res.body?.status).toBe('error');
		}
	});


	test('wrong password', async () => {
		let wrongEmailParams = [
			{ name, email },
			{ name, email, password: '123qwe' },
			{ name, email, password: '123456789' },
			{ name, email, password: 'qwertyuiop' },
		]

		for (var wrongEmailUserParams in wrongEmailParams) {
			let res = await request(app)
				.post('/api/v1.0/users')
				.send(wrongEmailUserParams);

			expect(res.statusCode).toBe(500);
			expect(res.type).toMatch(/json/);
			expect(res.body?.status).toBe('error');
		}
	});
});



describe('successful web registration and login/logout', () => {

	let id

	let user = {
		name: 'User Foo Bar 1',
		email: 'user1@server.com',
		password: '123qweasdzxc!',
	}


	let cookies;
	let xsrfToken;


	test('first web user', async () => {
		let res = await request(app)
			.post('/api/v1.0/users')
			.send(user);

		expect(res.statusCode).toBe(200);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('success');

		let registeredUser = res.body?.data;

		expect(typeof registeredUser).toBe('object');
		id = registeredUser.id;

		expect(typeof id).toBe('number');
		expect(registeredUser.name).toBe(user.name);
		expect(registeredUser.email).toBe(user.email);
		expect(registeredUser.hpassword).not.toBeDefined();

		cookies = res.headers['set-cookie'];
		expect(Array.isArray(cookies)).toBeTruthy();
		expect(cookies.find(cookie => cookie.indexOf('token-user=') == 0 && cookie.indexOf('token-user=;') != 0)).toBeDefined();

		xsrfToken = res.headers['x-xsrf-token-user'];
		expect(xsrfToken).toBeDefined();
	});



	test('the user really exists, it can be requested from web', async () => {
		let res = await request(app)
			.get('/api/v1.0/users')
			.set('Cookie', cookies)
			.set('x-xsrf-token-user', xsrfToken)
			.send();

		expect(res.statusCode).toBe(200);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('success');

		let registeredUser = res.body?.data;

		expect(registeredUser).toBeDefined();
		expect(typeof id).toBe('number');
		expect(registeredUser.name).toBe(user.name);
		expect(registeredUser.email).toBe(user.email);
		expect(registeredUser.hpassword).not.toBeDefined();
	});


	test('logout works and clears the cookie', async () => {
		let res = await request(app)
			.post('/api/v1.0/users/logout')
			.set('Cookie', cookies)
			.set('x-xsrf-token-user', xsrfToken)
			.send();

		expect(res.statusCode).toBe(200);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('success');
		expect(res.body?.data).toBeUndefined();

		let newCookies = res.headers['set-cookie'];
		expect(Array.isArray(newCookies)).toBeTruthy();
		expect(newCookies.find(cookie => cookie.indexOf('token-user=;') == 0)).toBeDefined();
	});


	test('the user\'s request without a cookie (which will be deleted by the logout) will return an authorization error', async () => {
		let res = await request(app)
			.get('/api/v1.0/users')
			.set('x-xsrf-token-user', xsrfToken)
			.send();

		expect(res.statusCode).toBe(500);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('error');
	});


	test('user with bad credentions will return an authorization error', async () => {
		let res = await request(app)
			.post('/api/v1.0/users/login')
			.send({ email: user.email, password: user.password + '_badPostfix' });

		expect(res.statusCode).toBe(500);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('error');
	});


	test('web login', async () => {
		let res = await request(app)
			.post('/api/v1.0/users/login')
			.send({ email: user.email, password: user.password });

		expect(res.statusCode).toBe(200);
		expect(res.type).toMatch(/json/);
		expect(res.body?.status).toBe('success');

		let loggedInUser = res.body?.data;

		expect(typeof loggedInUser).toBe('object');
		id = loggedInUser.id;

		expect(typeof id).toBe('number');
		expect(loggedInUser.name).toBe(user.name);
		expect(loggedInUser.email).toBe(user.email);
		expect(loggedInUser.hpassword).not.toBeDefined();

		cookies = res.headers['set-cookie'];
		expect(Array.isArray(cookies)).toBeTruthy();
		expect(cookies.find(cookie => cookie.indexOf('token-user=') == 0 && cookie.indexOf('token-user=;') != 0)).toBeDefined();

		xsrfToken = res.headers['x-xsrf-token-user'];
		expect(xsrfToken).toBeDefined();
	});


});


