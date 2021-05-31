import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { PlacesAutocompleteComponent } from '@components/places-autocomplete/places-autocomplete.component';

@NgModule({
	declarations: [
		PlacesAutocompleteComponent,
	],
	imports: [
		CommonModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		GooglePlaceModule,
		ReactiveFormsModule,
	],
	exports: [
		PlacesAutocompleteComponent,
	],
})
export class PlacesAutocompleteModule { }
