import { ACTION_TYPES } from '../../enums';


const initialState = {};

function dashboardReduser(dashboard = initialState, { type, stat, events }) {
	switch (type) {

		case ACTION_TYPES.DASHBOARD.REQUEST_IN_PROGRESS:
			return { ...dashboard, isFetching: true };

		case ACTION_TYPES.DASHBOARD.STAT_RECEIVED:
			return { ...dashboard, isFetching: false, stat };

		case ACTION_TYPES.DASHBOARD.EVENTS_RECEIVED:
			return { ...dashboard, isFetching: false, events };


		default:
			return dashboard;
	}
}

export default dashboardReduser;
