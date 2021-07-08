import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
} from '@angular/core';

import { Observable } from 'rxjs';

import { numberControl } from '@constants/form-controls';
import { constants, Constants } from '@constants/constants';
import { Trip } from '@models/trip.model';
import { TripService } from '@services/trip.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-make-reservation',
	templateUrl: './make-reservation.component.html',
	styleUrls: ['./make-reservation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeReservationComponent implements OnInit {
	@Input() trip: Trip;

	isPending$: Observable<boolean>;
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(
		public tripStore: TripStoreService,
		private tripService: TripService,
	) {
		this.isPending$ = this.tripStore.isReservationPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			numberOfSeats: numberControl(0),
		});
	}

	makeReservation(): void {
		this.tripService.makeReservation(
			this.trip.id,
			this.numberOfSeats.value,
		).subscribe(() => this.form.reset());
	}

	get numberOfSeats(): AbstractControl {
		return this.form.get('numberOfSeats')!;
	}
}
