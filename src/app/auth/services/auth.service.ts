import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {
	catchError,
	finalize,
	map,
	tap, 
} from 'rxjs/operators';

import { Credentials } from '@classes/credentials.model';
import { RegistrationData } from '@classes/registration-data.model';
import { loginUrl, registerUrl } from '@constants/urls';
import { AuthStoreService } from '@services/auth-store.service';
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
		private router: Router,
		private authStore: AuthStoreService,
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

	login(credentials: Credentials): Observable<string> {
		this.isLoginPending.next(true);
		return this.http.post(loginUrl, credentials)
			.pipe(
				map((response: any) => response.token),
				tap({
					next: (token: string) => {
						localStorage.setItem('token', token);
						this.authStore.setLoggedIn(true);
						this.router.navigate(['/']);
					},
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
					complete: () => this.isLoginPending.next(false),
				}),
			);
	}

	logout(): void {
		this.authStore.setLoggedIn(false);
		localStorage.removeItem('token');
		this.router.navigate(['auth', 'login']);
	}
}
