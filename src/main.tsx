import ReactDOM from 'react-dom/client';
import { CalendarApp } from './CalendarApp';

import './styles.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from '@mui/material';

import { DateAdapter } from './dateAdapter/DateAdapter';

import { store } from './store/';

import { Provider } from 'react-redux';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
	//<React.StrictMode>
	<Provider store={store}>
		<DateAdapter>
			<CssBaseline />
			<CalendarApp />
		</DateAdapter>
	</Provider>

	//</React.StrictMode>
);
