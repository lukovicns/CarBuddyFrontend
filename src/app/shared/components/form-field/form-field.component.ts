import { AbstractControl, FormGroup } from '@angular/forms';
import { getFormControlName } from '@app/shared/functions';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit, 
} from '@angular/core';

import { ErrorMessages, errorMessages } from '@constants/error-messages';

@Component({
	selector: 'cb-form-field',
	templateUrl: './form-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [],
})
export class FormFieldComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() icon: string;
	@Input() min: number;
	@Input() max: number;
	@Input() type = 'text';

	formControlName: string;

	readonly errorMessages: ErrorMessages = errorMessages;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.form, this.control);
	}
}
