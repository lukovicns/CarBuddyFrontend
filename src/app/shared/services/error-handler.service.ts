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
		this.notificationService.showErrorNotification(error.error.detail);
		return throwError(this.getErrorMessage(error));
	}

	private getErrorMessage(error: HttpErrorResponse): string {
		return error.error instanceof ErrorEvent
			? `An error occured: ${error.error.message}`
			: `Backend returned code ${error.status}: ${error.statusText}`;
	}
}
