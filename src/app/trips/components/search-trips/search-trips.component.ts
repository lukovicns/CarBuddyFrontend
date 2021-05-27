import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { today, twoWeeks } from '@constants/default-values';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { SearchCriteria } from '@models/search-criteria.model';

@Component({
	selector: 'cb-search-trips',
	templateUrl: './search-trips.component.html',
	styleUrls: ['./search-trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTripsComponent implements OnInit {
	form: FormGroup;
	today: moment.Moment = today;
	twoWeeks: moment.Moment = twoWeeks.subtract(1, 'd');

	readonly constants: Constants = constants;

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			fromCity: requiredTextControl(''),
			toCity: requiredTextControl(''),
			date: requiredTextControl(''),
			numberOfPassengers: numberControl(1),
		});
	}

	search(): void {
		const data = new SearchCriteria(this.form.value);
		this.router.navigate(['/trips'], {
			queryParams: {
				fromCity: data.fromCity,
				toCity: data.toCity,
				date: data.date,
				numberOfPassengers: data.numberOfPassengers,
			},
		});
	}

	control(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}
}
