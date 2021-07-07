export class MessageAuthor {
	id: string;
	firstName: string;
	lastName: string;
	photo: string;

	constructor(data: any) {
		this.id = data.id;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.photo = data.photo;
	}
}
