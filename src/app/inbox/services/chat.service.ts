/* eslint-disable no-console */
import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';

import { sendMessageUrl, chatUrl } from '@constants/urls';
import { ChatMessage } from '@models/chat-message.model';
import { MessageStoreService } from '@services/message-store.service';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private connection = new signalR.HubConnectionBuilder()
		.withUrl(chatUrl)
		.configureLogging(signalR.LogLevel.Information)
		.build();

	constructor(
		private http: HttpClient,
		private messageStore: MessageStoreService,
	) {
    	this.connection.onclose(async () => {
    		await this.start();
    	});

    	this.connection.on('BroadcastMessage', (message: ChatMessage) => {
			this.messageStore.appendMessage(message);
    	});

    	this.start();
	}

	broadcastMessage(authorId: string, conversationId: string, message: string): Observable<ChatMessage> {
    	return this.http.post<ChatMessage>(sendMessageUrl, {
    		authorId,
    		conversationId,
    		message,
    	});
	}

	async start() {
    	try {
    		await this.connection.start();
    	} catch (err: any) {
    		console.log(err);
    	}
	}
}
