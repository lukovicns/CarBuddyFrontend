import { AbstractControl, FormGroup } from '@angular/forms';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import * as moment from 'moment';

import { Constants, constants } from '@constants/constants';
import { tomorrow, twoWeeks } from '@constants/default-values';

@Component({
	selector: 'cb-trip-form',
	templateUrl: './trip-form.component.html',
	styleUrls: ['./trip-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripFormComponent {
	@Input() form: FormGroup;
	@Input() isEditOperation = false;
	@Input() isSubmitButtonDisabled = false;
	@Input() isPending = false;

	@Output() onSave = new EventEmitter<void>();
	@Output() onCancel = new EventEmitter<void>();

	tomorrow: moment.Moment = tomorrow;
	twoWeeks: moment.Moment = twoWeeks;

	readonly constants: Constants = constants;

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
