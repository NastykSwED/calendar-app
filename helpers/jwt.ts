import jwt from 'jsonwebtoken';

const SECRET_JWT_SEED = process.env.SECRET_JWT_SEED || 'secret-jwt';

export const generateJWT = (uid: string, name: string) => {
	return new Promise((resolve, reject) => {
		const payload: JWTPayloadTypes = {
			uid,
			name,
		};

		jwt.sign(
			payload,
			SECRET_JWT_SEED,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('Failed to generate token');
				}

				resolve(token);
			}
		);
	});
};
