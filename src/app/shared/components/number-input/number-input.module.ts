import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { NumberInputComponent } from '@components/number-input/number-input.component';

@NgModule({
	declarations: [
		NumberInputComponent,
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	exports: [
		NumberInputComponent,
	],
})
export class NumberInputModule { }
