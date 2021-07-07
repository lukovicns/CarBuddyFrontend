import { Injectable } from '@angular/core';

import { ChatMessage } from '@models/chat-message.model';
import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

const initialState: MessageState = {
	messages: null,
	isPending: false,
};

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	messages$ = this.select((state: MessageState) => state.messages);
	isPending$ = this.select((state: MessageState) => state.isPending);

	constructor() {
		super(initialState);
	}

	setMessages(messages: ChatMessage[]): void {
		this.setState({ messages });
	}

	appendMessage(message: ChatMessage): void {
		const messages = [...this.state.messages || []];
		messages.push(new ChatMessage(message));
		this.setState({
			messages,
		});
	}

	setPending(isPending: boolean): void {
		this.setState({ isPending });
	}

	clearMessages(): void {
		this.setState(initialState);
	}
}
