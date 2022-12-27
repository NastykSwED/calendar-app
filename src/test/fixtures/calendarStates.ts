export const events = [
	{
		id: '1',
		title: 'Note 1',
		notes: 'Note 1 Description',
		start: new Date('2022-12-24 13:00:00'),
		end: new Date('2022-12-24 15:00:00'),
		bgColor: '#fafafa',
	},
	{
		id: '2',
		title: 'Note 2',
		notes: 'Note 2 Description',
		start: new Date('2022-12-24 13:00:00'),
		end: new Date('2022-12-24 15:00:00'),
		bgColor: '#fafafa',
	},
];

export const initialState: calendarStateProps = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarWithEventsState: calendarStateProps = {
	isLoadingEvents: true,
	events: [...events],
	activeEvent: null,
};

export const calendarWithActiveEventState: calendarStateProps = {
	isLoadingEvents: true,
	events: [...events],
	activeEvent: {
		...events[0],
	},
};
