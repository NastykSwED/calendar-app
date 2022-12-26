import { createSlice } from '@reduxjs/toolkit';

const uiInitialState: uiStateProps = {
	isDateModalOpen: false,
};

export const uiSlice = createSlice({
	name: 'uiSlice',
	initialState: uiInitialState,
	reducers: {
		onOpenDateModal: state => {
			state.isDateModalOpen = true;
		},
		onCloseDateModal: state => {
			state.isDateModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
