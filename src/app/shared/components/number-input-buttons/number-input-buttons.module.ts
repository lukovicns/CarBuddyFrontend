import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconButtonModule } from '@components/icon-button/icon-button.module';
import { NumberInputButtonsComponent } from '@components/number-input-buttons/number-input-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		NumberInputButtonsComponent,
	],
	imports: [
		CommonModule,
		IconButtonModule,
		ReactiveFormsModule,
	],
	exports: [
		NumberInputButtonsComponent,
	],
})
export class NumberInputButtonsModule { }
