import { useForm } from '../../hooks/useForm';
import {
	Avatar,
	Button,
	Grid,
	TextField,
	Typography,
	Link as LinkMUI,
} from '@mui/material';

import { Link } from 'react-router-dom';

import React from 'react';

import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';
import { LockOutlined } from '@mui/icons-material';

const registerFormFields: registerFieldProps = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
};

export const RegisterPage = () => {
	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		handleInputChange,
	} = useForm(registerFormFields);

	const { startRegister, errorMessage } = useAuthStore();

	const handleRegisterSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (registerPassword !== registerPassword2) {
			Swal.fire('Registration failed', 'Passwords are not the same');
			return;
		}

		startRegister({
			name: registerName!,
			password: registerPassword!,
			email: registerEmail!,
		});
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
				<Typography variant='h5' sx={{ mb: 1 }}>
					Sign up
				</Typography>
				<form id='register-form' onSubmit={handleRegisterSubmit}>
					<Grid container>
						<Grid item xs={12} sx={{ mt: 2, bgcolor: 'white' }}>
							<TextField
								label='Name'
								type={'text'}
								placeholder={'John Doe'}
								fullWidth
								name='registerName'
								value={registerName}
								onChange={handleInputChange}
								required
							></TextField>
						</Grid>

						<Grid item xs={12} sx={{ mt: 2, bgcolor: 'white' }}>
							<TextField
								label='Email'
								type={'email'}
								placeholder={'JohnDoe@gmail.com'}
								fullWidth
								name='registerEmail'
								value={registerEmail}
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
								name='registerPassword'
								value={registerPassword}
								onChange={handleInputChange}
								required
							></TextField>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								label='Repeat password'
								type={'password'}
								placeholder={'Password'}
								fullWidth
								name='registerPassword2'
								value={registerPassword2}
								onChange={handleInputChange}
								required
							></TextField>
						</Grid>

						<Grid container sx={{ mb: 2, mt: 2 }}>
							<Grid item xs={12}>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									aria-label='Login Button'
								>
									Create account
								</Button>
							</Grid>
						</Grid>

						<Grid container direction={'row'} justifyContent={'end'}>
							<LinkMUI underline='none' component={Link} to='/auth/login'>
								Already have an account? Sign in
							</LinkMUI>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
