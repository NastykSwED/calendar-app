import React, { useEffect, useState } from 'react';

import {
	Avatar,
	Button,
	Grid,
	TextField,
	Typography,
	Link as LinkMUI,
} from '@mui/material';

import { LockOutlined } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { useForm, useAuthStore } from '../../hooks';

import Swal from 'sweetalert2';

const loginFormFields: loginFieldsProps = {
	loginEmail: '',
	loginPassword: '',
};

export const LoginPage = () => {
	const { startLogin, errorMessage } = useAuthStore();

	const { loginEmail, loginPassword, handleInputChange } =
		useForm(loginFormFields);

	const handleLoginSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		startLogin({ email: loginEmail!, password: loginPassword! });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Authentication failed', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems={'center'}
			justifyContent='center'
			sx={{
				minHeight: '100vh',
				bgcolor: 'white',
				padding: 4,
			}}
		>
			<Grid
				item
				className='box-shadow'
				textAlign='center'
				xs={3}
				sx={{
					width: { sm: 450 },
					backgroundColor: 'white',
					padding: 3,
					borderRadius: 2,
				}}
			>
				<Avatar
					sx={{
						margin: '0 auto',
						bgcolor: 'purple',
					}}
				>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5' sx={{ mt: 1, mb: 1 }}>
					Sign in
				</Typography>
				<form id='login-form' onSubmit={handleLoginSubmit}>
					<Grid container>
						<Grid item xs={12} sx={{ mt: 2, bgcolor: 'white' }}>
							<TextField
								label='Email'
								type={'email'}
								placeholder={'JohnDoe@gmail.com'}
								fullWidth
								name='loginEmail'
								value={loginEmail}
								onChange={handleInputChange}
								required
							></TextField>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								label='Password'
								type={'password'}
								placeholder={'Password'}
								fullWidth
								name='loginPassword'
								value={loginPassword}
								onChange={handleInputChange}
								required
							></TextField>
						</Grid>

						<Grid container spacing={0} sx={{ mb: 2, mt: 2 }}>
							<Grid item xs={12}>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									aria-label='Login Button'
								>
									Sign In
								</Button>
							</Grid>
						</Grid>

						<Grid container direction={'row'} justifyContent={'end'}>
							<LinkMUI underline='none' component={Link} to='/auth/register'>
								Don't have an account? Sign Up
							</LinkMUI>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
