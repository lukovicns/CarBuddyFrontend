import { Photo } from '@models/photo.model';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	age: string;
	photo: string;

	constructor(data: any) {
		this.id = data.id || '';
		this.firstName = data.firstName || '';
		this.lastName = data.lastName || '';
		this.age = data.age || 18;
		this.photo = new Photo(data.photo).value;
	}

	static get empty(): User {
		return new User({});
	}

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`.trim();
	}
}
