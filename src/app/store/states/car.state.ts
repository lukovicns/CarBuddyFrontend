import { Car } from '@models/car.model';

export class CarState {
	car: Car | null;
	isAddCarPending: boolean;
}
