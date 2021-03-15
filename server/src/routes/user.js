import { Router } from 'express';

import { registerNaive, getOne, login, logout } from '../controllers/user';

import { auth } from '../helpers/auth';
import { errorRes, successRes } from '../helpers/responses';

const userRouter = Router();

const userSerializer = user => ({
	id: user.id,
	name: user.name,
	email: user.email,
	created: user.created,
});


userRouter.post('/', ({ body: { name, email, password } = {} }, res) => {
	registerNaive({ name, email, password })
		.then(({ user, token, xsrfToken }) => {
			res.set('x-xsrf-token-user', xsrfToken);
			res.cookie('token-user', token, { httpOnly: true });
			successRes(res, user, userSerializer);
		})
		.catch(err => errorRes(res, err));
});


userRouter.post('/login', ({ body: { email, password } = {} }, res) => {
	login({ email, password })
		.then(({ user, token, xsrfToken }) => {
			res.set('x-xsrf-token-user', xsrfToken);
			res.cookie('token-user', token, { httpOnly: true });
			successRes(res, user, userSerializer);
		})
		.catch(err => errorRes(res, err));
});


userRouter.get('/', auth, ({ user }, res) => {
	getOne({ id: user?.id })
		.then(user => successRes(res, user, userSerializer))
		.catch(err => errorRes(res, err));
});


userRouter.all('/logout', auth, ({ user }, res) => {
	logout({ id: user?.id })
		.then(() => {
			res.clearCookie('token-user');
			successRes(res);
		})
		.catch(err => errorRes(res, err));
});


export default userRouter;
