import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { constants, Constants } from '@constants/constants';

import { Car } from '@models/car.model';

@Component({
	selector: 'cb-add-car',
	templateUrl: './add-car.component.html',
	styleUrls: ['./add-car.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarComponent {
	@Input() car: Car;

	readonly constants: Constants = constants;
}
