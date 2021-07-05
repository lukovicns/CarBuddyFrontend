import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
} from '@angular/core';

import { Conversation } from '@models/conversation.model';
import { Message } from '@models/message.model';
import { MessageService } from '@services/message.service';
import { findById } from '@shared/functions';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
	conversations: Conversation[];
	selectedConversation: Conversation;
	messages: Message[] | null;

	constructor(
		private cdRef: ChangeDetectorRef,
		private messageService: MessageService,
	) { }

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
		this.showMessagesFor(conversation.senderId);
	}

	private showMessagesFor(senderId: string): void {
		this.messages = null;
		this.messageService.getMessages(senderId)
			.subscribe((messages: Message[]) => {
				this.messages = messages;
				this.cdRef.markForCheck();
			});
	}
}
