import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { TripService } from '@services/trip.service';

@Component({
	selector: 'cb-search-trips',
	templateUrl: './search-trips.component.html',
	styleUrls: ['./search-trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTripsComponent implements OnInit {
	fromCities$: Observable<any>;
	form: FormGroup;
	currentDate = moment();

	readonly constants: Constants = constants;

	constructor(private tripService: TripService) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			fromCity: new FormControl('', [Validators.required]),
			toCity: new FormControl('', [Validators.required]),
			date: new FormControl('', [Validators.required]),
			numberOfPassengers: new FormControl(1, [
				Validators.required,
				Validators.min(1),
				Validators.max(8),
			]),
		});
	}

	search(): void {
		this.tripService.search(this.form.value)
			.subscribe(console.log);
	}

	control(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}
}
