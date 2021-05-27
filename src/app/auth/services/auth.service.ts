import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { constants } from '@constants/constants';
import { Credentials } from '@classes/credentials.model';
import { RegistrationData } from '@classes/registration-data.model';
import { confirmEmailUrl, loginUrl, registerUrl } from '@constants/urls';
import { AuthStoreService } from '@services/auth-store.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private authStore: AuthStoreService,
		private errorHandler: ErrorHandlerService,
		private http: HttpClient,
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	register(data: RegistrationData): Observable<any> {
		this.authStore.setRegisterPending(true);
		return this.http.post(registerUrl, this.generateFormData(data))
			.pipe(
				tap({
					next: () => {
						this.router.navigate(['auth', 'login']);
						this.notificationService.showSuccessNotification(constants.registrationSuccessful);
						this.authStore.setRegisterPending(false);
					},
					error: (error: HttpErrorResponse) => {
						this.errorHandler.handle(error);
						this.authStore.setRegisterPending(false);
					},
				}),
			);
	}

	confirmEmail(userId: string, token: string): Observable<{ isActivated: boolean }> {
		return this.http.post<{ isActivated: boolean }>(confirmEmailUrl(userId, token), {});
	}

	login(credentials: Credentials): Observable<string> {
		this.authStore.setLoginPending(true);
		return this.http.post(loginUrl, credentials)
			.pipe(
				map((response: any) => response.token),
				tap({
					next: (token: string) => {
						localStorage.setItem('token', token);
						this.authStore.setLoggedIn(true);
						this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('next') || '/');
					},
					error: (error: HttpErrorResponse) => this.errorHandler.handle(error),
				}),
				finalize(() => this.authStore.setLoginPending(false)),
			);
	}

	logout(): void {
		this.authStore.setLoggedIn(false);
		localStorage.removeItem('token');
		this.router.navigate(['auth', 'login']);
	}

	private generateFormData(data: RegistrationData): FormData {
		const formData = new FormData();

		formData.append('firstName', data.firstName);
		formData.append('lastName', data.lastName);
		formData.append('email', data.email);
		formData.append('password', data.password);
		formData.append('age', data.age.toString());

		if (data.photo) {
			formData.append('photo', data.photo, data.photo.name);
		}

		return formData;
	}
}
