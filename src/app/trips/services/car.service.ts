import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { carsUrl, userCarUrl } from '@constants/urls';
import { constants } from '@constants/constants';
import { Car } from '@models/car.model';
import { NotificationService } from '@modules/shared/services/notification.service';
import { AuthorizationService } from '@services/authorization.service';
import { CarStoreService } from '@services/car-store.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CarService {
	constructor(
		private authorizationService: AuthorizationService,
		private carStore: CarStoreService,
		private errorHandler: ErrorHandlerService,
		private http: HttpClient,
		private notificationService: NotificationService,
	) { }

	getUserCar(): Observable<Car | null> {
		return this.carStore.hasCar !== null
			? this.carStore.car$
			: this.http.get<Car>(userCarUrl(this.currentUserId))
				.pipe(
					map((car: Car) => new Car(car)),
					tap({
						next: (car: Car) => this.carStore.setCar(car),
						error: () => this.carStore.setCar({}),
					}),
				);
	}

	addCar(data: any): Observable<Car> {
		this.carStore.setAddCarPending(true);
		return this.http.post<Car>(carsUrl, {
			...data,
			driverId: this.currentUserId,
		}).pipe(
			map((car: Car) => new Car(car)),
			tap({
				next: (car: Car) => {
					this.carStore.setCar(car);
					this.notificationService.showSuccessNotification(constants.carAdded);
				},
				error: (error: HttpErrorResponse) => {
					this.errorHandler.handle(error);
				},
			}),
			finalize(() => this.carStore.setAddCarPending(false)),
		);
	}

	private get currentUserId(): string {
		return this.authorizationService.currentUserId;
	}
}
