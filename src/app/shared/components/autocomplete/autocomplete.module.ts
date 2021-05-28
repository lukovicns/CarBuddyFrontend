import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
	declarations: [
		AutocompleteComponent,
	],
	imports: [
		CommonModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	exports: [
		AutocompleteComponent,
	],
})
export class AutocompleteModule { }
