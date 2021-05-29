import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberFormFieldComponent } from '@form-field/number-form-field/number-form-field.component';

@NgModule({
	declarations: [
		NumberFormFieldComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		NumberFormFieldComponent,
	],
})
export class NumberFormFieldModule { }
