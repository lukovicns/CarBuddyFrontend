import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from '@modules/auth-routing.module';
import { CardModule } from '@components/card/card.module';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { SubmitButtonModule } from '@components/submit-button/submit-button.module';
import { CardFormModule } from '@components/card-form/card-form.module';
import { FormFieldModule } from '@form-field/form-field.module';
import { UploadFormFieldModule } from '@form-field/upload-form-field/upload-form-field.module';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		ConfirmEmailComponent,
	],
	imports: [
		AuthRoutingModule,
		CardFormModule,
		CardModule,
		CommonModule,
		FormFieldModule,
		ReactiveFormsModule,
		SubmitButtonModule,
		UploadFormFieldModule,
	],
})
export class AuthModule { }
