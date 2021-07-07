import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnDestroy {
	selectedConversation$: Observable<string | null>;

	constructor(
		public conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
	) {
		this.selectedConversation$ = this.conversationStore.selectedConversation$;
	}

	ngOnDestroy(): void {
		this.messageStore.clearMessages();
		this.conversationStore.clearConversations();
	}
}
