import React, { useEffect, useMemo, useState } from 'react';

import {
	Modal,
	Box,
	Typography,
	Fade,
	Divider,
	TextField,
	Button,
} from '@mui/material';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import SaveIcon from '@mui/icons-material/Save';
import { addHours } from 'date-fns';
import { DateTimePicker } from '@mui/x-date-pickers';
import { differenceInSeconds } from 'date-fns/esm';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';

const styles = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '500px',
	'@media (max-width: 564px)': {
		width: '90%',
	},
	bgcolor: 'white',
	border: 'none',
	outline: 'none',
	boxShadow: 24,
	p: 4,
};

export const CalendarModal = () => {
	const { isDateModalOpen, closeDateModal } = useUiStore();

	const { activeEvent, startSavingEvent, clearActiveEvent } =
		useCalendarStore();

	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const [formSubmitted, setFormSubmitted] = useState(false);

	const titleClass = useMemo(() => {
		if (!formSubmitted) return true;

		return formValues.title.length > 0;
	}, [formValues.title, formSubmitted]);

	const handleInputChanged = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { target } = e;

		setFormValues({
			...formValues,
			[target.name]: e.target.value,
		});
	};

	const handleDateChanged = (date: Date, changing: string) => {
		setFormValues({
			...formValues,
			[changing]: date,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(difference) || difference <= 0) {
			Swal.fire('Incorrect date', 'Check that the dates are correct', 'error');
			return;
		}

		if (formValues.title.length <= 0) return;

		await startSavingEvent(formValues);

		closeDateModal();

		setFormSubmitted(false);
	};
	const handleCloseModal = () => {
		closeDateModal();

		clearActiveEvent();
	};

	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({
				...activeEvent,
				start: activeEvent.start as Date,
				end: activeEvent.end as Date,
			});
		}
	}, [activeEvent]);
	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={isDateModalOpen}
			onClose={handleCloseModal}
			closeAfterTransition
		>
			<Fade in={isDateModalOpen}>
				<Box
					sx={{
						...styles,
						borderRadius: 2,
					}}
				>
					<Typography variant='h4'>New Event</Typography>
					<Divider />

					<form onSubmit={handleSubmit}>
						<Box display={'flex'} flexDirection='column' mt={2} mb={2} gap={2}>
							<DateTimePicker
								label='Start date'
								value={formValues.start}
								onChange={newDate => handleDateChanged(newDate!, 'start')}
								renderInput={params => <TextField {...params} />}
							/>
							<DateTimePicker
								minDate={formValues.start}
								label='End date'
								value={formValues.end}
								onChange={newDate => handleDateChanged(newDate!, 'end')}
								renderInput={params => <TextField {...params} />}
							/>
						</Box>

						<Divider />

						<Box display={'flex'} flexDirection='column' mt={2} gap={2}>
							<TextField
								name='title'
								fullWidth
								placeholder='Title of the event'
								label='Title and notes'
								value={formValues.title}
								onChange={handleInputChanged}
								error={!titleClass}
							/>
							<TextField
								name='notes'
								fullWidth
								multiline
								rows={8}
								placeholder='Notas'
								label='A short description'
								value={formValues.notes}
								onChange={handleInputChanged}
							/>
							<Typography>Additional information</Typography>
						</Box>

						<Box mt={2}>
							<Button type='submit' variant='outlined' startIcon={<SaveIcon />}>
								Save
							</Button>
						</Box>
					</form>
				</Box>
			</Fade>
		</Modal>
	);
};
