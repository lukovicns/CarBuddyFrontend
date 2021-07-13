import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { carsUrl, userCarUrl } from '@constants/urls';
import { Car } from '@models/car.model';
import { AuthorizationService } from '@services/authorization.service';
import { CarStoreService } from '@services/car-store.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CarService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private authorizationService: AuthorizationService,
		private errorHandler: ErrorHandlerService,
		private carStore: CarStoreService,
	) { }

	getUserCar(): Observable<Car | null> {
		return this.carStore.hasCar
			? this.carStore.car$
			: this.http.get<Car>(userCarUrl(this.authorizationService.currentUserId))
				.pipe(
					tap({
						next: (car: Car) => this.carStore.setCar(car),
						error: (error: HttpErrorResponse) => {
							this.carStore.setCar({});
							this.errorHandler.handle(error);
							this.router.navigate(['/']);
						},
					}),
				);
	}

	addCar(data: any): Observable<Car> {
		return this.http.post<Car>(carsUrl, data)
			.pipe(
				map((car: Car) => new Car(car)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}
}
