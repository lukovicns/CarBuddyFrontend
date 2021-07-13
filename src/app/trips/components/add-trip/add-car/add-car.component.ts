import { FormControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit, 
} from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { Car } from '@models/car.model';

@Component({
	selector: 'cb-add-car',
	templateUrl: './add-car.component.html',
	styleUrls: ['./add-car.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarComponent implements OnInit {
	@Input() car: Car;

	form: FormGroup;

	readonly constants: Constants = constants;

	ngOnInit(): void {
		this.form = new FormGroup({
			brand: requiredTextControl(''),
			model: requiredTextControl('', 2, 20),
			photo: new FormControl(''),
			numberOfSeats: numberControl(1),
		});
	}
}
