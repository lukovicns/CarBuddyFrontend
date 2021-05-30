import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { Constants, constants } from '@constants/constants';
import { emailControl, passwordControl } from '@constants/form-controls';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
	selector: 'cb-login',
	templateUrl: './login.component.html',
	styleUrls: ['../scss/auth-form.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
	isPending$: Observable<boolean>;
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(
		private router: Router, 
		private authService: AuthService,
		private tokenService: TokenService,
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			email: emailControl,
			password: passwordControl,
		});
	}

	ngOnDestroy(): void {
		this.form.reset();
	}

	login(): void {
		this.authService.login(this.form.value)
			.subscribe((token: string) => {
				this.tokenService.setToken(token);
				this.router.navigate(['/']);
			});
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
