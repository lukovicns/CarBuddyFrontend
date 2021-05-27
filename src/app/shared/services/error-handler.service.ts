import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { NotificationService } from '@services/notification.service';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService {
	constructor(private notificationService: NotificationService) { }

	handle(error: any): Observable<string> {
		const errorMessage = this.getErrorMessage(error);
		this.notificationService.showErrorNotification(errorMessage);
		return throwError(errorMessage);
	}

	private getErrorMessage(errorResponse: HttpErrorResponse): string {
		if (errorResponse.error?.detail) {
			return errorResponse.error.detail;
		}

		return errorResponse.error instanceof ErrorEvent
			? `An error occured: ${errorResponse.error.message}`
			: `Backend returned code ${errorResponse.status}: ${errorResponse.statusText}`;
	}
}
