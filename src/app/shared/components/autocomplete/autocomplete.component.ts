import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { getFormControlName } from '../../functions';

@Component({
	selector: 'cb-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;

	formControlName: string;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.form, this.control);
	}
}
