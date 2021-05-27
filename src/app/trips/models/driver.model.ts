import { Car } from '@models/car.model';
import { User } from '@models/user.model';

export class Driver extends User {
	car: Car;
	rating: number;
	numberOfDrivings: number;

	constructor(data: any) {
		super(data);
		this.car = data.car;
		this.rating = data.rating;
		this.numberOfDrivings = data.numberOfDrivings;
	}
}
