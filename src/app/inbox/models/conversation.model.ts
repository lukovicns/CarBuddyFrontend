export class Conversation {
	id: string;
	senderId: string;
	senderFullName: string;
	senderPhoto: string;
	message: string;
	dateTime: string;

	constructor(data: any) {
		this.id = data.id;
		this.senderId = data.senderId;
		this.senderFullName = data.senderFullName;
		this.senderPhoto = data.senderPhoto;
		this.message = data.message;
		this.dateTime = `${data.date} ${data.time}`;
	}
	
	static get empty(): Conversation {
		return new Conversation({});
	}

	notEqualTo(conversation: Conversation): boolean {
		return this.id !== conversation.id;
	}

	get isEmpty(): boolean {
		return !this.senderId;
	}
}
