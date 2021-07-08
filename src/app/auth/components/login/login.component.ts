import { AbstractControl, FormGroup } from '@angular/forms';
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

@Component({
	selector: 'cb-login',
	templateUrl: './login.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [
		'../scss/auth-form.scss',
		'./login.component.scss',
	],
})
export class LoginComponent implements OnInit, OnDestroy {
	isPending$: Observable<boolean>;
	form: FormGroup;

	readonly constants: Constants = constants;

	constructor(private authService: AuthService) {
		this.isPending$ = this.authService.isLoginPending$;
	}

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
			.subscribe();
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
