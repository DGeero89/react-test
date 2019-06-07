import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';
const Register = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleOnChange = (event, key) => {
		if (key === 'email') {
			setEmail(event.currentTarget.value);
		} else if (key === 'password') {
			setPassword(event.currentTarget.value);
		}
	};

	const handleOnSubmit = event => {
		console.log('SUBMIT');

		// Reset our error every time the form is submitted
		setError(null);
		setSuccessMessage(null);
		setLoading(true);

		fetch('http://localhost:5000/api/auth/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(response => {
				console.log('SUCCESS');
				console.log(response);
				const json = response.json();
				if (response.ok) {
					return json;
				}

				return json.then(data => Promise.reject(data));
			})
			.then(json => {
				setLoading(false);
				localStorage.setItem('token', json.token);
				setSuccessMessage('User Registered Sucessfully.');
				props.history.push('/todos');
			})
			.catch(error => {
				setLoading(false);
				setError(error.error);
			});
		event.preventDefault(); // to prevent the form from submitting
	};
	return (
		<div className="App">
			<h1>Register</h1>
			<form onSubmit={handleOnSubmit}>
				<input
					type="email"
					onChange={event => handleOnChange(event, 'email')}
					required="required"
					value={email}
					placeholder="Email address"
					disabled={loading}
				/>
				<input
					type="password"
					onChange={event => handleOnChange(event, 'password')}
					required="required"
					value={password}
					placeholder="Password"
					disabled={loading}
				/>
				{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<button type="submit" disabled={loading}>
					Submit
				</button>
			</form>
		</div>
	);
};
export default withRouter(Register);
