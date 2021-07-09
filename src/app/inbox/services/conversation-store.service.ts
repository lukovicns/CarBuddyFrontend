import { Injectable } from '@angular/core';
import { updateAtIndex } from '@app/shared/functions';

import { Conversation } from '@models/conversation.model';
import { MessageStoreService } from '@services/message-store.service';
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

	constructor(private messageStore: MessageStoreService) {
		super(initialState);
	}

	setConversations(conversations: Conversation[]): void {
		this.setState({ conversations });
	}

	selectConversation(conversation: string): void {
		if (conversation !== this.state.selectedConversation) {
			this.messageStore.clearMessages();
			this.setState({ selectedConversation: conversation });
		}
	}

	updateConversation(conversation: Conversation): void {
		const conversations = updateAtIndex(
			this.state.conversations || [],
			new Conversation(conversation),
		);
		console.log(conversations);
		// this.setState({ conversations });
	}

	clearConversations(): void {
		this.setState(initialState);
	}
}
