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

import { errorMessages, ErrorMessages } from '@constants/error-messages';
import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-places-autocomplete',
	templateUrl: './places-autocomplete.component.html',
	styleUrls: [],
})
export class PlacesAutocompleteComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() searchType = '(cities)';
	@ViewChild('searchInput') searchInput: ElementRef;

	formControlName: string;

	readonly errorMessages: ErrorMessages = errorMessages;

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
	) { }
  
	ngOnInit() {
		this.formControlName = getFormControlName(this.control);
		this.handlePlacesAutocomplete();
	}

	private handlePlacesAutocomplete(): void {
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, {
				types: [this.searchType],
				componentRestrictions: { country: 'rs' },
			});
			autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
					const place: google.maps.places.PlaceResult = autocomplete.getPlace();
					this.control.setValue(place.formatted_address?.split(',')[0].trim());
				});
			});
		});
	}
}
