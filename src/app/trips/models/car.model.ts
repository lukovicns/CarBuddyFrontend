export class Car {
	brand: string;
	model: string;
	photo: string;
	numberOfSeats: number;

	constructor(data: any) {
		this.brand = data.brand || '';
		this.model = data.model || '';
		this.photo = data.photo || '';
		this.numberOfSeats = data.numberOfSeats || 0;
	}

	get isEmpty(): boolean {
		return !this.brand
			&& !this.model
			&& !this.photo
			&& this.numberOfSeats === 0;
	} 
}
