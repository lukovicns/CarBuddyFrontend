import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatToolbarModule,
		RouterModule,
	],
	exports: [
		NavigationComponent,
	],
})
export class NavigationModule { }
