import { AbstractControl, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ErrorMessages, errorMessages } from '@constants/error-messages';

@Component({
	selector: 'cb-form-field',
	templateUrl: './form-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [],
})
export class FormFieldComponent {
	@Input() form: FormGroup;
	@Input() name: string;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() icon: string;
	@Input() min = 1;
	@Input() max = 8;
	@Input() type = 'text';

	readonly errorMessages: ErrorMessages = errorMessages;

	get control(): AbstractControl {
		return this.form.get(this.name)!;
	}
}
