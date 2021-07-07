import * as moment from 'moment';

export class Conversation {
	id: string;
	firstParticipantId: string;
	firstParticipantFirstName: string;
	firstParticipantPhoto: string;
	secondParticipantId: string;
	secondParticipantFirstName: string;
	secondParticipantLastName: string;
	secondParticipantPhoto: string;
	lastMessage: string;
	lastMessageDate: moment.Moment;

	constructor(data: any) {
		this.id = data.id;
		this.firstParticipantId = data.firstParticipantId;
		this.firstParticipantFirstName = data.firstParticipantFirstName;
		this.firstParticipantPhoto = data.firstParticipantPhoto;
		this.secondParticipantId = data.secondParticipantId;
		this.secondParticipantFirstName = data.secondParticipantFirstName;
		this.secondParticipantLastName = data.secondParticipantLastName;
		this.secondParticipantPhoto = data.secondParticipantPhoto;
		this.lastMessage = data.lastMessage;
		this.lastMessageDate = moment(data.lastMessageDate);
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
