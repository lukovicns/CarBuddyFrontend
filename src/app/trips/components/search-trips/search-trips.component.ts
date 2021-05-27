import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { constants, Constants } from '@modules/shared/constants';

enum FormControlName {
	FromCity = 'fromCity',
	ToCity = 'toCity',
	NumberOfPassengers = 'numberOfPassengers'
}

@Component({
	selector: 'cb-search-trips',
	templateUrl: './search-trips.component.html',
	styleUrls: ['./search-trips.component.scss'],
})
export class SearchTripsComponent implements OnInit {
	form: FormGroup;
	
	readonly constants: Constants = constants;

	ngOnInit(): void {
		this.form = new FormGroup({
			fromCity: new FormControl('', [Validators.required]),
			toCity: new FormControl('', [Validators.required]),
			numberOfPassengers: new FormControl('', [Validators.required]),
		});

		this.control(FormControlName.FromCity).valueChanges
			.pipe(debounceTime(1000))
			.subscribe((value: string) => {
				if (value.length >= 3) {
					// this.locationService.searchCities(value);
				}
			});
	}

	search(): void {
		console.log(this.form.value);
	}

	control(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}
}
