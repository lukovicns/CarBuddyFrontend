import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Inject,
	OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Constants, constants } from '@constants/constants';
import { Trip } from '@models/trip.model';
import { TripService } from '@modules/trips/services/trip.service';
import { TripFormService } from '@modules/trips/services/trip-form.service';
import { TripStoreService } from '@services/trip-store.service';

@Component({
	selector: 'cb-edit-trip-dialog',
	templateUrl: './edit-trip-dialog.component.html',
	styleUrls: ['./edit-trip-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTripDialogComponent implements OnInit {
	isPending$: Observable<boolean>;
	form: FormGroup;

	onSave = new EventEmitter<void>();

	readonly constants: Constants = constants;

	constructor(
		@Inject(MAT_DIALOG_DATA) public tripId: string,
		private cdRef: ChangeDetectorRef,
		private dialogRef: MatDialogRef<EditTripDialogComponent>,
		private tripFormService: TripFormService,
		private tripService: TripService,
		private tripStore: TripStoreService,
	) {
		this.isPending$ = this.tripStore.isEditTripPending$;
	}

	ngOnInit(): void {
		this.form = this.tripFormService.initializeForm();
		this.populateForm();
	}

	editTrip(): void {
		this.tripService.editTrip(this.tripId, this.form.value)
			.subscribe(() => {
				this.onSave.emit();
				this.close();
			});
	}

	close(): void {
		this.dialogRef.close();
	}

	private populateForm(): void {
		this.tripService.getTrip(this.tripId)
			.subscribe((trip: Trip) => {
				this.tripFormService.updateForm(this.form, trip);
				this.cdRef.markForCheck();
			});
	}
}
