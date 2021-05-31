import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree, 
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '@services/authorization.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private router: Router,
		private authorizationService: AuthorizationService,
	) { }

	canActivate(
		_: ActivatedRouteSnapshot,
		__: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authorizationService.isUserLoggedIn) {
			return true;
		}

		this.router.navigate(['auth', 'login']);
		return false;
	}
}
