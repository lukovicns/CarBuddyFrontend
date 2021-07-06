import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

import { sendMessageUrl, socketUrl } from '@constants/urls';
import { tap } from 'rxjs/operators';

class SentMessage {
    recipientId: string;
    senderId: string;
    message: string;
}

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private connection = new signalR.HubConnectionBuilder()
		.configureLogging(signalR.LogLevel.Debug)
		.withUrl(socketUrl, {
			skipNegotiation: true,
			transport: signalR.HttpTransportType.WebSockets,
			accessTokenFactory: () => localStorage.getItem('token')!,
		})
		.build();

    private message = new Subject<SentMessage>();

    readonly message$ = this.message.asObservable();

    constructor(private http: HttpClient) {
    	this.connection.onclose(async () => {
    		await this.start();
    	});

    	this.connection.on('ReceiveOne', (recipientId: string, senderId: string, message: string) => {
    		this.mapReceivedMessage(recipientId, senderId, message);
    	});

    	this.start();
    }

    broadcastMessage(message: SentMessage): Observable<any> {
    	return this.http.post(sendMessageUrl, message)
    		.pipe(
    			tap(console.log),
    		);
    }

    async start() {
    	try {
    		await this.connection.start();
    		console.log('Connected!');
    	} catch (err: any) {
    		console.log(err);
    		setTimeout(() => this.start(), 5000);
    	}
    }

    private mapReceivedMessage(recipientId: string, senderId: string, message: string): void {
    	this.message.next({
    		recipientId,
    		senderId,
    		message,
    	});
    }
}
