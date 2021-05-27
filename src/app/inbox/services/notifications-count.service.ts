import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { notificationsUrl, tripRequestsCountUrl } from '@constants/urls';
import { AuthorizationService } from '@services/authorization.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';

@Injectable({
	providedIn: 'root',
})
export class NotificationsCountService {
	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private pushNotificationStore: PushNotificationStoreService,
	) { }

	get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}

	getMessagesCount(): Observable<number | null> {
		return this.http.get<number>(notificationsUrl(this.currentUserId))
			.pipe(
				tap({
					next: (messages: number) => this.pushNotificationStore.setMessagesCount(messages),
				}),
			);
	}

	getTripRequestsCount(): Observable<number | null> {
		return this.http.get<number>(tripRequestsCountUrl(this.currentUserId))
			.pipe(
				tap({
					next: (tripRequests: number) => this.pushNotificationStore.setTripRequestsCount(tripRequests),
				}),
			);
	}
}
