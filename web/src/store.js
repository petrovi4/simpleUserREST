import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import createReducer from './reducers';

let asyncReducers = {};

function configureStore(initialState = {}) {
	const enhancers = [applyMiddleware(thunk, logger)];

	if (
		process.env.NODE_ENV === 'development' &&
		window['__REDUX_DEVTOOLS_EXTENSION__']
	) {
		enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
	}

	return createStore(createReducer(asyncReducers), initialState, compose(...enhancers));
}

const store = configureStore();

function injectAsyncReducer(store, name, asyncReducer) {
	asyncReducers[name] = asyncReducer;
	store.replaceReducer(createReducer(asyncReducers));
}


export { store, injectAsyncReducer };
