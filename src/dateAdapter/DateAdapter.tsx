import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers';

export const DateAdapter = ({ children }: DateAdapterProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{children}
		</LocalizationProvider>
	);
};
