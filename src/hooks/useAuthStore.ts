import { useAppSelector, useAppDispatch } from './useRedux';

import calendarApi from '../api/calendarApi';

import { AxiosError, AxiosResponse } from 'axios';

import {
	clearErrorMessage,
	onChecking,
	onLogin,
	onLogout,
	onLogoutCalendar,
} from '../store';

type loginProps = {
	email: string;
	password: string;
};

type registerProps = {
	email: string;
	password: string;
	name: string;
};

export const useAuthStore = () => {
	const { status, user, errorMessage } = useAppSelector(state => state.auth);

	const dispatch = useAppDispatch();

	/* Login Dispatch */
	const startLogin = async ({ email, password }: loginProps) => {
		dispatch(onChecking());

		try {
			const res: AxiosResponse<loginUserProps> = await calendarApi.post(
				'/auth',
				{
					email,
					password,
				}
			);

			const { data } = res;

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());

			dispatch(
				onLogin({
					name: data.name,
					uid: data.uid,
				})
			);
		} catch (error) {
			dispatch(onLogout('Incorrect credentials'));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	/* Register Dispatch */
	const startRegister = async ({ email, password, name }: registerProps) => {
		dispatch(onChecking());

		try {
			const resp: AxiosResponse<createUserProps> = await calendarApi.post(
				'/auth/new',
				{
					email,
					name,
					password,
				}
			);

			const { data } = resp;

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());

			dispatch(
				onLogin({
					name: data.name,
					uid: data.uid,
				})
			);
		} catch (error) {
			dispatch(
				onLogout((error as AxiosError<errorResponseTypes>).response?.data?.msg)
			);

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');

		if (!token) return dispatch(onLogout(undefined));
		try {
			const resp: AxiosResponse<renewUserProps> = await calendarApi.get(
				'/auth/renew'
			);

			const { data } = resp;

			localStorage.setItem('token', data.token);

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());

			dispatch(
				onLogin({
					name: data.name,
					uid: data.uid,
				})
			);
		} catch (error) {
			localStorage.clear();

			dispatch(onLogout(undefined));
		}
	};

	const startLogout = () => {
		localStorage.clear();

		dispatch(onLogoutCalendar());

		dispatch(onLogout(undefined));
	};

	return {
		status,
		user,
		errorMessage,
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
