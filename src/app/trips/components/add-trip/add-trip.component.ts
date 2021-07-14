import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	OnDestroy, 
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class AddTripComponent implements OnInit, OnDestroy {
	isPending$: Observable<boolean>;
	car: Car | null;
	form: FormGroup;
	today = moment();

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private carService: CarService,
		private carStore: CarStoreService,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.isPending$ = this.tripStore.isAddTripPending$;
		this.carStore.car$
			.pipe(takeUntil(this.destroy$))
			.subscribe((car: Car | null) => {
				this.car = car;
				this.cdRef.markForCheck();
			});
	}

	get hasCar(): boolean {
		return !!this.car && !this.car.isEmpty;
	}

	ngOnInit(): void {
		this.initializeForm();
		this.carService.getUserCar()
			.subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	addTrip(): void {
		this.tripService.addTrip(this.form.value)
			.subscribe(() => this.form.reset());
	}

	private initializeForm(): void {
		this.form = new FormGroup({
			fromAddress: requiredTextControl(''),
			toAddress: requiredTextControl(''),
			date: requiredTextControl(''),
			startTime: requiredTextControl(''),
			arriveTime: requiredTextControl(''),
			price: numberControl(500, 1, 100000),
		});
	}
}
