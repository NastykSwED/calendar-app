import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = (events: eventProps[] = []) => {
	return events.map(event => {
		event.start = parseISO(event.start as string);
		event.end = parseISO(event.end as string);

		return event;
	});
};
