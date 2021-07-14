import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Trip } from '@models/trip.model';
import { ListResponse } from '@models/list-response.model';
import { Pagination } from '@models/pagination.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { AuthorizationService } from '@services/authorization.service';
import { TripStoreService } from '@services/trip-store.service';
import { toInstances } from '@shared/functions';
import {
	makeReservationUrl,
	searchTripsUrl,
	tripsUrl,
	tripUrl, 
} from '@constants/urls';

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
		private authorizationService: AuthorizationService,
		private tripStore: TripStoreService,
	) { }

	get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}

	loadTrips(criteria: SearchCriteria, pagination: Pagination): void {
		this.trips.next(null);
		this.http.post<ListResponse<TripSummary>>(
			searchTripsUrl(pagination.pageIndex, pagination.pageSize),
			criteria,
		).pipe(
			tap({
				next: (response: ListResponse<TripSummary>) => {
					this.pagination.next(response.pagination);
					this.trips.next(response.content);
				},
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
			map((response: ListResponse<TripSummary>) => toInstances(TripSummary, response.content)),
		).subscribe();
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
		return this.http.post<any>(tripsUrl, {
			...data,
			driverId: this.currentUserId,
		}).pipe(
			tap({
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}

	makeReservation(tripId: string, numberOfPassengers: number): Observable<any> {
		this.tripStore.setReservationPending(true);

		return this.http.put(makeReservationUrl(tripId), {
			userId: this.currentUserId,
			numberOfPassengers,
		}).pipe(
			tap({
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				complete: () => this.tripStore.setReservationPending(false),
			}),
		);
	}
}
