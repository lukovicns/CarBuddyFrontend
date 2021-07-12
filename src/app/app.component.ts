import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit, 
} from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

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
		private authStore: AuthStoreService,
		private pushNotificationService: PushNotificationService,
	) { }

	ngOnInit(): void {
		this.authStore.isUserLoggedIn$
			.pipe(
				switchMap((isLoggedIn: boolean) => this.getNotificationsIfLoggedIn(isLoggedIn)),
				takeUntil(this.destroy$),
			).subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private getNotificationsIfLoggedIn(isLoggedIn: boolean): Observable<number | null> {
		return !isLoggedIn
			? of(null)
			: of(null).pipe(
				switchMap(() => this.pushNotificationService.getNotifications()),
			);
	}
}
