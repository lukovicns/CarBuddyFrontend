import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: FormControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() min: number;
	@Input() max: number;

	formControlName: string;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.form, this.control);
	}
}
