import { User } from '../dto';

import { hasChar, hasDigit, validateEmail } from '../helpers/validation';
import { generateAuthTokens, hashPassword } from '../helpers/auth';


// Not naive registration implies the need to validate an email or phone number.
// This task is beyond the scope of the test server, so we implement naive registration.
export async function registerNaive({ name, email, password }) {

	// The initial adaptation parameters
	name = ('string' === typeof name) ? name.trim() : '';
	email = ('string' === typeof email) ? email.trim().toLocaleLowerCase() : '';
	password = ('string' === typeof password) ? password.trim() : '';

	return new Promise(resolve => {
		// Checking the parameters

		if (name.length < 5) throw new Error('Wrong name');
		if (!validateEmail(email)) throw new Error('Wrong email');
		if (password.length < 8 || !hasDigit(password) || !hasChar(password)) throw new Error('Wrong password');

		resolve();
	})


		.then(async () => {
			// Check is user with same email already exists
			const existingUser = await User.findOne({ where: { email }, attributes: ['id'] });
			if (existingUser) throw new Error('User with same email already exists');
		})


		.then(async () => {
			// Creating a user and saving it in the database

			const hpassword = hashPassword(email, password);

			return await User.create({
				name,
				email,
				hpassword,
				created: Date().toString()
			});
		})


		.then(async user => {
			// It's time to create JWT for registerd user

			const { token, xsrfToken } = generateAuthTokens(user);

			return { user, token, xsrfToken };
		})


		.catch(err => {
			console.error(err);
			// Catch error, process, save and notify admin
			throw err;
		});
}



export async function login({ email, password }) {

	// The initial adaptation parameters
	email = ('string' === typeof email) ? email.trim().toLocaleLowerCase() : '';
	password = ('string' === typeof password) ? password.trim() : '';

	return new Promise(resolve => {
		// Checking the parameters

		if (!validateEmail(email)) throw new Error('Wrong email');
		if (!password.length) throw new Error('Wrong password');

		resolve();
	})


		.then(async () => {
			// Check is password correct

			const existingUser = await User.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'hpassword'] });
			if (!existingUser) throw new Error('User with this email not registered');

			const hpasswordPassed = hashPassword(email, password);
			if (existingUser.hpassword !== hpasswordPassed) throw new Error('Bad password for existing user');

			return existingUser;
		})


		.then(async user => {
			// It\'s time to create JWT for authorized user

			const { token, xsrfToken } = generateAuthTokens(user);

			return { user, token, xsrfToken };
		})


		.catch(err => {
			console.error(err);
			// Catch error, process, save and notify admin
			throw err;
		});
}


// Dummy function with no BL, just for stat, event handler and clear cache (if needed)
export async function logout({ id } = {}) {

	return new Promise(resolve => {
		if (!id) throw new Error('No user id');
		resolve();
	})


		.then(async () => {
			// Do some cleaning stuff
			// ...
		})


		.catch(err => {
			console.error(err);
			// Catch error, process, save and notify admin
			throw err;
		});
}


export async function getOne({ id }) {

	id = ('number' === typeof id) ? parseInt(id) : 0;

	return new Promise(resolve => {
		if (!id) throw new Error('Wrong id');
		resolve();
	})


		.then(async () => {
			const user = await User.findByPk(id, { attributes: ['id', 'name', 'email'] });
			if (!user) throw new Error('User not found');

			return user;
		})


		.catch(err => {
			console.error(err);
			// Catch error, process, save and notify admin
			throw err;
		});
}
