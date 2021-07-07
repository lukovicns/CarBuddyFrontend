import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { conversationsUrl } from '@constants/urls';
import { ListResponse } from '@models/list-response.model';
import { Conversation } from '@models/conversation.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { toInstances } from '@shared/functions';

@Injectable({
	providedIn: 'root',
})
export class ConversationService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
		private authorizationService: AuthorizationService,
		private conversationStore: ConversationStoreService,
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
}
