import { Request, Response } from 'express';

import { MongooseError } from 'mongoose';

import { User } from '../models';

import bcrypt from 'bcryptjs';

import { generateJWT } from '../helpers';

export const createUser = async (_req: Request, res: Response) => {
	const { email, password } = _req.body as userTypes;

	try {
		let user = await User.findOne({
			email,
		});

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'The user already exists with that email address',
			});
		}

		user = new User(_req.body);

		//Encrypt
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (err) {
		console.log(err as MongooseError);

		res.status(500).json({
			ok: false,
			msg: 'Please, contact with the admin',
		});
	}
};

export const loginUser = async (_req: Request, res: Response) => {
	const { password, email } = _req.body as userTypes;

	try {
		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Password and email wrong!',
			});
		}

		//Confirm Password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password and email wrong!',
			});
		}

		//Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error as MongooseError);

		res.status(500).json({
			ok: false,
			msg: 'Please, contact with the admin',
		});
	}
};

export const renewToken = async (_req: Request, res: Response) => {
	const uid = _req.uid;
	const name = _req.name;

	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token,
	});
};
