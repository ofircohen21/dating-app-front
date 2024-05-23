import StartPage from './components/StartPage/StartPage';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import TermsPage from './components/TermsPage/TermsPage';
import React, { useEffect, useState } from 'react';
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ChatsPage from './components/ChatsPage/ChatsPage';
import LikesPage from './components/LikesPage/LikesPage';

function App() {
	const [userId, setUserId] = useState('')
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [filters, setFilters] = useState({ minAge: 18, maxAge: 35, distance: 20, gender: 'Female' })

	const navigate = useNavigate()

	useEffect(() => {
		const user = localStorage.getItem('user')
		if (user) {
			const userData = JSON.parse(user)
			setUserId(userData.userId)
			setIsAuthenticated(true)
		} else {
			navigate('/login')
		}
	}, [userId])

	const onFiltersUpdate = (filters) => {
		setFilters(filters)
	}

	const onUserLogin = (responseBody) => {
		setUserId(responseBody.userId)
		setIsAuthenticated(true)
		localStorage.setItem('user', JSON.stringify(responseBody));
	}

	const onLogout = () => {
		setUserId(0)
		setIsAuthenticated(false)
		localStorage.removeItem('user')
		navigate('/login')
	}

	const onDeleteAccount = () => {
		setUserId(0)
		setIsAuthenticated(false)
		navigate('/')
	}

	return (
		<Routes>
			<Route exact path='/terms' Component={TermsPage} />
			<Route exact path='/privacy' Component={PrivacyPolicyPage} />
			<Route exact path='/signup' Component={SignUpPage} />
			<Route exact path='/login' element={isAuthenticated ? <Navigate to='/home' replace={true} /> : <LoginPage onLogin={onUserLogin} />} />
			<Route exact path='/home' element={<HomePage userId={userId} filters={filters} onFiltersUpdate={onFiltersUpdate} />} />
			<Route exact path='/profile' element={<ProfilePage userId={userId} onLogout={onLogout} onDeleteAccount={onDeleteAccount} />} />
			<Route exact path='/chats' element={<ChatsPage userId={userId} />} />
			<Route exact path='/likes' element={<LikesPage userId={userId} />} />
			<Route path='/' Component={StartPage} />
		</Routes>
	);
}

export default App;






/*


 */