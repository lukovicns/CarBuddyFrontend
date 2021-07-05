import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { Conversation } from '@models/conversation.model';
import { Message } from '@models/message.model';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';
import { findById } from '@shared/functions';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
	messages: Message[];
	selectedConversationId$: Observable<string | null>;
	conversations: Conversation[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private messageStore: MessageStoreService,
		private messageService: MessageService,
	) {
		this.selectedConversationId$ = this.messageStore.selectedConversationId$;
	}

	ngOnInit(): void {
		this.messageService.getConversations()
			.subscribe((conversations: Conversation[]) => {
				this.conversations = conversations;
				this.cdRef.markForCheck();
			});
	}

	setSelectedConversation(conversationId: string): void {
		this.messageStore.setSelectedConversation(conversationId);
		const selectedConversation = findById(this.conversations, conversationId);
		this.messageService.getMessages(selectedConversation.senderId)
			.subscribe((messages: Message[]) => {
				this.messages = messages;
				this.cdRef.markForCheck();
			});
	}
}
