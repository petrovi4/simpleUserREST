import { ACTION_TYPES } from '../../enums';

const initialState = {};

function authReduser(auth = initialState, { type, error, user }) {
	switch (type) {

		case ACTION_TYPES.AUTH.REQUEST_IN_PROGRESS:
			return { ...auth, isFetching: true };


		case ACTION_TYPES.AUTH.LOGIN_SUCCESS:
			return { me: user };


		case ACTION_TYPES.AUTH.LOGIN_FAILURE:
			return { error, backgroundAuthReqCompleted: true };


		case ACTION_TYPES.AUTH.LOGOUT:
			return {};


		case ACTION_TYPES.AUTH.REGISTER_SUCCESS:
			return { me: user };


		case ACTION_TYPES.AUTH.REGISTER_FAILURE:
			return { backgroundAuthReqCompleted: true, error };


		case ACTION_TYPES.AUTH.REQUEST_COMPLETED:
			return { ...auth, isFetching: false };


		case ACTION_TYPES.USER.FETCHED_ONE:
			if (user?.id && user.id == auth.me?.id) return { ...auth, me: user };
			else return auth;


		default:
			return auth;
	}
}

export default authReduser;
