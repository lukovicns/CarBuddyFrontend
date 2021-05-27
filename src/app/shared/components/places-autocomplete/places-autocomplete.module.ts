import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
		ReactiveFormsModule,
	],
	exports: [
		PlacesAutocompleteComponent,
	],
})
export class PlacesAutocompleteModule { }
