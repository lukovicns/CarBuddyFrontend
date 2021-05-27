import * as moment from 'moment';

import { ConversationStatus } from '@models/conversation-status.enum';
import { User } from '@models/user.model';

export class Conversation {
	id: string;
	user: User;
	participant: User;
	message: string;
	date: moment.Moment;
	status: ConversationStatus;

	constructor(data: any) {
		this.id = data.id;
		this.message = data.message;
		this.date = moment(data.date);
		this.user = new User({
			id: data.userId,
			firstName: data.userFirstName,
			lastName: data.userLastName,
			photo: data.userPhoto,
		});
		this.participant = new User({
			id: data.participantId,
			firstName: data.participantFirstName,
			lastName: data.participantLastName,
			photo: data.participantPhoto,
		});
		this.status = data.status === 0
			? ConversationStatus.Unread
			: ConversationStatus.Read;
	}

	static get empty(): Conversation {
		return new Conversation({});
	}

	get isEmpty(): boolean {
		return !this.id;
	}

	get hasUnreadStatus(): boolean {
		return this.status === ConversationStatus.Unread;
	}

	equals(conversation: Conversation): boolean {
		return this.id == conversation.id;
	}

	withStatusRead(): Conversation {
		this.status = ConversationStatus.Read;
		return this;
	}

	withStatusUnread(): Conversation {
		this.status = ConversationStatus.Unread;
		return this;
	}
}
