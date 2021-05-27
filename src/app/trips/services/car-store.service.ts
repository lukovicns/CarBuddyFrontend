import { Injectable } from '@angular/core';

import { Car } from '@models/car.model';
import { CarState } from '@states/car.state';
import { Store } from '@store/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CarStoreService extends Store<CarState> {
	car$ = this.select((state: CarState) => state.car);
	isAddCarPending$ = this.select((state: CarState) => state.isAddCarPending);

	readonly hasCar$ = new BehaviorSubject<boolean | null>(null);

	constructor() {
		super({
			car: Car.Empty,
			isAddCarPending: false,
		});
	}

	get hasCar(): boolean | null {
		return this.hasCar$.value;
	}

	setCar(carOrEmpty: Car | {}): void {
		const car = new Car(carOrEmpty);
		this.setState({ car });
		this.hasCar$.next(car && !car.isEmpty);
	}

	setAddCarPending(isPending: boolean): void {
		this.setState({ isAddCarPending: isPending });
	}

	clearCar(): void {
		this.setState({ car: Car.Empty });
		this.hasCar$.next(null);
	}
}
