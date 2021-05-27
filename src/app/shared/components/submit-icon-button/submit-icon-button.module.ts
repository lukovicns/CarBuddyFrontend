import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { IconButtonModule } from '@components/icon-button/icon-button.module';
import { SubmitIconButtonComponent } from '@components/submit-icon-button/submit-icon-button.component';

@NgModule({
	declarations: [
		SubmitIconButtonComponent,
	],
	imports: [
		ButtonLoaderModule,
		CommonModule,
		IconButtonModule,
	],
	exports: [
		SubmitIconButtonComponent,
	],
})
export class SubmitIconButtonModule { }
