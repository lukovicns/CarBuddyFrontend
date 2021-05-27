import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
	Output,
	EventEmitter,
} from '@angular/core';

import { Column } from '@models/column.type';
import { Pagination } from '@models/pagination.model';

@Component({
	selector: 'cb-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
	@Input() data: T[];
	@Input() columns: Column[];
	@Input() pagination: Pagination;

	@Output() onPageChange = new EventEmitter<PageEvent>();

	dataSource: MatTableDataSource<T>;
	selection: SelectionModel<T>;
	displayedColumns: string[];

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.data);
		this.selection = new SelectionModel<T>(true, []);
		this.displayedColumns = this.toDisplayedColumnNames();
	}

	navigateTo(url: string): void {
		this.router.navigate([url]);
	}

	private toDisplayedColumnNames(): string[] {
		return this.columns.map((column: Column) => column.name);
	}
}
