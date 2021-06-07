import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { errorMessages, ErrorMessages } from '@constants/error-messages';

@Component({
	selector: 'cb-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
	@Input() form: FormGroup;
	@Input() name: string;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() startDate: moment.Moment;
	@Input() minDate: moment.Moment;

	readonly errorMessages: ErrorMessages = errorMessages;

	get control(): AbstractControl {
		return this.form.get(this.name)!;
	}
}
