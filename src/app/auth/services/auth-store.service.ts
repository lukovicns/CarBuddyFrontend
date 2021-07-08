import { Injectable } from '@angular/core';

import { AuthState } from '@states/auth.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class AuthStoreService extends Store<any> {
	isUserLoggedIn$ = this.select((state: AuthState) => state.isUserLoggedIn);

	constructor() {
		super({ isUserLoggedIn: false });
	}

	setLoggedIn(isUserLoggedIn: boolean): void {
		this.setState({ isUserLoggedIn });
	}
}
