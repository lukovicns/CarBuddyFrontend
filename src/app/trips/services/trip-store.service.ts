import { Injectable } from '@angular/core';

import { Trip } from '@models/trip.model';
import { TripState } from '@states/trip.state';
import { Store } from '@store/store';

const initialState: TripState = { selectedTrip: null };

@Injectable({
	providedIn: 'root',
})
export class TripStoreService extends Store<TripState> {
	selectedTrip$ = this.select((state: TripState) => state.selectedTrip);

	constructor() {
		super(initialState);
	}

	setTrip(selectedTrip: Trip): void {
		this.setState({ selectedTrip });
	}

	clearTrip(): void {
		this.setState(initialState);
	}

	updateNumberOfAvailableSeats(numberOfSeats: number): void {
		this.setState({
			selectedTrip: this.state.selectedTrip!.withNumberOfAvailableSeats(numberOfSeats),
		});
	}
}
