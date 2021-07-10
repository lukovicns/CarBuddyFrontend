import { Injectable } from '@angular/core';
import { findById, updateAtIndex } from '@app/shared/functions';

import { Conversation } from '@models/conversation.model';
import { ConversationState } from '@states/conversation.state';
import { Store } from '@store/store';

const initialState: ConversationState = {
	conversations: null,
	selectedConversation: null,
};

@Injectable({
	providedIn: 'root',
})
export class ConversationStoreService extends Store<ConversationState> {
	conversations$ = this.select((state: ConversationState) => state.conversations);
	selectedConversation$ = this.select((state: ConversationState) => state.selectedConversation);

	constructor() {
		super(initialState);
	}

	setConversations(conversations: Conversation[]): void {
		this.setState({ conversations });
	}

	selectConversation(conversationId: string): void {
		if (conversationId === this.state.selectedConversation?.id) {
			return;
		}

		const selectedConversation = findById(this.state.conversations || [], conversationId);
		this.setState({ selectedConversation });
	}

	updateConversation(conversation: Conversation): void {
		const conversations = updateAtIndex(
			this.state.conversations || [],
			conversation,
		);
		const sortedConversations = [...conversations].sort(
			(a: Conversation, b: Conversation) =>  b.date.diff(a.date),
		);
		this.setState({ conversations: sortedConversations });
	}

	clearConversations(): void {
		this.setState(initialState);
	}
}
