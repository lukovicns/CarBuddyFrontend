import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { IconButtonModule } from '@components/icon-button/icon-button.module';
import { PaginatorModule } from '@components/paginator/paginator.module';
import { TableComponent } from '@components/table/table.component';

@NgModule({
	declarations: [
		TableComponent,
	],
	imports: [
		CommonModule,
		IconButtonModule,
		MatCheckboxModule,
		MatTableModule,
		PaginatorModule,
		RouterModule,
	],
	exports: [
		TableComponent,
	],
})
export class TableModule { }
