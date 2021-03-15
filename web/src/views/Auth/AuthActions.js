import api from '../../api';

import { ACTION_TYPES } from '../../enums';



export function backgroundAuth() {
	return dispatch => {
		return api.user.rest
			.getCurrent()
			.then(user => {
				dispatch({ type: ACTION_TYPES.AUTH.LOGIN_SUCCESS, user });
			})
			.catch(() => {
				dispatch({ type: ACTION_TYPES.AUTH.LOGIN_FAILURE });
			});
	};
}



export function registerRequest({ name, email, password }) {
	return dispatch => {
		dispatch({ type: ACTION_TYPES.AUTH.REQUEST_IN_PROGRESS });

		console.log({ name, email, password });
		api.user.rest
			.register(name, email, password)
			.then(user => {
				dispatch({ type: ACTION_TYPES.AUTH.REGISTER_SUCCESS, user });
			})
			.catch(error => {
				return dispatch({ type: ACTION_TYPES.AUTH.REGISTER_FAILURE, error });
			});
	};
}



export function loginRequest({ email, password }) {
	return dispatch => {
		dispatch({ type: ACTION_TYPES.AUTH.REQUEST_IN_PROGRESS });

		api.user.rest
			.authorize(email, password)
			.then(user => {
				dispatch({ type: ACTION_TYPES.AUTH.LOGIN_SUCCESS, user });
			})
			.catch(error => {
				console.error(error);
				return dispatch({ type: ACTION_TYPES.AUTH.LOGIN_FAILURE, error });
			});
	};
}



export function logoutRequest() {
	return dispatch => {
		dispatch({ type: ACTION_TYPES.AUTH.REQUEST_IN_PROGRESS });

		api.user.rest
			.logout()
			.then(() => {
				dispatch({ type: ACTION_TYPES.AUTH.LOGOUT });
			})
			.catch(error => {
				console.error(error);
				dispatch({ type: ACTION_TYPES.AUTH.LOGOUT });
			});
	};
}


