import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { defaultPrice, maximumPrice, minimumPrice } from '@constants/default-values';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { Trip } from '@models/trip.model';

@Injectable({
	providedIn: 'root',
})
export class TripFormService {
	initializeForm(): FormGroup {
		return new FormGroup({
			fromCity: requiredTextControl(''),
			toCity: requiredTextControl(''),
			date: requiredTextControl(''),
			startTime: requiredTextControl(''),
			arriveTime: requiredTextControl(''),
			price: numberControl(defaultPrice, minimumPrice, maximumPrice),
		});
	}

	updateForm(form: FormGroup, trip: Trip): void {
		form.patchValue({
			fromCity: trip.fromCity,
			toCity: trip.toCity,
			date: moment(trip.date, 'DD/MM/YYYY'),
			startTime: trip.startTime,
			arriveTime: trip.arriveTime,
			price: trip.price,
		});
	}
}
