import { MessageWithLink } from '@models/message-with-link.type';
import { truncate } from '@shared/functions';

export interface Constants {
	search: string;
	searchTrips: string;
	register: string;
	login: string;
	registerHere: string;
	registrationSuccessful: string;
	confirmEmailSuccessful: string;
	loginHere: string;
	logout: string;
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
	startDate: string;
	startDatePlaceholder: string;
	startTime: string;
	arriveTime: string;
	price: string;
	pricePlaceholder: string;
	seatsLeft: string;
	driverInfo: string;
	typeMessageLabel: string;
	typeMessagePlaceholder: string;
	send: string;
	inbox: string;
	emptyInbox: string;
	loadingInbox: string;
	loadingMessages: string;
	sendRequestForATrip: string;
	sessionExpired: string;
	addTrip: string;
	editTrip: string;
	addCar: string;
	carBrand: string;
	carBrandPlaceholder: string;
	carModel: string;
	carModelPlaceholder: string;
	carYear: string;
	carYearPlaceholder: string;
	seats: string;
	confirm: string;
	cancel: string;
	carAdded: string;
	readMore: string;
	searchAgain: string;
	driverHasNoRatings: string;
	myTrips: string;
	defaultLabel: string;
	rate: string;
	save: string;
	ratingSuccess: string;
	noFileUploadedYet: string;
	history: string;
	tripHistory: string;
	reservations: string;
	myReservations: string;
	tripsCreatedByMe: string;
	tripCreated: string;
	tripRequestPending: string;
	tripRequests: string;
	acceptTripRequestSuccess: string;
	declinedTripRequest: string;
	noPendingTripRequests: string;

	noTripsFound: MessageWithLink;
	noReservationsFound: MessageWithLink;
	noHistoryFound: MessageWithLink;
	noTripsCreatedByMeFound: MessageWithLink;

	contactDriver: (name: string) => string;
	rateDriver: (name: string) => string;
}

export const constants: Constants = {
	search: 'Search',
	searchTrips: 'Search trips',
	register: 'Register',
	login: 'Login',
	registerHere: 'Register here',
	registrationSuccessful: 'You have successfully registered. An email is sent to confirm registration.',
	confirmEmailSuccessful: 'Email is confirmed successfully!',
	loginHere: 'Login here',
	logout: 'Logout',
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
	startDate: 'Start date',
	startDatePlaceholder: 'Choose start date',
	startTime: 'Start time',
	arriveTime: 'Arrive time',
	price: 'Price',
	pricePlaceholder: 'How much does it cost?',
	seatsLeft: 'Seats left',
	driverInfo: 'Driver info',
	typeMessageLabel: 'Aa',
	typeMessagePlaceholder: 'Type a message...',
	send: 'Send',
	inbox: 'Inbox',
	emptyInbox: 'Your inbox is currently empty.',
	loadingInbox: 'Loading inbox...',
	loadingMessages: 'Loading messages',
	sendRequestForATrip: 'Send request',
	sessionExpired: 'Session has expired. Please login again.',
	addTrip: 'Add trip',
	editTrip: 'Edit trip',
	addCar: 'Add car',
	carBrand: 'Car brand',
	carBrandPlaceholder: 'Enter your car brand here...',
	carModel: 'Car model',
	carModelPlaceholder: 'Enter your car model here...',
	carYear: 'Car year',
	carYearPlaceholder: 'Enter your car year here',
	seats: 'Seats',
	confirm: 'Confirm',
	cancel: 'Cancel',
	carAdded: 'Car added successfully!',
	readMore: 'Read more',
	searchAgain: 'Search again?',
	driverHasNoRatings: 'Driver has no ratings yet!',
	myTrips: 'My trips',
	defaultLabel: 'Aa',
	rate: 'Rate',
	save: 'Save',
	ratingSuccess: 'You have successfully rated this driver.',
	noFileUploadedYet: 'No file uploaded yet.',
	history: 'History',
	tripHistory: 'Trip history',
	reservations: 'Reservations',
	myReservations: 'My reservations',
	tripsCreatedByMe: 'Created by me',
	tripCreated: 'Trip has been successfully created!',
	tripRequestPending: 'Request pending',
	tripRequests: 'Trip requests',
	acceptTripRequestSuccess: 'You have successfully accepted trip request!',
	declinedTripRequest: 'You declined a trip request!',
	noPendingTripRequests: 'You don\'t have any pending trips requests.',
	noTripsFound: {
		firstPart: 'There are no trips found. You can click ',
		secondPart: ' to search again.',
		link: '/search',
	},
	noReservationsFound: {
		firstPart: 'There are no reservations yet. You can click ',
		secondPart: ' to make some reservations.',
		link: '/search',
	},
	noHistoryFound: {
		firstPart: 'There are no past trips yet. You can click ',
		secondPart: ' to make some reservations.',
		link: '/search',
	},
	noTripsCreatedByMeFound: {
		firstPart: 'You don\'t have any trips yet. You can click ',
		secondPart: ' to create a new trip.',
		link: '/trips/add',
	},

	contactDriver: (name: string) => `Contact ${truncate(name)}`,
	rateDriver: (name: string) => `Rate ${name}`,
};
