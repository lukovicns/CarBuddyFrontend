import * as moment from 'moment';

export class Message {
	id: string;
	recipientId: string;
	senderId: string;
	title: string;
	content: string;
	date: moment.Moment;
	time: moment.Moment;

	constructor(data: any) {
		this.id = data.id;
		this.recipientId = data.recipientId;
		this.senderId = data.senderId;
		this.title = data.title;
		this.content = data.content;
		this.date = data.date;
		this.time = data.time;
	}

	static get empty(): Message {
		return new Message({});
	}
}
