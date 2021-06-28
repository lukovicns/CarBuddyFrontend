import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private snackbar: MatSnackBar) { }

	showErrorNotification(message: string): void {
		this.snackbar.open(message, 'Dismiss', {
			duration: 3000,
		});
	}
}
