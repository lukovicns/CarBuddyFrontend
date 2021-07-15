import { ChatMessage } from '@models/chat-message.model';

export class MessageState {
	messages: ChatMessage[] | null;
	isPending: boolean;
	isLoadingMessages: boolean;
	currentPageNumber: number;
}
