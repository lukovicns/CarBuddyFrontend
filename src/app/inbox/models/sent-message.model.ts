export class SentMessage {
    authorId: string;
    conversationId: string;
    message: string;

    constructor(data: any) {
    	this.authorId = data.authorId;
    	this.conversationId = data.conversationId;
    	this.message = data.message;
    }
}
