import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { Trip } from '@models/trip.model';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent implements OnInit, OnDestroy {
	trip$: Observable<Trip | null>;
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.trip$ = this.tripStore.selectedTrip$;
	}

	ngOnInit(): void {
		this.tripService.getTrip(this.route.snapshot.paramMap.get('id')!)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.tripStore.clearTrip();
	}
}
