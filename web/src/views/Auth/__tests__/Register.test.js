import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import Register from '../Register';
import { store_authorized } from '../../../setupTests';


describe('Register', () => {
	const store = configureStore([thunk])(store_authorized);

	const TestProvider = ({
		store,
		children,
	}) => <Provider store={store}>{children}</Provider>;


	it('renders without crashing', () => {
		render(<TestProvider store={store}><Register /></TestProvider>);
	});

});
