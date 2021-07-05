import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { messagesUrl, conversationsUrl } from '@constants/urls';
import { Conversation } from '@models/conversation.model';
import { ListResponse } from '@models/list-response.model';
import { Message } from '@models/message.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { MessageStoreService } from '@services/message-store.service';
import { toInstances } from '@shared/functions';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	private currentUserId: string;
	
	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private messageStore: MessageStoreService,
		private errorHandler: ErrorHandlerService,
	) {
		this.currentUserId = this.authorizationService.currentUserId;
	}

	getConversations(): Observable<Conversation[]> {
		return this.http.get<ListResponse<Conversation>>(conversationsUrl(this.currentUserId))
			.pipe(
				map((response: ListResponse<Conversation>) => toInstances(Conversation, response.content)),
				tap({
					next: (conversations: Conversation[]) => this.messageStore.setConversations(conversations),
					error: (error: HttpErrorResponse) => {
						this.errorHandler.handle(error);
						this.messageStore.setConversations([]);
					},
				}),
			);
	}

	getMessages(senderId: string): Observable<Message[]> {
		return this.http.get<ListResponse<Message>>(messagesUrl(this.currentUserId, senderId))
			.pipe(
				map((response: ListResponse<Message>) => toInstances(Message, response.content)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}
}
