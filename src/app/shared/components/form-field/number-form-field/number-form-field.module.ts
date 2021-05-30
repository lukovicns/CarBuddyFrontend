import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormFieldModule } from '@form-field/form-field.module';
import { NumberFormFieldComponent } from '@form-field/number-form-field/number-form-field.component';

@NgModule({
	declarations: [
		NumberFormFieldComponent,
	],
	imports: [
		CommonModule,
		FormFieldModule,
		MatFormFieldModule,
		MatInputModule,
	],
	exports: [
		NumberFormFieldComponent,
	],
})
export class NumberFormFieldModule { }
