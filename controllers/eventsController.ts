import { Request, Response } from 'express';

import { Event } from '../models';

import { MongooseError } from 'mongoose';

export const getEvents = async (_req: Request, res: Response) => {
	const events = await Event.find().populate('user', 'name');

	res.json({
		ok: true,
		events,
	});
};

export const createEvent = async (_req: Request, res: Response) => {
	const event = new Event(_req.body);

	try {
		event.user = _req.uid;

		const eventSaved = await event.save();

		res.json({
			ok: true,
			event: eventSaved,
		});
	} catch (error) {
		console.log(error as MongooseError);

		res.status(500).json({
			ok: false,
			msg: 'Talk with the admin',
		});
	}
};

export const updateEvent = async (_req: Request, res: Response) => {
	const eventID = _req.params.id;

	const uid = (_req as customRequest).uid;

	try {
		const event = await Event.findById(eventID);

		if (!event) {
			res.status(404).json({
				ok: false,
				msg: "Event doesn't exist with that ID",
			});
		}

		if (event?.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'You do not have the necessary permissions',
			});
		}

		const newEvent = {
			..._req.body,
			user: uid,
		};

		const eventUpdate = await Event.findByIdAndUpdate(eventID, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			event: eventUpdate,
		});
	} catch (error) {
		console.log(error as MongooseError);

		res.status(500).json({
			ok: false,
			msg: 'Talk with the admin',
		});
	}
};

export const deleteEvent = async (_req: Request, res: Response) => {
	const eventID = _req.params.id;

	const uid = (_req as customRequest).uid;

	try {
		const event = await Event.findById(eventID);

		if (!event) {
			res.status(404).json({
				ok: false,
				msg: "Event doesn't exist with that ID",
			});
		}

		if (event?.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'You do not have the necessary permissions',
			});
		}

		const deleteEvent = {
			..._req.body,
			user: uid,
		};

		await Event.findByIdAndDelete(eventID, deleteEvent);

		res.json({
			ok: true,
			msg: 'Event deleted',
		});
	} catch (error) {
		console.log(error as MongooseError);

		res.status(500).json({
			ok: false,
			msg: 'Talk with the admin',
		});
	}
};
