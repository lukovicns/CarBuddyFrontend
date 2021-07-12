import { Injectable } from '@angular/core';
import { findById, updateAtIndex } from '@app/shared/functions';

import { Conversation } from '@models/conversation.model';
import { ConversationState } from '@states/conversation.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class ConversationStoreService extends Store<ConversationState> {
	conversations$ = this.select((state: ConversationState) => state.conversations);
	selectedConversation$ = this.select((state: ConversationState) => state.selectedConversation);
	unreadConversationsCount$ = this.select((state: ConversationState) => state.unreadConversationsCount);

	constructor() {
		super({
			conversations: null,
			selectedConversation: null,
			unreadConversationsCount: null,
		});
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
		this.setState({
			conversations: null,
			selectedConversation: null,
		});
	}

	markAsRead(conversationId: string): void {
		const conversation = this.getConversation(conversationId);
		this.updateConversation(conversation.withStatusRead());

		if (this.hasUnreadConversations()) {
			this.setUnreadConversationsCount(this.state.unreadConversationsCount! - 1);
		}
	}

	setUnreadConversationsCount(unreadConversationsCount: number): void {
		this.setState({ unreadConversationsCount });
	}

	clearUnreadConversationsCount(): void {
		this.setState({ unreadConversationsCount: null });
	}

	get hasUnreadConversationsCount(): boolean {
		return this.state.unreadConversationsCount !== null;
	}

	private getConversation(conversationId: string): Conversation {
		return findById(this.state.conversations || [], conversationId);
	}

	private hasUnreadConversations(): boolean {
		return !!this.state.unreadConversationsCount
			&& this.state.unreadConversationsCount > 0;
	}
}
