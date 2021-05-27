import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy,
	ChangeDetectorRef,
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { constants, Constants } from '@constants/constants';
import { Rating } from '@models/rating.model';
import { Trip } from '@models/trip.model';
import { DriverService } from '@services/driver.service';
import { RatingService } from '@services/rating.service';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';
import { AuthorizationService } from '@services/authorization.service';

@Component({
	selector: 'cb-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent implements OnInit, OnDestroy {
	trip = Trip.empty;
	form: FormGroup;
	canRate$ = new BehaviorSubject<boolean>(false);

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();

	constructor(
		private authorizationService: AuthorizationService,
		private cdRef: ChangeDetectorRef,
		private driverService: DriverService,
		private ratingService: RatingService,
		private route: ActivatedRoute,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.tripStore.selectedTrip$
			.pipe(takeUntil(this.destroy$))
			.subscribe((trip: Trip | null) => {
				this.trip = trip!;
				this.cdRef.markForCheck();
			});
	}

	ngOnInit(): void {
		this.tripService.getTrip(this.route.snapshot.paramMap.get('id')!)
			.pipe(
				switchMap((trip: Trip) => this.driverService.canRateDriver(trip.id, trip.driverId)),
			)
			.subscribe((canRate: boolean) => this.canRate$.next(canRate));
	}

	ngOnDestroy(): void {
		this.tripStore.clearTrip();
		this.destroy$.next();
		this.destroy$.complete();
	}

	rate(rating: Rating): void {
		this.ratingService.rate({
			...rating,
			tripId: this.trip.id,
			authorId: this.authorizationService.currentUserId,
			recipientId: this.trip.driverId,
		}).subscribe(() => this.canRate$.next(false));
	}

	get isTripActive(): boolean {
		return this.trip.isActive(moment());
	}
}
