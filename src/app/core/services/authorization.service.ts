import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { TokenPayload } from '@models/token-payload.model';
import { TokenService } from '@services/token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationService {
	private readonly isLoggedIn = new BehaviorSubject<boolean>(false);

	readonly isUserLoggedIn$ = this.isLoggedIn.asObservable();

	constructor(private tokenService: TokenService) {
		this.setLoggedIn(this.isUserLoggedIn);
	}

	logout(): void {
		this.setLoggedIn(false);
	}

	setLoggedIn(isLoggedIn: boolean): void {
		this.isLoggedIn.next(isLoggedIn);
	}

	get isUserLoggedIn(): boolean {
		return this.currentUserId !== 0;
	}

	get currentUserId(): number {
		return this.payload.isValid ? +this.payload.id : 0;
	}

	private get payload(): TokenPayload {
		try {
			return new TokenPayload(jwtDecode(this.tokenService.token));
		}
		catch (_: any) {
			return TokenPayload.empty;
		}
	}
}
