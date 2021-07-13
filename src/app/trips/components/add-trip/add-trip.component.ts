import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { Car } from '@models/car.model';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { CarService } from '@services/car.service';
import { CarStoreService } from '@services/car-store.service';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-add-trip',
	templateUrl: './add-trip.component.html',
	styleUrls: ['./add-trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTripComponent implements OnInit {
	car$: Observable<Car | null>;
	isPending$: Observable<boolean>;
	form: FormGroup;
	today = moment();

	readonly constants: Constants = constants;

	constructor(
		private carService: CarService,
		private carStore: CarStoreService,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.car$ = this.carStore.car$;
		this.isPending$ = this.tripStore.isAddTripPending$;
	}

	get carForm(): FormGroup {
		return this.form.get('car') as FormGroup;
	}

	ngOnInit(): void {
		this.initializeForm();
		this.carService.getUserCar()
			.subscribe();
	}

	addTrip(): void {
		this.tripService.addTrip(this.form.value)
			.subscribe(() => this.form.reset());
	}

	private initializeForm(): void {
		this.form = new FormGroup({
			car: new FormGroup({
				brand: requiredTextControl(''),
				model: requiredTextControl('', 2, 20),
				photo: new FormControl(''),
				numberOfSeats: numberControl(1, 1, 8),
			}),
			fromAddress: requiredTextControl(''),
			toAddress: requiredTextControl(''),
			date: requiredTextControl(''),
			price: numberControl(500, 1, 100000),
		});
	}
}
