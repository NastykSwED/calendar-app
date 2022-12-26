//Auth Store Props
type AuthStateProps = {
	status: string;
	user: onUserProps;
	errorMessage: onErrorMessage;
};

type onErrorMessage = string | undefined;

//Calendar Store Props
interface calendarStateProps {
	isLoadingEvents: boolean;
	events: eventProps[];
	activeEvent: eventProps | null;
}

//Ui Store Props
type uiStateProps = {
	isDateModalOpen: boolean;
};
