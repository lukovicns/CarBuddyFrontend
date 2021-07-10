import * as moment from 'moment';

import { MessageParticipant } from '@models/message-participant.model';

export class Conversation {
	id: string;
	user: MessageParticipant;
	participant: MessageParticipant;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.id = data.id;
		this.message = data.message;
		this.date = moment(data.date);
		this.user = new MessageParticipant({
			id: data.userId,
			firstName: data.userFirstName,
			lastName: data.userLastName,
			photo: data.userPhoto,
		});
		this.participant = new MessageParticipant({
			id: data.participantId,
			firstName: data.participantFirstName,
			lastName: data.participantLastName,
			photo: data.participantPhoto,
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
