export class Conversation {
	id: string;
	senderId: string;
	senderFullName: string;
	senderPhoto: string;
	message: string;
	date: string;
	time: string;

	constructor(data: any) {
		this.id = data.id;
		this.senderId = data.senderId;
		this.senderFullName = data.senderFullName;
		this.senderPhoto = data.senderPhoto;
		this.message = data.message;
		this.date = data.date;
		this.time = data.time;
	}
	
	static get empty(): Conversation {
		return new Conversation({});
	}

	get isEmpty(): boolean {
		return !this.senderId;
	}
}
