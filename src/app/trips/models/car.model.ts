import { Photo } from '@models/photo.model';

export class Car {
	id: string;
	brand: string;
	model: string;
	year: number;
	photo: string;
	numberOfSeats: number;
	name: string;

	constructor(data: any) {
		this.id = data.id || 0;
		this.brand = data.brand || '';
		this.model = data.model || '';
		this.year = data.year || 0;
		this.photo = new Photo(data.photo).value;
		this.numberOfSeats = data.numberOfSeats || 0;
		this.name = `${data.brand} ${data.model}`.trim();
	}

	static get Empty(): Car {
		return new Car({});
	}

	get isEmpty(): boolean {
		return !this.brand
			&& !this.model
			&& this.year === 0
			&& this.numberOfSeats === 0;
	}
}
