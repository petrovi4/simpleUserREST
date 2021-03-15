import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Container, Form, InputGroup, Row, Alert } from 'react-bootstrap';

import { registerRequest } from './AuthActions';

import './Auth.css';
import { validateEmail, validateName, validatePassword } from '../../helpers';


export default function Register() {
	let dispatch = useDispatch();

	const isFetching = useSelector(state => state.auth?.isFetching);
	const error = useSelector(state => state.auth?.error);

	const { register, errors, handleSubmit } = useForm();
	const onSubmit = data => dispatch(registerRequest(data));

	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<Col lg="6" md="8" sm="10" xs="12">

						<Card className="mx-4">

							<Card.Body className="p-4">
								<Form onSubmit={handleSubmit(onSubmit)}>
									<h1>Registration</h1>
									<p className="text-muted">Welcome, new user</p>

									{/* Name */}
									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text><i className="fa fa-user" aria-hidden="true"></i></InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											name="name"
											type="text"
											placeholder="You full name"
											autoComplete="name"
											ref={register({ required: true, validate: validateName })}
											isInvalid={errors?.name}
										/>
										<Form.Control.Feedback type="invalid">
											The full name should be at least 5 characters long.
										</Form.Control.Feedback>
									</InputGroup>

									{/* Email */}
									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text>@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											name="email"
											type="email"
											placeholder="Email"
											autoComplete="email"
											ref={register({ required: true, validate: validateEmail })}
											isInvalid={errors?.email}
										/>
										<Form.Control.Feedback type="invalid">
											Invalid email.
										</Form.Control.Feedback>
									</InputGroup>


									{/* Password */}
									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text><i className="fa fa-key" aria-hidden="true"></i></InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											name="password"
											type="password"
											placeholder="Password"
											autoComplete="password"
											ref={register({ required: true, validate: validatePassword })}
											isInvalid={errors?.password}
										/>
										<Form.Control.Feedback type="invalid">
											The password should be minimum 8 characters with at least one number and one character.
										</Form.Control.Feedback>
									</InputGroup>


									<Alert variant="danger" className={error ? '' : 'd-none'}>
										{error?.message}
									</Alert>

									<React.Fragment>
										<Button type="submit" variant="success" block disabled={isFetching}>Register</Button>
									</React.Fragment>

								</Form>
							</Card.Body>

							<Card.Footer className="p-4">
								<Row>
									<Col xs="8" className="text-left">
										<a href="/login" color="link" className="px-0">Are you already registered?</a>
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
