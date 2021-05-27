import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Pagination } from '@models/pagination.model';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
	trips$: Observable<TripSummary[] | null>;
	pagination$: Observable<Pagination | null>;

	readonly constants: Constants = constants;

	private readonly queryParams: Params;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.trips$ = this.tripStore.trips$;
		this.pagination$ = this.tripStore.tripsPagination$;
		this.queryParams = this.route.snapshot.queryParams;
	}

	ngOnInit(): void {
		if (this.hasQueryParams) {
			this.router.navigate(['/']);
			return;
		}

		this.fetchTrips(this.queryParams);
	}

	getTrips(event: PageEvent): void {
		this.fetchTrips({
			...this.queryParams,
			page: event.pageIndex + 1,
			size: event.pageSize,
		});
	}

	private get hasQueryParams(): boolean {
		return !Object.keys(this.queryParams).length;
	}

	private fetchTrips(data: any): void {
		this.tripService.getTrips(
			new SearchCriteria(data),
			new Pagination({
				...data,
				size: 5,
			}),
		).subscribe();
	}
}
