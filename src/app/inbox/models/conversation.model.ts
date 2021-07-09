import * as moment from 'moment';

import { MessageParticipant } from '@models/message-participant.model';

export class Conversation {
	id: string;
	author: MessageParticipant;
	recipient: MessageParticipant;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.id = data.id;
		this.message = data.message;
		this.date = moment(data.date);
		this.author = new MessageParticipant({
			id: data.authorId,
			firstName: data.authorFirstName,
			lastName: data.authorLastName,
			photo: data.authorPhoto,
		});
		this.recipient = new MessageParticipant({
			id: data.recipientId,
			firstName: data.recipientFirstName,
			lastName: data.recipientLastName,
			photo: data.recipientPhoto,
		});
	}
	
	static get empty(): Conversation {
		return new Conversation({});
	}

	equals(conversation: Conversation): boolean {
		return this.id == conversation.id;
	}

	get isEmpty(): boolean {
		return !this.id;
	}
}
