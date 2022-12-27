export const authInitialState: AuthStateProps = {
	status: 'checking', //authenticated, not-authenticated
	user: {} as onUserProps,
	errorMessage: undefined,
};

export const authenticatedState: AuthStateProps = {
	status: 'authenticated', //authenticated, not-authenticated
	user: {
		uid: 'ABC',
		name: 'Ronald',
	},
	errorMessage: undefined,
};

export const notAuthenticatedState: AuthStateProps = {
	status: 'not-authenticated', //authenticated, not-authenticated
	user: {} as onUserProps,
	errorMessage: undefined,
};
