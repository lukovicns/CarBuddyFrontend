import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

import { Column } from '@models/column.type';

@Component({
	selector: 'cb-selection-table',
	templateUrl: './selection-table.component.html',
	styleUrls: ['./selection-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionTableComponent<T extends { id: string }> implements OnInit {
	@Input() data: T[];
	@Input() columns: Column[];
	@Input() selectedRowId: string | null;

	@Output() onSelect = new EventEmitter<string>();

	dataSource: MatTableDataSource<T>;
	selection: SelectionModel<T>;
	displayedColumns: string[];

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.data);
		this.selection = new SelectionModel<T>(true, []);
		this.displayedColumns = ['select', ...this.columns.map((column: Column) => column.name)];
	}

	isAllSelected(): boolean {
		return this.selection.selected.length === this.dataSource.data.length;
	}

	masterToggle(): void {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}
}
