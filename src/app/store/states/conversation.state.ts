import { Conversation } from '@models/conversation.model';

export class ConversationState {
	conversations: Conversation[] | null;
	selectedConversation: Conversation | null;
}
