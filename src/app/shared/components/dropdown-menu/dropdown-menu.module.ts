import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { DropdownMenuComponent } from './dropdown-menu.component';

@NgModule({
	declarations: [
		DropdownMenuComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
	],
	exports: [
		DropdownMenuComponent,
	],
})
export class DropdownMenuModule { }
