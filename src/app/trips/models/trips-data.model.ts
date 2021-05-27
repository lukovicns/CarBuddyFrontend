import { DateTimeParser } from '@models/datetime-parser.model';
import { TripSummary } from '@models/trip-summary.model';

export class TripsData {
	id: string;
	driverId: string;
	driverFullName: string;
	from: string;
	to: string;
	date: string;
	timeRange: string;
	url: string;

	constructor(trip: TripSummary) {
		this.id = trip.id;
		this.driverId = trip.driverId;
		this.driverFullName = `${trip.driverFirstName} ${trip.driverLastName}`;
		this.from = trip.fromCity;
		this.to = trip.toCity;
		this.date = new DateTimeParser(trip.date).format('MMMM D, YYYY');
		this.timeRange = `${trip.startTime}h - ${trip.arriveTime}h`;
		this.url = `/trips/${trip.id}`;
	}
}
