import { describe, expect, it } from 'vitest';

import {
	authSlice,
	clearErrorMessage,
	onLogin,
	onLogout,
} from '../../../store/auth/authSlice';

import {
	authInitialState,
	authenticatedState,
	notAuthenticatedState,
} from '../../fixtures/authState';

import { testUserCredentials } from '../../fixtures/testUser';

describe('Testing authSlice', () => {
	it('Should return the initial state', () => {
		expect(authSlice.getInitialState()).toEqual(authInitialState);
	});

	it('Should login with the testUserCredentials', () => {
		const state = authSlice.reducer(
			authInitialState,
			onLogin(testUserCredentials)
		);

		expect(state).toEqual({
			...authenticatedState,
			user: testUserCredentials,
		});
	});

	it('Should logout', () => {
		const state = authSlice.reducer(authenticatedState, onLogout());

		expect(state).toEqual(notAuthenticatedState);
	});

	it('Should logout with a error message', () => {
		const errorMessage = 'Incorrect credentials';

		const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

		expect(state).toEqual({
			...notAuthenticatedState,
			errorMessage,
		});
	});

	it('should logout with an error message and should subsequently clear the errorMessage property', () => {
		const errorMessage = 'Incorrect credentials';

		let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

		expect(state).toEqual({
			...notAuthenticatedState,
			errorMessage,
		});

		state = authSlice.reducer(notAuthenticatedState, clearErrorMessage());

		expect(state).toEqual(notAuthenticatedState);
	});
});
