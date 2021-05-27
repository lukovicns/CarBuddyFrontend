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
import { AuthStoreService } from '@services/auth-store.service';
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
	selectedPhoto: File;

	readonly constants: Constants = constants;

	constructor(
		private authService: AuthService,
		private authStore: AuthStoreService,
	) {
		this.isPending$ = this.authStore.isRegisterPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			firstName: requiredTextControl('', 2),
			lastName: requiredTextControl('', 2),
			email: emailControl(''),
			password: passwordControl(''),
			age: numberControl(18, 10, 150),
		});
	}

	ngOnDestroy(): void {
		this.form.reset();
	}

	selectPhoto(file: File): void {
		this.selectedPhoto = file;
	}

	register(): void {
		this.authService.register({
			...this.form.value,
			photo: this.selectedPhoto,
		}).subscribe({
			next: () => this.resetPassword(),
			error: () => this.resetPassword(),
		});
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}

	private resetPassword(): void {
		this.control('password').reset();
	}
}
