import { isValid } from 'date-fns';

export const isDate = (value: string) => {
	if (!value) {
		return false;
	}

	const date = isValid(value);

	return date;
};
