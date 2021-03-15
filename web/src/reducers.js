import { combineReducers } from 'redux';

import auth from './views/Auth/AuthReducer';

export default function createReducer(asyncReducers) {
	return combineReducers({
		auth,
		...asyncReducers,
	});
}
