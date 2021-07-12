import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { carsUrl } from '@constants/urls';
import { Car } from '@models/car.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CarService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private errorHandler: ErrorHandlerService,
		private authorizationService: AuthorizationService,
	) { }

	getUserCar(): Observable<Car> {
		return this.http.get<Car>(carsUrl(this.authorizationService.currentUserId))
			.pipe(
				map((car: Car) => new Car(car)),
				tap({
					error: (error: HttpErrorResponse) => {
						this.errorHandler.handle(error);
						this.router.navigate(['/']);
					},
				}),
			);
	}
}
