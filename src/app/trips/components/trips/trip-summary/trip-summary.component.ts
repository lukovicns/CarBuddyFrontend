import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { TripSummary } from '@models/trip-summary.model';
import { constants, Constants } from '@constants/constants';

@Component({
	selector: 'cb-trip-summary',
	templateUrl: './trip-summary.component.html',
	styleUrls: ['./trip-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripSummaryComponent {
	@Input() trip: TripSummary;

	readonly constants: Constants = constants;
}
