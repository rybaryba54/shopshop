import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword } from '../../firebase'

export const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate('/dashboard')
	}, [user])

	const onBtnClick = e => {
		e.preventDefault()
		logInWithEmailAndPassword(email, password)
	}

	return (
		<form className='flex flex-col justify-center items-center bg-white rounded shadow-lg p-12 my-auto sm:mx-auto'>
			<label className='font-semibold text-xs' htmlFor='usernameField'>
				Почта
			</label>
			<input
				className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2'
				type='text'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<label className='font-semibold text-xs mt-3' htmlFor='passwordField'>
				Пароль
			</label>
			<input
				className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2'
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button
				onClick={onBtnClick}
				className='flex items-center justify-center h-12 px-6 w-64 bg-violet-500 mt-8 rounded font-semibold text-sm text-violet-100 hover:bg-violet-700'
			>
				Войти
			</button>
		</form>
	)
}
