//Event Types
interface eventProps {
	id?: string;
	title: string;
	notes: string;
	start: string | Date;
	end: string | Date;
	bgColor?: string;
	user?: onUserProps;
}

type onUserProps = {
	_id?: string;
	name: string;
	uid: string;
};

type calendarEventBoxProps = {
	event: eventProps;
};

/* Login & Register Props */
interface loginFieldsProps {
	[key: string]: string;
	loginEmail: string;
	loginPassword: string;
}

interface registerFieldProps {
	[key: string]: string;
	registerName: string;
	registerEmail: string;
	registerPassword: string;
	registerPassword2: string;
}

//Hooks Props
interface initialFormProps
	extends Partial<loginFieldsProps>,
		Partial<registerFieldProps> {}
