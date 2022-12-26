import mongoose, { MongooseError } from 'mongoose';

export const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN!);

		console.log('DB Online');
	} catch (err) {
		console.log(err as MongooseError);

		throw new Error('Error on DB initialization');
	}
};
