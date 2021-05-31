import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Trip } from '@models/trip.model';
import { TripService } from '@services/trip.service';

@Component({
	selector: 'cb-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent implements OnInit {
	trip$: Observable<Trip>;

	constructor(
		private route: ActivatedRoute,
		private tripService: TripService,
	) { }

	ngOnInit(): void {
		this.trip$ = this.tripService.getTrip(
			this.route.snapshot.paramMap.get('id')!,
		);
	}
}
