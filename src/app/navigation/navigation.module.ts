import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
	],
	exports: [
		NavigationComponent,
	],
})
export class NavigationModule { }
