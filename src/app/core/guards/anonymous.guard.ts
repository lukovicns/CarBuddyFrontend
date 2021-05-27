import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthorizationService } from '@services/authorization.service';

@Injectable({
	providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
	constructor(
		private router: Router,
		private authorizationService: AuthorizationService,
	) { }

	canActivate(): boolean {
		if (!this.authorizationService.isUserLoggedIn) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}
}
