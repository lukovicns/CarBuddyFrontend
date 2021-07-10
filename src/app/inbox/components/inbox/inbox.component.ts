import {
	Component,
	ChangeDetectionStrategy,
	OnDestroy,
	OnInit, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { Conversation } from '@models/conversation.model';
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageStoreService } from '@services/message-store.service';
import { ConversationService } from '@services/conversation.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
	conversations$: Observable<Conversation[] | null>;
	selectedConversation$: Observable<string | null>;

	constructor(
		private conversationService: ConversationService,
		private conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
	) {
		this.conversations$ = this.conversationStore.conversations$;
		this.selectedConversation$ = this.conversationStore.selectedConversation$;
	}

	ngOnInit(): void {
		this.conversationService.getConversations()
			.subscribe((conversations: Conversation[]) => {
				if (conversations.length) {
					this.conversationStore.selectConversation(conversations[0].id);
				}
			});
	}

	ngOnDestroy(): void {
		this.messageStore.clearMessages();
		this.conversationStore.clearConversations();
	}
}
