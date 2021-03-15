import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';

import App from './App';
import { store_initial, store_not_authorized, store_error_login, store_authorized } from './setupTests';

function providerWithData(store_data) {
	const store = configureStore([thunk])(store_data);
	return ({ children }) => <Provider store={store}><Router>{children}</Router></Provider>;
}

describe('App', () => {

	it('initial loading', async () => {
		let TestProvider = providerWithData(store_initial);

		render(<TestProvider><App /></TestProvider>);
		await screen.findByText(/loading/i);
	});


	it('login for unauthorized user', async () => {
		let TestProvider = providerWithData(store_not_authorized);

		render(<TestProvider><App /></TestProvider>);
		screen.getAllByText(/login/i);
	});


	it('login for unauthorized user', async () => {
		let TestProvider = providerWithData(store_not_authorized);

		render(<TestProvider><App /></TestProvider>);
		screen.getAllByText(/login/i);
	});


	it('error after unsuccessful authorization', async () => {
		let TestProvider = providerWithData(store_error_login);

		render(<TestProvider><App /></TestProvider>);
		screen.getAllByText(/User with this email not registered/i);
	});


	it('successful authorized', async () => {
		let TestProvider = providerWithData(store_authorized);

		render(<TestProvider><App /></TestProvider>);
		screen.getAllByText(/Welcome Test User/i);
	});


});
