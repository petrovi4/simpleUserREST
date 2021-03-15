import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequest } from '../Auth/AuthActions';


export default function Dashboard() {
	let dispatch = useDispatch();

	const user = useSelector(state => state.auth?.me);

	const handleLogout = () => dispatch(logoutRequest());

	return (
		<div className="app flex-row align-items-center">
			<Container>

				<Row className="justify-content-center">
					<Col lg="6" md="8" sm="10" xs="12">

						<Card className="mx-4">

							<Card.Body className="p-4">
								Welcome {user.name}! To logout click <a href="#" onClick={handleLogout}>here</a>
							</Card.Body>
						</Card>

					</Col>
				</Row>

			</Container>
		</div>
	);
}
