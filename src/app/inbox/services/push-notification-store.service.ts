import { Injectable } from '@angular/core';

import { PushNotificationState } from '@states/push-notification.state';
import { Store } from '@store/store';

const initialState: PushNotificationState = {
	messagesCount: 0,
	tripRequestsCount: 0,
};

@Injectable({
	providedIn: 'root',
})
export class PushNotificationStoreService extends Store<PushNotificationState> {
	messagesCount$ = this.select((state: PushNotificationState) => state.messagesCount);
	tripRequestsCount$ = this.select((state: PushNotificationState) => state.tripRequestsCount);

	constructor() {
		super(initialState);
	}

	setMessagesCount(messagesCount: number): void {
		this.setState({ messagesCount });
	}

	incrementMessagesCount(): void {
		this.setState({ messagesCount: this.state.messagesCount + 1 });
	}

	decrementMessagesCount(): void {
		if (this.state.messagesCount > 0) {
			this.setState({ messagesCount: this.state.messagesCount - 1 });
		}
	}

	setTripRequestsCount(tripRequestsCount: number): void {
		this.setState({ tripRequestsCount });
	}

	incrementTripRequestCount(): void {
		this.setState({ tripRequestsCount: this.state.tripRequestsCount + 1 });
	}

	decrementTripRequestCount(): void {
		if (this.state.tripRequestsCount > 0) {
			this.setState({ tripRequestsCount: this.state.tripRequestsCount - 1 });
		}
	}

	reset(): void {
		this.setState(initialState);
	}
}
