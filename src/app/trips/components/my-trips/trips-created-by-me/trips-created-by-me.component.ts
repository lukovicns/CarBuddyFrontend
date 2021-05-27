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

import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { EditTripDialogComponent } from '@components/edit-trip-dialog/edit-trip-dialog.component';
import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';
import { Pagination } from '@models/pagination.model';
import { TripSummary } from '@models/trip-summary.model';
import { TripsData } from '@models/trips-data.model';
import { toInstances } from '@modules/shared/functions';
import { TripStoreService } from '@modules/trips/services/trip-store.service';
import { TripService } from '@modules/trips/services/trip.service';
import { DialogService } from '@modules/shared/services/dialog.service';
import { columns, actions } from './columns';

@Component({
	selector: 'cb-trips-created-by-me',
	templateUrl: './trips-created-by-me.component.html',
	styleUrls: ['./trips-created-by-me.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsCreatedByMeComponent implements OnInit, OnDestroy {
	pagination: Pagination;
	data: TripsData[] | null;

	readonly constants: Constants = constants;
	readonly columns: Column[] = columns;
	readonly actions: DropdownMenuItem[] = actions;

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private dialogService: DialogService,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.initPagination();
		this.initTrips();
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

	handleAction(action: { key: string; row: TripSummary }): void {
		if (action.key === 'edit') {
			this.editTrip(action.row);
			return;
		}

		this.removeTrip(action.row.id);
	}

	private initPagination(): void {
		this.tripStore.tripsCreatedByMePagination$
			.pipe(takeUntil(this.destroy$))
			.subscribe((pagination: Pagination) => {
				this.pagination = pagination;
				this.cdRef.markForCheck();
			});
	}

	private initTrips(): void {
		this.tripStore.tripsCreatedByMe$
			.pipe(takeUntil(this.destroy$))
			.subscribe((trips: TripSummary[] | null) => {
				if (trips) {
					this.updateTripsData(trips);
				}
			});
	}

	private fetchTripReservations(data: any = {}): void {
		this.tripService.getTripsCreatedByMe(
			new Pagination({
				...data,
				size: data.size || 5,
			}),
		).subscribe();
	}

	private editTrip(trip: TripSummary): void {
		const dialogRef = this.dialogService.open(
			EditTripDialogComponent,
			trip.id,
			'mat-dialog-overlay',
		);

		dialogRef.componentInstance.onSave
			.subscribe(() => this.getTripsAndUpdateTripsData());
	}

	private updateTripsData(trips: TripSummary[]): void {
		this.data = toInstances(TripsData, trips);
		this.cdRef.markForCheck();
	}

	private removeTrip(tripId: string): void {
		const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
			title: 'Remove trip',
			message: 'Are you sure you want to remove trip?',
		});

		dialogRef.componentInstance.onConfirm
			.subscribe(() => {
				this.tripService.deleteTrip(tripId)
					.subscribe(() => this.getTripsAndUpdateTripsData());
			});
	}

	private getTripsAndUpdateTripsData(): void {
		this.tripService.getTripsCreatedByMe(this.pagination)
			.subscribe((trips: TripSummary[]) => this.updateTripsData(trips));
	}
}
