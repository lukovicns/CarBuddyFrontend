export class TripSummary {
	id: string;
	driverFirstName: string;
	driverPhoto: string;
	driverRating: number;
	fromAddress: string;
	toAddress: string;
	startTime: string;
	arriveTime: string;
	price: number;
	numberOfSeats: number;
	numberOfAvailableSeats: number;

	constructor(data: any) {
		this.id = data.id;
		this.driverFirstName = data.driverFirstName;
		this.driverPhoto = data.driverPhoto;
		this.driverRating = data.driverRating;
		this.fromAddress = data.fromAddress;
		this.toAddress = data.toAddress;
		this.startTime = data.startTime;
		this.arriveTime = data.arriveTime;
		this.price = data.price;
		this.numberOfSeats = data.numberOfSeats;
		this.numberOfAvailableSeats = data.numberOfAvailableSeats;
	}
}
