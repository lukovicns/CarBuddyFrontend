import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { searchTripsUrl } from '@constants/urls';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';

@Injectable({
	providedIn: 'root',
})
export class TripService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
		private notificationService: NotificationService,
	) { }

	getTrips(criteria: SearchCriteria): Observable<TripSummary[]> {
		return this.http.post<TripSummary[]>(searchTripsUrl, criteria)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					this.errorHandler.handle(error);
					this.notificationService.showErrorNotification();
					return of([]);
				}),
			);
	}
}
