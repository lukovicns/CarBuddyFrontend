import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { TripSummary } from '@models/trip-summary.model';

@Component({
	selector: 'cb-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent {
	trips$: Observable<TripSummary[]>;
}
