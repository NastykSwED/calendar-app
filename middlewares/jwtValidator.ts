import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const SECRET_JWT_SEED = process.env.SECRET_JWT_SEED || 'secret-jwt';

export const jwtValidator = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = _req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'There is no token',
		});
	}

	try {
		const payload = jwt.verify(token, SECRET_JWT_SEED);

		_req.uid = (payload as JWTPayloadTypes).uid;
		_req.name = (payload as JWTPayloadTypes).name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}

	next();
};
