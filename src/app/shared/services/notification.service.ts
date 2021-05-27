import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private snackbar: MatSnackBar) { }

	showSuccessNotification(message: string): void {
		this.showNotification(message, 'success');
	}

	showErrorNotification(message: string): void {
		this.showNotification(message, 'error');
	}

	showWarningMessage(message: string): void {
		this.showNotification(message, 'warn');
	}

	private showNotification(message: string, messageType: 'success' | 'error' | 'warn'): void {
		this.snackbar.open(message, 'X', {
			duration: 2000,
			panelClass: [messageType + '-message'],
		});
	}
}
