import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { errorMessages, ErrorMessages } from '@constants/error-messages';
import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnChanges {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() items: any[];

	formControlName: string;

	readonly constants: Constants = constants;
	readonly errorMessages: ErrorMessages = errorMessages;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.control);
		// this.control.disable();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.items.currentValue?.length) {
			this.control.enable();
		}
	}
}
