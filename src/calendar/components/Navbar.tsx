import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export const Navbar = () => {
	const { startLogout, user } = useAuthStore();

	const handleLogout = () => {
		startLogout();
	};

	return (
		<AppBar
			position='static'
			sx={{
				bgcolor: 'black',
				mb: 1,
			}}
			elevation={1}
		>
			<Toolbar>
				<IconButton color='inherit' aria-label='menu' sx={{ mr: 1 }}>
					<CalendarMonthIcon fontSize='large' />
				</IconButton>
				<Typography component='h1' sx={{ flexGrow: 1, fontSize: '28px' }}>
					{user?.name}
				</Typography>
				<Button
					onClick={handleLogout}
					startIcon={<LogoutIcon />}
					variant='outlined'
					color='error'
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};
