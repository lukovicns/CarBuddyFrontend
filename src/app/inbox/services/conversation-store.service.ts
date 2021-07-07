import { Injectable } from '@angular/core';

import { Conversation } from '@models/conversation.model';
import { ConversationState } from '@states/conversation.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class ConversationStoreService extends Store<ConversationState> {
	conversations$ = this.select((state: ConversationState) => state.conversations);
	selectedConversation$ = this.select((state: ConversationState) => state.selectedConversation);

	constructor() {
		super({
			conversations: null,
			selectedConversation: null,
		});
	}

	setConversations(conversations: Conversation[]): void {
		this.setState({ conversations });
	}

	selectConversation(selectedConversation: string): void {
		this.setState({ selectedConversation });
	}
}
