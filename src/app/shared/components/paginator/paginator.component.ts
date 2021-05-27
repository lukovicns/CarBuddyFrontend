import { PageEvent } from '@angular/material/paginator';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

import { Pagination } from '@models/pagination.model';

@Component({
	selector: 'cb-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
	@Input() pagination: Pagination;

	@Output() onPageChange = new EventEmitter<PageEvent>();
}
