/* eslint-disable no-console */
import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';

import { tripRequestHubUrl } from '@constants/urls';
import { AuthorizationService } from '@services/authorization.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';
import { TripRequestService } from '@services/trip-request.service';

@Injectable({
	providedIn: 'root',
})
export class TripRequestHubService {
	private connection = new signalR.HubConnectionBuilder()
		.withUrl(tripRequestHubUrl)
		.build();

	constructor(
		private authorizationService: AuthorizationService,
		private pushNotificationStore: PushNotificationStoreService,
		private tripRequestService: TripRequestService,
	) { }

	public connect(): void {
		this.connection.on('SendTripRequest', (userId: string) => {
			if (this.authorizationService.isCurrentUser(userId)) {
				this.pushNotificationStore.incrementTripRequestCount();
				this.tripRequestService.getTripRequests()
					.subscribe();
			}
		});

		this.start();
	}

	private async start() {
		try {
			await this.connection.start();
		} catch (err: any) {
			console.log(err);
		}
	}
}
