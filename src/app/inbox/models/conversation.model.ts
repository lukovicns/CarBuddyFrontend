export class Conversation {
	id: string;
	driverId: string;
	driverFullName: string;
	driverPhoto: string;
	message: string;
	dateTime: string;

	constructor(data: any) {
		this.id = data.id;
		this.driverId = data.senderId;
		this.driverFullName = data.senderFullName;
		this.driverPhoto = data.senderPhoto;
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
		return !this.driverId;
	}
}
