import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { AuthStoreService } from '@services/auth-store.service';
import { NotificationsCountService } from '@services/notifications-count.service';
import { ChatHubService } from '@services/chat-hub.service';
import { TripRequestHubService } from '@services/trip-request-hub.service';
import { CarService } from '@services/car.service';

@Component({
	selector: 'cb-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	constructor(
		private authStore: AuthStoreService,
		private chatHubService: ChatHubService,
		private notificationsCountService: NotificationsCountService,
		private tripRequestHubService: TripRequestHubService,
		private carService: CarService,
	) {
		this.chatHubService.connect();
		this.tripRequestHubService.connect();
	}

	ngOnInit(): void {
		this.authStore.isUserLoggedIn$
			.pipe(
				filter(Boolean),
				switchMap(() => this.notificationsCountService.getMessagesCount()),
				switchMap(() => this.notificationsCountService.getTripRequestsCount()),
				switchMap(() => this.carService.getUserCar()),
				takeUntil(this.destroy$),
			).subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
