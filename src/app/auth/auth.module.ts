import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { CardModule } from '@components/card/card.module';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { FormFieldModule } from '@form-field/form-field.module';
import { EmailFormFieldModule } from '@form-field/email-form-field/email-form-field.module';
import { PasswordFormFieldModule } from '@form-field/password-form-field/password-form-field.module';
import { UploadFormFieldModule } from '@form-field/upload-form-field/upload-form-field.module';
import { NumberFormFieldModule } from '@form-field/number-form-field/number-form-field.module';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		AuthRoutingModule,
		CardModule,
		CommonModule,
		EmailFormFieldModule,
		FormFieldModule,
		NumberFormFieldModule,
		PasswordFormFieldModule,
		ReactiveFormsModule,
		UploadFormFieldModule,
	],
})
export class AuthModule { }
