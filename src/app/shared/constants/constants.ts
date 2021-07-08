import { truncate } from '@shared/functions';

export interface Constants {
	search: string;
	searchForTrips: string;
	register: string;
	login: string;
	registerHere: string;
	loginHere: string;
	firstName: string;
	firstNamePlaceholder: string;
	lastName: string;
	lastNamePlaceholder: string;
	email: string;
	emailPlaceholder: string;
	password: string;
	passwordPlaceholder: string;
	age: string;
	agePlaceholder: string;
	from: string;
	fromCity: string;
	fromCityPlaceholder: string;
	to: string;
	toCity: string;
	toCityPlaceholder: string;
	numberOfPassengers: string;
	numberOfPassengersPlaceholder: string;
	emailPattern: string;
	passwordPattern: string;
	pleaseWait: string;
	startDate: string;
	startDatePlaceholder: string;
	price: string;
	seatsLeft: string;
	driverInfo: string;
	typeMessageLabel: string;
	typeMessagePlaceholder: string;
	send: string;
	emptyInbox: string;
	loadingInbox: string;
	makeReservation: string;
	sessionExpired: string;

	contactDriver: (name: string) => string;
}

export const constants: Constants = {
	search: 'Search',
	searchForTrips: 'Search for trips',
	register: 'Register',
	login: 'Login',
	registerHere: 'Register here',
	loginHere: 'Login here',
	firstName: 'First name',
	firstNamePlaceholder: 'Enter your first name here',
	lastName: 'Last name',
	lastNamePlaceholder: 'Enter your last name here',
	email: 'Email address',
	emailPlaceholder: 'Enter your email address here',
	password: 'Password',
	passwordPlaceholder: 'Enter your password here',
	age: 'Age',
	agePlaceholder: 'Enter your age here',
	from: 'From',
	fromCity: 'From city',
	fromCityPlaceholder: 'Where are you coming from?',
	to: 'To',
	toCity: 'To city',
	toCityPlaceholder: 'Where are you going?',
	numberOfPassengers: 'Number of passengers',
	numberOfPassengersPlaceholder: 'Enter number of passengers',
	emailPattern: '^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$',
	passwordPattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
	pleaseWait: 'Please wait...',
	startDate: 'Start date',
	startDatePlaceholder: 'Choose start date',
	price: 'Price',
	seatsLeft: 'Seats left',
	driverInfo: 'Driver info',
	typeMessageLabel: 'Aa',
	typeMessagePlaceholder: 'Type a message...',
	send: 'Send',
	emptyInbox: 'Your inbox is currently empty.',
	loadingInbox: 'Loading inbox...',
	makeReservation: 'Make reservation',
	sessionExpired: 'Session has expired. Please login again.',

	contactDriver: (name: string) => `Contact ${truncate(name)}`,
};
