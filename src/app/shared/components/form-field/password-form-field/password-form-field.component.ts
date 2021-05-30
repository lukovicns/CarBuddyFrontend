import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormFieldComponent } from '@form-field/form-field.component';

@Component({
	selector: 'cb-password-form-field',
	templateUrl: './password-form-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [],
})
export class PasswordFormFieldComponent extends FormFieldComponent { }
