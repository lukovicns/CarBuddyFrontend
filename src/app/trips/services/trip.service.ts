import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import {
	finalize,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';

import { constants } from '@constants/constants';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Trip } from '@models/trip.model';
import { ListResponse } from '@models/list-response.model';
import { Pagination } from '@models/pagination.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { AuthorizationService } from '@services/authorization.service';
import { TripStoreService } from '@services/trip-store.service';
import { toInstances } from '@shared/functions';
import { NotificationService } from '@services/notification.service';
import {
	searchTripsUrl,
	tripReservationsUrl,
	tripsCreatedByMeUrl,
	tripsHistoryUrl,
	tripsUrl,
	tripUrl,
} from '@constants/urls';

@Injectable({
	providedIn: 'root',
})
export class TripService {
	constructor(
		private authorizationService: AuthorizationService,
		private errorHandler: ErrorHandlerService,
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router,
		private tripStore: TripStoreService,
	) { }

	get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}

	getTrips(criteria: SearchCriteria, pagination: Pagination): Observable<TripSummary[]> {
		this.tripStore.setTrips(null);
		return this.http.post<ListResponse<TripSummary>>(searchTripsUrl(pagination), criteria)
			.pipe(
				switchMap((response: ListResponse<TripSummary>) => {
					const trips = toInstances(TripSummary, response.content);
					this.tripStore.setTrips(trips);
					this.tripStore.setTripsPagination(response.pagination);
					return of(trips);
				}),
				tap({
					error: (error: HttpErrorResponse) => {
						this.tripStore.setTrips([]);
						this.errorHandler.handle(error);
					},
				}),
			);
	}

	getTripsCreatedByMe(pagination: Pagination): Observable<TripSummary[]> {
		this.tripStore.setTripsCreatedByMe(null);
		return this.http.get<ListResponse<TripSummary>>(tripsCreatedByMeUrl(this.currentUserId, pagination))
			.pipe(
				switchMap((response: ListResponse<TripSummary>) => {
					const trips = toInstances(TripSummary, response.content);
					this.tripStore.setTripsCreatedByMe(trips);
					this.tripStore.setTripsCreatedByMePagination(response.pagination);
					return of(trips);
				}),
				tap({
					error: (error: HttpErrorResponse) => {
						this.tripStore.setTripsCreatedByMe([]);
						this.errorHandler.handle(error);
					},
				}),
			);
	}

	getTripReservations(pagination: Pagination): Observable<TripSummary[]> {
		this.tripStore.setTripReservations(null);
		return this.http.get<ListResponse<TripSummary>>(tripReservationsUrl(this.currentUserId, pagination))
			.pipe(
				switchMap((response: ListResponse<TripSummary>) => {
					const reservations = toInstances(TripSummary, response.content);
					this.tripStore.setTripReservations(reservations);
					this.tripStore.setTripReservationsPagination(response.pagination);
					return of(reservations);
				}),
				tap({
					error: (error: HttpErrorResponse) => {
						this.tripStore.setTripReservations([]);
						this.errorHandler.handle(error);
					},
				}),
			);
	}

	getTripsHistory(pagination: Pagination): Observable<TripSummary[]> {
		this.tripStore.setTripsHistory(null);
		return this.http.get<ListResponse<TripSummary>>(tripsHistoryUrl(this.currentUserId, pagination))
			.pipe(
				switchMap((response: ListResponse<TripSummary>) => {
					const tripsHistory = toInstances(TripSummary, response.content);
					this.tripStore.setTripsHistory(tripsHistory);
					this.tripStore.setTripsHistoryPagination(response.pagination);
					return of(tripsHistory);
				}),
				tap({
					error: (error: HttpErrorResponse) => {
						this.tripStore.setTripsHistory([]);
						this.errorHandler.handle(error);
					},
				}),
			);
	}

	getTrip(id: string): Observable<Trip> {
		return this.http.get<Trip>(tripUrl(id))
			.pipe(
				map((trip: Trip) => new Trip(trip)),
				tap({
					next: (trip: Trip) => this.tripStore.setTrip(trip),
					error: (error: HttpErrorResponse) => {
						this.errorHandler.handle(error);
						this.router.navigate(['/trips']);
					},
				}),
			);
	}

	addTrip(data: any): Observable<any> {
		this.tripStore.setAddTripPending(true);
		return this.http.post<any>(tripsUrl, {
			...data,
			driverId: this.currentUserId,
		}).pipe(
			tap({
				next: () => this.notificationService.showSuccessNotification(constants.tripCreated),
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
			finalize(() => this.tripStore.setAddTripPending(false)),
		);
	}

	editTrip(tripId: string, data: any): Observable<any> {
		this.tripStore.setEditTripPending(true);
		return this.http.put<any>(tripUrl(tripId), {
			...data,
			driverId: this.currentUserId,
		}).pipe(
			tap({
				complete: () => this.tripStore.setEditTripPending(false),
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}

	deleteTrip(tripId: string): Observable<any> {
		this.tripStore.setDeleteTripPending(true);
		return this.http.delete(tripUrl(tripId))
			.pipe(
				tap({
					next: (response: any) => this.notificationService.showSuccessNotification(response.message),
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
					complete: () => this.tripStore.setDeleteTripPending(false),
				}),
			);
	}
}
