/* eslint-disable no-console */
import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

import { sendMessageUrl, chatUrl } from '@constants/urls';
import { SentMessage } from '@models/sent-message.model';
import { Message } from '@models/message.model';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private connection = new signalR.HubConnectionBuilder()
		.withUrl(chatUrl)
		.build();

    private message = new Subject<Message>();

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
