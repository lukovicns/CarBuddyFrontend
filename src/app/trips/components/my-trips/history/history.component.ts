import {
	Component,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	OnInit,
	OnDestroy,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { Pagination } from '@models/pagination.model';
import { TripsData } from '@app/trips/models/trips-data.model';
import { TripSummary } from '@models/trip-summary.model';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';
import { toInstances } from '@shared/functions';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'cb-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, OnDestroy {
	pagination: Pagination;
	data: TripsData[] | null;

	readonly constants: Constants = constants;
	readonly columns: Column[] = [
		{
			name: 'driverFullName',
			label: 'Driver',
		},
		{
			name: 'from',
			label: 'From',
		},
		{
			name: 'to',
			label: 'To',
		},
		{
			name: 'date',
			label: 'Date',
		},
		{
			name: 'timeRange',
			label: 'Time',
		},
	];

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.initPagination();
		this.initTripsHistoryData();
	}

	ngOnInit(): void {
		this.fetchTripsHistory(this.pagination);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	changePage(event: PageEvent): void {
		this.fetchTripsHistory({
			page: event.pageIndex + 1,
			size: event.pageSize,
		});
	}

	private initPagination(): void {
		this.tripStore.tripsHistoryPagination$
			.pipe(takeUntil(this.destroy$))
			.subscribe((pagination: Pagination) => {
				this.pagination = pagination;
				this.cdRef.markForCheck();
			});
	}

	private initTripsHistoryData(): void {
		this.tripStore.tripsHistory$
			.pipe(takeUntil(this.destroy$))
			.subscribe((tripsHistory: TripSummary[] | null) => {
				if (tripsHistory) {
					this.data = toInstances(TripsData, tripsHistory);
					this.cdRef.markForCheck();
				}
			});
	}

	private fetchTripsHistory(data: any): void {
		this.tripService.getTripsHistory(new Pagination(data || {}))
			.subscribe();
	}
}
