import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { ConversationStoreService } from '@services/conversation-store.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent {
	selectedConversation$: Observable<string | null>;

	constructor(public conversationStore: ConversationStoreService) {
		this.selectedConversation$ = this.conversationStore.selectedConversation$;
	}
}
