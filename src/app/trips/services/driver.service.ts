import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { canRateDriverUrl, driverUrl } from '@constants/urls';
import { Driver } from '@models/driver.model';
import { AuthorizationService } from '@services/authorization.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class DriverService {
	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService,
		private errorHandler: ErrorHandlerService,
	) { }

	getDriver(id: string): Observable<Driver> {
		return this.http.get<Driver>(driverUrl(id))
			.pipe(
				map((data: Driver) => new Driver(data)),
				tap({
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
			);
	}

	canRateDriver(tripId: string, driverId: string): Observable<boolean> {
		return this.http.get<boolean>(canRateDriverUrl(
			tripId,
			driverId,
			this.authorizationService.currentUserId,
		)).pipe(
			catchError(() => of(false)),
		);
	}
}
