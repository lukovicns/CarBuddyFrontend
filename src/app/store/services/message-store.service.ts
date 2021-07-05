import { Injectable } from '@angular/core';

import { Conversation } from '@models/conversation.model';
import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	conversations$ = this.select((state: MessageState) => state.conversations);
	selectedConversationId$ = this.select((state: MessageState) => state.selectedConversationId);

	constructor() {
		super({
			selectedConversationId: '',
			conversations: null,
		});
	}

	setConversations(conversations: Conversation[]): void {
		this.setState({ conversations });
	}

	setSelectedConversation(selectedConversationId: string): void {
		this.setState({ selectedConversationId });
	}
}
