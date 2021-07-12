import { Injectable } from '@angular/core';

import { Trip } from '@models/trip.model';
import { TripState } from '@states/trip.state';
import { Store } from '@store/store';

const initialState: TripState = {
	selectedTrip: null,
	isAddTripPending: false,
	isReservationPending: false,
};

@Injectable({
	providedIn: 'root',
})
export class TripStoreService extends Store<TripState> {
	selectedTrip$ = this.select((state: TripState) => state.selectedTrip);
	isAddTripPending$ = this.select((state: TripState) => state.isAddTripPending);
	isReservationPending$ = this.select((state: TripState) => state.isReservationPending);

	constructor() {
		super(initialState);
	}

	setTrip(selectedTrip: Trip): void {
		this.setState({ selectedTrip });
	}

	setAddTripPending(isPending: boolean): void {
		this.setState({ isAddTripPending: isPending });
	}

	setReservationPending(isPending: boolean): void {
		this.setState({ isReservationPending: isPending });
	}

	clearTrip(): void {
		this.setState(initialState);
	}
}
