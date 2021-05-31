import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	get token(): string {
		return localStorage.getItem('token') || '';
	}

	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	removeToken(): void {
		localStorage.removeItem('token');
	}
}
