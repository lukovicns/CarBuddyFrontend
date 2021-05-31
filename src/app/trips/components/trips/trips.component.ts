import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TripSummary } from '@models/trip-summary.model';
import { TripService } from '@services/trip.service';

@Component({
	selector: 'cb-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
	trips$: Observable<TripSummary[]>;

	constructor(private tripService: TripService) { }

	ngOnInit(): void {
		this.trips$ = this.tripService.searchTrips();
	}
}
