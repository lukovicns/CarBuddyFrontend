import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService {
	handle(error: HttpErrorResponse): Observable<string> {
		return throwError(this.getErrorMessage(error));
	}

	private getErrorMessage(error: HttpErrorResponse): string {
		return error.error instanceof ErrorEvent
			? `An error occured: ${error.error.message}`
			: `Backend returned code ${error.status}: ${error.statusText}`;
	}
}
