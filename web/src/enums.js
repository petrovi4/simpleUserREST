export const ACTION_TYPES = Object.freeze({

	DUMMY_ACTION: 'DUMMY_ACTION',


	DASHBOARD: Object.freeze({
		REQUEST_IN_PROGRESS: 'DASHBOARD.REQUEST_IN_PROGRESS',
	}),


	AUTH: Object.freeze({
		REQUEST_IN_PROGRESS: 'AUTH.REQUEST_IN_PROGRESS',
		REQUEST_COMPLETED: 'AUTH.REQUEST_COMPLETED',

		LOGIN_SUCCESS: 'AUTH.LOGIN_SUCCESS',
		LOGIN_FAILURE: 'AUTH.LOGIN_FAILURE',
		LOGOUT: 'AUTH.LOGOUT',

		UPDATE_REGISTER_PARAMS: 'AUTH.UPDATE_REGISTER_PARAMS',
		REGISTER_SUCCESS: 'AUTH.REGISTER_SUCCESS',
		REGISTER_FAILURE: 'AUTH.REGISTER_FAILURE',
	}),


	USER: Object.freeze({
		FETCHED_ONE: 'USER.FETCHED_ONE',
	}),

});
