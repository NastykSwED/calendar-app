import { describe, expect, it } from 'vitest';

import calendarApi from '../../api/calendarApi';

import { getEnvVariables } from '../../helpers';

const { VITE_API_URL } = getEnvVariables();

describe('Testing calendarApi', () => {
	it('Should have the default configuration', () => {
		expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL);
	});

	it('Should have the x-token in the headers of all requests.', async () => {
		const token = 'ABC-123-XYZ';

		localStorage.setItem('token', token);

		const res = await calendarApi.get('/auth');

		expect(res!.config!.headers!['x-token']).toBe(token);
	});
});
