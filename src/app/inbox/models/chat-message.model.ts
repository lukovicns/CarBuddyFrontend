import * as moment from 'moment';

export class ChatMessage {
	conversationId: string;
	authorId: string;
	authorFirstName: string;
	authorLastName: string;
	recipientId: string;
	recipientFirstName: string;
	recipientLastName: string;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.conversationId = data.conversationId;
		this.authorId = data.authorId;
		this.authorFirstName = data.authorFirstName;
		this.authorLastName = data.authorLastName;
		this.recipientId = data.recipientId;
		this.recipientFirstName = data.recipientFirstName;
		this.recipientLastName = data.recipientLastName;
		this.message = data.message;
		this.date = moment(data.date);
	}

	get recipientFullName(): string {
		return `${this.recipientFirstName} ${this.recipientLastName}`;
	}

	isRecipient(participantId: string): boolean {
		return this.recipientId === participantId;
	}
}
