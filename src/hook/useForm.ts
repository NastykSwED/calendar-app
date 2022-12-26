import { useEffect, useState } from 'react';
import React from 'react';

export const useForm = (
	initialForm: initialFormProps = {} as initialFormProps
) => {
	const [formState, setFormState] = useState(initialForm);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const handleInputChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return {
		...formState,
		formState,
		handleInputChange,
	};
};
