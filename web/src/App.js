import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './App.scss';

import api from './api';


// Containers
import Layout from './views/Layout';
import { backgroundAuth } from './views/Auth/AuthActions';


// Pages
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import ResetPassword from './views/Auth/ResetPassword';



const SplashScreen = () => <div className="text-center">Loading ...</div>;


class App extends Component {
	constructor(props) {
		super(props);

		api.addHttpTransport('/api/v1.0');
	}


	render() {
		const { backgroundAuthReqCompleted, isAuthorized } = this.props;

		// Initial state - not authorized, no requests in progress
		if (backgroundAuthReqCompleted == undefined && !isAuthorized) {
			this.props.tryBackgroundAuth();
			return SplashScreen();
		}

		// Background authorization on progress (based on stored JWT)
		else if (!backgroundAuthReqCompleted && !isAuthorized) {
			return SplashScreen();
		}

		// User not authorized
		else if (!isAuthorized) {
			return (
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/reset" component={ResetPassword} />
					<Redirect to="/login" />
				</Switch>
			);
		}

		// The user is already logged in, but opened the login, register or reset page manually
		else if (['/login', '/register', '/reset'].indexOf(this.props.location.pathname) > -1) return <Redirect to="/" />;

		else return <Layout />;
	}
}


const mapStateToProps = state => {
	return {
		backgroundAuthReqCompleted: state.auth?.backgroundAuthReqCompleted,
		isAuthorized: typeof state.auth?.me?.id == 'number',
		inMaintenance: state.app?.inMaintenance,
	};
};



const mapDispatchToProps = dispatch => {
	return {
		tryBackgroundAuth: () => dispatch(backgroundAuth()),
	};
};



export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
