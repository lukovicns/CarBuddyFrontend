import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { SubmitButtonComponent } from '@components/submit-button/submit-button.component';

@NgModule({
	declarations: [
		SubmitButtonComponent,
	],
	imports: [
		ButtonLoaderModule,
		CommonModule,
		MatButtonModule,
	],
	exports: [
		SubmitButtonComponent,
	],
})
export class SubmitButtonModule { }
