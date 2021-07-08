import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter, 
} from '@angular/core';

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
	@Output() onUpdateNumberOfSeats = new EventEmitter<number>();

	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(
		public tripStore: TripStoreService,
		private tripService: TripService,
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			numberOfSeats: numberControl(1),
		});
	}

	makeReservation(): void {
		this.tripService.makeReservation(
			this.trip.id,
			this.numberOfSeatsControl.value,
		);
	}

	increase(): void {
		this.numberOfSeatsControl.setValue(this.numberOfSeatsControl.value + 1);
		this.tripStore.updateNumberOfAvailableSeats(this.trip.numberOfAvailableSeats - 1);
	}

	decrease(): void {
		this.numberOfSeatsControl.setValue(this.numberOfSeatsControl.value - 1);
		this.tripStore.updateNumberOfAvailableSeats(this.trip.numberOfAvailableSeats + 1);
	}

	get numberOfSeatsControl(): AbstractControl {
		return this.form.get('numberOfSeats')!;
	}
}
