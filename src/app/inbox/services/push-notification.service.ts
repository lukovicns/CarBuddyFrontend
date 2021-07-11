/* eslint-disable no-console */
import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';

import { notificationUrl } from '@constants/urls';
import { AuthorizationService } from '@services/authorization.service';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService {
    private connection = new signalR.HubConnectionBuilder()
    	.withUrl(notificationUrl)
    	.configureLogging(signalR.LogLevel.Information)
    	.build();

    constructor(private authorizationService: AuthorizationService) {
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
}
