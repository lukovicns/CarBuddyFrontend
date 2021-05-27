import * as moment from 'moment';

export class ChatMessage {
	conversationId: string;
	authorId: string;
	userId: string;
	userFirstName: string;
	userLastName: string;
	participantId: string;
	participantFirstName: string;
	participantLastName: string;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.conversationId = data.conversationId;
		this.authorId = data.authorId;
		this.userId = data.userId;
		this.userFirstName = data.userFirstName;
		this.userLastName = data.userLastName;
		this.participantId = data.participantId;
		this.participantFirstName = data.participantFirstName;
		this.participantLastName = data.participantLastName;
		this.message = data.message;
		this.date = moment(data.date);
	}

	isRecipient(userId: string): boolean {
		return this.authorId !== userId;
	}
}
