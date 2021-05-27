/* eslint-disable no-console */
import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';

import { chatHubUrl } from '@constants/urls';
import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { AuthorizationService } from '@services/authorization.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageStoreService } from '@services/message-store.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';

@Injectable({
	providedIn: 'root',
})
export class ChatHubService {
	private connection = new signalR.HubConnectionBuilder()
		.withUrl(chatHubUrl)
		.build();

	constructor(
		private authorizationService: AuthorizationService,
		private conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
		private pushNotificationStore: PushNotificationStoreService,
	) { }

	connect(): void {
		this.connection.on('ReceiveMessage', (message: ChatMessage) => {
			if (this.canAppendMessage(message)) {
				this.messageStore.appendMessage(message);
			}
		});

		this.connection.on('UpdateConversation', (data: Conversation) => {
			const conversation = new Conversation(data);

			if (this.authorizationService.isCurrentUser(conversation.participant.id, conversation.user.id)) {
				this.conversationStore.updateConversation(conversation);
			}
		});

		this.connection.on('ReceiveNotification', (recipientId: string) => {
			if (this.authorizationService.isCurrentUser(recipientId)) {
				this.pushNotificationStore.incrementMessagesCount();
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

	private canAppendMessage(message: ChatMessage): boolean {
		return this.authorizationService.isCurrentUser(message.participantId)
			&& this.conversationStore.isSelectedConversation(message.conversationId);
	}
}
