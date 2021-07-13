import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	ChangeDetectorRef, 
} from '@angular/core';

import { AddCarDialogComponent } from '@components/add-trip/add-car-dialog/add-car-dialog.component';
import { constants, Constants } from '@constants/constants';
import { Car } from '@models/car.model';
import { CarService } from '@services/car.service';

@Component({
	selector: 'cb-add-car',
	templateUrl: './add-car.component.html',
	styleUrls: ['./add-car.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarComponent {
	@Input() form: FormGroup;
	@Input() car: Car;

	isCarAdded: boolean;

	readonly constants: Constants = constants;

	constructor(
		private cdRef: ChangeDetectorRef,
		private dialog: MatDialog,
		private carService: CarService,
	) { }

	openDialog(): void {
		const dialogRef = this.dialog.open(AddCarDialogComponent, {
			disableClose: true,
			autoFocus: false,
			panelClass: 'mat-dialog-overlay',
			data: this.form,
		});

		dialogRef.componentInstance.onAddCar
			.subscribe(() => this.addCar());
	}

	private addCar(): void {
		this.carService.addCar(this.form.value)
			.subscribe(() => {
				this.isCarAdded = true;
				this.cdRef.markForCheck();
			});
	}
}
