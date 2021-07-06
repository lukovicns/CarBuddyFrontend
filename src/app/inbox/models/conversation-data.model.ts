export class ConversationData {
	id: string;
	from: string;
	content: string;
	dateTime: string;
	
	constructor(data: any) {
		this.id = data.id;
		this.from = data.driverFullName;
		this.content = data.message;
		this.dateTime = data.dateTime;
	}
}
