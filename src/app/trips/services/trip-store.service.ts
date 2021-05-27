import { Injectable } from '@angular/core';

import { Pagination } from '@models/pagination.model';
import { Trip } from '@models/trip.model';
import { TripSummary } from '@models/trip-summary.model';
import { TripState } from '@states/trip.state';
import { Store } from '@store/store';

const initialPagination = new Pagination({ size: 5 });

@Injectable({
	providedIn: 'root',
})
export class TripStoreService extends Store<TripState> {
	trips$ = this.select((state: TripState) => state.trips);
	tripsCreatedByMe$ = this.select((state: TripState) => state.tripsCreatedByMe);
	tripReservations$ = this.select((state: TripState) => state.tripReservations);
	tripsHistory$ = this.select((state: TripState) => state.tripsHistory);
	selectedTrip$ = this.select((state: TripState) => state.selectedTrip);
	tripsPagination$ = this.select((state: TripState) => state.tripsPagination);
	tripsCreatedByMePagination$ = this.select((state: TripState) => state.tripsCreatedByMePagination);
	tripReservationsPagination$ = this.select((state: TripState) => state.tripReservationsPagination);
	tripsHistoryPagination$ = this.select((state: TripState) => state.tripsHistoryPagination);
	isAddTripPending$ = this.select((state: TripState) => state.isAddTripPending);
	isEditTripPending$ = this.select((state: TripState) => state.isEditTripPending);
	isDeleteTripPending$ = this.select((state: TripState) => state.isDeleteTripPending);
	isReservationPending$ = this.select((state: TripState) => state.isReservationPending);

	constructor() {
		super({
			trips: null,
			tripsCreatedByMe: null,
			tripReservations: null,
			tripsHistory: null,
			selectedTrip: null,
			tripsPagination: initialPagination,
			tripsCreatedByMePagination: initialPagination,
			tripReservationsPagination: initialPagination,
			tripsHistoryPagination: initialPagination,
			isAddTripPending: false,
			isEditTripPending: false,
			isDeleteTripPending: false,
			isReservationPending: false,
		});
	}

	setTrips(trips: TripSummary[] | null): void {
		this.setState({ trips });
	}

	setTripsPagination(tripsPagination: Pagination): void {
		this.setState({ tripsPagination });
	}

	setTripsCreatedByMe(trips: TripSummary[] | null): void {
		this.setState({ tripsCreatedByMe: trips });
	}

	setTripsCreatedByMePagination(tripsPagination: Pagination): void {
		this.setState({ tripsCreatedByMePagination: tripsPagination });
	}

	setTripReservations(tripReservations: TripSummary[] | null): void {
		this.setState({ tripReservations });
	}

	setTripReservationsPagination(pagination: Pagination): void {
		this.setState({ tripReservationsPagination: pagination });
	}

	setTripsHistory(tripsHistory: TripSummary[] | null): void {
		this.setState({ tripsHistory });
	}

	setTripsHistoryPagination(pagination: Pagination): void {
		this.setState({ tripsHistoryPagination: pagination });
	}

	setTrip(selectedTrip: Trip): void {
		this.setState({ selectedTrip });
	}

	setAddTripPending(isPending: boolean): void {
		this.setState({ isAddTripPending: isPending });
	}

	setEditTripPending(isPending: boolean): void {
		this.setState({ isEditTripPending: isPending });
	}

	setDeleteTripPending(isPending: boolean): void {
		this.setState({ isDeleteTripPending: isPending });
	}

	setReservationPending(isPending: boolean): void {
		this.setState({ isReservationPending: isPending });
	}

	clearTrip(): void {
		this.setState({ selectedTrip: null });
	}

	clearTripReservations(): void {
		this.setState({
			tripReservations: null,
			tripReservationsPagination: initialPagination,
		});
	}

	clearTripsHistory(): void {
		this.setState({
			tripsHistory: null,
			tripsHistoryPagination: initialPagination,
		});
	}
}
