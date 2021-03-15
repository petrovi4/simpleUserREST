import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '..';
import { store_authorized as store_data } from '../../../setupTests';


describe('Layout', () => {
	const store = configureStore([thunk])(store_data);

	const TestProvider = ({
		store,
		children,
	}) => <Provider store={store}><Router>{children}</Router></Provider>;

	it('renders without crashing', () => {
		render(<TestProvider store={store}><Layout /></TestProvider>);
	});

});
