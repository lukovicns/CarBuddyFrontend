import { Pagination } from '@models/pagination.model';
import { Trip } from '@models/trip.model';
import { TripSummary } from '@models/trip-summary.model';

export class TripState {
	trips: TripSummary[] | null;
	tripsCreatedByMe: TripSummary[] | null;
	tripReservations: TripSummary[] | null;
	tripsHistory: TripSummary[] | null;
	tripsPagination: Pagination;
	tripsCreatedByMePagination: Pagination;
	tripReservationsPagination: Pagination;
	tripsHistoryPagination: Pagination;
	selectedTrip: Trip | null;
	isAddTripPending: boolean;
	isEditTripPending: boolean;
	isDeleteTripPending: boolean;
	isReservationPending: boolean;
}
