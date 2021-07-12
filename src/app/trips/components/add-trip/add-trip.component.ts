import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-add-trip',
	templateUrl: './add-trip.component.html',
	styleUrls: ['./add-trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTripComponent implements OnInit {
	isPending$: Observable<boolean>;
	form: FormGroup;
	today = moment();

	readonly constants: Constants = constants;

	constructor(private tripStore: TripStoreService) {
		this.isPending$ = this.tripStore.isAddTripPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			fromAddress: requiredTextControl(''),
			toAddress: requiredTextControl(''),
			date: requiredTextControl(''),
			price: numberControl(1),
		});
	}

	addTrip(): void {
		//
	}
}
