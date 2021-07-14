export class Car {
	id: string;
	brand: string;
	model: string;
	photo: string;
	numberOfSeats: number;

	constructor(data: any) {
		this.id = data.id;
		this.brand = data.brand || '';
		this.model = data.model || '';
		this.photo = data.photo || '';
		this.numberOfSeats = data.numberOfSeats || 0;
	}

	get isEmpty(): boolean {
		return !this.brand
			&& !this.model
			&& this.numberOfSeats === 0;
	} 
}
