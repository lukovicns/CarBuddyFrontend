import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { SelectionTableComponent } from '@components/selection-table/selection-table.component';

@NgModule({
	declarations: [
		SelectionTableComponent,
	],
	imports: [
		CommonModule,
		MatCheckboxModule,
		MatTableModule,
	],
	exports: [
		SelectionTableComponent,
	],
})
export class SelectionTableModule { }
