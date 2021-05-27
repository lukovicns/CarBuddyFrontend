import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
} from '@angular/core';

import * as moment from 'moment';

import { errorMessages, ErrorMessages } from '@constants/error-messages';
import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() startDate: moment.Moment;
	@Input() minDate: moment.Moment;
	@Input() maxDate: moment.Moment;

	formControlName: string;

	readonly errorMessages: ErrorMessages = errorMessages;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.control);
	}
}
