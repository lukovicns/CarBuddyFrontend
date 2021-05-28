import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';

@Component({
	selector: 'cb-search-trips',
	templateUrl: './search-trips.component.html',
	styleUrls: ['./search-trips.component.scss'],
})
export class SearchTripsComponent implements OnInit {
	fromCities$: Observable<any>;
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor() { }

	ngOnInit(): void {
		this.form = new FormGroup({
			fromCity: new FormControl('', [Validators.required]),
			toCity: new FormControl('', [Validators.required]),
			numberOfPassengers: new FormControl(1, [Validators.required]),
		});
	}

	search(): void {
		console.log(this.form.value);
	}

	control(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}
}
