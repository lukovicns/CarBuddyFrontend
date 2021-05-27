import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';
import { Pagination } from '@models/pagination.model';
import { TripRequestSummary } from '@models/trip-request-summary.model';
import { TripRequestStoreService } from '@services/trip-request-store.service';
import { TripRequestService } from '@services/trip-request.service';
import { actions, columns } from './columns';

@Component({
	selector: 'cb-trip-requests',
	templateUrl: './trip-requests.component.html',
	styleUrls: ['./trip-requests.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripRequestsComponent implements OnInit, OnDestroy {
	pagination: Pagination;
	data$: Observable<TripRequestSummary[] | null>;

	readonly constants: Constants = constants;
	readonly columns: Column[] = columns;
	readonly actions: DropdownMenuItem[] = actions;

	private readonly destroy$ = new Subject<void>();

	constructor(
		private tripRequestService: TripRequestService,
		private tripRequestStore: TripRequestStoreService,
	) {
		this.data$ = this.tripRequestStore.tripRequests$;
	}

	ngOnInit(): void {
		this.getTripRequests();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	handleAction(action: { key: string, row: TripRequestSummary }) {
		if (action.key === 'accept') {
			this.acceptRequest(action.row);
			return;
		}

		this.declineRequest(action.row);
	}

	private getTripRequests(): void {
		this.tripRequestService.getTripRequests()
			.subscribe();
	}

	private acceptRequest(row: TripRequestSummary): void {
		this.tripRequestService.acceptRequest(row.tripId, row.passengerId)
			.subscribe();
	}

	private declineRequest(row: TripRequestSummary): void {
		this.tripRequestService.declineRequest(row.tripId, row.passengerId)
			.subscribe();
	}
}
