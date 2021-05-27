import * as moment from 'moment';

import { DateTimeParser } from '@models/datetime-parser.model';
import { Driver } from '@models/driver.model';

export class TripSummary {
	id: string;
	driver: Driver;
	fromCity: string;
	toCity: string;
	date: string;
	startTime: string;
	arriveTime: string;
	price: number;
	numberOfSeats: number;
	numberOfAvailableSeats: number;

	constructor(data: any) {
		this.id = data.id;
		this.driver = new Driver({
			id: data.driverId,
			firstName: data.driverFirstName,
			lastName: data.driverLastName,
			photo: data.driverPhoto,
			rating: data.driverRating,
		});
		this.fromCity = data.fromCity;
		this.toCity = data.toCity;
		this.date = data.date;
		this.startTime = data.startTime;
		this.arriveTime = data.arriveTime;
		this.price = data.price;
		this.numberOfSeats = data.numberOfSeats;
		this.numberOfAvailableSeats = data.numberOfAvailableSeats;
	}

	get driverId(): string {
		return this.driver.id;
	}

	get driverFirstName(): string {
		return this.driver.firstName;
	}

	get driverLastName(): string {
		return this.driver.lastName;
	}

	get driverPhoto(): string {
		return this.driver.photo;
	}

	get driverRating(): number {
		return this.driver.rating;
	}

	isOwnedBy(userId: string): boolean {
		return this.driverId === userId;
	}

	isActive(dateTime: moment.Moment): boolean {
		return new DateTimeParser(this.date, this.startTime).dateTime > dateTime;
	}
}
