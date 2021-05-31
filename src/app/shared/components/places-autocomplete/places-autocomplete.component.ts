import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

import { errorMessages, ErrorMessages } from '@constants/error-messages';

@Component({
	selector: 'cb-places-autocomplete',
	templateUrl: './places-autocomplete.component.html',
	styleUrls: [],
})
export class PlacesAutocompleteComponent {
	@Input() form: FormGroup;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() name: string;

	options = <Options> {
		componentRestrictions: {
			country: 'RS',
		},
		types: ['(cities)'],
	}

	readonly errorMessages: ErrorMessages = errorMessages;

	get control(): AbstractControl {
		return this.form.get(this.name)!;
	}
}
