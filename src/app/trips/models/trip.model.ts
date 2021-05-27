import { TripSummary } from '@models/trip-summary.model';

export class Trip extends TripSummary {
	carBrand: string;
	carModel: string;
	driverCreatedAt: string;

	constructor(data: any) {
		super(data);
		this.carBrand = data.carBrand;
		this.carModel = data.carModel;
		this.driverCreatedAt = data.driverCreatedAt;
	}

	static get empty(): Trip {
		return new Trip({});
	}
}
