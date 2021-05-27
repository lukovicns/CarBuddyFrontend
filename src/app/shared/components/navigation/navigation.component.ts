import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants, constants } from '@constants/constants';
import { TripRequestsComponent } from '@components/trip-requests/trip-requests.component';
import { AuthService } from '@services/auth.service';
import { AuthStoreService } from '@services/auth-store.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';
import { TripStoreService } from '@services/trip-store.service';
import { CarStoreService } from '@services/car-store.service';

@Component({
	selector: 'cb-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	isUserLoggedIn$: Observable<boolean>;
	messagesCount$: Observable<number>;
	tripRequestsCount$: Observable<number>;
	isDriver$: Observable<boolean>;

	readonly constants: Constants = constants;

	constructor(
		private authService: AuthService,
		private authStore: AuthStoreService,
		private carStore: CarStoreService,
		private conversationStore: ConversationStoreService,
		private dialog: MatDialog,
		private pushNotificationStore: PushNotificationStoreService,
		private tripStore: TripStoreService,
	) {
		this.isUserLoggedIn$ = this.authStore.isUserLoggedIn$;
		this.messagesCount$ = this.pushNotificationStore.messagesCount$;
		this.tripRequestsCount$ = this.pushNotificationStore.tripRequestsCount$;
		this.isDriver$ = this.carStore.hasCar$.pipe(map((value: boolean | null) => !!value));
	}

	logout(): void {
		this.carStore.clearCar();
		this.conversationStore.clearConversations();
		this.tripStore.clearTripReservations();
		this.tripStore.clearTripsHistory();
		this.pushNotificationStore.reset();
		this.authService.logout();
	}

	openTripRequestsDialog(): void {
		this.dialog.open(TripRequestsComponent, {
			width: '700px',
		});
	}
}
