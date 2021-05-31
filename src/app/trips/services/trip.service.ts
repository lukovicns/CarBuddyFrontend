import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { searchTripsUrl } from '@constants/urls';
import { TripSummary } from '@models/trip-summary.model';
import { SearchCriteria } from '@models/search-criteria.type';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class TripService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
	) { }

	search(criteria: SearchCriteria): Observable<TripSummary[]> {
		return this.http.post<TripSummary[]>(searchTripsUrl, criteria).pipe(
			tap({
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}
}
