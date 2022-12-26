import { Typography } from '@mui/material';

export const CalendarEventBox = ({ event }: calendarEventBoxProps) => {
	const { title, user } = event;

	return (
		<>
			<Typography component={'span'} fontWeight={800}>
				{title}
			</Typography>
			<Typography component={'span'}> - {user?.name}</Typography>
		</>
	);
};
