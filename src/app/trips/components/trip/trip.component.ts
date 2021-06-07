import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { numberControl } from '@constants/form-controls';
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
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private tripService: TripService,
	) { }

	ngOnInit(): void {
		this.trip$ = this.tripService.getTrip(
			this.route.snapshot.paramMap.get('id')!,
		);
		this.form = new FormGroup({
			numberOfSeats: numberControl,
		});
	}

	makeReservation(tripId: string): void {
		this.tripService.makeReservation(
			tripId,
			this.form.get('numberOfSeats')!.value,
		);
	}
}
