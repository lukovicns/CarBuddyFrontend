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
		this.setState({
			selectedConversation: this.getConversation(conversationId),
		});
	}

	updateConversation(conversation: Conversation): void {
		const conversations = updateAtIndex(
			this.state.conversations || [],
			conversation,
		);
		this.setState({
			conversations: [...conversations].sort(
				(a: Conversation, b: Conversation) =>  b.date.diff(a.date),
			),
		});
	}

	clearConversations(): void {
		this.setState(initialState);
	}

	markAsRead(conversationId: string): void {
		const conversation = this.getConversation(conversationId);
		this.updateConversation(conversation.withStatusRead());
	}

	private getConversation(conversationId: string): Conversation {
		return findById(this.state.conversations || [], conversationId);
	}
}
