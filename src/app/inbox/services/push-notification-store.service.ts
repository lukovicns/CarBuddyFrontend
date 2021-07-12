import { Injectable } from '@angular/core';

import { PushNotificationState } from '@states/push-notification.state';
import { Store } from '@store/store';

const initialState: PushNotificationState = { notificationsCount: null };

@Injectable({
	providedIn: 'root',
})
export class PushNotificationStoreService extends Store<PushNotificationState> {
	notificationsCount$ = this.select((state: PushNotificationState) => state.notificationsCount);

	constructor() {
		super(initialState);
	}

	get hasNotificationsCount(): boolean {
		return this.state.notificationsCount !== null;
	}

	setNotificationsCount(notificationsCount: number): void {
		this.setState({ notificationsCount });
	}

	clearNotificationsCount(): void {
		this.setState(initialState);
	}
}
