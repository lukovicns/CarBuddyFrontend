import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnInit,
	SimpleChanges,
	OnChanges,
} from '@angular/core';

import { Column } from '@models/column.type';
import { Pagination } from '@models/pagination.model';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';

@Component({
	selector: 'cb-table-with-actions',
	templateUrl: './table-with-actions.component.html',
	styleUrls: ['./table-with-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWithActionsComponent<T> implements OnInit, OnChanges {
	@Input() data: T[];
	@Input() columns: Column[];
	@Input() actions: DropdownMenuItem[];
	@Input() pagination: Pagination;
	@Input() selectedRow: string | null;

	@Output() onSelect = new EventEmitter<any>();
	@Output() onPageChange = new EventEmitter<PageEvent>();
	@Output() onHandleAction = new EventEmitter<any>();

	dataSource: MatTableDataSource<T>;
	displayedColumns: string[];

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.initializeDataSource();
		this.displayedColumns = this.toDisplayedColumnNames();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.data && this.data) {
			this.initializeDataSource();
		}
	}

	isSelectedRow(rowId: string): boolean {
		return !!this.selectedRow && this.selectedRow === rowId;
	}

	navigateTo(url: string): void {
		this.router.navigate([url]);
	}

	private initializeDataSource(): void {
		this.dataSource = new MatTableDataSource(this.data);
	}

	private toDisplayedColumnNames(): string[] {
		return [...this.columns.map((column: Column) => column.name), 'actions'];
	}
}
