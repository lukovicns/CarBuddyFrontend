import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { Car } from '@models/car.model';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { CarService } from '@services/car.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-add-trip',
	templateUrl: './add-trip.component.html',
	styleUrls: ['./add-trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTripComponent implements OnInit {
	car$: Observable<Car>;
	isPending$: Observable<boolean>;
	form: FormGroup;
	today = moment();

	readonly constants: Constants = constants;

	constructor(
		private carService: CarService,
		private tripStore: TripStoreService,
	) {
		this.isPending$ = this.tripStore.isAddTripPending$;
	}

	ngOnInit(): void {
		this.initializeForm();
		this.car$ = this.carService.getUserCar();
	}

	addTrip(): void {
		console.log(this.form.value);
	}

	private initializeForm(): void {
		this.form = new FormGroup({
			fromAddress: requiredTextControl(''),
			toAddress: requiredTextControl(''),
			date: requiredTextControl(''),
			price: numberControl(500, 1, 100000),
		});
	}
}
