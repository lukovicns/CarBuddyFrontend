import { Router } from '@angular/router';
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit, 
} from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators, 
} from '@angular/forms';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { emailControl, passwordControl } from '@constants/form-controls';
import { AuthService } from '@services/auth.service';

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
			firstName: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
			]),
			lastName: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
			]),
			email: emailControl,
			password: passwordControl,
			age: new FormControl(18, [
				Validators.required,
				Validators.min(12),
				Validators.max(100),
			]),
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
