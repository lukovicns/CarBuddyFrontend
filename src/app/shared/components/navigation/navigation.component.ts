import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Constants, constants } from '@constants/constants';
import { AuthService } from '@services/auth.service';
import { AuthStoreService } from '@services/auth-store.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';

@Component({
	selector: 'cb-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	isUserLoggedIn$: Observable<boolean>;
	notificationsCount: number | null;

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private authService: AuthService,
		private authStore: AuthStoreService,
		public pushNotificationStore: PushNotificationStoreService,
	) {
		this.isUserLoggedIn$ = this.authStore.isUserLoggedIn$;
		this.pushNotificationStore.notificationsCount$
			.pipe(takeUntil(this.destroy$))
			.subscribe((notificationsCount: number | null) => {
				this.notificationsCount = notificationsCount;
				this.cdRef.markForCheck();
			});
	}

	logout(): void {
		this.pushNotificationStore.clearNotificationsCount();
		this.authService.logout();
	}
}
