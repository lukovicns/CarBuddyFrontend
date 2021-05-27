import { DateTimeParser } from '@models/datetime-parser.model';
import { Photo } from '@models/photo.model';

export class TripRequestSummary {
	tripId: string;
	passengerId: string;
	passengerName: string;
	passengerPhoto: string;
	from: string;
	to: string;
	date: string;
	time: string;
	numberOfPassengers: number;

	constructor(data: any) {
		this.tripId = data.tripId;
		this.passengerId = data.passengerId;
		this.passengerName = data.passengerName;
		this.passengerPhoto = new Photo(data.passengerPhoto).value;
		this.from = data.fromCity;
		this.to = data.toCity;
		this.date = new DateTimeParser(data.date).format('MMMM D, YYYY');
		this.time = `${data.startTime}h`;
		this.numberOfPassengers = data.numberOfPassengers;
	}
}
