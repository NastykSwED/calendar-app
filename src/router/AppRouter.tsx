import { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/';

import { CalendarPage } from '../calendar';

import { useAuthStore } from '../hook/';

import { Loader } from '../components';

export const AppRouter = () => {
	const { status, checkAuthToken } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === 'checking') {
		return <Loader />;
	}

	return (
		<Routes>
			{status === 'not-authenticated' ? (
				<>
					<Route path='/auth/*' element={<AuthRoutes />} />
					<Route path='/*' element={<Navigate to='/auth/login' />} />
				</>
			) : (
				<>
					<Route path='/' element={<CalendarPage />} />
					<Route path='/*' element={<Navigate to='/' />} />
				</>
			)}
		</Routes>
	);
};
