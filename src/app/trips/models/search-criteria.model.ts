import * as moment from 'moment';

export class SearchCriteria {
	fromCity: string;
	toCity: string;
	date: string;
	numberOfPassengers: number;

	constructor(data: any) {
		this.fromCity = data.fromCity;
		this.toCity = data.toCity;
		this.date = moment(data.date).format('YYYY-MM-DD');
		this.numberOfPassengers = +data.numberOfPassengers;
	}
}
