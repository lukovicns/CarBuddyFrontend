import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
	],
	exports: [
		NavigationComponent,
	],
})
export class NavigationModule { }
