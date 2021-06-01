import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { searchTripsUrl, tripUrl } from '@constants/urls';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { Trip } from '@models/trip.model';
import { ListResponse } from '@models/list-response.model';
import { Pagination } from '@models/pagination.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';

@Injectable({
	providedIn: 'root',
})
export class TripService {
	private readonly pagination = new BehaviorSubject<Pagination>({} as Pagination);

	readonly pagination$ = this.pagination.asObservable();

	constructor(
		private http: HttpClient,
		private router: Router,
		private errorHandler: ErrorHandlerService,
		private notificationService: NotificationService,
	) { }

	getTrips(criteria: SearchCriteria, pagination: Pagination): Observable<TripSummary[]> {
		const url = searchTripsUrl(pagination.pageIndex, pagination.pageSize);
		return this.http.post<ListResponse<TripSummary>>(url, criteria)
			.pipe(
				map((response: ListResponse<TripSummary>) => {
					this.pagination.next(response.pagination);
					return response.content;
				}),
				catchError((error: HttpErrorResponse) => {
					this.errorHandler.handle(error);
					this.notificationService.showErrorNotification();
					return of([]);
				}),
			);
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
}
