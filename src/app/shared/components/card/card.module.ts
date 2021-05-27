import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CardComponent } from '@components/card/card.component';

@NgModule({
	declarations: [
		CardComponent,
	],
	imports: [
		CommonModule,
		MatCardModule,
	],
	exports: [
		CardComponent,
	],
})
export class CardModule { }
