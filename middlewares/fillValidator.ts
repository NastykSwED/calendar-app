import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

export const fillValidator = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(_req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});
	}

	next();
};
