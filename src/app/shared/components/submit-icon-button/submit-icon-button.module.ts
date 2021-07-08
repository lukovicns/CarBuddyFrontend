import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { SubmitIconButtonComponent } from '@components/submit-icon-button/submit-icon-button.component';

@NgModule({
	declarations: [
		SubmitIconButtonComponent,
	],
	imports: [
		ButtonLoaderModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
	],
	exports: [
		SubmitIconButtonComponent,
	],
})
export class SubmitIconButtonModule { }
