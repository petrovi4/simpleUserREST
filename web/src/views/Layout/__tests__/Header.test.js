import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Header from '../Header';
import { store_authorized as store_data } from '../../../setupTests';


describe('Header', () => {
	const store = configureStore([thunk])(store_data);

	const TestProvider = ({
		store,
		children,
	}) => <Provider store={store}>{children}</Provider>;

	it('renders without crashing', () => {
		render(<TestProvider store={store}><Header /></TestProvider>);
	});

});
