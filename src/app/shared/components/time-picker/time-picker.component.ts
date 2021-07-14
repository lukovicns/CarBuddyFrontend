import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input, 
} from '@angular/core';

import { errorMessages, ErrorMessages } from '@constants/error-messages';
import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-time-picker',
	templateUrl: './time-picker.component.html',
	styleUrls: ['./time-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;

	formControlName: string;

	readonly errorMessages: ErrorMessages = errorMessages;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.control);
	}
}
