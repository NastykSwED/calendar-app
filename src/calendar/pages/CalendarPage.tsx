import { useState, useEffect } from 'react';

import { Calendar, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
	Navbar,
	CalendarEventBox,
	CalendarModal,
	FabAddNew,
	FabDelete,
} from '../';

import { localizer, getMessagesEN } from '../../helpers';

import { useUiStore, useCalendarStore, useAuthStore } from '../../hook';

export const CalendarPage = () => {
	const { onOpenModal, isDateModalOpen } = useUiStore();

	const { user } = useAuthStore();

	const { events, setActiveEvent, activeEvent } = useCalendarStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	const eventStyleGetter = (
		event: eventProps,
		start: Date,
		end: Date,
		isSelected: boolean
	) => {
		const isMyEvent =
			user.uid === event.user?._id || user.uid === event.user?.uid;

		const style = {
			backgroundColor: isMyEvent ? '#347CF7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		};

		return {
			style,
		};
	};

	const handleDoubleClick = (e: eventProps) => {
		onOpenModal();
	};

	const handleSelect = (e: eventProps) => {
		setActiveEvent(e);
	};
	const handleViewChanged = (view: View) => {
		localStorage.setItem('lastView', view);
		setLastView(view);
	};

	const { startLoadingEvents } = useCalendarStore();

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<Navbar />

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				defaultView={lastView as View}
				style={{
					height: 'calc(100vh - 80px)',
					width: 'calc(100vw - 20px)',
					margin: '1rem auto 0 auto',
				}}
				messages={getMessagesEN()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEventBox,
				}}
				onDoubleClickEvent={handleDoubleClick}
				onSelectEvent={handleSelect}
				onView={handleViewChanged}
			/>

			<CalendarModal />
			<FabAddNew />
			{!isDateModalOpen && activeEvent && <FabDelete />}
		</>
	);
};
