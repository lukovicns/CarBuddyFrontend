import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { carsUrl } from '@constants/urls';
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
			: this.http.get<Car>(carsUrl(this.authorizationService.currentUserId))
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
}
