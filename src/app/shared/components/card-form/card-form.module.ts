import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from '@components/card/card.module';
import { CardFormComponent } from '@components/card-form/card-form.component';

@NgModule({
	declarations: [
		CardFormComponent,
	],
	imports: [
		CardModule,
		CommonModule,
		ReactiveFormsModule,
	],
	exports: [
		CardFormComponent,
	],
})
export class CardFormModule { }
