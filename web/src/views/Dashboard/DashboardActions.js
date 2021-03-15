import api from '../../api';

import { ACTION_TYPES } from '../../enums';



export function getDashboardStat() {
	return dispatch => {
		dispatch({ type: ACTION_TYPES.DASHBOARD.REQUEST_IN_PROGRESS });

		api.client.rest
			.getDashboardStat()
			.then(stat => {
				dispatch({ type: ACTION_TYPES.DASHBOARD.STAT_RECEIVED, stat });
				return stat;
			})
			.catch(error => {
				console.error(error);
				dispatch({ type: ACTION_TYPES.APP.UNKNOWN_ERROR });
				throw error;
			});
	};
}



export function getLastEvents() {
	return dispatch => {
		dispatch({ type: ACTION_TYPES.DASHBOARD.REQUEST_IN_PROGRESS });

		api.events.rest
			.getMany()
			.then(events => {
				dispatch({ type: ACTION_TYPES.DASHBOARD.EVENTS_RECEIVED, events });
				return events;
			})
			.catch(error => {
				console.error(error);
				dispatch({ type: ACTION_TYPES.APP.UNKNOWN_ERROR });
				throw error;
			});
	};
}



