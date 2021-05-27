import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { FlatButtonComponent } from '@components/flat-button/flat-button.component';

@NgModule({
	declarations: [
		FlatButtonComponent,
	],
	imports: [
		CommonModule,
		ButtonLoaderModule,
		MatButtonModule,
	],
	exports: [
		FlatButtonComponent,
	],
})
export class FlatButtonModule { }
