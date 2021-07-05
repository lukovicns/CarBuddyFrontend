import { Injectable } from '@angular/core';

import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	selectedConversationId$ = this.select((state: MessageState) => state.selectedConversationId);

	constructor() {
		super({
			selectedConversationId: null,
		});
	}

	setSelectedConversation(selectedConversationId: string): void {
		this.setState({ selectedConversationId });
	}

	clearSelectedConversation() {
		this.setState({ selectedConversationId: null });
	}
}
