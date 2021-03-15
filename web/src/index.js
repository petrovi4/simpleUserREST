import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store';

import App from './App';


const mountApp = document.getElementById('root');

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	mountApp
);
