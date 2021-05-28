import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { SubmitButtonComponent } from '@components/submit-button/submit-button.component';

@NgModule({
	declarations: [
		SubmitButtonComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
	],
	exports: [
		SubmitButtonComponent,
	],
})
export class SubmitButtonModule { }
