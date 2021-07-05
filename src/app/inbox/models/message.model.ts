import { Conversation } from '@models/conversation.model';

export class Message extends Conversation {
	recipientId: string;
	recipientFullName: string;
	recipientPhoto: string;

	constructor(data: any) {
		super(data);
		this.recipientId = data.recipientId;
		this.recipientFullName = data.recipientFullName;
		this.recipientPhoto = data.recipientPhoto;
	}
}
