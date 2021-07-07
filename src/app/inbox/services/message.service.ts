import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { messagesUrl, conversationsUrl, sendMessageUrl } from '@constants/urls';
import { Conversation } from '@models/conversation.model';
import { ListResponse } from '@models/list-response.model';
import { ChatMessage } from '@models/chat-message.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { MessageStoreService } from '@services/message-store.service';
import { toInstances } from '@shared/functions';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	constructor(
		private http: HttpClient,
		private messageStore: MessageStoreService,
		private errorHandler: ErrorHandlerService,
		private authorizationService: AuthorizationService,
	) { }

	getConversations(): Observable<Conversation[]> {
		return this.http.get<ListResponse<Conversation>>(conversationsUrl(this.currentUserId))
			.pipe(
				map((response: ListResponse<Conversation>) => toInstances(Conversation, response.content)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}

	getMessages(senderId: string): Observable<ChatMessage[]> {
		return this.http.get<ListResponse<ChatMessage>>(messagesUrl(this.currentUserId, senderId))
			.pipe(
				map((response: ListResponse<ChatMessage>) => toInstances(ChatMessage, response.content)),
				tap({
					next: (messages: ChatMessage[]) => this.messageStore.setMessages(messages),
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}

	sendMessage(recipientId: string, message: string): Observable<ChatMessage> {
		return this.http.post<any>(sendMessageUrl, {
			senderId: this.currentUserId,
			recipientId,
			message,
		}).pipe(
			map((message: ChatMessage) => new ChatMessage(message)),
			tap({
				next: (message: ChatMessage) => this.messageStore.appendMessage(message),
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}

	private get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}
}
