import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DialogService {
	constructor(private dialog: MatDialog) { }

	open<T>(component: ComponentType<T>, data?: any, panelClass?: string): MatDialogRef<T, any> {
		return this.dialog.open(component, {
			disableClose: true,
			autoFocus: false,
			width: '500px',
			panelClass,
			data,
		});
	}
}
