/*
 Auth Routes
 host + /api/auth
*/

import express, { Router } from 'express';

import { check } from 'express-validator';

import { fillValidator, jwtValidator } from '../middlewares';

import { createUser, loginUser, renewToken } from '../controllers';

export const authRouter: Router = express.Router();

/*loginUser Route*/
authRouter.post(
	'/',
	[
		check('email', 'The email is obligatory').isEmail(),
		check('password', 'The password must be at least 6 characters').isLength({
			min: 6,
		}),
		fillValidator,
	],
	loginUser
);

/*createUser Route*/
authRouter.post(
	'/new',
	[
		check('name', 'The name is obligatory').not().isEmpty(),
		check('email', 'The email is obligatory').isEmail(),
		check('password', 'The password must be at least 6 characters').isLength({
			min: 6,
		}),
		fillValidator,
	],
	createUser
);

/*renewUserToken Route*/
authRouter.get('/renew', jwtValidator, renewToken);
