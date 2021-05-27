import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ListResponse } from '@models/list-response.model';
import { Conversation } from '@models/conversation.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';
import { toInstances } from '@shared/functions';
import {
	conversationIdUrl,
	conversationsUrl,
	conversationUrl,
	markAsReadUrl,
	markAsUnreadUrl,
} from '@constants/urls';

@Injectable({
	providedIn: 'root',
})
export class ConversationService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
		private authorizationService: AuthorizationService,
		private conversationStore: ConversationStoreService,
		private pushNotificationStore: PushNotificationStoreService,
	) { }

	getConversations(): Observable<Conversation[]> {
		return this.http.get<ListResponse<Conversation>>(conversationsUrl(this.authorizationService.currentUserId))
			.pipe(
				map((response: ListResponse<Conversation>) => toInstances(Conversation, response.content)),
				tap({
					next: (conversations: Conversation[]) => this.conversationStore.setConversations(conversations),
					error: (error: HttpErrorResponse) => {
						this.errorHandler.handle(error);
						this.conversationStore.setConversations([]);
					},
				}),
			);
	}

	getConversationId(firstParticipantId: string, secondParticipantId: string): Observable<string> {
		return this.http.get<string>(conversationIdUrl(firstParticipantId, secondParticipantId))
			.pipe(
				map((data: any) => data.id),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}

	markAsRead(conversationId: string): Observable<any> {
		return this.http.post(markAsReadUrl(conversationId), {})
			.pipe(
				tap(() => {
					this.conversationStore.markAsRead(conversationId);
					this.pushNotificationStore.decrementMessagesCount();
				}),
			);
	}

	markAsUnread(conversationId: string): Observable<any> {
		return this.http.post(markAsUnreadUrl(conversationId), {})
			.pipe(
				tap(() => {
					this.conversationStore.markAsUnread(conversationId);
					this.pushNotificationStore.incrementMessagesCount();
				}),
			);
	}

	deleteConversation(conversationId: string): Observable<void> {
		return this.http.delete<void>(conversationUrl(conversationId))
			.pipe(
				tap({
					next: () => this.conversationStore.removeConversation(conversationId),
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}
}
