import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { Credentials } from '@classes/credentials.model';
import { RegistrationData } from '@classes/registration-data.model';
import { loginUrl, registerUrl } from '@constants/urls';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly isRegistrationPending = new BehaviorSubject<boolean>(false);
	private readonly isLoginPending = new BehaviorSubject<boolean>(false);

	readonly isRegistrationPending$ = this.isRegistrationPending.asObservable();
	readonly isLoginPending$ = this.isLoginPending.asObservable();

	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerService,
	) { }

	register(data: RegistrationData): Observable<any> {
		this.isRegistrationPending.next(true);
		return this.http.post(registerUrl, data)
			.pipe(
				catchError((error: HttpErrorResponse) => this.errorHandler.handle(error)),
				finalize(() => this.isRegistrationPending.next(false)),
			);
	}

	login(credentials: Credentials) {
		this.isLoginPending.next(true);
		return this.http.post(loginUrl, credentials)
			.pipe(
				map((response: any) => response.token),
				catchError((error: HttpErrorResponse) => this.errorHandler.handle(error)),
				finalize(() => this.isLoginPending.next(false)),
			);
	}
}
