import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';
import { useAppSelector } from '../../hooks/useRedux';

export const FabAddNew = () => {
	const { user } = useAppSelector(state => state.auth);

	const { onOpenModal } = useUiStore();

	const { setActiveEvent } = useCalendarStore();

	const handleClickNew = () => {
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: '#fafafa',
			user,
		});
		onOpenModal();
	};

	return (
		<Fab
			onClick={handleClickNew}
			sx={{
				bottom: '25px',
				position: 'fixed',
				right: '25px',
			}}
			color='primary'
			aria-label='add'
		>
			<AddIcon />
		</Fab>
	);
};
