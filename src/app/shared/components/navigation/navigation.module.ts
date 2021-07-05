import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '@components/navigation/navigation.component';

@NgModule({
	declarations: [
		NavigationComponent,
	],
	imports: [
		CommonModule,
		MatBadgeModule,
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
