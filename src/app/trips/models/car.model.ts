export class Car {
	brand: string;
	model: string;
	photo: string;
	numberOfSeats: string;

	constructor(data: any) {
		this.brand = data.brand;
		this.model = data.model;
		this.photo = data.photo;
		this.numberOfSeats = data.numberOfSeats;
	}
}
