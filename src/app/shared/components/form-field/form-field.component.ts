import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
	@Input() label: string;
	@Input() placeholder: string;
	@Input() icon: string;
	@Input() type = 'text';
}
