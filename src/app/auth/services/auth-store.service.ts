import { Injectable } from '@angular/core';

import { AuthState } from '@states/auth.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class AuthStoreService extends Store<any> {
	isUserLoggedIn$ = this.select((state: AuthState) => state.isUserLoggedIn);
	isLoginPending$ = this.select((state: AuthState) => state.isLoginPending);
	isRegisterPending$ = this.select((state: AuthState) => state.isRegisterPending);

	constructor() {
		super({
			isUserLoggedIn: false,
			isLoginPending: false,
			isRegisterPending: false,
		});
	}

	setLoggedIn(isUserLoggedIn: boolean): void {
		this.setState({ isUserLoggedIn });
	}

	setLoginPending(isPending: boolean): void {
		this.setState({ isLoginPending: isPending });
	}

	setRegisterPending(isPending: boolean): void {
		this.setState({ isRegisterPending: isPending });
	}
}
