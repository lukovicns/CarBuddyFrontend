/* eslint-disable no-console */
import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

import { chatUrl } from '@constants/urls';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService {
	private connection = new signalR.HubConnectionBuilder()
		.withUrl(chatUrl)
		.build();

    private message = new Subject<number>();

    readonly message$ = this.message.asObservable();

    constructor(private http: HttpClient) {
    	this.connection.onclose(async () => {
    		await this.start();
    	});

    	this.connection.on('ReceiveOne', (message: Message) => {
    		this.message.next(message);
    	});

    	this.start();
    }

    broadcastMessage(message: SentMessage): Observable<any> {
    	return this.http.post(sendMessageUrl, message);
    }

    async start() {
    	try {
    		await this.connection.start();
    	} catch (err: any) {
    		console.log(err);
    	}
    }
}
