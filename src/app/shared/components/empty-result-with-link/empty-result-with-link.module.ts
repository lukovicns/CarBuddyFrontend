import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmptyResultWithLinkComponent } from './empty-result-with-link.component';

@NgModule({
	declarations: [
		EmptyResultWithLinkComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
	],
	exports: [
		EmptyResultWithLinkComponent,
	],
})
export class EmptyResultWithLinkModule { }
