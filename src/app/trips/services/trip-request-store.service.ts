import { Injectable } from '@angular/core';

import { TripRequestSummary } from '@models/trip-request-summary.model';
import { TripRequestState } from '@states/trip-request.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class TripRequestStoreService extends Store<TripRequestState> {
	tripRequests$ = this.select((state: TripRequestState) => state.tripRequests);

	constructor() {
		super({
			tripRequests: null,
		});
	}

	setTripRequests(tripRequests: TripRequestSummary[] | null): void {
		this.setState({ tripRequests });
	}

	removeTripRequest(tripId: string, passengerId: string): void {
		const tripRequests = this.state.tripRequests!.filter(
			(tr: TripRequestSummary) => tr.tripId !== tripId && tr.passengerId !== passengerId,
		);
		this.setState({ tripRequests });
	}
}
