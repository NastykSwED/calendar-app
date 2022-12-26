import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';

export const Loader = () => {
	return (
		<Box
			minHeight={'100vh'}
			display='flex'
			justifyContent={'center'}
			alignItems='center'
			flexDirection={'column'}
		>
			<CircularProgress sx={{ display: 'block' }} />
		</Box>
	);
};
