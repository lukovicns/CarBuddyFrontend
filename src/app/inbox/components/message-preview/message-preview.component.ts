import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { AuthorizationService } from '@services/authorization.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit {
	messages$: Observable<ChatMessage[] | null>;
	form: FormGroup;
	currentUserId: string;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private conversationStore: ConversationStoreService,
		private messageService: MessageService,
		private messageStoreService: MessageStoreService,
	) {
		this.messages$ = this.messageStoreService.messages$;
		this.currentUserId = this.authorizationService.currentUserId;
	}

	ngOnInit(): void {
		this.initializeForm();
		this.getMessages();
	}

	send(): void {
		const message = this.message.value.trim();

		if (!message) {
			return;
		}

		// this.chatService.broadcastMessage({
		// 	conversationId: this.conversationId,
		// 	senderId: this.currentUserId,
		// 	message,
		// }).subscribe(() => this.form.reset());
	}

	get message(): AbstractControl {
		return this.form.get('message')!;
	}

	private initializeForm(): void {
		this.form = new FormGroup({
			message: new FormControl(''),
		});
	}

	private getMessages(): void {
		this.conversationStore.selectedConversation$
			.pipe(
				switchMap((conversationId: string | null) => conversationId
					? this.messageService.getMessages(conversationId)
					: []),
			).subscribe();
	}
}
