/* eslint-disable no-console */
import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as signalR from '@microsoft/signalr';

import { sendMessageUrl, chatUrl } from '@constants/urls';
import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { ConversationStoreService } from '@services/conversation-store.service';
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
		private conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
	) {
    	this.connection.onclose(async () => {
    		await this.start();
    	});

    	this.connection.on('BroadcastMessage', (message: ChatMessage) => {
			this.messageStore.appendMessage(message);
    	});

		this.connection.on('UpdateConversation', (conversation: Conversation) => {
			this.conversationStore.updateConversation(
				new Conversation(conversation),
			);
		});

    	this.start();
	}

	broadcastMessage(
		authorId: string,
		conversationId: string,
		message: string,
	): Observable<ChatMessage> {
		this.messageStore.setPending(true);

    	return this.http.post<ChatMessage>(sendMessageUrl, {
    		authorId,
    		conversationId,
    		message,
    	}).pipe(
			tap({
				complete: () => this.messageStore.setPending(false),
			}),
		);
	}

	async start() {
    	try {
    		await this.connection.start();
    	} catch (err: any) {
    		console.log(err);
    	}
	}
}
