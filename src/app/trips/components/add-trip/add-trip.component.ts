import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { TripFormService } from '@modules/trips/services/trip-form.service';
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
	isPending$: Observable<boolean>;
	hasCar$: Observable<boolean | null>;
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(
		private carStore: CarStoreService,
		private tripFormService: TripFormService,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.isPending$ = this.tripStore.isAddTripPending$;
		this.hasCar$ = this.carStore.hasCar$;
	}

	ngOnInit(): void {
		this.form = this.tripFormService.initializeForm();
	}

	addTrip(): void {
		this.tripService.addTrip(this.form.value)
			.subscribe(() => this.form.reset());
	}
}
