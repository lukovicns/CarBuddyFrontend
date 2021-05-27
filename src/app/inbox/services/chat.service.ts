/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { sendMessageUrl } from '@constants/urls';
import { AuthorizationService } from '@services/authorization.service';
import { MessageStoreService } from '@services/message-store.service';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	constructor(
		private authorizationService: AuthorizationService,
		private http: HttpClient,
		private messageStore: MessageStoreService,
	) { }

	sendMessage(conversationId: string, message: string, participantId?: string): Observable<any> {
		this.messageStore.setPending(true);
		return this.http.post<any>(sendMessageUrl, {
			authorId: this.authorizationService.currentUserId,
			conversationId,
			message,
			participantId,
		}).pipe(
			tap({
				complete: () => this.messageStore.setPending(false),
			}),
		);
	}
}
