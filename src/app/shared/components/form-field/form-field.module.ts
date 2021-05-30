import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FormFieldComponent } from '@components/form-field/form-field.component';

@NgModule({
	declarations: [
		FormFieldComponent,
	],
	imports: [
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		CommonModule,
		ReactiveFormsModule,
	],
	exports: [
		FormFieldComponent,
	],
})
export class FormFieldModule { }
