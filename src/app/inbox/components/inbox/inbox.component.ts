import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { MessageStoreService } from '@services/message-store.service';
import { ConversationService } from '@services/conversation.service';
import { ConversationStoreService } from '@services/conversation-store.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
	conversations$: Observable<Conversation[] | null>;
	messages$: Observable<ChatMessage[] | null>;
	selectedConversation$: Observable<string | null>;

	readonly constants: Constants = constants;

	constructor(
		private messageStore: MessageStoreService,
		private conversationService: ConversationService,
		private conversationStore: ConversationStoreService,
	) {
		this.conversations$ = this.conversationStore.conversations$;
		this.messages$ = this.messageStore.messages$;
		this.selectedConversation$ = this.conversationStore.selectedConversation$;
	}

	ngOnInit(): void {
		this.conversationService.getConversations()
			.subscribe();
	}

	selectConversation(conversationId: string): void {
		this.conversationStore.selectConversation(conversationId);
	}
}
