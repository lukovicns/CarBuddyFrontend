/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as signalR from '@microsoft/signalr';

import { notificationsUrl, notificationUrl } from '@constants/urls';
import { AuthorizationService } from '@services/authorization.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService {
    private connection = new signalR.HubConnectionBuilder()
    	.withUrl(notificationUrl)
    	.configureLogging(signalR.LogLevel.Information)
    	.build();

    constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private pushNotificationStore: PushNotificationStoreService,
    ) {
    	this.connection.onclose(async () => {
    		await this.start();
    	});

    	this.connection.on('ReceiveNotification', (userId: string) => {
    		if (userId === this.authorizationService.currentUserId) {
    			console.log('You received a new message!');
    		}
    	});

    	this.start();
    }

    async start() {
    	try {
    		await this.connection.start();
    	} catch (err: any) {
    		console.log(err);
    	}
    }

    getNotifications(): Observable<number | null> {
    	return this.pushNotificationStore.hasNotificationsCount
    		? this.pushNotificationStore.notificationsCount$
    		: this.http.get<number>(notificationsUrl(this.authorizationService.currentUserId))
    			.pipe(
    				tap({
    					next: (conversations: number) => this.pushNotificationStore.setNotificationsCount(conversations),
    					error: () => this.pushNotificationStore.setNotificationsCount(0),
    				}),
    		);
    }
}
