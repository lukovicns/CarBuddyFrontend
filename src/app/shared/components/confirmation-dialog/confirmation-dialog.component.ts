import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Component,
	ChangeDetectionStrategy,
	Inject,
	Output,
	EventEmitter,
} from '@angular/core';

import { Constants, constants } from '@constants/constants';
import { ConfirmationDialogData } from '@models/confirmation-dialog-data.type';

@Component({
	selector: 'cb-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
	@Output() onConfirm = new EventEmitter<void>();

	readonly constants: Constants = constants;

	constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }
}
