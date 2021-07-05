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
	messages$: Observable<Message[] | null>;
	conversations: Conversation[];
	selectedConversation: Conversation;

	constructor(
		private cdRef: ChangeDetectorRef,
		private messageService: MessageService,
		private messageStore: MessageStoreService,
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
	}

	selectConversation(conversationId: string): void {
		const conversation = findById(this.conversations, conversationId);

		if (conversation.notEqualTo(this.selectedConversation)) {
			this.updateConversation(conversation);
		}
	}

	private updateConversation(conversation: Conversation): void {
		this.selectedConversation = findById(this.conversations, conversation.id);
		this.showMessagesFor(conversation.driverId);
	}

	private showMessagesFor(senderId: string): void {
		this.messageStore.clearMessages();
		this.messageService.getMessages(senderId)
			.subscribe();
	}
}
