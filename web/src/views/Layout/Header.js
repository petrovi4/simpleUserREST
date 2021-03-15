import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequest } from '../Auth/AuthActions';

import './Layout.scss';


export default function Header() {
	let dispatch = useDispatch();

	const user = useSelector(state => state.auth?.me);

	const handleSelect = eventKey => {
		if ('logout' === eventKey) dispatch(logoutRequest());
	};

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">Simple User REST</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Nav variant="pills" onSelect={handleSelect}>
					<NavDropdown title={user.name} id="user-dropdown">
						<NavDropdown.Item eventKey="logout">Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

}
