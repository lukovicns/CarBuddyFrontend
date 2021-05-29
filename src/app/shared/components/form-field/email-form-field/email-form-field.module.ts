import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldModule } from '@form-field/form-field.module';
import { EmailFormFieldComponent } from '@form-field/email-form-field/email-form-field.component';

@NgModule({
	declarations: [
		EmailFormFieldComponent,
	],
	imports: [
		CommonModule,
		FormFieldModule,
	],
	exports: [
		EmailFormFieldComponent,
	],
})
export class EmailFormFieldModule { }
