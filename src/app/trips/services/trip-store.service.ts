import { Injectable } from '@angular/core';

import { Trip } from '@models/trip.model';
import { TripState } from '@states/trip.state';
import { Store } from '@store/store';

const initialState: TripState = {
	selectedTrip: null,
	isReservationPending: false,
};

@Injectable({
	providedIn: 'root',
})
export class TripStoreService extends Store<TripState> {
	selectedTrip$ = this.select((state: TripState) => state.selectedTrip);
	isReservationPending$ = this.select((state: TripState) => state.isReservationPending);

	constructor() {
		super(initialState);
	}

	setTrip(selectedTrip: Trip): void {
		this.setState({ selectedTrip });
	}

	setReservationPending(isReservationPending: boolean): void {
		this.setState({ isReservationPending });
	}

	clearTrip(): void {
		this.setState(initialState);
	}
}
