import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormFieldComponent } from '@form-field/form-field.component';

@Component({
	selector: 'cb-number-form-field',
	templateUrl: './number-form-field.component.html',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFormFieldComponent extends FormFieldComponent implements OnInit {
	min: number;
	max: number;

	ngOnInit(): void {
		this.min = this.control.errors?.min.actual;
		this.max = this.control.errors?.max.actual;
	}
}
