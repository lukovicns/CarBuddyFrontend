import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { numberControl, textControl } from '@constants/form-controls';
import { constants, Constants } from '@constants/constants';
import { Trip } from '@models/trip.model';
import { TripStoreService } from '@services/trip-store.service';
import { TripRequestService } from '@services/trip-request.service';
import { AuthorizationService } from '@services/authorization.service';
import { ConversationService } from '@services/conversation.service';
import { DialogService } from '@services/dialog.service';

@Component({
	selector: 'cb-trip-actions',
	templateUrl: './trip-actions.component.html',
	styleUrls: ['./trip-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripActionsComponent implements OnInit {
	@Input() trip: Trip;

	isPending$: Observable<boolean>;
	tripRequestExists$ = new BehaviorSubject<boolean>(false);
	conversationId: string;

	sendRequestForm: FormGroup;
	contactDriverForm: FormGroup;
	isContactFormVisible = false;
	isSendingDisabled = false;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private conversationService: ConversationService,
		private dialogService: DialogService,
		private tripStore: TripStoreService,
		private tripRequestService: TripRequestService,
	) {
		this.isPending$ = this.tripStore.isReservationPending$;
	}

	get numberOfSeats(): AbstractControl {
		return this.sendRequestForm.get('numberOfSeats')!;
	}

	ngOnInit(): void {
		this.initializeSendRequestForm();
		this.initializeContactDriverForm();
		this.checkIfTripRequestExists();
		this.getConversationId();
	}

	openConfirmationDialog(): void {
		const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
			title: 'Send request',
			message: `Total price for this trip is ${this.calculateTotalPrice()} RSD. Proceed?`,
		});

		dialogRef.componentInstance.onConfirm
			.subscribe(() => this.sendTripRequest());
	}

	sendTripRequest(): void {
		this.tripRequestService.sendTripRequest(
			this.trip.id,
			this.trip.driverId,
			this.numberOfSeats.value,
		).subscribe(() => this.sendRequestForm.reset());
	}

	private initializeSendRequestForm(): void {
		this.sendRequestForm = new FormGroup({
			numberOfSeats: numberControl(0),
		});
	}

	private initializeContactDriverForm(): void {
		this.contactDriverForm = new FormGroup({
			message: textControl(''),
		});
	}

	private checkIfTripRequestExists(): void {
		this.tripRequestService.tripRequestExists(this.trip.id)
			.subscribe((exists: boolean) => this.tripRequestExists$.next(exists));
	}

	private getConversationId(): void {
		this.conversationService.getConversationId(
			this.trip.driverId,
			this.authorizationService.currentUserId,
		).subscribe({
			next: (id: string) => this.conversationId = id,
			error: () => this.isSendingDisabled = true,
		});
	}

	private calculateTotalPrice(): number {
		return this.numberOfSeats.value * this.trip.price;
	}
}
