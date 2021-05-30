import { FormGroup } from '@angular/forms';
import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	NgZone,
	ViewChild, 
} from '@angular/core';

import { MapsAPILoader } from '@agm/core';

@Component({
	selector: 'cb-places-autocomplete',
	templateUrl: './places-autocomplete.component.html',
	styleUrls: [],
})
export class PlacesAutocompleteComponent implements AfterViewInit {
	@Input() form: FormGroup;
	@Input() name: string;
	@Input() items: any[] = [];
	@Input() label: string;
	@Input() placeholder: string;

	@ViewChild('autocompleteInput') autocompleteInput: ElementRef;

	options: string[] = [];

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
	) { }

	ngAfterViewInit(): void {
		this.getPlaceAutocomplete();
	}

	private getPlaceAutocomplete() {
		this.mapsAPILoader.load().then(() => {
			const autocomplete = new google.maps.places.Autocomplete(
				this.autocompleteInput.nativeElement,
				{
					types: ['cities'],
					componentRestrictions: { country: 'rs' },
				},
			);
			autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
					console.log('hEre');
					const place = autocomplete.getPlace();
					console.log(place);
				});
			});
		});
	}
}
