import { TripSummary } from '@models/trip-summary.model';

export class Trip extends TripSummary {
	driverLastName: string;
	driverRating: number;
	carBrand: string;
	carModel: string;
	driverCreatedAt: string;

	static get empty(): Trip {
		return new Trip();
	}
}
