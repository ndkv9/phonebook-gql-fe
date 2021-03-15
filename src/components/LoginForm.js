import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: error => {
			setError(error.graphQLErrors[0].message)
		},
	})

	// use useEffect for localStorage
	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)

			localStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data]) // eslint-disable-line

	const submit = async event => {
		event.preventDefault()
		login({ variables: { username, password } })
	}

	const handleUsernameChange = ({ target }) => {
		setUsername(target.value)
	}

	const handlePasswordChange = ({ target }) => {
		setPassword(target.value)
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username{' '}
					<input type='text' value={username} onChange={handleUsernameChange} />
				</div>
				<div>
					password{' '}
					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default LoginForm
