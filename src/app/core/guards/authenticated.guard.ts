import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { AuthorizationService } from '@services/authorization.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private router: Router,
		private authorizationService: AuthorizationService,
	) { }

	canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authorizationService.isUserLoggedIn) {
			return true;
		}

		this.router.navigate(['auth', 'login'], { queryParams: { next: state.url } });
		return false;
	}
}
