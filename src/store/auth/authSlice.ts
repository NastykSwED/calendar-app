import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

const authInitialState: AuthStateProps = {
	status: 'checking', //authenticated, not-authenticated
	user: {} as onUserProps,
	errorMessage: undefined,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		onChecking: state => {
			state.status = 'checking';
			state.user = {} as onUserProps;
			state.errorMessage = undefined;
		},
		onLogin: (state, { payload }: PayloadAction<onUserProps>) => {
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }: PayloadAction<onErrorMessage>) => {
			state.status = 'not-authenticated';
			state.user = {} as onUserProps;
			state.errorMessage = payload;
		},
		clearErrorMessage: state => {
			state.errorMessage = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;
