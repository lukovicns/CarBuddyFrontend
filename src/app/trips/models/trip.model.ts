import { TripSummary } from '@models/trip-summary.model';

export class Trip extends TripSummary {
	driverLastName: string;
	driverRating: number;
	carBrand: string;
	carModel: string;
	driverCreatedAt: string;

	constructor(data: any) {
		super(data);
		this.driverLastName = data.driverLastName;
		this.driverRating = data.driverRating;
		this.carBrand = data.carBrand;
		this.carModel = data.carModel;
		this.driverCreatedAt = data.driverCreatedAt;
	}

	static get empty(): Trip {
		return new Trip({});
	}

	withNumberOfAvailableSeats(numberOfAvailableSeats: number): Trip {
		this.numberOfAvailableSeats = numberOfAvailableSeats;
		return this;
	}
}
