import * as moment from 'moment';

import { MessageAuthor } from '@models/message-author.model';

export class Conversation {
	id: string;
	author: MessageAuthor;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.id = data.id;
		this.message = data.message;
		this.date = moment(data.date);
		this.author = new MessageAuthor({
			id: data.authorId,
			firstName: data.authorFirstName,
			lastName: data.authorLastName,
			photo: data.authorPhoto,
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
