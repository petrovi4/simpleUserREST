import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function ResetPassword() {

	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<Col lg="6" md="8" sm="10" xs="12">

						<Card className="mx-4">

							<Card.Body className="p-4">
								<h1>Reset password</h1>
								<p className="text-muted">is out of scope of this app</p>
							</Card.Body>

						</Card>

					</Col>
				</Row>
			</Container>
		</div>
	);
}
