import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '@services/authorization.service';
import { TokenService } from '@services/token.service';

@Component({
	selector: 'cb-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	isUserLoggedIn$: Observable<boolean>;

	constructor(
		private router: Router,
		private authorizationService: AuthorizationService,
		private tokenService: TokenService,
	) {
		this.isUserLoggedIn$ = this.authorizationService.isUserLoggedIn$;
	}

	logout(): void {
		this.authorizationService.logout();
		this.tokenService.removeToken();
		this.router.navigate(['auth', 'login']);
	}
}
