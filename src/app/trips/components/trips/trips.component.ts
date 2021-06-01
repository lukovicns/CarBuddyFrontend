import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Pagination } from '@models/pagination.model';
import { TripService } from '@services/trip.service';

@Component({
	selector: 'cb-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
	trips$: Observable<TripSummary[] | null>;
	pagination$: Observable<Pagination | null>;

	private readonly queryParams: Params;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private tripService: TripService,
	) {
		this.trips$ = this.tripService.trips$;
		this.pagination$ = this.tripService.pagination$;
		this.queryParams = this.route.snapshot.queryParams;
	}

	ngOnInit(): void {
		if (this.hasQueryParams) {
			this.router.navigate(['/']);
			return;
		}

		this.tripService.loadTrips(
			new SearchCriteria(this.queryParams),
			new Pagination(this.queryParams),
		);
	}

	getTrips(event: PageEvent): void {
		this.tripService.loadTrips(
			new SearchCriteria(this.queryParams),
			new Pagination({
				page: event.pageIndex + 1,
				size: event.pageSize,
			}),
		);
	}

	private get hasQueryParams(): boolean {
		return !Object.keys(this.queryParams).length;
	}
}
