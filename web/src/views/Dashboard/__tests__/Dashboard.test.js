import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Dashboard from '../Dashboard';
import { store_authorized as store_data } from '../../../setupTests';


describe('Dashboard', () => {
	const store = configureStore([thunk])(store_data);

	const TestProvider = ({
		store,
		children,
	}) => <Provider store={store}>{children}</Provider>;

	it('renders without crashing', () => {
		render(<TestProvider store={store}><Dashboard /></TestProvider>);
	});

});
