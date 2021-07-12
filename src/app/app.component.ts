import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit, 
} from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { AuthorizationService } from '@services/authorization.service';
import { AuthStoreService } from '@services/auth-store.service';
import { PushNotificationService } from '@services/push-notification.service';

@Component({
	selector: 'cb-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	constructor(
		private authorizationService: AuthorizationService,
		private authStore: AuthStoreService,
		private pushNotificationService: PushNotificationService,
	) { }

	ngOnInit(): void {
		this.authStore.isUserLoggedIn$
			.pipe(
				switchMap((isLoggedIn: boolean) => isLoggedIn
					? this.getUnreadConversationsCount()
					: of(null),
				),
				takeUntil(this.destroy$),
			).subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private getUnreadConversationsCount(): Observable<number | null> {
		return of(this.authorizationService.currentUserId)
			.pipe(
				switchMap((currentUserId: string) => this.pushNotificationService.getUnreadConversationsCount(
					currentUserId,
				)),
			);
	}
}
