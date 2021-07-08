import { Trip } from '@models/trip.model';

export class TripState {
	selectedTrip: Trip | null;
	isReservationPending: boolean;
}
