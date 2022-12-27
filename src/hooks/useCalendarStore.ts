import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onLoadNotes,
	onUpdateEvent,
	onClearActiveEvent,
} from '../store';

import { useAppSelector, useAppDispatch } from './useRedux';

import calendarApi from '../api/calendarApi';

import { AxiosResponse, AxiosError } from 'axios';

import { convertEventsToDateEvents } from '../helpers';

import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const { events, activeEvent } = useAppSelector(state => state.calendar);

	const { user } = useAppSelector(state => state.auth);

	const dispatch = useAppDispatch();

	const setActiveEvent = (calendarEvent: eventProps) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const clearActiveEvent = () => {
		dispatch(onClearActiveEvent());
	};

	/* save Event on State and DB */
	const startSavingEvent = async (calendarEvent: eventProps) => {
		try {
			if (calendarEvent.id) {
				await calendarApi.put(`/events/${calendarEvent.id}`, {
					...calendarEvent,
					start: (calendarEvent.start as Date).getTime(),
					end: (calendarEvent.end as Date).getTime(),
				});

				dispatch(
					onUpdateEvent({
						...calendarEvent,
						user,
					})
				);

				return;
			}

			const resp: AxiosResponse<postEventProps> = await calendarApi.post(
				'/events',
				{
					...calendarEvent,
					start: (calendarEvent.start as Date).getTime(),
					end: (calendarEvent.end as Date).getTime(),
				}
			);

			const { data } = resp;

			const { event } = data;

			dispatch(
				onAddNewEvent({
					...calendarEvent,
					id: event.id,
					user,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	/* Delete event on Frontend and DB */
	const startDeleteActiveEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent!.id}`);

			dispatch(onDeleteEvent());
		} catch (error) {
			Swal.fire(
				'Error deleting the event',
				(error as AxiosError<errorResponseTypes>).response?.data.msg,
				'error'
			);
		}
	};

	/* Getting Event from DB */
	const startLoadingEvents = async () => {
		try {
			const resp: AxiosResponse<getEventsProps> = await calendarApi.get(
				'/events'
			);

			const { data } = resp;

			const events = convertEventsToDateEvents(data.events);

			dispatch(onLoadNotes(events));
		} catch (error) {
			console.log(error);
		}
	};

	return {
		events,
		setActiveEvent,
		hasEvenSelected: !!activeEvent,
		activeEvent,
		startSavingEvent,
		startDeleteActiveEvent,
		startLoadingEvents,
		clearActiveEvent,
	};
};
