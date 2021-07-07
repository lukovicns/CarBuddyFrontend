import { Injectable } from '@angular/core';

import { ChatMessage } from '@models/chat-message.model';
import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

const initialState: MessageState = { messages: null };

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	messages$ = this.select((state: MessageState) => state.messages);

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

	clearMessages(): void {
		this.setState(initialState);
	}
}
