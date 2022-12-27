import React from 'react';

import { describe, vi, it, expect, expectTypeOf } from 'vitest';

import { renderHook, act } from '@testing-library/react';

import { Provider } from 'react-redux';

import { useUiStore } from '../../hooks/useUiStore';

import { configureStore } from '@reduxjs/toolkit';

import { uiSlice } from '../../store/ui/uiSlice';

const getMockStore = (initialState: uiStateProps) => {
	return configureStore({
		reducer: {
			ui: uiSlice.reducer,
		},
		preloadedState: {
			ui: {
				...initialState,
			},
		},
	});
};

describe('Testing useUiStore', () => {
	it('Should return the default values', () => {
		const mockStore = getMockStore({
			isDateModalOpen: false,
		});

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useUiStore(), {
			wrapper,
		});

		expect(result.current).toEqual({
			isDateModalOpen: false,
			onOpenModal: expect.any(Function),
			closeDateModal: expect.any(Function),
		});
	});

	it('openDateModal should set the isDateModalOpen to true', () => {
		const mockStore = getMockStore({
			isDateModalOpen: false,
		});

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useUiStore(), {
			wrapper,
		});

		act(() => {
			result.current.onOpenModal();
		});

		expect(result.current.isDateModalOpen).toBeTruthy();
	});

	it('closeDateModal should set the isDateModalOpen to false', () => {
		const mockStore = getMockStore({
			isDateModalOpen: true,
		});

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={mockStore}>{children}</Provider>
		);

		const { result } = renderHook(() => useUiStore(), {
			wrapper,
		});

		act(() => {
			result.current.closeDateModal();
		});

		expect(result.current.isDateModalOpen).toBeFalsy();
	});
});
