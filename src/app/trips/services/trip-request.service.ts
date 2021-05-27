import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
	finalize,
	share,
	switchMap,
	tap,
} from 'rxjs/operators';

import { constants } from '@constants/constants';
import { TripRequestSummary } from '@models/trip-request-summary.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';
import { TripStoreService } from '@services/trip-store.service';
import { TripRequestStoreService } from '@services/trip-request-store.service';
import { PushNotificationStoreService } from '@services/push-notification-store.service';
import { toInstances } from '@shared/functions';
import {
	acceptTripRequestUrl,
	declineTripRequestUrl,
	sendTripRequestUrl,
	tripRequestExistsUrl,
	tripRequestsUrl,
} from '@constants/urls';

@Injectable({
	providedIn: 'root',
})
export class TripRequestService {
	constructor(
		private authorizationService: AuthorizationService,
		private errorHandler: ErrorHandlerService,
		private http: HttpClient,
		private notificationService: NotificationService,
		private pushNotificationStore: PushNotificationStoreService,
		private tripRequestStore: TripRequestStoreService,
		private tripStore: TripStoreService,
	) { }

	get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}

	getTripRequests(): Observable<TripRequestSummary[]> {
		this.tripRequestStore.setTripRequests(null);
		return this.http.get<TripRequestSummary[]>(tripRequestsUrl)
			.pipe(
				switchMap((response: any) => {
					const tripRequests = toInstances(TripRequestSummary, response);
					this.tripRequestStore.setTripRequests(tripRequests);
					return of(tripRequests);
				}),
				tap({
					error: (error: HttpErrorResponse) => {
						this.tripRequestStore.setTripRequests([]);
						this.errorHandler.handle(error);
					},
				}),
			);
	}

	sendTripRequest(tripId: string, driverId: string, numberOfPassengers: number): Observable<string> {
		this.tripStore.setReservationPending(true);
		return this.http.post<string>(sendTripRequestUrl, {
			tripId,
			driverId,
			numberOfPassengers,
			passengerId: this.currentUserId,
		}).pipe(
			tap({
				next: (response: any) => this.notificationService.showSuccessNotification(response.message),
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
			finalize(() => this.tripStore.setReservationPending(false)),
		);
	}

	tripRequestExists(tripId: string): Observable<boolean> {
		return this.http.get<boolean>(tripRequestExistsUrl(tripId, this.currentUserId))
			.pipe(
				share(),
			);
	}

	acceptRequest(tripId: string, passengerId: string): Observable<any> {
		return this.http.post(acceptTripRequestUrl, {
			tripId,
			passengerId,
		}).pipe(
			tap({
				next: () => {
					this.finalizeTripRequest(tripId, passengerId);
					this.notificationService.showSuccessNotification(constants.acceptTripRequestSuccess);
				},
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}

	declineRequest(tripId: string, passengerId: string): Observable<any> {
		return this.http.post(declineTripRequestUrl, {
			tripId,
			passengerId,
		}).pipe(
			tap({
				next: () => {
					this.finalizeTripRequest(tripId, passengerId);
					this.notificationService.showWarningMessage(constants.declinedTripRequest);
				},
				error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
			}),
		);
	}

	private finalizeTripRequest(tripId: string, passengerId: string): void {
		this.tripRequestStore.removeTripRequest(tripId, passengerId);
		this.pushNotificationStore.decrementTripRequestCount();
	}
}
