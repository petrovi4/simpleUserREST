import { User } from '../../src/dto';
import initDB from '../initDB';

import { registerNaive, login, logout, getOne } from '../../src/controllers/user';



beforeAll(async () => {
	await initDB();
});



describe('initial db', () => {

	test('there should be no users in an empty database', async () => {
		let count = await User.count();
		expect(count).toBe(0);
	});

});




describe('registration with errors', () => {

	const name = 'User Foo Bar'
	const email = 'user@server.com'
	const password = '123qweasdzxc!'

	test('wrong name', async () => {
		await expect(registerNaive({ email, password })).rejects.toThrow();
		await expect(registerNaive({ name: '', email, password })).rejects.toThrow();
		await expect(registerNaive({ name: 'shrt', email, password })).rejects.toThrow();
		await expect(registerNaive({ name: 'shrt     ', email, password })).rejects.toThrow();
	});

	test('wrong email', async () => {
		await expect(registerNaive({ name, password })).rejects.toThrow();
		await expect(registerNaive({ name, email: 'bad@email', password })).rejects.toThrow();
		await expect(registerNaive({ name, email: 'bademail', password })).rejects.toThrow();
	});

	test('wrong password', async () => {
		await expect(registerNaive({ name, email })).rejects.toThrow();
		await expect(registerNaive({ name, email, password: '123qwe' })).rejects.toThrow();
		await expect(registerNaive({ name, email, password: '123456789' })).rejects.toThrow();
		await expect(registerNaive({ name, email, password: 'qwertyuiop' })).rejects.toThrow();
	});

});



describe('successful registration', () => {

	let id

	let users = [{
		name: 'User Foo Bar 1',
		email: 'user1@server.com',
		password: '123qweasdzxc!',
	}, {
		name: 'User Foo Bar 2',
		email: 'user2@server.com',
		password: '321qweasdzxc!',
	}]


	test('first user', async () => {
		let { user, token, xsrfToken } = await registerNaive(users[0]);

		expect(user).toBeDefined();
		expect(token).toBeDefined();
		expect(xsrfToken).toBeDefined();

		expect(user.id).toBeDefined();
		id = user.id
	});


	test('the user really exists, it can be requested', async () => {
		let user = await getOne({ id });

		expect(user).toBeDefined();
		expect(user.name).toBe(users[0].name);
		expect(user.email).toBe(users[0].email);
		expect(user.password).not.toBeDefined();
		expect(user.hpassword).not.toBeDefined();
	});


	test('a second user can be created', async () => {
		let { user, token, xsrfToken } = await registerNaive(users[1]);

		expect(user).toBeDefined();
		expect(token).toBeDefined();
		expect(xsrfToken).toBeDefined();

		expect(user.id).toBeDefined();
	});


	test('a second user with the same email cannot be created', async () => {
		await expect(registerNaive(users[0])).rejects.toThrow();
	});


	test('not existing user can\'t be requested', async () => {
		await expect(getOne({ id: -1 })).rejects.toThrow();
		await expect(getOne({ id: 999 })).rejects.toThrow();
	});

});



describe('login and logout', () => {

	let id

	let user = {
		name: 'User Foo Bar 3',
		email: 'user3@server.com',
		password: '123qweasdzxc!',
	}

	test('register before login', async () => {
		let { user: registeredUser, token, xsrfToken } = await registerNaive(user);

		expect(registeredUser).toBeDefined();
		expect(token).toBeDefined();
		expect(xsrfToken).toBeDefined();

		expect(registeredUser.id).toBeDefined();
		id = registeredUser.id
	});


	test('login with wrong password fails', async () => {
		await expect(login({ email: user.email, password: user.password + '_' })).rejects.toThrow();
	});


	test('login with correct password success', async () => {
		let { user: loggedInUser } = await login(user);

		expect(loggedInUser).toBeDefined();
		expect(loggedInUser.name).toBe(user.name);
		expect(loggedInUser.email).toBe(user.email);
		expect(loggedInUser.password).not.toBeDefined();
	});


	test('logout fails with wrong id', async () => {
		await expect(logout()).rejects.toThrow();
	});


	test('logout not fails', async () => {
		await logout({ id });
	});

});


