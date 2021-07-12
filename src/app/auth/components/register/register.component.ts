import { Router } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { AuthService } from '@services/auth.service';
import {
	emailControl,
	numberControl,
	passwordControl,
	requiredTextControl, 
} from '@constants/form-controls';

@Component({
	selector: 'cb-register',
	templateUrl: './register.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [
		'../scss/auth-form.scss',
		'./register.component.scss',
	],
})
export class RegisterComponent implements OnInit, OnDestroy {
	isPending$: Observable<boolean>;
	form: FormGroup;
	
	readonly constants: Constants = constants;

	constructor(
		private router: Router,
		private authService: AuthService,
	) {
		this.isPending$ = this.authService.isRegistrationPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			firstName: requiredTextControl('', 3),
			lastName: requiredTextControl('', 3),
			email: emailControl(''),
			password: passwordControl(''),
			age: numberControl(18, 12, 100),
		});
	}

	ngOnDestroy(): void {
		this.form.reset();
	}

	register(): void {
		this.authService.register(this.form.value)
			.subscribe(() => this.router.navigate(['auth', 'login']));
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
