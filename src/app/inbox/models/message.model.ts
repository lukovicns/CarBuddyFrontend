import { Conversation } from '@models/conversation.model';

export class Message extends Conversation {
	passengerId: string;
	passengerFullName: string;
	recipientPhoto: string;

	constructor(data: any) {
		super(data);
		this.passengerId = data.passengerId;
		this.passengerFullName = data.passengerFullName;
		this.recipientPhoto = data.recipientPhoto;
	}

	isRecipient(recipientId: string): boolean {
		return this.passengerId === recipientId;
	}
}
