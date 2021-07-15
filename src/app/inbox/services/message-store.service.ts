import { Injectable } from '@angular/core';

import { ChatMessage } from '@models/chat-message.model';
import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

const initialState: MessageState = {
	messages: null,
	isPending: false,
	isLoadingMessages: false,
	currentPageNumber: 1,
};

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	messages$ = this.select((state: MessageState) => state.messages);
	isPending$ = this.select((state: MessageState) => state.isPending);
	isLoadingMessages$ = this.select((state: MessageState) => state.isLoadingMessages);

	constructor() {
		super(initialState);
	}

	get currentPageNumber(): number {
		return this.state.currentPageNumber;
	}

	setMessages(messages: ChatMessage[]): void {
		this.setState({ messages });
	}

	appendMessage(message: ChatMessage): void {
		const messages = this.getMessagesFromState();
		messages.push(new ChatMessage(message));
		this.setState({
			messages,
		});
	}

	appendMessages(messages: ChatMessage[]): void {
		this.setState({
			messages: [...messages, ...this.getMessagesFromState()],
		});
	}

	setLoading(isLoading: boolean): void {
		this.setState({ isLoadingMessages: isLoading });
	}

	setPending(isPending: boolean): void {
		this.setState({ isPending });
	}

	clearMessages(): void {
		this.setState(initialState);
	}

	increasePageNumber(): void {
		this.setState({ currentPageNumber: this.state.currentPageNumber + 1 });
	}

	resetPageNumber(): void {
		this.setState({ currentPageNumber: 1 });
	}

	private getMessagesFromState(): ChatMessage[] {
		return [...this.state.messages || []];
	}
}
