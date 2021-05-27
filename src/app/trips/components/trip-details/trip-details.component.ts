import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
} from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { Trip } from '@models/trip.model';
import { TripSummary } from '@models/trip-summary.model';
import { TripDetails } from '@models/trip-details.type';
import { AuthorizationService } from '@services/authorization.service';

@Component({
	selector: 'cb-trip-details',
	templateUrl: './trip-details.component.html',
	styleUrls: ['./trip-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsComponent implements OnInit {
	@Input() trip: Trip | TripSummary;

	rows: TripDetails[];

	readonly constants: Constants = constants;

	constructor(private authorizationService: AuthorizationService) { }

	ngOnInit(): void {
		this.rows = [
			{
				name: `${this.constants.from}/${this.constants.to}`,
				value: `${this.trip.fromCity} - ${this.trip.toCity}`,
			},
			{
				name: 'Start/Arrive',
				value: `${this.trip.startTime}h - ${this.trip.arriveTime}h`,
			},
			{
				name: this.constants.price,
				value: `${this.trip.price} din.`,
			},
			{
				name: this.constants.seatsLeft,
				value: `${this.trip.numberOfAvailableSeats}/${this.trip.numberOfSeats}`,
				class: this.trip.numberOfAvailableSeats === 1 ? 'warn' : 'success',
			},
		];
	}

	get isTripCreatedByMe(): boolean {
		return this.trip.isOwnedBy(this.authorizationService.currentUserId);
	}
}
