import { Trip } from '@models/trip.model';

export class TripState {
	selectedTrip: Trip | null;
	isAddTripPending: boolean;
	isReservationPending: boolean;
}
