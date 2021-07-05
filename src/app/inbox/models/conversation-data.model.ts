export class ConversationData {
	id: string;
	from: string;
	content: string;
	dateTime: string;
	
	constructor(data: any) {
		this.id = data.id;
		this.from = data.senderFullName;
		this.content = data.message;
		this.dateTime = `${data.date} ${data.time}`;
	}
}
