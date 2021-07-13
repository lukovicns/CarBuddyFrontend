import { Injectable } from '@angular/core';

import { Car } from '@models/car.model';
import { CarState } from '@states/car.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class CarStoreService extends Store<CarState> {
	car$ = this.select((state: CarState) => state.car);
	isAddCarPending$ = this.select((state: CarState) => state.isAddCarPending);

	constructor() {
		super({
			car: null,
			isAddCarPending: false,
		});
	}

	get hasCar(): boolean {
		return !!this.state.car?.isEmpty;
	}

	setCar(car: Car | {}): void {
		this.setState({ car: new Car(car) });
	}

	setAddCarPending(isPending: boolean): void {
		this.setState({ isAddCarPending: isPending });
	}
}
