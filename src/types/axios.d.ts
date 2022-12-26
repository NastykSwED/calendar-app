/* Axios Response Types */

type postEventProps = {
	event: onEventProps;
};

type getEventsProps = {
	ok: boolean;
	events: eventProps[];
};

interface onEventProps
	extends Pick<eventProps, 'title' | 'id' | 'start' | 'end'> {}

interface loginUserProps {
	name: string;
	token: string;
	uid: string;
}

interface createUserProps extends loginUserProps {}

interface renewUserProps extends loginUserProps {}

/* Axios Error Response Types */

type errorResponseTypes = {
	ok: boolean;
	msg: string;
};
