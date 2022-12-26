/*
 Event Routes
 host + /api/events
*/

import express, { Router } from 'express';

import { jwtValidator, fillValidator } from '../middlewares';

import { check } from 'express-validator';

import { isDate } from '../helpers';

import {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} from '../controllers/eventsController';

export const eventsRouter: Router = express.Router();

eventsRouter.use(jwtValidator);

/* Get Events Route */
eventsRouter.get('/', getEvents);

/*Create Event Route */
eventsRouter.post(
	'/',
	[check('title', 'The title is obligatory').not().isEmpty()],
	[check('start', 'Start time is obligatory').custom(isDate)],
	fillValidator,
	createEvent
);

/*Update Event Route*/
eventsRouter.put('/:id', updateEvent);

/*Delete Event Route*/
eventsRouter.delete('/:id', deleteEvent);
