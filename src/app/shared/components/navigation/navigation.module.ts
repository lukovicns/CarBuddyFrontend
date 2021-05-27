import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { IconButtonModule } from '@components/icon-button/icon-button.module';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { NavigationButtonComponent } from '@components/navigation/navigation-button/navigation-button.component';
import { NavigationButtonWithBadgeComponent } from './navigation-button-with-badge/navigation-button-with-badge.component';

@NgModule({
	declarations: [
		NavigationComponent,
		NavigationButtonComponent,
		NavigationButtonWithBadgeComponent,
	],
	imports: [
		CommonModule,
		IconButtonModule,
		MatBadgeModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatSidenavModule,
		MatToolbarModule,
		MatTooltipModule,
		RouterModule,
	],
	exports: [
		NavigationComponent,
	],
})
export class NavigationModule { }
