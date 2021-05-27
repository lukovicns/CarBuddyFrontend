import { PageEvent } from '@angular/material/paginator';
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
import { TripSummary } from '@models/trip-summary.model';
import { TripsData } from '@models/trips-data.model';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';
import { toInstances } from '@shared/functions';

@Component({
	selector: 'cb-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent implements OnInit, OnDestroy {
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
		this.initTripReservationsData();
	}

	ngOnInit(): void {
		this.fetchTripReservations(this.pagination);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	changePage(event: PageEvent): void {
		this.fetchTripReservations({
			page: event.pageIndex + 1,
			size: event.pageSize,
		});
	}

	private initPagination(): void {
		this.tripStore.tripReservationsPagination$
			.pipe(takeUntil(this.destroy$))
			.subscribe((pagination: Pagination) => {
				this.pagination = pagination;
				this.cdRef.markForCheck();
			});
	}

	private initTripReservationsData(): void {
		this.tripStore.tripReservations$
			.pipe(takeUntil(this.destroy$))
			.subscribe((tripReservations: TripSummary[] | null) => {
				if (tripReservations) {
					this.data = toInstances(TripsData, tripReservations);
					this.cdRef.markForCheck();
				}
			});
	}

	private fetchTripReservations(data: any = {}): void {
		this.tripService.getTripReservations(
			new Pagination({
				...data,
				size: data.size || 5,
			}),
		).subscribe();
	}
}
