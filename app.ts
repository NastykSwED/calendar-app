import express, { Request, Response } from 'express';

import cors from 'cors';

import * as dotenv from 'dotenv';

import { authRouter, eventsRouter } from './routes';

import { dbConnection } from './database';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

/* DB */
dbConnection();

/* CORS */
app.use(cors());

/* Distribution Dir */
app.use(express.static('dist'));

/* Parse Body */
app.use(express.json());

/* ---- Routes ---- */

/*AuthRouter*/
app.use('/api/auth', authRouter);

/*EventsRouter*/
app.use('/api/events', eventsRouter);

/*Parse routes*/
app.get('*', (_req: Request, res: Response) => {
	res.sendFile(__dirname + '/dist/index.html');
});

/*Listen petitions */
app.listen(PORT, () => {
	console.log(`🚀 server started at port: ${PORT}`);
});
