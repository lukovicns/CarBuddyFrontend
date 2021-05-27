import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IconButtonComponent } from '@components/icon-button/icon-button.component';

@NgModule({
	declarations: [
		IconButtonComponent,
	],
	imports: [
		CommonModule,
		MatBadgeModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
	],
	exports: [
		IconButtonComponent,
	],
})
export class IconButtonModule { }
