declare namespace Schema {}

interface userTypes {
	name: string;
	email: string;
	password: string;
}

interface JWTPayloadTypes {
	uid: string;
	name: string;
}

declare namespace Express {
	export interface Request extends customRequest {}
}

interface customRequest {
	uid: string | Schema.Types.ObjectId;
	name: string;
}

interface eventTypes {
	title: string;
	start: Date;
	end: Date;
	notes: string;
	user: Schema.Types.ObjectId;
}
