import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private snackbar: MatSnackBar) { }

	showErrorNotification(): void {
		this.snackbar.open('An error occurred!', 'Dismiss', {
			duration: 3000,
		});
	}
}
