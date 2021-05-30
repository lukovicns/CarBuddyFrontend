import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormFieldComponent } from '@form-field/form-field.component';

@Component({
	selector: 'cb-email-form-field',
	templateUrl: './email-form-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [],
})
export class EmailFormFieldComponent extends FormFieldComponent { }
