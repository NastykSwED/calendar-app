import { render, renderHook, act, waitFor } from '@testing-library/react';

import { describe, vi, it, expect, expectTypeOf } from 'vitest';

import { useAuthStore } from '../../hooks/useAuthStore';

import React from 'react';

import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '../../store/auth/authSlice';

import {
	authInitialState,
	notAuthenticatedState,
	authenticatedState,
} from '../fixtures/authState';

import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../api/calendarApi';

const getMockStore = (initialState: AuthStateProps) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
		},
		preloadedState: {
			auth: {
				...initialState,
			},
		},
	});
};

describe('Testing useAuthStore', () => {
	it('Should return the default values', () => {
		const mockStore = getMockStore({ ...authInitialState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		expect(result.current).toEqual({
			status: expect.any(String),
			user: expect.any(Object),
			errorMessage: undefined,
			startLogin: expect.any(Function),
			startRegister: expect.any(Function),
			checkAuthToken: expect.any(Function),
			startLogout: expect.any(Function),
		});
	});

	it('startLogin should login correctly', async () => {
		localStorage.clear();

		const mockStore = getMockStore({ ...notAuthenticatedState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		await act(async () => {
			await result.current.startLogin({
				email: testUserCredentials.email,
				password: testUserCredentials.password,
			});
		});

		expect(result.current.user).toEqual({
			name: testUserCredentials.name,
			uid: testUserCredentials.uid,
		});
	});

	it("startLogin shouldn't login", async () => {
		localStorage.clear();

		const mockStore = getMockStore({ ...notAuthenticatedState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		await act(async () => {
			await result.current.startLogin({
				email: 'invalid@gmail.com',
				password: '123456',
			});
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: 'Incorrect credentials',
			status: 'not-authenticated',
			user: {},
		});

		await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
	});

	it('startRegister should create a new user', async () => {
		localStorage.clear();

		const mockStore = getMockStore({ ...authInitialState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		const data = {
			ok: true,
			uid: '63aa13f9d8db03beb157a7d5',
			name: 'Test User',
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2FhMTNmOWQ4ZGIwM2JlYjE1N2E3ZDUiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjcyMTcxNTQ3LCJleHAiOjE2NzIxNzg3NDd9.rsPIAH0Mte2VNwJXwWsghQ0SAUZhaL0BK8KEbiYC8RU',
		};

		const spy = vi.spyOn(calendarApi, 'post').mockResolvedValue({
			data,
		});

		await act(async () => {
			await result.current.startRegister({
				email: 'test2@gmail.com',
				password: '123456',
				name: 'test2',
			});
		});

		expect(spy).toBeCalled();

		expect(spy).toBeCalledWith('/auth/new', {
			email: 'test2@gmail.com',
			name: 'test2',
			password: '123456',
		});

		spy.mockRestore();
	});

	it("startRegister shouldn't create a new user", async () => {
		localStorage.clear();

		const mockStore = getMockStore({ ...authInitialState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		await act(async () => {
			await result.current.startRegister({
				email: 'test2@gmail.com',
				password: '123456',
				name: 'test2',
			});
		});

		expect(result.current.errorMessage).toBe(
			'The user already exists with that email address'
		);
	});

	it('checkAuthToken should failed if there is no token', async () => {
		localStorage.clear();

		const mockStore = getMockStore({ ...authInitialState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		await act(async () => {
			await result.current.checkAuthToken();
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			...notAuthenticatedState,
		});
	});

	it('checkAuthToken should login the user if there is token', async () => {
		localStorage.clear();

		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2FhMTNmOWQ4ZGIwM2JlYjE1N2E3ZDUiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjcyMTcxNTQ3LCJleHAiOjE2NzIxNzg3NDd9.rsPIAH0Mte2VNwJXwWsghQ0SAUZhaL0BK8KEbiYC8RU'
		);

		const mockStore = getMockStore({ ...authInitialState });

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper,
		});

		await act(async () => {
			await result.current.checkAuthToken();
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			...authenticatedState,
			user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
		});
	});
});
