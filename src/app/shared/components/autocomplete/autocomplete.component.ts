import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ElementRef,
	Input,
	NgZone,
	OnInit,
	ViewChild, 
} from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() items: any[] = [];
	@Input() label: string;
	@Input() placeholder: string;

	 @ViewChild('placesRef') placesRef : GooglePlaceDirective;
	@ViewChild('autocompleteInput') autocompleteInput: ElementRef;

	formControlName: string;
	options: string[] = [];

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
	) { }

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.form, this.control);
		this.getPlaceAutocomplete();
	}

	private getPlaceAutocomplete() {
		this.mapsAPILoader.load().then(() => {
			const autocomplete = new google.maps.places.Autocomplete(
				this.autocompleteInput.nativeElement,
				{ componentRestrictions: { country: 'rs' } },
			);
			autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
					const place = autocomplete.getPlace();
					console.log(place);
				});
			});
		});
	}
}
