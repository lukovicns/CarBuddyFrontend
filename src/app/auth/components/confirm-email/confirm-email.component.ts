import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { constants } from '@constants/constants';
import { AuthService } from '@services/auth.service';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notification.service';

@Component({
	selector: 'cb-confirm-email',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent {
	constructor(
		private authService: AuthService,
		private errorHandler: ErrorHandlerService,
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.route.queryParamMap.subscribe((params: ParamMap) => {
			this.confirmEmail(params.get('userId')!, params.get('token')!);
		});
	}

	confirmEmail(userId: string, token: string): void {
		this.authService.confirmEmail(userId, token)
			.subscribe({
				next: () => {
					this.notificationService.showSuccessNotification(constants.confirmEmailSuccessful);
					this.router.navigate(['login']);
				},
				error: (error: any) => {
					this.errorHandler.handle(error);
					this.router.navigate(['login']);
				},
			});
	}
}
