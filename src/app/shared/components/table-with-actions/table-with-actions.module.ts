import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { DropdownMenuModule } from '@components/dropdown-menu/dropdown-menu.module';
import { PaginatorModule } from '@components/paginator/paginator.module';
import { TableWithActionsComponent } from './table-with-actions.component';

@NgModule({
	declarations: [
		TableWithActionsComponent,
	],
	imports: [
		CommonModule,
		DropdownMenuModule,
		MatTableModule,
		PaginatorModule,
	],
	exports: [
		TableWithActionsComponent,
	],
})
export class TableWithActionsModule { }
