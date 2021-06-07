import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, switchMap } from 'rxjs/operators';
import {
	BehaviorSubject,
	Observable,
	of,
	throwError,
} from 'rxjs';

import { makeReservationUrl, searchTripsUrl, tripUrl } from '@constants/urls';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Trip } from '@models/trip.model';
import { ListResponse } from '@models/list-response.model';
import { Pagination } from '@models/pagination.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';
import { AuthorizationService } from '@services/authorization.service';

@Injectable({
	providedIn: 'root',
})
export class TripService {
	private readonly trips = new BehaviorSubject<TripSummary[] | null>(null);
	private readonly pagination = new BehaviorSubject<Pagination | null>(null);

	readonly trips$ = this.trips.asObservable();
	readonly pagination$ = this.pagination.asObservable();

	constructor(
		private http: HttpClient,
		private router: Router,
		private errorHandler: ErrorHandlerService,
		private notificationService: NotificationService,
		private authorizationService: AuthorizationService,
	) { }

	loadTrips(criteria: SearchCriteria, pagination: Pagination): void {
		this.trips.next(null);
		this.http.post<ListResponse<TripSummary>>(
			searchTripsUrl(pagination.pageIndex, pagination.pageSize),
			criteria,
		).pipe(
			switchMap((response: ListResponse<TripSummary>) => {
				this.pagination.next(response.pagination);
				this.trips.next(response.content);
				return of(response.content);
			}),
			catchError((error: HttpErrorResponse) => {
				this.errorHandler.handle(error);
				this.notificationService.showErrorNotification();
				return throwError(error);
			}),
		).subscribe();
	}

	getTrip(id: string): Observable<Trip> {
		return this.http.get<Trip>(tripUrl(id))
			.pipe(
				catchError((error: HttpErrorResponse) => {
					this.errorHandler.handle(error);
					this.router.navigate(['/trips']);
					return of(Trip.empty);
				}),
			);
	}

	makeReservation(tripId: string, numberOfPassengers: number): void {
		this.http.put<void>(makeReservationUrl(tripId), {
			userId: this.authorizationService.currentUserId,
			numberOfPassengers,
		}).pipe(
			catchError((error: HttpErrorResponse) => {
				this.errorHandler.handle(error);
				this.notificationService.showErrorNotification();
				return throwError(error);
			}),
		).subscribe();
	}
}
