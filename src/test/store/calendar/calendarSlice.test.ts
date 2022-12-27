import { describe, it, expect } from 'vitest';
import { calendarWithEventsState } from '../../fixtures/calendarStates';

import {
	calendarSlice,
	onAddNewEvent,
	onDeleteEvent,
	onLoadNotes,
	onLogoutCalendar,
	onSetActiveEvent,
	onUpdateEvent,
} from '../../../store/calendar/calendarSlice';

import {
	initialState,
	events,
	calendarWithActiveEventState,
} from '../../fixtures/calendarStates';

describe('Testing calendarSlice', () => {
	it('Should return the initial state', () => {
		expect(calendarSlice.getInitialState()).toEqual(initialState);
	});

	it('onSetActiveEven should activate the event', () => {
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onSetActiveEvent(events[0])
		);

		expect(state.activeEvent).toEqual(events[0]);
	});

	it('onAddNewEvent should add and event', () => {
		const newEvent = {
			id: '3',
			title: 'Note 3',
			notes: 'Note 3 Description',
			start: new Date('2022-12-24 13:00:00'),
			end: new Date('2022-12-24 15:00:00'),
			bgColor: '#fafafa',
		};
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onAddNewEvent(newEvent)
		);

		expect(state.events).toEqual([...events, newEvent]);
	});

	it('onUpdateEvent should update the event', () => {
		const updatedEvent = {
			id: '1',
			title: 'Note 1 New Title',
			notes: 'Note 1 Description new Desc',
			start: new Date('2022-12-24 13:00:00'),
			end: new Date('2022-12-24 15:00:00'),
			bgColor: '#fafafa',
		};
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onUpdateEvent(updatedEvent)
		);

		expect(state.events).toContain(updatedEvent);
	});

	it('onDeleteEvent should delete the event', () => {
		const deletedEvent = {
			id: '1',
			title: 'Note 1 New Title',
			notes: 'Note 1 Description new Desc',
			start: new Date('2022-12-24 13:00:00'),
			end: new Date('2022-12-24 15:00:00'),
			bgColor: '#fafafa',
		};

		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onDeleteEvent()
		);

		expect(state.events).not.contain(deletedEvent);
	});

	it('onLoadNotes should load all the events', () => {
		const state = calendarSlice.reducer(initialState, onLoadNotes(events));

		expect(state.events.length).toBeGreaterThanOrEqual(events.length);
	});

	it('onLogoutCalendar should clean the state', () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onLogoutCalendar()
		);

		expect(state.events.length).toBe(0);
	});
});
