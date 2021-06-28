import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { chatMessagesUrl, inboxMessagesUrl } from '@constants/urls';
import { Message } from '@models/message.model';
import { ListResponse } from '@models/list-response.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { toInstances } from '@shared/functions';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	private currentUserId: string;

	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private errorHandler: ErrorHandlerService,
	) {
		this.currentUserId = this.authorizationService.currentUserId;
	}

	getInboxMessages(): Observable<Message[]> {
		return this.http.get<ListResponse<Message>>(inboxMessagesUrl(this.currentUserId))
			.pipe(
				map((response: ListResponse<Message>) => toInstances(Message, response.content)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}

	getChatMessages(recipientId: string): Observable<Message[]> {
		return this.http.get<ListResponse<Message>>(chatMessagesUrl(recipientId, this.currentUserId))
			.pipe(
				map((response: ListResponse<Message>) => toInstances(Message, response.content)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}
}
