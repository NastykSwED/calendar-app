import { describe, expect, it } from 'vitest';

import {
	onCloseDateModal,
	onOpenDateModal,
	uiSlice,
} from '../../../store/ui/uiSlice';

describe('Testing uiSlice', () => {
	it('Should return the initial state as false', () => {
		const uiInitialState = uiSlice.getInitialState();

		expect(uiInitialState.isDateModalOpen).toBeFalsy();
	});

	it('Should change the state correctly ', () => {
		let uiState = uiSlice.getInitialState();

		uiState = uiSlice.reducer(uiState, onOpenDateModal);

		expect(uiState.isDateModalOpen).toBeTruthy();

		uiState = uiSlice.reducer(uiState, onCloseDateModal);

		expect(uiState.isDateModalOpen).toBeFalsy();
	});
});
