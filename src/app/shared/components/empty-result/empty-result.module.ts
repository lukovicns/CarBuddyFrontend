import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyResultComponent } from './empty-result.component';

@NgModule({
	declarations: [
		EmptyResultComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		EmptyResultComponent,
	],
})
export class EmptyResultModule { }
