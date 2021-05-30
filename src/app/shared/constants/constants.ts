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
	fromCity: string;
	from: string;
	toCity: string;
	to: string;
	numberOfPassengers: string;
	numberOfPassengersPlaceholder: string;
	emailPattern: string;
	passwordPattern: string;
	pleaseWait: string;
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
	fromCity: 'From city',
	from: 'From',
	toCity: 'To city',
	to: 'To',
	numberOfPassengers: 'Number of passengers',
	numberOfPassengersPlaceholder: 'Enter number of passengers',
	emailPattern: '^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$',
	passwordPattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
	pleaseWait: 'Please wait...',
};
