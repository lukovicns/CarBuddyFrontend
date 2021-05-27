import { environment } from '@environment';

export class Photo {
	private photo: string;

	constructor(photo: string) {
		this.photo = photo || '';
	}

	get value(): string {
		return !!this.photo ? environment.baseUrl + this.photo : '';
	}
}
