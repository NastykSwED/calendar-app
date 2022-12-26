import { model, Schema } from 'mongoose';

const EventSchema = new Schema<eventTypes>({
	title: { type: String, required: true },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	notes: { type: String },
});

EventSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();

	object.id = _id;

	return object;
});

export const Event = model('Event', EventSchema);
