import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from '@mui/material';
import { useCalendarStore } from '../../hook/useCalendarStore';
import { useUiStore } from '../../hook/useUiStore';

export const FabDelete = () => {
	const { startDeleteActiveEvent, hasEvenSelected } = useCalendarStore();

	const { isDateModalOpen } = useUiStore();

	const handleDelete = () => {
		startDeleteActiveEvent();
	};

	return (
		<Fab
			onClick={handleDelete}
			sx={{
				bottom: '25px',
				position: 'fixed',
				left: '25px',
				display: hasEvenSelected && !isDateModalOpen ? '' : 'none',
			}}
			color='error'
			aria-label='add'
		>
			<DeleteIcon />
		</Fab>
	);
};
