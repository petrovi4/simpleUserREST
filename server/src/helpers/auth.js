import { randomBytes, createHash } from 'crypto';
import jwt, { verify } from 'jsonwebtoken';

import { join } from 'path';
import { readFileSync } from 'fs';
const privateKey = readFileSync(join(__dirname, '../../jwtRS256.key'));
const publicKey = readFileSync(join(__dirname, '../../jwtRS256.key.pub'));


export function hashPassword(login, password) {
	if ('string' !== typeof login || 'string' !== typeof password) throw new Error('Wrong login or password');
	if (!process.env.SALT) throw new Error('SALT not defined');
	var hpassword = createHash('sha1')
		.update(login.trim().toLowerCase() + password + process.env.SALT)
		.digest('hex');
	return hpassword;
}


// Parse JSON Web Token, build user and fill request with authenticated user
export function parseUser(req, _res, next) {
	let xsrfToken = req.headers && req.headers['x-xsrf-token-user'];
	const token = req.cookies && req.cookies['token-user'];

	if (token && xsrfToken) {
		verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
			if (!err && (!decoded || !decoded.user || !decoded.xsrfToken)) err = new Error('Wrong Token Structure: ' + decoded);
			else if (!err && xsrfToken != decoded.xsrfToken) err = new Error('Wrong xxsrftoken: ' + xsrfToken + ':' + decoded);

			if (!err) req.user = decoded?.user;

			next();
		});
	}
	else next();
}


// Create JSON Web Token
export function generateAuthTokens(user) {
	const xsrfToken = Buffer.from(randomBytes(16)).toString('hex');

	var jwtParams = {
		xsrfToken,
		user: {
			id: user.id,
			name: user.name,
		},
	};

	const token = jwt.sign(jwtParams, privateKey, { algorithm: 'RS256' });

	return { token, xsrfToken };
}


// Check is user authenticated
export function auth(req, res, next) {
	let user = req.user;
	if (!user?.id) next(new Error('User is not authenticated'));
	else next();
}
