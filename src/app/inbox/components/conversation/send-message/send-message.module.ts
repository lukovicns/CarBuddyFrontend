import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextareaModule } from '@components/textarea/textarea.module';
import { SubmitIconButtonModule } from '@components/submit-icon-button/submit-icon-button.module';
import { SendMessageComponent } from './send-message.component';

@NgModule({
	declarations: [
		SendMessageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TextareaModule,
		SubmitIconButtonModule,
	],
	exports: [
		SendMessageComponent,
	],
})
export class SendMessageModule { }
