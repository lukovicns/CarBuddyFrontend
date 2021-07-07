import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Conversation } from '@models/conversation.model';
import { ChatMessage } from '@models/chat-message.model';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';
import { ChatService } from '@services/chat.service';
import { findById } from '@shared/functions';
import { constants, Constants } from '@constants/constants';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
	messages$: Observable<ChatMessage[] | null>;
	conversations: Conversation[];
	selectedConversation: Conversation;

	readonly constants: Constants = constants;
	
	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private messageService: MessageService,
		private messageStore: MessageStoreService,
		private chatService: ChatService,
	) {
		this.messages$ = this.messageStore.messages$;
	}

	ngOnInit(): void {
		this.messageService.getConversations()
			.subscribe((conversations: Conversation[]) => {
				this.conversations = conversations;
				this.cdRef.markForCheck();

				if (conversations.length) {
					this.updateConversation(conversations[0]);
				}
			});

		this.chatService.message$
			.pipe(takeUntil(this.destroy$))
			.subscribe((message: ChatMessage) => this.messageStore.appendMessage(message));
	}
	
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	selectConversation(conversationId: string): void {
		const conversation = findById(this.conversations, conversationId);

		if (!conversation.equals(this.selectedConversation)) {
			this.updateConversation(conversation);
		}
	}

	private updateConversation(conversation: Conversation): void {
		this.selectedConversation = findById(this.conversations, conversation.id);
		// this.showMessagesFor(conversation.driverId);
	}

	private showMessagesFor(senderId: string): void {
		this.messageStore.clearMessages();
		this.messageService.getMessages(senderId)
			.subscribe();
	}
}
