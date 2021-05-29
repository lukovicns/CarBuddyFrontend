import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldModule } from '@form-field/form-field.module';
import { PasswordFormFieldComponent } from '@form-field/password-form-field/password-form-field.component';

@NgModule({
	declarations: [
		PasswordFormFieldComponent,
	],
	imports: [
		CommonModule,
		FormFieldModule,
	],
	exports: [
		PasswordFormFieldComponent,
	],
})
export class PasswordFormFieldModule { }
