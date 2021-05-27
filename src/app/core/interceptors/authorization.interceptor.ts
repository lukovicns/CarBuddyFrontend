import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';

import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { constants } from '@constants/constants';
import { NotificationService } from '@services/notification.service';
import { AuthService } from '@services/auth.service';
import { loginUrl, registerUrl } from '@shared/constants/urls';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private notificationService: NotificationService,
	) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return this.isAuthUrl(request.url)
			? next.handle(request)
			: next.handle(this.withHeaders(request))
				.pipe(
					catchError((error: HttpErrorResponse) => {
						if (error.status !== 401) {
							return throwError(error);
						}

						this.authService.logout();
						this.notificationService.showErrorNotification(constants.sessionExpired);
						return EMPTY;
					}),
				);
	}

	private isAuthUrl(url: string): boolean {
		return url === registerUrl
			|| url === loginUrl;
	}

	private withHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
		return request.clone({
			headers: new HttpHeaders({
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}),
		});
	}
}
