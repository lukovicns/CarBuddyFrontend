import { Injectable } from '@angular/core';

import jwtDecode from 'jwt-decode';

import { TokenPayload } from '@models/token-payload.model';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationService {
	get isUserLoggedIn(): boolean {
		return !!this.currentUserId;
	}

	get currentUserId(): string {
		return this.payload.isValid ? this.payload.id : '';
	}

	private get payload(): TokenPayload {
		const token: string = localStorage.getItem('token') || '';
		try {
			return new TokenPayload(jwtDecode(token));
		}
		catch (_: any) {
			return TokenPayload.empty;
		}
	}
}
