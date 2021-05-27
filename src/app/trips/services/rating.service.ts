import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { constants } from '@constants/constants';
import { rateDriverUrl } from '@constants/urls';
import { Rating } from '@models/rating.model';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';
import { RatingStoreService } from '@services/rating-store.service';
import { TripService } from '@services/trip.service';

@Injectable({
	providedIn: 'root',
})
export class RatingService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
		private notificationService: NotificationService,
		private ratingStore: RatingStoreService,
		private tripService: TripService,
	) { }

	rate(data: Rating): Observable<any> {
		this.ratingStore.setPending(true);
		return this.http.post(rateDriverUrl, data)
			.pipe(
				switchMap(() => this.tripService.getTrip(data.tripId)),
				tap({
					next: () => this.notificationService.showSuccessNotification(constants.ratingSuccess),
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
				finalize(() => this.ratingStore.setPending(false)),
			);
	}
}
