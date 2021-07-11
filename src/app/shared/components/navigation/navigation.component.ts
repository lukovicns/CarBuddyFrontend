import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { AuthStoreService } from '@services/auth-store.service';
import { PushNotificationService } from '@services/push-notification.service';

@Component({
	selector: 'cb-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	isUserLoggedIn$: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private authStore: AuthStoreService,
		private pushNotificationService: PushNotificationService,
	) {
		this.isUserLoggedIn$ = this.authStore.isUserLoggedIn$;
	}

	logout(): void {
		this.authService.logout();
	}
}
