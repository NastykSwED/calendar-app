import { useAppDispatch, useAppSelector } from './useRedux';

import { onOpenDateModal, onCloseDateModal } from '../store';

export const useUiStore = () => {
	const { isDateModalOpen } = useAppSelector(state => state.ui);

	const dispatch = useAppDispatch();

	const onOpenModal = () => {
		dispatch(onOpenDateModal());
	};

	const closeDateModal = () => {
		dispatch(onCloseDateModal());
	};

	return {
		isDateModalOpen,
		onOpenModal,
		closeDateModal,
	};
};
