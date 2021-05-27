import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'cb-search-trips',
	templateUrl: './search-trips.component.html',
	styleUrls: ['./search-trips.component.scss'],
})
export class SearchTripsComponent implements OnInit {
	form: FormGroup;
	
	ngOnInit(): void {
		this.form = new FormGroup({
			search: new FormControl('', [Validators.required]),
		});

		this.search.valueChanges
			.pipe(debounceTime(1000))
			.subscribe((value: string) => {
				if (value.length >= 3) {
					// this.locationService.searchCities(value);
				}
			});
	}

	get search(): FormControl {
		return this.form.get('search') as FormControl;
	}
}
