import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Container, Form, InputGroup, Row, Alert } from 'react-bootstrap';

import { loginRequest } from './AuthActions';
import { validateEmail } from '../../helpers';


export default function Login() {
	let dispatch = useDispatch();

	const isFetching = useSelector(state => state.auth?.isFetching);
	const error = useSelector(state => state.auth?.error);

	const { register, errors, handleSubmit } = useForm();
	const onSubmit = data => dispatch(loginRequest(data));

	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<Col lg="6" md="8" sm="10" xs="12">

						<Card className="mx-4">

							<Card.Body className="p-4">
								<Form onSubmit={handleSubmit(onSubmit)}>
									<h1>Login</h1>
									<p className="text-muted">To log in, fill out the parameters in the form</p>

									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text>@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											name="email"
											type="email"
											placeholder="E-mail"
											autoComplete="username"
											ref={register({ required: true, validate: validateEmail })}
											isInvalid={errors.email}
										/>
										<Form.Control.Feedback type="invalid">
											Invalid email.
										</Form.Control.Feedback>

									</InputGroup>


									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text><i className="fa fa-key" aria-hidden="true"></i></InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											name="password"
											type="password"
											placeholder="Password"
											autoComplete="password"
											ref={register({ required: true })}
										/>
									</InputGroup>

									{error && <Alert variant="danger">
										{error?.message}
									</Alert>}

									{error && <Alert variant="warning">
										<a href="/reset" variant="link" className="px-0">
											Have you forgotten your password?<br />
											Click on this link to reset it.
										</a>
									</Alert>}

									<Button
										type="submit"
										variant="primary"
										block
										disabled={isFetching}
									>Login</Button>
								</Form>
							</Card.Body>

							<Card.Footer className="p-4">
								<Row>
									<Col xs="8" className="text-left">
										<a href="/register" variant="link" className="px-0">Not registered yet?</a>
									</Col>
								</Row>
							</Card.Footer>

						</Card>

					</Col>
				</Row>
			</Container>
		</div>
	);
}

