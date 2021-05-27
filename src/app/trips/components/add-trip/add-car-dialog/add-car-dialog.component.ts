import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Component,
	ChangeDetectionStrategy,
	Inject,
	Output,
	EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { CarStoreService } from '@services/car-store.service';

@Component({
	selector: 'cb-add-car-dialog',
	templateUrl: './add-car-dialog.component.html',
	styleUrls: ['./add-car-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarDialogComponent {
	@Output() onAddCar = new EventEmitter<void>();

	isPending$: Observable<boolean>;

	readonly constants: Constants = constants;
	readonly minNumberOfSeats = 1;
	readonly maxNumberOfSeats = 8;

	constructor(
		@Inject(MAT_DIALOG_DATA) public form: FormGroup,
		private dialogRef: MatDialogRef<AddCarDialogComponent>,
		private carStore: CarStoreService,
	) {
		this.isPending$ = this.carStore.isAddCarPending$;
	}

	addCar(): void {
		this.onAddCar.emit();
		this.dialogRef.close();
	}

	close(): void {
		this.dialogRef.close();
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
