import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as moment from 'moment';

import { AddCarDialogComponent } from '@components/add-trip/add-car-dialog/add-car-dialog.component';
import { numberControl, requiredTextControl } from '@constants/form-controls';
import { constants, Constants } from '@constants/constants';
import { CarService } from '@services/car.service';

@Component({
	selector: 'cb-add-car',
	templateUrl: './add-car.component.html',
	styleUrls: ['./add-car.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarComponent implements OnInit {
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(
		private dialog: MatDialog,
		private carService: CarService,
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			brand: requiredTextControl(''),
			model: requiredTextControl('', 2, 20),
			year: new FormControl(moment().year()),
			photo: new FormControl(''),
			numberOfSeats: numberControl(4, 1, 8),
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(AddCarDialogComponent, {
			disableClose: true,
			autoFocus: false,
			width: '500px',
			panelClass: 'mat-dialog-overlay',
			data: this.form,
		});

		dialogRef.componentInstance.onAddCar
			.subscribe(() => this.addCar());
	}

	private addCar(): void {
		this.carService.addCar(this.form.value)
			.subscribe();
	}
}
