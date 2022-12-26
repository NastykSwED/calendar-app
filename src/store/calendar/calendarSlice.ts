import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

const calendarInitialState: calendarStateProps = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: calendarInitialState,
	reducers: {
		onSetActiveEvent: (state, { payload }: PayloadAction<eventProps>) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }: PayloadAction<eventProps>) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }: PayloadAction<eventProps>) => {
			state.events = state.events.map(event =>
				event.id == payload.id ? payload : event
			);
		},
		onDeleteEvent: state => {
			if (state.activeEvent) {
				state.events = state.events.filter(
					event => event.id !== state.activeEvent?.id
				);

				state.activeEvent = null;
			}
		},
		onLoadNotes: (state, { payload }: PayloadAction<eventProps[]>) => {
			state.isLoadingEvents = false;

			state.events = payload;
		},
		onLogoutCalendar: state => {
			state.isLoadingEvents = true;
			state.events = [];
			state.activeEvent = null;
		},
		onClearActiveEvent: state => {
			state.activeEvent = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadNotes,
	onLogoutCalendar,
	onClearActiveEvent,
} = calendarSlice.actions;
