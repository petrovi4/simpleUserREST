import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';


// routes config
import routes from '../../routes';

import Footer from './Footer';
import Header from './Header';


export default function Layout() {


	return (
		<div className="app">
			<Header />
			<div className="app-body">
				<main className="main">
					<Container fluid>
						<Switch>
							{routes.map((route, idx) => {
								return route.component ? (
									<Route
										key={idx}
										path={route.path}
										exact={route.exact}
										name={route.name}
										render={props => (
											<route.component {...props} />
										)} />
								) : (null);
							})}
							<Redirect from="/" to="/dashboard" />
						</Switch>
					</Container>
				</main>
			</div>
			<Footer />
		</div>
	);

}
