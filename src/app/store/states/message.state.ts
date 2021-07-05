import { Conversation } from '@models/conversation.model';

export class MessageState {
	conversations: Conversation[] | null;
	selectedConversationId: string;
}
