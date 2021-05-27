import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { Driver } from '@models/driver.model';

@Component({
	selector: 'cb-driver-info',
	templateUrl: './driver-info.component.html',
	styleUrls: ['./driver-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverInfoComponent {
	@Input() driver: Driver;

	readonly constants: Constants = constants;
}
