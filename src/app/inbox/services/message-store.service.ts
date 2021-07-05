import { Injectable } from '@angular/core';

import { Message } from '@models/message.model';
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

	setMessages(messages: Message[]): void {
		this.setState({ messages });
	}

	appendMessage(message: Message): void {
		this.setState({
			messages: [...this.state.messages  || [], message],
		});
	}

	clearMessages(): void {
		this.setState(initialState);
	}
}
