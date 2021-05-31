import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { TripService } from '@services/trip.service';

@Component({
	selector: 'cb-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
	trips$: Observable<TripSummary[]>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private tripService: TripService,
	) { }

	ngOnInit(): void {
		const params = this.route.snapshot.queryParams;

		if (!Object.keys(params).length) {
			this.router.navigate(['/']);
			return;
		}

		this.trips$ = this.tripService.getTrips(new SearchCriteria(params));
	}
}
